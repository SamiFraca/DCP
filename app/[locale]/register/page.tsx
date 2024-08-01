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

export default function Login() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const t = useTranslations('Login');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { user: signedInUser, error: signInError } = await signUp(
      email,
      password
    );

    if (signInError) {
      dispatch(setError(signInError));
    } else {
      dispatch(setUser(signedInUser));
      router.push("/?registration=success");
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center mt-12">
      <h1 className="text-5xl mb-4">{t('register')}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-screen-sm w-full">
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
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
