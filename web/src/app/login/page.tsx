"use client";
import { useState } from "react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = "/connection-centre";
    } else {
      setError("Incorrect password");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border p-6 shadow"
      >
        <h1 className="mb-4 text-xl font-semibold">Agent Login</h1>

        <input
          type="password"
          className="w-full rounded border px-3 py-2"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="mt-4 w-full rounded bg-black px-3 py-2 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
}
