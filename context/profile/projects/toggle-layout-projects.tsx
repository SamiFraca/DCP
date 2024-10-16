"use client"
import { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  isGrid: boolean;
  toggleLayout: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const ToggleLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isGrid, setIsGrid] = useState(true);

  const toggleLayout = () => {
    setIsGrid((prev) => !prev);
  };

  return (
    <LayoutContext.Provider value={{ isGrid, toggleLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};