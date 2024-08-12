"use client";

import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Input } from "../ui/input";

export const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      alert(inputValue); 
    }
  };

  return (
    <div className="flex items-center relative">
      <Input
        className="max-w-80 border-t-0 border-r-0 border-l-0 rounded-none border-b-2 focus:rounded-md"
        placeholder="Search..."
        alt="Search"
        value={inputValue} 
        onChange={handleChange} 
        onKeyUp={handleKeyUp} 
      />
    </div>
  );
};