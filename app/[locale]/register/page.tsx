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
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { z } from "zod";
import { registrationSchema } from "@/schemas/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod"

export type UserInputs = {
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

export const interestCategories = [
  "interestCategories.sports",
  "interestCategories.science",
  "interestCategories.arts",
  "interestCategories.engineering",
  "interestCategories.computer-it",
  "interestCategories.business",
  "interestCategories.communication",
] as const;
export default function Register() {
  const [supabaseError, setSupabaseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    
  })
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserInputs>();
  const router = useRouter();
  const t = useTranslations("Register");
  const handleFormSubmitRegister: SubmitHandler<UserInputs> = async (
    data
  ) => {
    setIsLoading(true);
    const { error, success } = await signup(data);

    if (error) {
      setSupabaseError(error);
      setIsLoading(false);
    }
    if (success) {
      router.push("/?register=success");
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center mt-12 ">
      <h1 className="text-5xl mb-4">{t("register")}</h1>
      <form
        onSubmit={handleSubmit(handleFormSubmitRegister)}
        className="flex flex-col gap-4 max-w-screen-sm w-full"
      >
        <Input
          className="p-3 "
          type="email"
          placeholder={`${t("email")} *`}
          {...register("email", {
            required: `${t("email")} ${t("required")}`,
          })}
        />
        {errors.email && (
          <AlertInput variant="error" message={errors.email.message} />
        )}
        <Input
          className="p-3 "
          type="password"
          placeholder={`${t("password")} *`}
          {...register("password", {
            required: `${t("password")} ${t("required")}`,
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
              placeholder={`${t("name")} *`}
              {...register("options.data.name", {
                required: `${t("name")} ${t("required")}`,
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
            placeholder={`${t("lastName")}`}
            {...register("options.data.lastName")}
          />
        </div>
        <div className="flex gap-2">
          <div className="w-1/2 gap-2 flex flex-col">
            <Input
              className="p-3 "
              type="text"
              placeholder={`${t("country")} *`}
              {...register("options.data.country", {
                required: `${t("country")} ${t("required")}`,
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
              rules={{ required: `${t("category")} ${t("required")}` }}
              aria-invalid={errors.email ? "true" : "false"}
              render={({ field }) => (
                <Select
                  {...field}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("mainInterest")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {interestCategories.map((category, index) => (
                        <SelectItem key={index} value={t(category)}>
                          {t(category)}
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
        <Button type="submit" disabled={isLoading}>
        {isLoading ? (
            <LoaderCircle className="w-6 h-6 animate-rotate mr-2" />
          ) : (
            ""
          )}
          {t("signIn")}
        </Button>
        {supabaseError && (
          <AlertInput message={supabaseError} variant="error" />
        )}
      </form>

      <Link
        href={"/login"}
        className="text-start max-w-screen-sm w-full hover:text-blue-500 transition-colors "
      >
        {t("alreadyAccount")}
      </Link>
    </div>
  );
}
