'use server'

import { cookies } from 'next/headers'
import { listTodos } from "@/utils/api"

export async function fetchTodos() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  if (!token) {
    throw new Error("No token found")
  }

  const response = await listTodos(token)
  if (response.data) {
    return response.data
  } else {
    throw new Error(response.error || "Failed to fetch todos")
  }
}