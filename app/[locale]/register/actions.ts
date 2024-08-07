'use server'
import { createClient } from '@/utils/supabase/server'
import { RegisterInputs } from './page';


export async function signup(data: RegisterInputs ) {
    const supabase = createClient()
  

  
    const { error } = await supabase.auth.signUp(data);
  
    if (error) {
      return { error: error.message }
    }
  
    return { success: true }
  }