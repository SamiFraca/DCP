import { ReactNode } from "react";

type SuccessNotificationProps<T extends ReactNode> = {
  successMessage: T;
};

export const SuccessNotification = <T extends ReactNode>({
  successMessage,
}: SuccessNotificationProps<T>) => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-center p-2 rounded-b-md transition-transform duration-500 notification w-max z-20">
      {successMessage}
    </div>
  );
};
