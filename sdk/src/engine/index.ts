import type { Intent } from "../core/types.js";
import { sha256Hash } from "../core/crypto.js";

export async function execute(
  intent: Intent
): Promise<{ proofHash: Uint8Array }> {
  const payload = new Uint8Array([
    ...intent.hash,
    ...new TextEncoder().encode(Date.now().toString()),
  ]);

  const proofHash = await sha256Hash(payload);
  return { proofHash };
}
