'use server'
import { createClient } from '@/utils/supabase/server'
import { UserInputs } from './page';


export async function signup(data: UserInputs ) {
    const supabase = createClient()

  
    const { data: user, error } = await (await supabase).auth.signUp({
      email: data.email,
      password: data.password,
      options:{
        data:{
          name:data.options.data.name,
          last_name:data.options.data.lastName,
          country:data.options.data.country,
          region:data.options.data.region,
          main_field:data.options.data.main_field,
          user_description:'',
        }
      }
    });
  
    if (error) {
      return { error: error.message }
    }

    if (user) {
      const { error: insertError } = await (await supabase).from('users').insert([
        {
          auth_user_id: user.user?.id,
          email: data.email,
          name: data.options.data.name,
          last_name: data.options.data.lastName || null,
          country: data.options.data.country,
          region:data.options.data.region,
          main_field: data.options.data.main_field,
          user_description: '',
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