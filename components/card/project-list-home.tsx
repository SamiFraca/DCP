import React from 'react';
import { ProjectCard } from './project-card';

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
  {
    title: "Online Event Management System",
    author: "EventPlanner",
    category: "Event Planning",
    description: "Organize and manage events with ease using this platform"
  }
];


const ProjectList = () => (
  <ul className="flex flex-wrap gap-4 mt-10">
    {projectData.map((project, index) => (
      <ProjectCard
        key={index}
        title={project.title}
        author={project.author}
        category={project.category}
        description={project.description}
      />
    ))}
  </ul>
);

export default ProjectList;