export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE - LOGO */}
      <div className="hidden md:flex items-center justify-center bg-white">
        <img
          src="/images/logo.png"
          alt="SmartNews Nepal"
          className="w-[420px]"
        />
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex items-center justify-center bg-gradient-to-br from-[#0A003D] to-[#1B0A6E] px-6">
        {children}
      </div>
    </div>
  );
}
