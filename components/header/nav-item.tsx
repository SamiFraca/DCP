"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


type NavItemProps = {
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ href, onClick, children }) => {
  const urlPathname = usePathname();
  return (
      <Link href={href} className={urlPathname === href ? "underline" : ""} onClick={onClick}>
        {children}
      </Link>
  );
};

