"use client";

import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { createProjectAndLinkToUser } from "@/lib/fetchSupabaseData";

export const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex items-center relative">
      <Input
        className="max-w-80 border-t-0 border-r-0 border-l-0 rounded-none border-b-2 focus:rounded-md"
        placeholder="Search..."
        alt="Search"
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        value={inputValue}
      />
      {/* <Search width={20} height={20} className="border-b border-red-200" /> */}
    </div>
  );
};
