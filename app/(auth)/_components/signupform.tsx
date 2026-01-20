"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterData } from "../schemas/auth.schema";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Input from "./input";
import Button from "./button";
import Link from "next/link";
import { register } from "@/lib/api/auth";
import { handleRegister } from "@/lib/actions/auth-action";
import { z } from "zod";



export default function RegisterForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
    });

    const [pending, setTransition] = useTransition()
    const [error, setError] = useState<string | null>(null);

    const submit = async (values: RegisterData) => {
        setError(null);
        setTransition(async () => {
            try {

                const response = await handleRegister(values);
                if (!response.success) {
                    throw new Error(response.message);
                }
                if (response.success) {
                    router.push("/login");
                } else {
                    setError('Registration failed');
                }

            } catch (err: Error | any) {
                setError(err.message || 'Registration failed');
            }
        });
        // GO TO LOGIN PAGE
        console.log("register", values);
    };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full max-w-md space-y-5">
      <h2 className="text-3xl font-semibold text-white text-center mb-8">
        Create Your Account
      </h2>

      {error && (
        <div className="bg-red-500/20 text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Input
        label="Full Name"
        placeholder="Enter your full name"
        {...register("fullName")}
        error={errors.fullName?.message}
      />

      <Input
        label="Email"
        placeholder="Enter your email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Phonenumber"
        placeholder="Enter your phone number"
        {...register("phoneNumber")}
        error={errors.phoneNumber?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button
        text={pending ? "Signing up..." : "Signup"}
      />

      <p className="text-center text-sm text-white/80">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

