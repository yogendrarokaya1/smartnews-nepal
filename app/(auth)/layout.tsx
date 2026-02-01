import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-screen">
            <div className="h-full w-full grid md:grid-cols-2 md:gap-0">

                <div className="hidden md:flex items-center justify-center bg-white">
                    <img
                        src="/images/logo.png"
                        alt="SmartNews Nepal"
                        className="w-[420px]"
                    />
                </div>

                <div className="flex h-full items-center bg-gradient-to-br from-[#0A003D] to-[#1B0A6E] justify-center px-4 md:px-10">
                    <div className="w-full max-w-md  p-6">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}