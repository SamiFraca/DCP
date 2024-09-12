import Link from "next/link";

type ProjectCardProps = {
  title: string;
  author?: string;
  category?: string;
  description: string;
  className?: string; 
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  author,
  category,
  description,
  className = ""
}) => {
  return (
    <li
      className={`border dark:border-gray-800 border-black bg-opacity-40 p-4 transition-transform hover:transform hover:scale-105 cursor-pointer ${className}`}
    >
      <Link href="">
        <h4 className="font-bold">
          {title} {category ? "," + category : ""}
        </h4>
        <p>{description === "" ? "No description provided" : description}</p>
        {author && <p>{author}</p>}
      </Link>
    </li>
  );
};