"use client";
import React, { useState, useCallback } from "react";
import { ModalPopup } from "../popup-modal";
import { Button } from "../ui/button";
import { Link, LoaderCircle, Pin } from "lucide-react";
import { useTranslations } from "next-intl";
import { fetchUserProjects, UserPinnedProject } from "@/lib/fetchSupabaseData";

export const CustomPinProjectsModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<UserPinnedProject[]>([]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const t = useTranslations();

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await fetchUserProjects();

    if (error) {
      setError("Failed to fetch projects");
      console.error(error);
    } else {
      // Flatten the project arrays and set state
      const flattenedProjects =
        data?.[0]?.user_projects.flatMap(
          (userProject) => userProject.projects
        ) || [];
      setProjects(flattenedProjects);
    }
    setLoading(false);
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(true);
    fetchProjects();
  };

  return (
    <>
      <Button
        variant={"ghost"}
        className="dark:text-gray-400"
        onClick={handleButtonClick}
      >
        <Link />
      </Button>

      <ModalPopup
        dialogTitle={t("Profile.editPinned")}
        isOpen={isModalOpen}
        onClose={closeModal}
        ButtonAcceptText={t("save")}
      >
        {loading && <LoaderCircle className="w-6 h-6 animate-rotate mr-2" />}
        {error && <div>Error: {error}</div>}
        {projects.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {projects.map((project, index) => (
              <>
                <li key={index} className="border p-2 rounded-md hover:scale-105 cursor-pointer transition-transform relative">
                   <span className="absolute right-0 w-6 h-6 top-0 bg-green-600 flex items-center justify-center rounded-md"><Pin width={20} height={20}/></span>
                  <p>{project.id}</p>
                  <h1>{project.name}</h1>
                  <p>{project.description}</p>
                  <p>Category: {project.category}</p>
                </li>
              </>
            ))}
          </ul>
        ) : (
          <p>No projects available</p>
        )}
      </ModalPopup>
    </>
  );
};

export default CustomPinProjectsModal;
