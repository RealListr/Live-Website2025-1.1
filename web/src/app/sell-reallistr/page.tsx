// src/app/sell-reallistr/page.tsx

export default function SellRealListrPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">Sell RealListr</h1>
      <p className="mt-3 text-neutral-600">
        RealListr is built for agents, agencies, and marketing partners who want
        a clean way to list and promote property campaigns. This page is for
        people who want to introduce RealListr to their own network.
      </p>

      <section className="mt-8 space-y-4 text-sm text-neutral-700">
        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-base font-semibold">Who is this for?</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Agents who want to roll RealListr out across their office</li>
            <li>Agencies looking for a simple listing + campaign layer</li>
            <li>Marketing partners who can introduce RealListr to networks</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-base font-semibold">What you get</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Access to RealListr demo + Connection Centre overview</li>
            <li>Clear pricing for subscriptions and campaigns</li>
            <li>Direct contact with the RealListr team for onboarding</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-neutral-200 p-5">
          <h2 className="text-base font-semibold">Next step</h2>
          <p className="mt-2">
            If you&lsquo;d like to talk about selling or rolling out RealListr,
            send a quick email with your name, business, and where you operate.
          </p>
          <a
            href="mailto:westley@commercialinteractive.com?subject=Sell%20RealListr"
            className="mt-4 inline-flex rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90"
          >
            Email RealListr
          </a>
        </div>
      </section>
    </main>
  );
}
