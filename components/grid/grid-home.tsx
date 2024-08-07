import React from 'react';
import { FlaskConical, Cpu, Trophy, Palette, BriefcaseBusiness, Calculator, Cog, Megaphone } from 'lucide-react'; // Update the import path as needed
import { useTranslations } from 'next-intl';
import { GridCard } from './grid-card';
import { GridWrapper } from './grid-wrapper';


const categories = [
    {
      icon: <FlaskConical width={100} height={100} />,
      textKey: "CategoryGrid.Science"
    },
    {
      icon: <Cpu width={100} height={100} />,
      textKey: "CategoryGrid.IT"
    },
    {
      icon: <Trophy width={100} height={100} />,
      textKey: "CategoryGrid.Sports"
    },
    {
      icon: <Palette width={100} height={100} />,
      textKey: "CategoryGrid.Arts"
    },
    {
      icon: <BriefcaseBusiness width={100} height={100} />,
      textKey: "CategoryGrid.Business"
    },
    {
      icon: <Calculator width={100} height={100} />,
      textKey: "CategoryGrid.Mathematics"
    },
    {
      icon: <Cog width={100} height={100} />,
      textKey: "CategoryGrid.Engineering"
    },
    {
      icon: <Megaphone width={100} height={100} />,
      textKey: "CategoryGrid.Communication"
    }
  ];



export const GridHome = () => {
  const t  = useTranslations('Home');

  return (
    <GridWrapper className='mt-12'>
      {categories.map((category, index) => (
        <GridCard
          key={index}
          icon={category.icon}
          text={t(category.textKey)}
        />
      ))}
    </GridWrapper>
  );
};

export default GridHome;