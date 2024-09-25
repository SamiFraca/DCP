import React, { useState } from "react";
import { interestCategories } from "@/app/[locale]/register/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface MainInterestDropdownProps<T> {
  placeholder?: string;
  onChange: (name:T,value: T) => void;
  selectorName?: string;
}

export const MainInterestDropdown = <T,>({
  placeholder,
  selectorName,
  onChange,
}: MainInterestDropdownProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const t = useTranslations("Register");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onChange(value as unknown as T,selectorName as unknown as T);
  };

  return (
    <Select
      name={selectorName}
      value={selectedValue}
      onValueChange={handleValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder || t("mainInterest")} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {interestCategories.map((category, index) => (
            <SelectItem key={index} value={t(category)}>
              {t(category)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

// Set a display name for better debugging
MainInterestDropdown.displayName = "MainInterestDropdown";
