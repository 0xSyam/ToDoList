import { cookies } from "next/headers"
import { logout } from "@/utils/api"
import { redirect } from "next/navigation"

export default async function LogoutPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  if (token) {
    try {
      const response = await logout(token)

      if (response.error) {
        throw new Error(response.error)
      }

    
      cookieStore.delete("token")
    } catch (error) {
      console.error("Logout failed:", error)
     
    }
  }

 
  redirect("/login")
}

