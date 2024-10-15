import { userProjectData } from "@/app/api/profile/user/projects/route";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  title: string;
  author?: string;
  category?: string;
  description?: string | null;
  className?: string;
  users?: userProjectData[];
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  author,
  category,
  description,
  className = "",
  users,
}) => {
  return (
    <li
      className={cn(
        `border dark:border-gray-800 border-black bg-opacity-40 p-4 transition-transform hover:transform hover:scale-105 cursor-pointer`,
        className
      )}
    >
      <h4 className="font-bold">
        {title} {category ? "," + category : ""}
      </h4>
      <p>{description === "" ? "No description provided" : description}</p>
      {author && <p>{author}</p>}
      {users && (
        <ul className="flex mt-2">
          {users[0].map((user, index) => {
            return (
              <li key={index}>
                <Image
                  src={user.profile_image}
                  className="rounded-full"
                  alt={`${user.name}'s profile image`}
                  width={26}
                  height={26}
                />
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
};
