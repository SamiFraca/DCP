"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


type NavItemProps = {
  href: string;
  label: string;
}

export const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
  const urlPathname = usePathname();
  return (
    <li>
      <Link href={href} className={urlPathname === href ? "underline" : ""}>
        {label}
      </Link>
    </li>
  );
};
