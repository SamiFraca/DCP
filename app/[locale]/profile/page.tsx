'use client';

import { useUser } from '@/context/user-context';

export default function Profile() {
  const { user, isLoading, error } = useUser();
  console.log(user)
  
  if (!user) {
    return <p>No user data available.</p>;
  }

  
  return (
    <div>
      <h1 >Profile</h1>
      {/* Render other user details here */}
    </div>
  );
}