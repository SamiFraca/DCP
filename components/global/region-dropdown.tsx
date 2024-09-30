import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { RegionDropdown } from "react-country-region-selector";

type CustomRegionDropdownProps = {
  country: string;
  placeholderText?: string;
  onChange: (region: string, selectorName: string) => void;
};

export const CustomRegionDropdown: React.FC<CustomRegionDropdownProps> = ({
  country,
  placeholderText = "Select a region",
  onChange,
}) => {
  const [region, setRegion] = useState<string>("");

  const handleValueChange = (value: string) => {
    setRegion(value);
    onChange(value, "region");
  };

  return (
    <div className="relative">
      <RegionDropdown
        disableWhenEmpty={true}
        country={country}
        value={region}
        name="region"
        onChange={handleValueChange}
        classes={`w-full appearance-none bg-transparent border rounded-md px-4 py-2 h-10
            cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-input
          disabled:bg-gray-900 disabled:text-gray-500  disabled:border-gray-900 disabled:cursor-not-allowed disabled:opacity-50 `}
        defaultOptionLabel={placeholderText}
        blankOptionLabel="Choose a region"
      />
      <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
    </div>
  );
};

export default CustomRegionDropdown;
