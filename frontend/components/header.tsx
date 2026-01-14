import Link from "next/link";
import Image from "next/image";
import { WalletButton } from "@/components/wallet-button";

export function Header() {
  return (
    <header className="w-full border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/intentis_logo.png"
            alt="Intentis logo"
            width={100}
            height={100}
            priority
          />
          <span className="font-semibold text-lg">Intentis</span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-white/80">
          <Link href="#how">How it works</Link>
          <Link href="#demo">Demo</Link>
          <Link href="#docs">Docs</Link>
          <WalletButton />
        </nav>
      </div>
    </header>
  );
}
