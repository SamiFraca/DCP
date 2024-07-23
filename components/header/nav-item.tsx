"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


type NavItemProps = {
  href: string;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const NavItem: React.FC<NavItemProps> = ({ href, label, onClick }) => {
  const urlPathname = usePathname();
  return (
      <Link href={href} className={urlPathname === href ? "underline" : ""} onClick={onClick}>
        {label}
      </Link>
  );
};

