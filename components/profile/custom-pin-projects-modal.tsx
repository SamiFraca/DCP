"use client";
import React, { useState, useCallback } from "react";
import { ModalPopup } from "../global/popup-modal";
import { Button } from "../ui/button";
import { Link, LoaderCircle, Pin } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  fetchUserProjects,
  getPinnedProjectsFromUser,
  saveUserPinnedProjects,
  UserSpecificProject,
} from "@/lib/fetchSupabaseData";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  setUserPinnedProjects,
  setUserPinnedProjectsError,
  setUserPinnedProjectsLoading,
} from "@/features/pinnedProjectsSlice";

export type PinnedProject = {
  id: number;
  isPinned: boolean;
};

export const CustomPinProjectsModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<UserSpecificProject[]>([]);
  const [pinnedProjects, setPinnedProjects] = useState<PinnedProject[]>([]);
  const dispatch: AppDispatch = useDispatch();

  const { userPinnedProjectsError, userPinnedProjectsLoading } = useSelector(
    (state: RootState) => state.pinnedProjects
  );

  const handleTogglePin = (projectId: number) => {
    setPinnedProjects((prev) => {
      const updatedProjects = prev.map((pinnedProject) =>
        pinnedProject.id === projectId
          ? { ...pinnedProject, isPinned: !pinnedProject.isPinned }
          : pinnedProject
      );

      return updatedProjects;
    });
  };

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
      const flattenedProjects = data?.[0] ? [data[0]] : [];
      setProjects(flattenedProjects);

      setPinnedProjects(() => {
        return flattenedProjects.flatMap((userProject) =>
          userProject.user_projects.flatMap((userProject) => ({
            id: userProject.projects.id,
            isPinned: userProject.is_pinned,
          }))
        );
      });
    }
    setLoading(false);
  }, []);

  const handleButtonClick = () => {
    setIsModalOpen(true);
    fetchProjects();
  };
  
  const handleSaveUserPinnedProjects = async () => {
    try {
      dispatch(setUserPinnedProjectsLoading(true));

      await saveUserPinnedProjects(pinnedProjects);
      const { data, error } = await getPinnedProjectsFromUser();

      if (error) {
        throw new Error("Failed to fetch projects");
      }

      if (data) {
        dispatch(setUserPinnedProjects(data));
      }
    } catch (error) {
      console.error(error);
      dispatch(setUserPinnedProjectsError("Failed to fetch or save projects"));
    } finally {
      dispatch(setUserPinnedProjectsLoading(false));
    }
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
        onAccept={() => handleSaveUserPinnedProjects()}
      >
        {loading && <LoaderCircle className="w-6 h-6 animate-rotate mr-2" />}
        {projects.length > 0 && !loading
          ? projects.map((item, itemIndex) => (
              <ul className="flex flex-col gap-4" key={itemIndex}>
                {item.user_projects.map((userProject, projectIndex) => {
                  const isPinned = pinnedProjects.some(
                    (pinnedItem) =>
                      pinnedItem.id === userProject.projects.id &&
                      pinnedItem.isPinned
                  );

                  return (
                    <li
                      key={projectIndex}
                      className="border p-2 rounded-md hover:scale-105 cursor-pointer transition-transform relative"
                    >
                      <button
                        className="w-full text-start"
                        onClick={() => handleTogglePin(userProject.projects.id)}
                      >
                        {isPinned && (
                          <span
                            key={userProject.projects.id}
                            className="absolute right-0 w-6 h-6 top-0 bg-green-600 flex items-center justify-center rounded-bl-md rounded-tr-md"
                          >
                            <Pin width={20} height={20} />
                          </span>
                        )}
                        <p>{userProject.projects.id}</p>
                        <h1>{userProject.projects.name}</h1>
                        <p>{userProject.projects.description}</p>
                        <p>Category: {userProject.projects.category}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ))
          : error && <div>Error: {error}</div>}
      </ModalPopup>
    </>
  );
};

export default CustomPinProjectsModal;
