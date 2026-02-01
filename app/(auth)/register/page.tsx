"use client";

import RegisterForm from "../_components/RegisterForm";

export default function Page() {
    return (
        <div className="space-y-6 w-full">
            <div className="text-center light:text-black/90 dark:text-white/90">
                <h1 className="text-2xl light:text-black/90 dark:text-white/90 font-semibold">Create your account</h1>
                <p className="mt-1 light:text-white/90 dark:text-white/90 text-sm text-foreground/70">Sign up to get started</p>
            </div>
            <RegisterForm />
        </div>
    );
}