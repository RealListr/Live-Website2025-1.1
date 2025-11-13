// src/app/pricing/page.tsx
export default function Pricing() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Subscriptions</h1>
      <p className="mt-2 text-neutral-600">Choose a plan that fits your workflow.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 p-6">
          <div className="text-lg font-semibold">Starter</div>
          <div className="mt-1 text-sm text-neutral-600">Create and share listings.</div>
          <div className="mt-4 text-2xl font-bold">$0</div>
          <a
            href="/connection-centre"
            className="mt-4 inline-block rounded-md bg-black px-4 py-2 text-sm text-white"
          >
            Get started
          </a>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <div className="text-lg font-semibold">Pro</div>
          <div className="mt-1 text-sm text-neutral-600">Multi-language + branding tools.</div>
          <div className="mt-4 text-2xl font-bold">A$9<span className="text-base font-medium">/mo</span></div>
          <a
            href="/connection-centre"
            className="mt-4 inline-block rounded-md border border-neutral-300 px-4 py-2 text-sm"
          >
            Try Pro
          </a>
        </div>
      </div>
    </main>
  );
}
