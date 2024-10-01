"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import getUser from "@/lib/getUser";

interface CustomUserMetadata {
  name?: string;
  lastName?: string;
  country?: string;
  region?:string;
  mainField?:string;
  main_field?:string;
  description?:string;
  last_name?:string;
  flag?:string;
  profile_image?:string;
}

export interface CustomUser extends User {
  user_metadata: CustomUserMetadata;
}

interface UserContextType {
  contextUser: CustomUser | null;
  isLoading: boolean;
  error: string | null;
}

const defaultContext: UserContextType = {
  contextUser: null,
  isLoading: true,
  error: null,
};

const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contextUser, setUser] = useState<CustomUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user, error } = await getUser();
        console.log(user);
        if (error || !user) {
          setError("Unable to fetch user");
          window.location.href = "/login";
        } else {
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
    <UserContext.Provider value={{ contextUser, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
