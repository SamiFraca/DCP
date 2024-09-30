"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useTranslations } from "next-intl";
import { Loader } from "../loader/loader";
import { LoaderCircle } from "lucide-react";

type ModalPopupProps<T = void> = {
  isOpen: boolean;
  onClose: () => T | void;
  children: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  ButtonAcceptText?: string;
  onAccept?: () => T | void;
};

export const ModalPopup: React.FC<ModalPopupProps> = ({
  isOpen,
  onClose,
  children,
  dialogDescription,
  dialogTitle,
  ButtonAcceptText,
  onAccept,
}) => {
  const t = useTranslations();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAcceptClick = async () => {
    if (onAccept) {
      setIsDisabled(true);
      await onAccept();
      onClose();
      setIsDisabled(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
        <div className="flex gap-4" role="group">
          <Button
            variant={"default"}
            onClick={handleAcceptClick}
            disabled={isDisabled}
          >
            {isDisabled ? (
              <LoaderCircle className="w-6 h-6 animate-rotate mr-2" />
            ) : (
              ""
            )}
            {ButtonAcceptText ?? t("accept")}
          </Button>
          <Button
            variant="destructive"
            onClick={onClose}
            aria-describedby="cancel-logout"
          >
            {t("cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
