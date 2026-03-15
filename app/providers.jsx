"use client";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#16161f",
            color: "#f1f5f9",
            border: "1px solid #2a2a3a",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#10b981", secondary: "#16161f" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#16161f" } },
        }}
      />
    </AuthProvider>
  );
}
