import type { IntentInput, Intent } from "../core/types.js";
import { sha256Hash } from "../core/crypto.js";
import { PublicKey } from "@solana/web3.js";

export async function createIntent(
  input: IntentInput,
  payer: PublicKey
): Promise<Intent> {
  if (input.amount <= 0) {
    throw new Error("Invalid amount");
  }

  const payload = {
    token: input.token,
    amount: input.amount,
    merchant: input.merchant.toBase58(),
    payer: payer.toBase58(),
    reference: input.reference ?? null,
    metadata: input.metadata ?? null,
    nonce: crypto.randomUUID(),
    createdAt: Date.now(),
  };

  const canonical = JSON.stringify(payload);
  const hash = await sha256Hash(canonical);

  return {
    id: payload.nonce,
    hash,
    createdAt: payload.createdAt,
    payer,
  };
}
