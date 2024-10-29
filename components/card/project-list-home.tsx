import React from 'react';
import { HoverEffect } from '../ui/card-hover-effect';
import { randomUUID } from 'crypto';

const projectData = [
  {
    title: "Python chatbot",
    author: "Mesmer",
    category: "Computer & IT",
    description: "Python chatbot for discord to play games"
  },
  {
    title: "Travel Blog Website",
    author: "Wanderlust",
    category: "Travel",
    description: "Share your travel experiences and tips with fellow travelers"
  },
  {
    title: "Web Development Course",
    author: "CodeGeek",
    category: "Education",
    description: "Learn HTML, CSS, and JavaScript in this interactive course"
  },
  {
    title: "Mobile App for Fitness",
    author: "FitTech",
    category: "Health & Wellness",
    description: "Track your fitness progress and get personalized workout routines"
  },
  {
    title: "E-commerce Platform",
    author: "ShopifyMaster",
    category: "Business",
    description: "Build your own online store with customizable features"
  },
  {
    title: "Recipe Sharing App",
    author: "FoodieDev",
    category: "Food & Drink",
    description: "Discover and share delicious recipes with other food enthusiasts"
  },
];


const ProjectListHome = () => (
  <div className="flex flex-wrap gap-4 mt-10">
     <HoverEffect items={projectData} key={randomUUID()}  />
  </div>
);

export default ProjectListHome;