"use client";
import { IndividualProjectData } from "@/app/api/profile/user/project/[id]/route";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Divider } from "../global/divider";
import { AlertInput } from "../alert/alert-input";
import { Label } from "../ui/label";
import { Skeleton } from "../ui/skeleton";

interface IFormProject {
  name: string;
  description: string;
  category: string;
}

export const ProjectEdit: React.FC = () => {
  const searchParams = useSearchParams();

  const projectObject: IndividualProjectData | null = (() => {
    const projectParam = searchParams.get("project");
    if (projectParam) {
      try {
        return JSON.parse(projectParam);
      } catch (error) {
        console.error("Failed to parse project object:", error);
      }
    }
    return null;
  })();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProject>({
    defaultValues: { ...projectObject },
  });

  const onSubmit: SubmitHandler<IFormProject> = (data) => {
    console.log(data);
  };

  if (!projectObject) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-6xl font-bold sm:text-4xl text-start mb-6">
        Edit Project
      </h1>
      <Divider className="mb-4" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Label>Name</Label>
        <Input {...register("name", { required: "Name is required" })} />
        {errors.name && (
          <AlertInput
            variant="error"
            message={errors.name.message}
          ></AlertInput>
        )}
        <Label>Description</Label>
        <Textarea {...register("description")} />
        <Label>Category</Label>
        <Input {...register("category")} />
        <div className="flex gap-3">
          <Button variant={"default"} type="submit" className="max-w-fit">
            Save Changes
          </Button>
          <Button variant={"destructive"}>Cancel</Button>
        </div>
      </form>
    </>
  );
};
