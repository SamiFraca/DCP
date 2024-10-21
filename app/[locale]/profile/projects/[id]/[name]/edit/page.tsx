import Loading from "@/app/[locale]/loading";
import { ProjectEdit } from "@/components/project/project-edit";
import { Suspense } from "react";

export const EditProfileProject = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProjectEdit />
    </Suspense>
  );
};
export default EditProfileProject;
