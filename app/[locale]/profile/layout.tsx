import { ReactNode } from "react";
import { UserProvider } from "@/context/user-context";

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <>
      <UserProvider>
        <aside>
          <nav>{/* Profile navigation links */}</nav>
        </aside>
        <section>{children}</section>
      </UserProvider>
    </>
  );
}
