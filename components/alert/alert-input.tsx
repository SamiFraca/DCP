import React from "react";

type AlertVariant = "error" | "info" | "warning";

interface AlertInputProps {
  variant: AlertVariant;
  message?: string;
}

const variantStyles = {
  error: {
    container:
      "bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100",
    icon: "text-red-600",
    defaultMessage: "Error - Something went wrong!",
  },
  info: {
    container:
      "bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100",
    icon: "text-blue-600",
    defaultMessage: "Info - Here is some information.",
  },
  warning: {
    container:
      "bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100",
    icon: "text-yellow-600",
    defaultMessage: "Warning - Be careful!",
  },
};

export const AlertInput: React.FC<AlertInputProps> = ({ variant, message }) => {
  const styles = variantStyles[variant];

  return (
    <div
      role="alert"
      className={`${styles.container} p-2 rounded-lg flex items-center transition  ease-in-out transform alert-notification`}
    >
      <svg
        stroke="currentColor"
        viewBox="0 0 24 24"
        fill="none"
        className={`h-5 w-5 flex-shrink-0 mr-2 ${styles.icon}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <p className="text-xs font-semibold">
        {message || styles.defaultMessage}
      </p>
    </div>
  );
};
