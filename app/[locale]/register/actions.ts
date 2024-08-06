'use server'
import { createClient } from '@/utils/supabase/server'


export async function signup(formData: FormData) {
    const supabase = createClient()
  
    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  
    const { error } = await supabase.auth.signUp(data);
  
    if (error) {
      return { error: error.message }
    }
  
    return { success: true }
  }