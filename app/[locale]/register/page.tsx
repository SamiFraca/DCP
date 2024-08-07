"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { signup } from "./actions";
import { AlertInput } from "@/components/alert/alert-input";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export type RegisterInputs = {
  email: string;
  password: string;
  options: {
    data: {
      name: string;
      lastName?: string;
      country: string;
      mainField: string;
    };
  };
};
const interestCategories = [
  {
    name: "Sports",
    value: "sports",
  },
  {
    name: "Science",
    value: "science",
  },
  {
    name: "Arts",
    value: "arts",
  },
  {
    name: "Engineering",
    value: "engineering",
  },
  {
    name: "Computer & IT",
    value: "computer-it",
  },
  {
    name: "Business",
    value: "business",
  },
  {
    name: "Communication",
    value: "communication",
  },
];
export default function Register() {
  const [supabaseError, setSupabaseError] = useState("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterInputs>();
  const router = useRouter();
  const t = useTranslations("Login");
  const handleFormSubmitRegister: SubmitHandler<RegisterInputs> = async (
    data
  ) => {
    const { error, success } = await signup(data);
    if (error) {
      setSupabaseError(error);
    }
    if (success) {
      router.push("/?register=success");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center mt-12">
      <h1 className="text-5xl mb-4">{t("register")}</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmitRegister)}
        className="flex flex-col gap-4 max-w-screen-sm w-full"
      >
        <Input
          className="p-3 "
          type="email"
          placeholder="Email *"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <AlertInput variant="error" message={errors.email.message} />
        )}
        <Input
          className="p-3 "
          type="password"
          placeholder="Password *"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <AlertInput variant="error" message={errors.password.message} />
        )}
        <div className="flex gap-2">
          <div className="w-1/2 gap-2 flex flex-col">
            <Input
              className="p-3 "
              type="text"
              placeholder="Name *"
              {...register("options.data.name", {
                required: "Name is required",
              })}
            />
            {errors.options?.data?.name && (
              <AlertInput
                variant="error"
                message={errors.options.data?.name?.message}
              />
            )}
          </div>
          <Input
            className="p-3 w-1/2 "
            type="text"
            placeholder="Last name"
            {...register("options.data.lastName")}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-1/2 gap-2 flex flex-col">
            <Input
              className="p-3 "
              type="text"
              placeholder="Country *"
              {...register("options.data.country", {
                required: "Country is required",
              })}
              aria-invalid={errors.options?.data?.country ? "true" : "false"}
            />
            {errors.options?.data?.country && (
              <AlertInput
                variant="error"
                message={errors.options.data?.country?.message}
              />
            )}
          </div>
          <div className="w-1/2 gap-2 flex flex-col">
            <Controller
              name="options.data.mainField"
              control={control}
              rules={{ required: "Email address is required" }}
              aria-invalid={errors.email ? "true" : "false"}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="What's your main interest?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {interestCategories.map((category, index) => (
                        <SelectItem key={index} value={category.value}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.options?.data?.mainField && (
              <AlertInput
                variant="error"
                message={errors.options.data?.mainField?.message}
              />
            )}
          </div>
        </div>
        <Button type="submit">{t("signIn")}</Button>
        {supabaseError && (
          <AlertInput message={supabaseError} variant="error" />
        )}
      </form>
    </div>
  );
}
