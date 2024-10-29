import { ReactNode, Suspense } from "react";
import { SideNav } from "@/components/profile/side-nav";
import { Metadata } from "next";
import Loading from "../loading";

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
      <div className="flex md:gap-20 md:mt-12 md:flex-row flex-col w-full px-4">
        <SideNav />
        <Suspense fallback={<Loading />}>
          <section className="w-full">{children}</section>
        </Suspense>
      </div>
    </>
  );
}
