import { cn } from "@/lib/utils";
import React from "react";

type DividerProps = {
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <span className={cn(`border-b border-gray-800 flex`,className)}></span>
  );
};
