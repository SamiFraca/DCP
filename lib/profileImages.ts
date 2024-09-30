import getUser from "./getUser";
import { supabase } from "./supabaseClient";

export const uploadProfileImage = async (file: File) => {
    const authUserId = (await getUser()).user?.id;
  const filePath = `${authUserId}/${file.name}`;
  const { data, error } = await supabase.storage
    .from("profile-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading file:", error.message);
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
    console.error("Error updating user profile:", error.message);
    return null;
  }

  return data;
};
