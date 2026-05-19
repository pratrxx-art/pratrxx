"use client";
import { useEffect, useState } from "react";
import { api, API } from "../../lib/api";

type Link = { id: string; shortCode: string; originalUrl: string; clicks: number };

export default function Dashboard() {
  const [links, setLinks] = useState<Link[]>([]);
  const [url, setUrl] = useState("");

  async function load() {
    const data = await api<Link[]>("/api/links/mine");
    setLinks(data);
  }

  async function createLink(e: React.FormEvent) {
    e.preventDefault();
    await api("/api/links", { method: "POST", body: JSON.stringify({ originalUrl: url }) });
    setUrl("");
    await load();
  }

  useEffect(() => { load().catch(() => undefined); }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <form onSubmit={createLink} className="flex gap-2 mb-6">
        <input className="flex-1 p-2 text-black" placeholder="https://example.com" value={url} onChange={e => setUrl(e.target.value)} />
        <button className="bg-indigo-500 px-4 rounded">Shorten</button>
      </form>
      <div className="space-y-3">
        {links.map(l => (
          <div key={l.id} className="border border-white/20 rounded p-3">
            <p className="font-semibold">{API.replace('/api','')}/{l.shortCode}</p>
            <p className="text-sm text-slate-300 break-all">{l.originalUrl}</p>
            <p className="text-sm">Clicks: {l.clicks}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
