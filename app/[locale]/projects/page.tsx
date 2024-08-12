import ProjectList from "@/components/project/project-list";
import { SearchInput } from "@/components/search/search-input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Projects",
};
const Projects = () => {
  return (
    <>
      <div className="flex w-ful mt-12 flex-col md:flex-row">
        <div className="grow flex gap-4 items-baseline flex-col md:flex-row mb-12">
          <h1 className="text-5xl roboto md:mb-0">Projects</h1>
          <Button variant={"ghost"} className="dark:text-gray-400">
            <Link href='profile/create-project'>
            Create project
            </Link>
            <Plus className="dark:text-gray-400 ml-2 " />
          </Button>
        </div>
        <SearchInput />
      </div>
      <ProjectList />
    </>
  );
};

export default Projects;
