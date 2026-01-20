"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schemas/auth.schema";
import { handleLogin } from "@/lib/actions/auth-action";
import Input from "./input";
import Button from "./button";

export default function LoginForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    });
    const [pending, setTransition] = useTransition()
    const [error, setError] = useState<string | null>(null);

    const submit = async (values: LoginData) => {
        setError(null);

        // GOTO
        setTransition(async () => {
            try {
                const response = await handleLogin(values);
                if (!response.success) {
                    throw new Error(response.message);
                }
                if (response.success) {
                    router.push("/");
                } else {
                    setError('Login failed');
                }
            } catch (err: Error | any) {
                setError(err.message || 'Login failed');
            }
        })
    };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full max-w-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-white text-center mb-6">
        Welcome Back
      </h2>

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <div className="text-right">
        <a
          href="#"
          className="text-sm text-blue-400 hover:underline"
        >
          Forgot password?
        </a>
      </div>

      <Button text="Login" />

      {/* Google Login */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-md hover:bg-gray-100 transition"
      >
        <img src="/images/google.png" alt="Google" className="w-5 h-5" />
        Continue with Google
      </button>

      <p className="text-sm text-center text-gray-300">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-400 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
