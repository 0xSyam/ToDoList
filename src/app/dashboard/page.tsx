"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CalendarIcon, MoreVertical, Pencil, Trash, ClipboardList, Filter, SortAsc } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from "@/hooks/use-toast"
import { type Todo, createTodo, listTodos, updateTodo, deleteTodo } from "@/utils/api"
import { addDays } from "date-fns"

type TodoWithoutId = Omit<Todo, "user_id" | "created_at" | "updated_at">

interface TodoFormProps {
  currentTodo: TodoWithoutId
  setCurrentTodo: (todo: TodoWithoutId) => void
}

const defaultTodo: TodoWithoutId = {
  todo_id: 0,
  title: "",
  description: "",
  priority: "medium",
  due_date: "",
  is_complete: 0,
}

const EmptyState: React.FC<{ onCreateClick: () => void }> = ({ onCreateClick }) => {
  return (
    <Card className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 border-dashed">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <ClipboardList className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">No tasks yet</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Get started by creating your first task. Stay organized and never miss a deadline!
      </p>
      <Button onClick={onCreateClick} size="lg" className="gap-2">
        <span>+</span> Create your first task
      </Button>
    </Card>
  )
}

const TodoForm: React.FC<TodoFormProps> = ({ currentTodo, setCurrentTodo }) => {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={currentTodo.title}
          onChange={(e) => setCurrentTodo({ ...currentTodo, title: e.target.value })}
          placeholder="Enter task title"
          className="focus-visible:ring-2"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={currentTodo.description}
          onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value })}
          placeholder="Enter task description"
          className="focus-visible:ring-2"
        />
      </div>
      <div className="space-y-2">
        <Label>Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !currentTodo.due_date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {currentTodo.due_date ? currentTodo.due_date : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={currentTodo.due_date ? new Date(currentTodo.due_date) : undefined}
              onSelect={(date) =>
                setCurrentTodo({
                  ...currentTodo,
                  due_date: date ? addDays(date, 1).toISOString().split("T")[0] : "",
                })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={currentTodo.priority}
          onValueChange={(value: "low" | "medium" | "high") => setCurrentTodo({ ...currentTodo, priority: value })}
        >
          <SelectTrigger id="priority" className="focus-visible:ring-2">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [sortBy, setSortBy] = useState<"due_date" | "priority">("due_date")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState<TodoWithoutId>(defaultTodo)
  const [newTodo, setNewTodo] = useState<TodoWithoutId>(defaultTodo)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, [router])

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const response = await listTodos(token)
        if (response.data) {
          setTodos(response.data)
        } else {
          throw new Error(response.error || "Failed to fetch todos")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "An error occurred while fetching todos",
          variant: "destructive",
        })
      }
    }

    fetchTodos()
  }, [router, toast])

  const addTodo = async (): Promise<void> => {
    if (newTodo.title.trim()) {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const response = await createTodo(
          token,
          newTodo.title,
          newTodo.description,
          newTodo.due_date.split("T")[0],
          newTodo.priority,
        )
        if (response.data) {
          setTodos([...todos, response.data])
          setNewTodo(defaultTodo)
          setIsCreateDialogOpen(false)
          toast({
            title: "Success",
            description: "Todo created successfully",
          })
        } else {
          throw new Error(response.error || "Failed to create todo")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "An error occurred while creating todo",
          variant: "destructive",
        })
      }
    }
  }

  const startEditing = (todo: Todo): void => {
    setEditingTodo({
      todo_id: todo.todo_id,
      title: todo.title,
      description: todo.description,
      due_date: todo.due_date.split("T")[0],
      priority: todo.priority,
      is_complete: todo.is_complete,
    })
    setIsEditDialogOpen(true)
  }

  const saveEdit = async (): Promise<void> => {
    if (editingTodo.title.trim()) {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      try {
        const response = await updateTodo(
          token,
          editingTodo.todo_id,
          editingTodo.title,
          editingTodo.description,
          editingTodo.due_date.split("T")[0],
          editingTodo.priority,
          editingTodo.is_complete === 1,
        )
        if (response.data) {
          setTodos(
            todos.map((todo) => {
              return todo.todo_id === editingTodo.todo_id && response.data ? response.data : todo
            }),
          )
          setEditingTodo(defaultTodo)
          setIsEditDialogOpen(false)
          toast({
            title: "Success",
            description: "Todo updated successfully",
          })
        } else {
          throw new Error(response.error || "Failed to update todo")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "An error occurred while updating todo",
          variant: "destructive",
        })
      }
    }
  }

  const deleteTodoItem = async (id: number): Promise<void> => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    try {
      const response = await deleteTodo(token, id)
      if (response.data) {
        setTodos(todos.filter((todo) => todo.todo_id !== id))
        toast({
          title: "Success",
          description: response.data.message,
        })
      } else {
        throw new Error(response.error || "Failed to delete todo")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while deleting todo",
        variant: "destructive",
      })
    }
  }

  const toggleComplete = async (todo: Todo): Promise<void> => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const newIsComplete = todo.is_complete === 0

    try {
      const response = await updateTodo(
        token,
        todo.todo_id,
        todo.title,
        todo.description,
        todo.due_date.split("T")[0],
        todo.priority,
        newIsComplete,
      )
      if (response.data) {
        setTodos(
          todos.map((t) => {
            return t.todo_id === todo.todo_id && response.data ? response.data : t
          }),
        )
        toast({
          title: "Success",
          description: `Todo marked as ${newIsComplete ? "completed" : "incomplete"}`,
        })
      } else {
        throw new Error(response.error || "Failed to update todo status")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while updating todo status",
        variant: "destructive",
      })
    }
  }

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "completed") return todo.is_complete === 1
      if (filter === "active") return todo.is_complete === 0
      return true
    })
    .sort((a, b) => {
      if (sortBy === "due_date") return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      if (sortBy === "priority") {
        const priorityOrder: Record<string, number> = {
          high: 0,
          medium: 1,
          low: 2,
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return 0
    })

  const getPriorityBadgeVariant = (priority: "low" | "medium" | "high"): "default" | "secondary" | "destructive" => {
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "default",
    } satisfies Record<Todo["priority"], "default" | "secondary" | "destructive">

    return variants[priority]
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>

          {todos.length > 0 && (
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={filter}
                  onValueChange={(value: string) => setFilter(value as "all" | "active" | "completed")}
                >
                  <SelectTrigger className="w-full sm:w-auto">
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All tasks</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <SortAsc className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as "priority" | "due_date")}>
                  <SelectTrigger className="w-full sm:w-auto">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due_date">Due Date</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2">
              <span>+</span> Add new task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new task with title, description, due date, and priority.</DialogDescription>
            </DialogHeader>
            <TodoForm currentTodo={newTodo} setCurrentTodo={setNewTodo} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addTodo}>Add Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Make changes to your task here.</DialogDescription>
            </DialogHeader>
            <TodoForm currentTodo={editingTodo} setCurrentTodo={setEditingTodo} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="space-y-4">
          {todos.length === 0 ? (
            <EmptyState onCreateClick={() => setIsCreateDialogOpen(true)} />
          ) : (
            filteredTodos.map((todo) => (
              <Card key={todo.todo_id} className={cn("flex items-start gap-4 p-4 transition-colors hover:bg-accent")}>
                <Checkbox
                  checked={todo.is_complete === 1}
                  onCheckedChange={() => toggleComplete(todo)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <h3
                        className={cn(
                          "font-medium truncate",
                          todo.is_complete === 1 && "line-through text-muted-foreground",
                        )}
                      >
                        {todo.title}
                      </h3>
                      <p
                        className={cn(
                          "text-sm text-muted-foreground line-clamp-2",
                          todo.is_complete === 1 && "line-through",
                        )}
                      >
                        {todo.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge variant={getPriorityBadgeVariant(todo.priority as "low" | "medium" | "high")}>
                        {todo.priority}
                      </Badge>
                      {todo.due_date && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{new Date(todo.due_date).toLocaleDateString("id-ID")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => startEditing(todo)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteTodoItem(todo.todo_id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

