import Link from "next/link";

const footerLinks = [
  { href: "about", title: "About Us" },
  { href: "services", title: "Services" },
  { href: "careers", title: "Careers" },
  { href: "blog", title: "Blog" },
  { href: "contact", title: "Contact Us" },
  { href: "privacy", title: "Privacy Policy" },
  { href: "terms", title: "Terms of Service" },
  { href: "faq", title: "FAQ" },
];

export const Footer: React.FC = () => {

  return (
    <footer className="w-full mt-12 flex flex-col justify-center dark:text-gray-400 text-gray-600 ">
      <div className="text-center p-4 flex gap-4 justify-center  text-sm mt-8">
        ResearchHub
        <span className="w-1 h-auto border-r"></span>© 2024 - PRESENT
      </div>
      <ul className="flex gap-4 w-full justify-center mt-4 mb-4">
        {footerLinks.map(({ href, title }) => (
          <li key={href}>
            <Link
              href={`/${href}`}
              className="dark:hover:text-white hover:text-black text-sm flex gap"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};
