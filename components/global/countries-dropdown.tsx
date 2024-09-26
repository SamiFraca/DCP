'use client'
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface CountryProps {
  name: string;
  flag: string;
}

type CountryDropdownProps<T = string> = {
  placeholderText?: string;
  onChange: (
    name: T,
    selectedCountry: T,
    selectedCountryFlag: string | undefined
  ) => void;
  selectorText?: string;
};

export const CountryDropdown = <T extends unknown>({
  placeholderText,
  onChange,
  selectorText = "country",
}: CountryDropdownProps<T>) => {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const t = useTranslations("Register");

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryData: CountryProps[] = data.map((country: any) => ({
        name: country.name.common,
        flag: country.flags.svg,
      }));

      countryData.sort((a, b) => a.name.localeCompare(b.name));

      setCountries(countryData);
    };

    fetchCountries();
  }, []);

  const handleValueChange = (value: string) => {
    const selectedCountry = countries.find((country) => country.name === value);
    onChange(
      value as unknown as T,
      selectorText as unknown as T,
      selectedCountry?.flag
    );
  };

  return (
    <Select name={selectorText} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholderText || t("ChooseCountry")} />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.name} value={country.name}>
            <div className="flex gap-2">
              {country.flag && (
                <Image
                  src={country.flag}
                  alt={`${country.name} flag`}
                  width={20}
                  height={20}
                />
              )}
              {country.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
