"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { login } from "./actions";

export default function Login() {

  const [error,setError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations("Login");

  // Wrapper function to handle form data
  const handleFormSubmit = async () => {
    // Assuming `login` is an async function
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const message  = await login(formData);
    console.log(message);

    if (message) {
      setError(message)
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center max-w-screen-sm mx-auto mt-12">
      <h1 className="text-5xl mb-4">{t("login")}</h1>
      <form className="flex flex-col gap-4 w-full">
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
        <Button
          type="button"
          aria-label={t("login")}
          onClick={handleFormSubmit}
        >
          <MoveRight />
        </Button>
        {error && <p>{error}</p>}
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
