import ProjectList from "@/components/project/project-list";
import { SearchInput } from "@/components/search/search-input";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Projects"
};
const Projects = () => {
  return (
    <>
      <div className="flex w-ful mt-12 flex-col md:flex-row">
        <h1 className="text-5xl roboto grow mb-12 md:mb-0">Projects</h1>
        <SearchInput/>
      </div>
      <ProjectList />
    </>
  );
};

export default Projects;
