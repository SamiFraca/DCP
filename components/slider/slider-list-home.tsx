import React from "react";
import { Handshake, Lightbulb, Network, Rocket } from "lucide-react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const sliderData = [
  {
    textKey: "cooperationTitle",
    descriptionKey: "cooperation",
    icon: <Handshake />,
  },
  {
    textKey: "ideasExpertiseTitle",
    descriptionKey: "ideasExpertise",
    icon: <Lightbulb />,
  },
  {
    textKey: "contactNetworkTitle",
    descriptionKey: "contactNetwork",
    icon: <Network />,
  },
  {
    textKey: "existingProjectTitle",
    descriptionKey: "existingProject",
    icon: <Rocket />,
  },
];

const SliderListHome = () => {
  return (
    <div className="rounded-md flex flex-col antialiased bg-white dark:bg-background dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={sliderData}
        direction="right"
        speed="slow"
      />
    </div>
  );
};

export default SliderListHome;
