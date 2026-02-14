"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RegisterData, registerSchema } from "../schema";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { handleRegister } from "@/lib/actions/auth-action";

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
        <form onSubmit={handleSubmit(submit)} className="space-y-4 text-white">
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
            <div className="space-y-1 ">
                <label className="text-sm font-medium" htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    type="text"
                    autoComplete="given-name"
                    className="h-10 w-full rounded-md border border-black/10  bg-white text-black px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("fullName")}
                    placeholder="Jane Doe"
                />
                {errors.fullName?.message && (
                    <p className="text-xs text-red-600">{errors.fullName.message}</p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="h-10 w-full rounded-md border border-black/10 bg-white text-black px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("email")}
                    placeholder="you@example.com"
                />
                {errors.email?.message && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="phoneNumber">Phone Number</label>
                <input
                    id="phoneNumber"
                    type="text"
                    autoComplete="phoneNumber"
                    className="h-10 w-full rounded-md border border-black/10 bg-white text-black px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("phoneNumber")}
                    placeholder="Jane Doe"
                />
                {errors.phoneNumber?.message && (
                    <p className="text-xs text-red-600">{errors.phoneNumber.message}</p>
                )}
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    className="h-10 w-full rounded-md border border-black/10 bg-white text-black px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("password")}
                    placeholder="••••••"
                />
                {errors.password?.message && (
                    <p className="text-xs text-red-600">{errors.password.message}</p>
                )}
            </div>

            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm password</label>
                <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    className="h-10 w-full rounded-md border border-black/10 bg-white text-black px-3 text-sm outline-none focus:border-foreground/40"
                    {...register("confirmPassword")}
                    placeholder="••••••"
                />
                {errors.confirmPassword?.message && (
                    <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-[#463CFC] text-sm font-semibold text-white hover:underline hover:text-red-600 hover:opacity-90 disabled:opacity-60"
            >
                {isSubmitting || pending ? "Creating account..." : "Create account"}
            </button>

            <div className="mt-1 text-center text-sm">
                Already have an account? <Link href="/login" className="font-semibold hover:underline text-blue-500">Log in</Link>
            </div>
        </form>
    );
}
