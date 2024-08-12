import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";
import { signOutUser } from "@/lib/auth";
import { LoaderCircle } from "lucide-react";
export const LogOutModalPopup: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const logoutHandler = () => {
    setIsLoading(true);
    signOutUser();
  };
  const t = useTranslations();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            You will log out from your account
          </DialogDescription>
        </DialogHeader>
        <div
          className="flex gap-4"
          role="group"
          aria-labelledby="logout-actions"
        >
          <Button
            variant="destructive"
            onClick={onClose}
            aria-describedby="cancel-logout"
          >
            {t("cancel")}
          </Button>
          <Button
            variant={"default"}
            onClick={() => logoutHandler()}
            disabled={isLoading}
            aria-describedby="logout-action"
          >
            {isLoading ? (
              <LoaderCircle className="w-6 h-6 animate-rotate mr-2" />
            ) : (
              ""
            )}
            {t("Header.logout")}
          </Button>
        </div>
        <VisuallyHidden id="logout-actions">Logout actions</VisuallyHidden>
        <VisuallyHidden id="cancel-logout">Cancel logout</VisuallyHidden>
        <VisuallyHidden id="logout-action">Logout</VisuallyHidden>
      </DialogContent>
    </Dialog>
  );
};
