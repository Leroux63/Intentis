export function UseCases() {
  return (
    <section className="py-24 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          Who is this for
        </h2>

        <p className="mt-4 max-w-2xl text-white/70">
          Intentis is built for applications that need payments without exposing
          business relationships, revenues, or users.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {/* SaaS */}
          <div>
            <h3 className="text-xl font-semibold">SaaS & APIs</h3>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">
              Accept on-chain payments without revealing customer lists,
              pricing tiers, or revenue flows to competitors.
            </p>
            <p className="mt-2 text-white/50 text-sm">
              Example: paid APIs, developer tools, infra services
            </p>
          </div>

          {/* Marketplaces */}
          <div>
            <h3 className="text-xl font-semibold">Marketplaces</h3>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">
              Settle payments between buyers and sellers without leaking
              counterparties or transaction graphs.
            </p>
            <p className="mt-2 text-white/50 text-sm">
              Example: creator platforms, B2B marketplaces
            </p>
          </div>

          {/* Payroll */}
          <div>
            <h3 className="text-xl font-semibold">Payroll & payouts</h3>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">
              Pay contributors, teams, or contractors while keeping salaries,
              identities, and schedules private.
            </p>
            <p className="mt-2 text-white/50 text-sm">
              Example: DAOs, remote teams, grants
            </p>
          </div>

          {/* DAOs / Infra */}
          <div>
            <h3 className="text-xl font-semibold">DAOs & protocols</h3>
            <p className="mt-2 text-white/70 text-sm leading-relaxed">
              Execute protocol payments without exposing treasury strategy or
              internal economic behavior.
            </p>
            <p className="mt-2 text-white/50 text-sm">
              Example: protocol incentives, internal settlements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
