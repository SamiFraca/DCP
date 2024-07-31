type sliderWrapperProps = {
  children: React.ReactNode;
};
export const SliderWrapper: React.FC<sliderWrapperProps> = ({ children }) => {
  return (
    <div className="relative  overflow-hidden mt-12 roboto">
      <ul className="flex flex-nowrap gap-4 overflow-auto no-scrollbar">{children}</ul>
      <div className="gradient-overlay overflow-auto"></div>
    </div>
  );
};

