"use client";
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import Marquee from "@/components/ui/marquee";
import { AnimatedListNotifications } from "./animated-list-notifications";
import { AnimatedBeamWrapper } from "./animated-beam-wrapper";
import InView from "../transitions/in-view";

const projects = [
  {
    name: "Project Tracker",
    body: "A web-based project management tool to help teams collaborate and track project progress. Built using Next.js and Supabase for real-time updates.",
  },
  {
    name: "Expense Manager",
    body: "A financial app that tracks income and expenses. It features real-time data visualization and uses React with Firebase for authentication and cloud storage.",
  },
  {
    name: "Portfolio Website",
    body: "A personal portfolio site for showcasing design and development projects. Created using HTML, CSS, and JavaScript with a focus on responsive design.",
  },
  {
    name: "API Gateway",
    body: "A microservice architecture that aggregates multiple APIs into a unified gateway. Built with Node.js and Express, and deployed using Docker.",
  },
  {
    name: "Chat Application",
    body: "A real-time chat application with WebSocket integration, featuring group and one-on-one messaging. Built using React and Socket.io.",
  },
];

const features = [
  {
    Icon: FileTextIcon,
    name: "Create your project",
    description: "Create your own project and share it to the world.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {projects.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: <AnimatedListNotifications />,
  },
  {
    Icon: Share2Icon,
    name: "Communication",
    description: "Centralized communication for each project",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2 relative w-full ",
    background: (
      <AnimatedBeamWrapper className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Time management",
    description: "Use our tools to set milestones.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Calendar
        mode="single"
        selected={new Date(2022, 4, 11, 0, 0, 0)}
        className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
      />
    ),
  },
];

export function BentoWrapper() {
  return (
    <BentoGrid className="mt-24">
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
