import React from 'react';
import { Handshake, Lightbulb, Network, Rocket } from 'lucide-react'; 
import { useTranslations } from 'next-intl';
import { SliderWrapper } from './slider-wrapper';
import { SliderCard } from './slider-card';

const sliderData = [
  {
    textKey: "cooperationTitle",
    descriptionKey: "cooperation",
    icon: <Handshake />
  },
  {
    textKey: "ideasExpertiseTitle",
    descriptionKey: "ideasExpertise",
    icon: <Lightbulb />
  },
  {
    textKey: "contactNetworkTitle",
    descriptionKey: "contactNetwork",
    icon: <Network />
  },
  {
    textKey: "existingProjectTitle",
    descriptionKey: "existingProject",
    icon: <Rocket />
  }
];


const SliderListHome = () => {
  const t  = useTranslations('Home');

  return (
    <SliderWrapper>
      {sliderData.map((slide, index) => (
        <SliderCard
          key={index}
          text={t(slide.textKey)}
          description={t(slide.descriptionKey)}
          icon={slide.icon}
        />
      ))}
    </SliderWrapper>
  );
};

export default SliderListHome;