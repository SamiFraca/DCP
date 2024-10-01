import { ReactNode } from "react";
import { UserProvider } from "@/context/user-context";
import { SideNav } from "@/components/profile/side-nav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | Research Hub",
};

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <div className="flex md:gap-20 md:mt-12 md:flex-row flex-col">
        <SideNav />
        <section className="w-full">{children}</section>
      </div>
    </>
  );
}
