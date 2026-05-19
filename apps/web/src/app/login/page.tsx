"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = await api<{ accessToken: string }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/dashboard");
    } catch {
      setError("Login failed");
    }
  }

  return <main className="p-8 max-w-md mx-auto"><h1 className="text-2xl mb-4">Login</h1><form onSubmit={onSubmit} className="space-y-3"><input className="w-full p-2 text-black" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><input className="w-full p-2 text-black" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><button className="bg-indigo-500 px-4 py-2 rounded">Login</button>{error && <p className="text-red-400">{error}</p>}</form></main>;
}
