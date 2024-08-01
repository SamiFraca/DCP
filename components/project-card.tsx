type ProjectCardProps = {
  title: string;
  author: string;
  category: string;
  description: string;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  author,
  category,
  description,
}) => {
  return (
    <a className="border  dark:border-gray-600 border-black bg-opacity-40 p-4 rounded-md transition-transform hover:transform hover:scale-105 cursor-pointer" href="">
      <h4 className="font-bold">{title}, {category}</h4>
      <p>{description}</p>
      <p>{author}</p>
    </a>
  );
};