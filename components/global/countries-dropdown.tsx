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
  cca3: string;
}
type CountryDropdownProps = {
  placeholderText?: string;
};

export const CountryDropdown: React.FC<CountryDropdownProps> = ({
  placeholderText,
}) => {
  const [countries, setCountries] = useState<CountryProps[]>([]);
  const t = useTranslations("Register");
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      const countryData: CountryProps[] = data.map((country: any) => ({
        name: country.name.common,
        flag: country.flags.svg,
        cca3: country.cca3,
      }));
      countryData.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(countryData);
    };

    fetchCountries();
  }, []);

  return (
    <Select name="country">
      <SelectTrigger>
        <SelectValue placeholder={placeholderText || t("ChooseCountry")} />
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem
            key={country.cca3}
            value={country.name}
          >
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
