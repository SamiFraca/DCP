"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import Image from "next/image";

interface Item {
  name: string;
  description: string;
  profileIconHref: string;
  color: string;
  time: string;
}

let notifications = [
  {
    name: "Emily Wraith",
    description: "Sent you a message.",
    time: "15m ago",
    profileIconHref: "https://mighty.tools/mockmind-api/content/human/44.jpg",
    color: "#00C9A7",
  },
  {
    name: "Chief Keef",
    description: "Signed up for your app.",
    time: "10m ago",
    profileIconHref: "https://mighty.tools/mockmind-api/content/human/7.jpg",
    color: "#FFB800",
  },
  {
    name: "Mike Johnson",
    description: "Sent you a message.",
    time: "5m ago",
    profileIconHref: "https://mighty.tools/mockmind-api/content/human/61.jpg",
    color: "#FF3D71",
  },
  {
    name: "Trae Young",
    description: "Joined your event.",
    time: "2m ago",
    profileIconHref: "https://mighty.tools/mockmind-api/content/human/27.jpg",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();

const Notification = ({ name, description, profileIconHref, color, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <Image className="text-lg rounded-md" src={profileIconHref}  alt="" width={40} height={40}/>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function AnimatedListNotifications({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105",
        className,
      )}
    >
      <AnimatedList delay={2000} className="" >
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
