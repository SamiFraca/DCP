import React from "react";

type SliderCardProps = {
  text: string;
  icon: React.ReactNode;
  description: string;
};

export const SliderCard: React.FC<SliderCardProps> = ({
  text,
  icon,
  description,
}) => {
  return (
    <div className="border-2 border-gray-800 p-4 rounded-md w-[450px] flex-shrink-0">
      <div className="flex gap-4 items-center mb-4">
        <h3 className="text-xl">{text}</h3> {icon}
      </div>
      <p>{description}</p>
    </div>
  );
};
