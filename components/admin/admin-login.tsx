"use client";

import { useState } from "react";
import { LockKeyhole, LoaderCircle } from "lucide-react";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "Unable to sign in");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
      setLoading(false);
    }
  };
  return (
    <section className="grid min-h-screen place-items-center bg-[#e6efea] px-5 pb-16 pt-28">
      <form
        onSubmit={submit}
        className="card w-full max-w-md bg-white p-7 sm:p-10"
      >
        <div className="grid size-12 place-items-center rounded-full bg-[#123f36] text-white">
          <LockKeyhole size={20} />
        </div>
        <h1 className="mt-6 font-serif text-4xl text-[#0b2e28]">
          Clinic Admin
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#66706b]">
          Sign in to manage appointment requests.
        </p>
        <div className="field mt-8">
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            className="input"
            value={password}
            minLength={8}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && (
          <p
            className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800"
            role="alert"
          >
            {error}
          </p>
        )}
        <button disabled={loading} className="button-primary mt-6 w-full">
          {loading ? (
            <>
              <LoaderCircle size={17} className="animate-spin" /> Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </section>
  );
}
