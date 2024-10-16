
import { ProjectDetails } from "@/components/project/project-details";

export async function generateMetadata({
  params,
}: {
  params: { id: string; name: string };
}) {
  const { name } = params;

  const decodedName = decodeURIComponent(name);

  return {
    title: decodedName,
    description: `Details about the project: ${decodedName}`,
  };
}

const ProjectDetail = async ({
  params,
}: {
  params: { id: string; name: string };
}) => {
  const decodedName = decodeURIComponent(params.name);

  return (
    <div>
      <ProjectDetails name={decodedName} id={params.id} mode="private" />
    </div>
  );
};

export default ProjectDetail;
