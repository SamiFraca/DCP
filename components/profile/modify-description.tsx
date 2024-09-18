import { FC, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/utils/supabase/client";

type ModifyDescriptionProps = {
  descriptionValue: string;
};

export const ModifyDescription: FC<ModifyDescriptionProps> = ({
  descriptionValue,
}) => {
  const [isShowAreaDescriptionEnabled, setIsShowAreaDescriptionEnabled] =
    useState<boolean>(false);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoadingCustomDescription, setIsLoadingCustomDescription] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string>(descriptionValue);
  const [isSuccess,setIsSuccess] = useState(false);

  const sendNewUserDescriptionData = async () => {
    const supabase = createClient();
    if (
      descriptionTextAreaRef.current?.value &&
      descriptionTextAreaRef.current.value.length <= 300
    ) {
      setIsLoadingCustomDescription(true);
      try {
        const { error } = await supabase.auth.updateUser({
          data: {
            description: descriptionTextAreaRef.current.value,
          },
        });

        if (error) {
          setError(error.message);
          setIsLoadingCustomDescription(false);
          return;
        } else {
          setDescription(descriptionTextAreaRef.current.value);
          setIsShowAreaDescriptionEnabled(false);
          setIsSuccess(true);
          setError(null); 
        }
        setIsLoadingCustomDescription(false);
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred.");
      }
    } else {
      setError("Description is required and should not exceed 300 characters.");
    }
  };

  return (
    <div className="mb-8">
      <div className="flex gap-4 items-center mb-4">
        <p className="text-xl" id="description-header">
          About yourself
        </p>
        <Button
          variant={"ghost"}
          className="dark:text-gray-400 p-2"
          aria-label="Edit description"
          onClick={() => {
            setIsShowAreaDescriptionEnabled(!isShowAreaDescriptionEnabled);
            setError(null); // Clear error message when toggling edit mode
          }}
        >
          <Pencil width={20} height={20} aria-hidden="true" />
        </Button>
      </div>
      {isShowAreaDescriptionEnabled ? (
        <>
          <Textarea
            placeholder="Type your new description here"
            ref={descriptionTextAreaRef}
            aria-labelledby="description-header"
            aria-invalid={!!error}
            aria-describedby="description-error"
          />
          <div className="flex gap-4">
            <Button
              className="mt-4"
              variant="destructive"
              onClick={() => setIsShowAreaDescriptionEnabled(false)}
              aria-label="Cancel editing description"
            >
              Cancel
            </Button>
            <Button
              className="mt-4"
              variant="default"
              onClick={sendNewUserDescriptionData}
              disabled={isLoadingCustomDescription}
              aria-label="Save new description"
            >
              Save
            </Button>
          </div>
          {isSuccess &&(
            <div>Description updated succesfully</div>
          )}
          {error && (
            <p id="description-error" className="text-red-500 mt-4">
              {error}
            </p>
          )}
        </>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
};