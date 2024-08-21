"use client";
import { useState } from "react";
import { ModalPopup } from "../popup-modal";
import { Button } from "../ui/button";
import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import { fetchUserProjects } from "@/lib/fetchSupabaseData";

export const  CustomPinProjectsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const t = useTranslations();
  const test =  fetchUserProjects();

  return (
    <>
      <Button
        variant={"ghost"}
        className="dark:text-gray-400"
        onClick={() => {
          setIsModalOpen(!isModalOpen);
        }}
      >
        <Link />
      </Button>

      <ModalPopup
        dialogTitle={t('Profile.editPinned')}
        isOpen={isModalOpen}
        onClose={closeModal}
        ButtonAcceptText={t('save')}
      >
        <p>test</p>
      </ModalPopup>
    </>
  );
};
