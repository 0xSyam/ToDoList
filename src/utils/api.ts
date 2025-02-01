function formatDate(date: string): string {
  return date.split("T")[0]
}

const API_BASE_URL = "https://todo-gdgoc.up.railway.app/api"

interface ApiResponse<T = unknown> {
  data?: T
  error?: string
}

async function handleApiResponse<T>(response: Response): Promise<ApiResponse<T>> {
  if (response.ok) {
    const data = await response.json()
    return { data }
  } else {
    const error = await response.text()
    return { error }
  }
}

export interface Todo {
  todo_id: number
  user_id: number
  title: string
  description: string
  due_date: string
  priority: string
  is_complete: number
  created_at: string
  updated_at: string
}

interface LoginResponseData {
  token: string;
  user: {
    name: string;
    email: string;
    // Add other user properties if needed
  };
  message: string;
}

export async function register(name: string, email: string, password: string): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  })
  return handleApiResponse(response)
}

export async function login(email: string, password: string): Promise<ApiResponse<LoginResponseData>> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  return handleApiResponse<LoginResponseData>(response)
}

export async function logout(token: string): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleApiResponse(response)
}

export async function createTodo(
  token: string,
  title: string,
  description: string,
  due_date: string, // Format: YYYY-MM-DD
  priority: string,
): Promise<ApiResponse<Todo>> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, due_date: formatDate(due_date), priority }),
  })
  return handleApiResponse<Todo>(response)
}

export async function listTodos(token: string): Promise<ApiResponse<Todo[]>> {
  const response = await fetch(`${API_BASE_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleApiResponse<Todo[]>(response)
}

export async function getTodoDetails(token: string, id: number): Promise<ApiResponse<Todo>> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleApiResponse<Todo>(response)
}

export async function getTodoById(token: string, id: number): Promise<ApiResponse<Todo>> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  return handleApiResponse<Todo>(response)
}

export async function updateTodo(
  token: string,
  id: number,
  title: string,
  description: string,
  due_date: string, 
  priority: string,
  is_complete: boolean,
): Promise<ApiResponse<Todo>> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      description,
      due_date: formatDate(due_date),
      priority,
      is_complete: is_complete ? 1 : 0,
    }),
  })
  return handleApiResponse<Todo>(response)
}

export async function deleteTodo(token: string, id: number): Promise<ApiResponse<{ message: string }>> {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return handleApiResponse<{ message: string }>(response)
}

