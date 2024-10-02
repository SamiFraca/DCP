import { createClient } from "@/utils/supabase/client";
import getUser from "./getUser";
import { supabase } from "./supabaseClient";

export const uploadProfileImage = async (file: File) => {
    const authUser = (await getUser()).user;
    const authUserId = authUser?.id;
    
    if (!authUserId) {
      console.error("User not authenticated");
      return null;
    }
  
    const filePath = `private/${authUserId}/${file.name}`;
  
    const currentProfileImage = authUser?.user_metadata?.profile_image;
  
    if (currentProfileImage) {
      const currentFileName = currentProfileImage.split('/').pop()?.split('?')[0];
  
      const { error: deleteError } = await supabase.storage
        .from("profile-images")
        .remove([`private/${authUserId}/${currentFileName}`]);
      
      if (deleteError) {
        console.error("Error deleting existing profile image:", deleteError.message);
        return null; 
      }
    }
  
    const { data, error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(filePath, file, {
        upsert: true,
      });
  
    if (uploadError) {
      console.error("Error uploading file:", uploadError.message);
      return null;
    }
  
    const { data: signedURL, error: urlError } = await supabase.storage
      .from("profile-images")
      .createSignedUrl(filePath, 60 * 60);
  
    if (urlError) {
      console.error("Error creating signed URL:", urlError.message);
      return null;
    }
  
    await updateUserProfile(signedURL?.signedUrl);
  
    return signedURL?.signedUrl;
  };

export const updateUserProfile = async (imageUrl: string) => {
  const authUserId = (await getUser()).user?.id;
  const { data, error } = await supabase
    .from("users")
    .update({ profile_image: imageUrl })
    .eq("auth_user_id", authUserId);

  if (error) {
    console.error("Error updating users table profile image:", error.message);
    return null;
  }
  const supabaseClient = createClient();
  const { error: authError } = await supabaseClient.auth.updateUser({
    data: { profile_image: imageUrl },
  });

  if (authError) {
    console.error(
      "Error updating users auth table profile image:",
      authError.message
    );
    return null;
  }

  return data;
};

export const getUserProfileImage = async () => {
  const authUserId = (await getUser()).user?.id;
  const { data, error } = await supabase
    .from("users")
    .select("profile_image")
    .eq("auth_user_id", authUserId)
    .single();
  if (error) {
    console.error("Can't retrieve profile image from user: " + error.message);
    return null;
  }
  return data;
};
