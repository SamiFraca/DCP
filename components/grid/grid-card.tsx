import Link from "next/link";

type GridCardProps = {
  icon: React.ReactNode;
  text: string;
};

export const GridCard: React.FC<GridCardProps> = ({ icon, text }) => {
  return (
    <Link className="flex flex-col p-12  border-gray-800 border w-[20rem] items-center justify-center gap-4 cursor-pointer hover:card-hover" href="" title={text}>
      {icon}
      <p className="text-xl">{text}</p>
    </Link>
  );
};
