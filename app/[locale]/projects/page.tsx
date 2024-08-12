import ProjectList from "@/components/project/project-list";
import { SearchInput } from "@/components/search/search-input";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Projects"
};
const Projects = () => {
  return (
    <>
      <div className="flex w-ful mt-12">
        <h1 className="text-5xl roboto grow">Projects</h1>
        <SearchInput/>
      </div>
      <ProjectList />
    </>
  );
};

export default Projects;
