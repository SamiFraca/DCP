"use client";

import { useUser } from "@/context/user-context";

export default function Profile() {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return <div>klk</div>;
  }

  return (
    <div>
      <h1 className="text-6xl font-bold  sm:text-5xl text-start sr-only">Profile</h1>
      <p className="text-3xl text-center">Hi, <span className="capitalize">{user?.user_metadata.name}</span></p>
      {/* Render other user details here */}
    </div>
  );
}
