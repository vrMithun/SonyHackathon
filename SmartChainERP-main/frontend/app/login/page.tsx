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
            credentials: "include",
        });

        console.log("Response Status:", response.status);
        
        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const { token } = await response.json(); // Extract token from response

        // ✅ Store token in local storage
        localStorage.setItem("accessToken", token.access);  // Save only the access token

        console.log("Login successful! Redirecting...");
        router.replace("/manager/stockCount");
    } catch (error) {
        console.error("Login failed", error);
        alert("Login failed: Invalid username or password.");
    }
};


  
}
