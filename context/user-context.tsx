"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import getUser from "@/lib/getUser";

interface CustomUserMetadata {
  name?: string;
  lastName?: string;
  country?: string;
  region?: string;
  mainField?: string;
  main_field?: string;
  description?: string;
  last_name?: string;
  flag?: string;
  profile_image?: string;
  linkedin?:string;
  github?:string;
}

export interface CustomUser extends User {
  user_metadata: CustomUserMetadata;
}

interface UserContextType {
  contextUser: CustomUser | null;
  isLoading: boolean;
  error: string | null;
  updateUserContextMetadata: (metadata: Partial<CustomUserMetadata>) => void;
}

const defaultContext: UserContextType = {
  contextUser: null,
  isLoading: true,
  error: null,
  updateUserContextMetadata: () => {},
};

const UserContext = createContext<UserContextType>(defaultContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [contextUser, setUser] = useState<CustomUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const updateUserContextMetadata = (metadata: Partial<CustomUserMetadata>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      return {
        ...prevUser,
        user_metadata: {
          ...prevUser.user_metadata,
          ...metadata,
        },
      };
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user, error } = await getUser();
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
    <UserContext.Provider
      value={{ contextUser, isLoading, error, updateUserContextMetadata }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
