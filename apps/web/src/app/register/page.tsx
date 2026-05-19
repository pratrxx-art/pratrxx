"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await api("/api/auth/register", { method: "POST", body: JSON.stringify({ name, email, password }) });
    setMsg("Registered! Please login.");
    setTimeout(() => router.push("/login"), 800);
  }

  return <main className="p-8 max-w-md mx-auto"><h1 className="text-2xl mb-4">Register</h1><form onSubmit={onSubmit} className="space-y-3"><input className="w-full p-2 text-black" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /><input className="w-full p-2 text-black" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><input className="w-full p-2 text-black" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /><button className="bg-indigo-500 px-4 py-2 rounded">Register</button>{msg && <p className="text-green-400">{msg}</p>}</form></main>;
}
