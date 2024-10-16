"use client";

import { Button } from "@/components/ui/button";
import { useLayout } from "@/context/profile/projects/toggle-layout-projects";
import { LayoutGrid, RectangleHorizontal } from "lucide-react";

export const ToggleProjectLayout = () => {
  const { isGrid, toggleLayout } = useLayout();

  return (
    <div className="flex items-center justify-end mb-4">
      <Button
        onClick={toggleLayout}
        variant={isGrid === false ? "secondary" : "ghost"}
      >
        <RectangleHorizontal />
      </Button>
      <Button onClick={toggleLayout} variant={isGrid ? "secondary" : "ghost"}>
        <LayoutGrid />
      </Button>
    </div>
  );
};
