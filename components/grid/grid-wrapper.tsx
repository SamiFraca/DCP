import { cn } from "@/lib/utils";

type GridWrapperType = {
  children: React.ReactNode;
  className?: string;
};

export const GridWrapper: React.FC<GridWrapperType> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4 justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
};
