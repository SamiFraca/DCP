'use server'
import { createClient } from '@/utils/supabase/server'
import { RegisterInputs } from './page';


export async function signup(data: RegisterInputs ) {
    const supabase = createClient()

  
    const { data: user, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options:{
        data:{
          name:data.options.data.name,
          lastName:data.options.data.lastName,
          country:data.options.data.country,
          mainField:data.options.data.mainField
        }
      }
    });
  
    if (error) {
      return { error: error.message }
    }

    if (user) {
      const { error: insertError } = await supabase.from('users').insert([
        {
          auth_user_id: user.user?.id,
          email: data.email,
          name: data.options.data.name,
          last_name: data.options.data.lastName || null,
          country: data.options.data.country,
          main_field: data.options.data.mainField,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
  
      if (insertError) {
        throw new Error(`Error inserting user data: ${insertError.message}`);
      }
  
    }
  
    return { success: true }
  }