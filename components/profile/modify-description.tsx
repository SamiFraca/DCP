'use client'
import { FC, useRef, useState } from "react";
import { Button } from "../ui/button";
import { LoaderCircle, Pencil } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { createClient } from "@/utils/supabase/client";

import { updateUserDescriptionUserTable } from "@/lib/fetchSupabaseData";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

type ModifyDescriptionProps = {
  descriptionValue: string;
};
const SuccessNotificationComponent = dynamic(() => import('@/components/global/success-notification'));

export const ModifyDescription: FC<ModifyDescriptionProps> = ({
  descriptionValue,
}) => {
  const [isShowAreaDescriptionEnabled, setIsShowAreaDescriptionEnabled] =
    useState<boolean>(false);
  const descriptionTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoadingCustomDescription, setIsLoadingCustomDescription] =
    useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string>(descriptionValue);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendNewUserDescriptionData = async () => {
    const supabase = createClient();
    const descriptionValue = descriptionTextAreaRef.current?.value;

    if (!descriptionValue || descriptionValue.length > 300) {
      setError("Description is required and should not exceed 300 characters.");
      return;
    }

    setIsLoadingCustomDescription(true);
    setError(undefined); 

    try {
      const { error: authError } = await supabase.auth.updateUser({
        data: { description: descriptionValue },
      });

      const { error: userTableError } = await updateUserDescriptionUserTable(
        descriptionValue
      );

      if (authError || userTableError) {
        setError(authError?.message || userTableError);
        return;
      }

      setDescription(descriptionValue);
      setIsShowAreaDescriptionEnabled(false);
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoadingCustomDescription(false);
    }
  };
  const t = useTranslations();
  return (
    <div className="mb-8">
      <div className="flex gap-4 items-center mb-4">
        <p className="text-xl" id="description-header">
          {t('Profile.aboutYourself')}
        </p>
        <Button
          variant={"ghost"}
          className="p-2"
          aria-label="Edit description"
          onClick={() => {
            setIsShowAreaDescriptionEnabled(!isShowAreaDescriptionEnabled);
            setError(undefined);
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
            defaultValue={descriptionValue}
          />
          <div className="flex gap-4">
            <Button
              className="mt-4"
              variant="default"
              onClick={sendNewUserDescriptionData}
              disabled={isLoadingCustomDescription}
              aria-label="Save new description"
            >
              {t('save')}
              {isLoadingCustomDescription ? (
                <LoaderCircle className="w-6 h-6 animate-rotate mr-2" />
              ) : (
                ""
              )}
            </Button>
            <Button
              className="mt-4"
              variant="destructive"
              onClick={() => setIsShowAreaDescriptionEnabled(false)}
              aria-label="Cancel editing description"
            >
              {t('cancel')}
            </Button>
          </div>

          {error && (
            <p id="description-error" className="text-red-500 mt-4">
              {error}
            </p>
          )}
        </>
      ) : (
        <p>{description}</p>
      )}
      {isSuccess && (
        <SuccessNotificationComponent successMessage="Description updated succesfully" />
      )}
    </div>
  );
};
