"use client";

import React, { useState } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ukFlag from "@/assets/img/uk_flag.png";
import esFlag from "@/assets/img/spain_flag.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setLanguage } from "@/features/languageSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export type OptionProps = {
  country: string;
  code: string;
  flag: StaticImageData;
};
const LangSwitcher: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const language = useSelector((state: RootState) => state.language);

  const router = useRouter();
  const pathname = usePathname();

  const [isOptionsExpanded, setIsOptionsExpanded] = useState(false);
  const options: OptionProps[] = [
    { country: "English", code: "en", flag: ukFlag },
    { country: "Spanish", code: "es", flag: esFlag },
  ];
  const setOption = (option: OptionProps) => {
    dispatch(setLanguage(option));
    const pathSegments = pathname.split("/");
    if (pathSegments.length > 1) {
      pathSegments[1] = option.code;
    } else {
      pathSegments.unshift(option.code);
    }
    const newPathname = pathSegments.join("/");
    router.push(newPathname);
  };

  return (
    <div className="">
      <div className="relative text-lg w-48">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button
              className=" justify-between  gap-2 border border-gray-500 text-white focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              onClick={() => setIsOptionsExpanded(!isOptionsExpanded)}
              onBlur={() => setIsOptionsExpanded(false)}
            >
              <Image
                key={language.code}
                src={language.flag}
                alt={language.country}
                width={20}
                height={20}
              />
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`h-4 w-4 transform transition-transform duration-200 ease-in-out ${
                  isOptionsExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className=" divide-y rounded-lg shadow-lg overflow-hidden">
            {options.map((option, index) => (
              <DropdownMenuItem
                key={index}
                className="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 flex items-center cursor-pointer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOption(option);
                }}
                onClick={() => setIsOptionsExpanded(false)}
              >
                <Image
                  src={option.flag}
                  width={"20"}
                  height={"20"}
                  alt="country flag"
                />
                &nbsp;&nbsp;{option.country}
                {pathname.includes(`/${option.code}`) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-5 text-green-500 ml-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default LangSwitcher;
