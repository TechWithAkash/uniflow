"use client";
import { AuthProvider } from "@/context/AuthContext";

export default function AuthPagesLayout({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
