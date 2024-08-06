"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "@/lib/auth";
import { RootState } from "@/store";
import { setUser, setError } from "@/features/authSlice";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { signup } from "./actions";
import { AlertInput } from "@/components/alert/alert-input";

export default function Login() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations('Login');

  const handleFormSubmitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const { error, success } = await signup(formData);

    if (error) {
      setError(error);
    }
    if(success){
      router.push('/?login=success');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center mt-12">
      <h1 className="text-5xl mb-4">{t('register')}</h1>
      <form onSubmit={handleFormSubmitRegister} className="flex flex-col gap-4 max-w-screen-sm w-full">
        <Input
          className="p-3 "
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
         className="p-3 "
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">{t('signIn')}</Button>
        {error && <AlertInput message={error} variant="error" />}
      </form>
    </div>
  );
}
