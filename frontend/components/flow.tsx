export function Flow() {
  return (
    <section id="how" className="py-24 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          How it works
        </h2>

        <p className="mt-4 max-w-2xl text-white/70">
          Intentis separates what must be public from what must stay private.
          Payments are no longer a single on-chain action, but a controlled flow.
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {/* Intent */}
          <div className="space-y-4">
            <div className="text-sm text-cyan-400 font-medium">01 — Intent</div>
            <h3 className="text-xl font-semibold">Public payment intent</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              A payment intent is registered on-chain without revealing
              counterparties, execution details, or economic context.
            </p>
            <p className="text-white/50 text-sm">
              Public: intent hash, amount, token
            </p>
          </div>

          {/* Execution */}
          <div className="space-y-4">
            <div className="text-sm text-indigo-400 font-medium">
              02 — Execution
            </div>
            <h3 className="text-xl font-semibold">Private execution</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              The actual payment execution happens off-chain through private
              coordination and verification, breaking on-chain linkability.
            </p>
            <p className="text-white/50 text-sm">
              Private: sender, receiver, routing, timing
            </p>
          </div>

          {/* Disclosure */}
          <div className="space-y-4">
            <div className="text-sm text-purple-400 font-medium">
              03 — Disclosure
            </div>
            <h3 className="text-xl font-semibold">Selective disclosure</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Proofs or receipts can be disclosed later — partially or fully —
              to auditors, partners, or regulators.
            </p>
            <p className="text-white/50 text-sm">
              Optional: receipts, proofs, compliance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
