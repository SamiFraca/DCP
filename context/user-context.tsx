"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import getUser from "@/lib/getUser";

interface CustomUserMetadata {
  name?: string;
  lastName?: string;
  country?: string;
  mainField?:string;
  description?:string;
}

export interface CustomUser extends User {
  user_metadata: CustomUserMetadata;
}

interface UserContextType {
  user: CustomUser | null;
  isLoading: boolean;
  error: string | null;
}

const defaultContext: UserContextType = {
  user: null,
  isLoading: true,
  error: null,
};

const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<CustomUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user, error } = await getUser();
        if (error || !user) {
          setError("Unable to fetch user");
          window.location.href = "/login";
        } else {
          console.log(user);
          setUser(user);
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);