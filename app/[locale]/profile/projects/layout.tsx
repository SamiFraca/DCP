import { ReactNode } from "react";
import { Metadata } from "next";
import { ToggleLayoutProvider } from "@/context/profile/projects/toggle-layout-projects";

export const metadata: Metadata = {
  title: "Profile | Projects",
};

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ToggleLayoutProvider>
      <section className="w-full">{children}</section>
    </ToggleLayoutProvider>
  );
}
