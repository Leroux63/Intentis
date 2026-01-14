import { PublicKey } from "@solana/web3.js";

const encoder = new TextEncoder();

export function deriveIntentPda(
  programId: PublicKey,
  intentHash: Uint8Array
): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [encoder.encode("intent"), intentHash],
    programId
  );
  return pda;
}

export function deriveReceiptPda(
  programId: PublicKey,
  intentPda: PublicKey
): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [encoder.encode("receipt"), intentPda.toBuffer()],
    programId
  );
  return pda;
}

export function deriveDisclosurePda(
  programId: PublicKey,
  intentPda: PublicKey,
  disclosureHash: Uint8Array
): PublicKey {
  const [pda] = PublicKey.findProgramAddressSync(
    [encoder.encode("disclosure"), intentPda.toBuffer(), disclosureHash],
    programId
  );
  return pda;
}
