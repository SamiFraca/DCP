type GridWrapperType = {
  children: React.ReactNode;
  className?: string; 
};

export const GridWrapper: React.FC<GridWrapperType> = ({ children, className }) => {
  const classNames = `flex flex-wrap gap-4 justify-center items-center ${className}`.trim(); 
  return <div className={classNames}>{children}</div>;
};
