"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { login } from "./actions";
import { AlertInput } from "@/components/alert/alert-input";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations("Login");
  const router = useRouter();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const { error, success } = await login(formData);

    if (error) {
      setError(error);
    }
    if(success){
      router.push('/?login=success');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center max-w-screen-sm mx-auto mt-12">
      <h1 className="text-5xl mb-4">{t("login")}</h1>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleFormSubmit}>
        <Input
          className="p-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          className="p-3"
          type="password"
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" aria-label={t("login")}>
          <MoveRight />
        </Button>
        {error && <AlertInput message={error} variant="error" />}
      </form>
      <Link
        href={`/register`}
        className="hover:text-blue-500 transition-colors text-start w-full"
      >
        {t("newAccount")}
      </Link>
    </div>
  );
}
