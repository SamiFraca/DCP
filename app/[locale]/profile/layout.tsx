import { ReactNode } from "react";
import { UserProvider } from "@/context/user-context";
import { SideNav } from "@/components/profile/side-nav";

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
          <section>{children}</section>
        </div>
      </UserProvider>
    </>
  );
}
