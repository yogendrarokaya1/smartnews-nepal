"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "../schemas/register.schema";
import { useRouter } from "next/navigation";
import Input from "./input";
import Button from "./button";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = () => {
    alert("Registration successful!");
    router.push("/login");
  };

  return (
    <form className="w-full max-w-md space-y-5">
      <h2 className="text-3xl font-semibold text-white text-center mb-8">
        Create Your Account
      </h2>

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
        label="Password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Enter your password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button text="Login" />

      {/* Google Button */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-medium"
      >
        <img src="/images/google.png" className="w-5 h-5" />
        Continue with Google
      </button>

      <p className="text-center text-sm text-white/80">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
