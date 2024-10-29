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
    <Card key={card.imgSrc} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
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
    imgSrc: "https://images.unsplash.com/photo-1588590560438-5e27fe3f6b71?q=80&w=2928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descriptionKey:"cooperation"
  },
  {
    titleKey: "ideasExpertiseTitle",
    gifSrc:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnEwaGphMzlhbzJoZ3p3OWFjYmIzNHdzcTJsdGtjejhsbW4wOHY3aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4jHXZ9aIKFaUM/giphy.gif",
    imgSrc: "https://plus.unsplash.com/premium_photo-1685287732761-e5991df75d78?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descriptionKey:"ideasExpertise"
  },
  {
    titleKey: "contactNetworkTitle",
    gifSrc:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExamdqZGlzd2F4MXdhZWJrZTJnNXhkOHlpNzJhZDhwZzhuc2J4ajVrNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/gHNvtjU1e3sCAct8zd/giphy.gif",
    imgSrc: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descriptionKey:"contactNetwork"
  },

  {
    titleKey: "existingProjectTitle",
    gifSrc:
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWFhZ3R2ODRtOW5seDBkY2g1Mzd3bjc0OXhlYW81MDV4NW55OTE4diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TOTUxpxgTz7KRxJPn8/giphy.gif",
    imgSrc: "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    descriptionKey:"existingProject"
  },
];
