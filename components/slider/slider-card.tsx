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
    <div className=" border-gray-800 p-4 rounded-md md:w-[28.125rem] w-[20rem] flex-shrink-0   dark:hover:[background:linear-gradient(45deg,hsl(var(--background)),hsl(var(--background)),hsl(var(--background)))_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box]  border-2 dark:hover:border-transparent  animate-border">
      <div className="flex gap-4 items-center mb-4">
        <h3 className="text-xl">{text}</h3> {icon}
      </div>
      <p>{description}</p>
    </div>
  );
};
