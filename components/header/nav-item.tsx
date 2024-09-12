import Link from "next/link";


type NavItemProps = {
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ href, onClick, children }) => {
  return (
      <Link href={href}  className="underline-animation" onClick={onClick}>
        {children}
      </Link>
  );
};

