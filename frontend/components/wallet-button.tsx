"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export function WalletButton() {
  return (
    <div className="flex items-center">
      <WalletMultiButton className="!bg-white !text-black !rounded-md !px-4 !py-2 !text-sm" />
    </div>
  );
}
