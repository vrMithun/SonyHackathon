"use client";

import { useRouter } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    try {
      console.log("Logging in with:", username, password);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include credentials for session management
      });

      console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      console.log("Login successful! Redirecting...");
      router.replace("/manager/stockCount"); // ✅ Use replace instead of push
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed: Invalid username or password.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="h-4 w-4" />
          </div>
          Acme Inc.
        </a>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
