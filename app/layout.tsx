import { ToastContainer } from "react-toastify";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
      <body>{children}</body>
      </ThemeProvider>
    <ToastContainer theme="colored"></ToastContainer>
    </html>
  );
}
