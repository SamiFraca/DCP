import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useTranslations } from "next-intl";

type ModalPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  ButtonAcceptText?:string;
};

export const ModalPopup: React.FC<ModalPopupProps> = ({
  isOpen,
  onClose,
  children,
  dialogDescription,
  dialogTitle,
  ButtonAcceptText
}) => {
  const t = useTranslations();
  
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
            variant="destructive"
            onClick={onClose}
            aria-describedby="cancel-logout"
          >
            {t("cancel")}
          </Button>
          <Button variant={"default"}>{ButtonAcceptText ?? t('Accept')}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
