"use client"
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import CustomRegionDropdown from "../global/region-dropdown";
import { MainInterestDropdown } from "../global/main-interest-dropdown";
import { CountryDropdown } from "../global/countries-dropdown";
import { editedDataProps } from "./profile-side-nav-data";
import { useTranslations } from "next-intl";


type editProfileSideNavDataProps = {
  editedData: editedDataProps;
  setEditedData: React.Dispatch<React.SetStateAction<editedDataProps>>;
};

export const EditProfileSideNavData: React.FC<editProfileSideNavDataProps> = ({
  editedData,
  setEditedData,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSelectChange = (value: string, name: string, flag?: string) => {
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "country" ? { region: "", flag: flag || "" } : {}),
    }));
  };
  const t = useTranslations('Profile');

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div>
          <Label htmlFor="last_name" className="text-sm">
            Last Name
          </Label>
          <Input
            value={editedData.last_name}
            onChange={handleInputChange}
            name="last_name"
            placeholder="Last Name"
          />
        </div>
        <div>
          <Label htmlFor="name" className="text-sm">
            Name
          </Label>
          <Input
            value={editedData.name}
            onChange={handleInputChange}
            name="name"
            placeholder="First Name"
          />
        </div>
      </div>
      <Label htmlFor="country" className="text-sm">
        Country
      </Label>
      <CountryDropdown
        placeholderText={
          <span className="flex items-center gap-2">
            <Image
              src={editedData.flag}
              width={20}
              height={20}
              alt="country flag"
            />
            {editedData.country}
          </span>
        }
        onChange={handleSelectChange}
      />
      <Label htmlFor="region" className="text-sm">
        Region
      </Label>
      <CustomRegionDropdown
        placeholderText={editedData.region}
        country={editedData.country}
        onChange={handleSelectChange}
      />

      <Label htmlFor="main_field" className="text-sm">
        Main Interest
      </Label>
      <MainInterestDropdown
        placeholder={editedData.main_field}
        onChange={handleSelectChange}
        selectorName="main_field"
      />
    </div>
  );
};
