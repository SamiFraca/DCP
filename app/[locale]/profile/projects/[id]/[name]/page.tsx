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
      <h1 className="text-6xl font-bold sm:text-4xl text-start mb-6">
        {decodedName}
      </h1>
    </div>
  );
};

export default ProjectDetail;
