export function Hero() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* Tagline */}
        <p className="text-sm uppercase tracking-wide text-white/60">
          Privacy for payments — without hiding the chain
        </p>

        {/* Headline */}
        <h1 className="mt-4 text-5xl font-semibold tracking-tight max-w-3xl">
          Break economic linkability
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            by design, not by obfuscation
          </span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Intentis is a privacy-first payment intent protocol on Solana.
          It separates <strong>intent creation</strong>,{" "}
          <strong>execution</strong>, and{" "}
          <strong>selective disclosure</strong> so applications can hide
          revenues, clients, and payment flows — while remaining fully on-chain.
        </p>

        {/* Feature bullets */}
        <ul className="mt-8 space-y-2 text-white/75">
          <li>• Payment intents are public but unlinked</li>
          <li>• Execution can be delegated or batched</li>
          <li>• Disclosure is explicit, scoped, and optional</li>
          <li>• Built for real applications, not mixers</li>
        </ul>

        {/* CTAs */}
        <div className="mt-10 flex gap-4">
          <a
            href="#demo"
            className="px-6 py-3 rounded-md bg-white text-black font-medium"
          >
            View demo
          </a>

          <a
            href="#docs"
            className="px-6 py-3 rounded-md border border-white/20 text-white"
          >
            Read docs
          </a>
        </div>
      </div>
    </section>
  );
}
