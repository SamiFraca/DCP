import Loading from "@/app/[locale]/loading";
import { ProjectEdit } from "@/components/project/project-edit";
import { Suspense } from "react";

export default function EditProfileProject() {
  return (
    <Suspense fallback={<Loading />}>
      <ProjectEdit />
    </Suspense>
  );
}