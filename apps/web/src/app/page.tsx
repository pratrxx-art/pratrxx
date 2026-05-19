import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-slate-900 to-fuchsia-950 p-8">
      <section className="mx-auto max-w-6xl rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur">
        <h1 className="text-5xl font-bold">Shortener Pro</h1>
        <p className="mt-4 max-w-2xl text-slate-200">Create monetized short links, track traffic analytics, and grow your earnings with anti-fraud protection.</p>
        <div className="mt-8 flex gap-4">
          <Link className="rounded-xl bg-indigo-500 px-6 py-3" href="/dashboard">Open Dashboard</Link>
          <Link className="rounded-xl border border-white/30 px-6 py-3" href="/pricing">Pricing</Link>
        </div>
      </section>
    </main>
  );
}
