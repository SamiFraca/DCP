"use client";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  Card,
  CarouselCard,
} from "@/components/ui/hover-cards-carousel";

export function CarouselHome() {
  const cards = data.map((card, index) => (
    <Card key={card.gifSrc} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl  mx-auto  ml-0 text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Together we grow.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const data: CarouselCard[] = [
  {
    titleKey: "cooperationTitle",
    gifSrc:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjNhbHJueHVrc2VhZTdreGZkOTV1YTY5dDk2OXR2bTEyY3N2ajJ3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oxHQBs0wvDvHzyq2s/giphy.gif",
    descriptionKey:"cooperation"
  },
  {
    titleKey: "contactNetworkTitle",
    gifSrc:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExamdqZGlzd2F4MXdhZWJrZTJnNXhkOHlpNzJhZDhwZzhuc2J4ajVrNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/gHNvtjU1e3sCAct8zd/giphy.gif",
    descriptionKey:"contactNetwork"
  },
  {
    titleKey: "ideasExpertiseTitle",
    gifSrc:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnEwaGphMzlhbzJoZ3p3OWFjYmIzNHdzcTJsdGtjejhsbW4wOHY3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4jHXZ9aIKFaUM/giphy.gif",
    descriptionKey:"ideasExpertise"
  },

  {
    titleKey: "existingProjectTitle",
    gifSrc:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWFhZ3R2ODRtOW5seDBkY2g1Mzd3bjc0OXhlYW81MDV4NW55OTE4diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TOTUxpxgTz7KRxJPn8/giphy.gif",
    descriptionKey:"existingProject"
  },
  {
    titleKey: "realWorldExperienceTitle",
    gifSrc:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGhyZWg4emt1Nnk4b3I0MHV5MWx1dzFwaGF0dG1naG5nc3A5ajFkYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qfridHRcLlMLMtWueu/giphy.gif",
    descriptionKey:"realWorldExperience"
  },
];
