"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const mockUser = {
  id: "u001",
  name: "Akash Vishwakarma",
  email: "akash@dbit.in",
  role: "student",
  college: "Don Bosco Institute of Technology",
  degree: "B.E. Computer Engineering",
  year: 4,
  cgpa: 8.2,
  avatar: "AV",
};

const DEMO_CREDENTIALS = { email: "akash@dbit.in", password: "demo1234" };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("uniflow_user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    await new Promise((r) => setTimeout(r, 800));
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      localStorage.setItem("uniflow_user", JSON.stringify(mockUser));
      setUser(mockUser);
      router.push("/dashboard");
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const demoLogin = async () => {
    await new Promise((r) => setTimeout(r, 600));
    localStorage.setItem("uniflow_user", JSON.stringify(mockUser));
    setUser(mockUser);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("uniflow_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
