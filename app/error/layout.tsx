import { ReactNode, Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error page",
};

export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <section className="w-full">{children}</section>
    </>
  );
}
