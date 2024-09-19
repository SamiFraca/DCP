import React from "react";

type DividerProps = {
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({ className }) => {
  return (
    <span className={`border-b border-gray-800 flex ${className ?? ""}`}></span>
  );
};
