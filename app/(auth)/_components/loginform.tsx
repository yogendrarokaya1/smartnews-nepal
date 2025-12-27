"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "../schemas/login.schema";
import Input from "./input";
import Button from "./button";


export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    // Dummy user for Sprint-1
    const user = {
      name: "Yogendra Rokaya",
      email: data.email,
      avatar: "/user.png",
    };

    localStorage.setItem("user", JSON.stringify(user));
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded w-96 shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />

      <Button text="Login" />
    </form>
  );
}
