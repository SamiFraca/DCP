'use server'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await (await supabase).auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
