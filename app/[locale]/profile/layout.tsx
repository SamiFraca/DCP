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
      <UserProvider>
        <div className="flex gap-20 mt-12" >
          <SideNav/>
          <section className="w-full">{children}</section>
        </div>
      </UserProvider>
    </>
  );
}
