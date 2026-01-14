import { PublicKey } from "@solana/web3.js";

const programId = process.env.NEXT_PUBLIC_INTENTIS_PROGRAM_ID;

if (!programId) {
  throw new Error("Missing NEXT_PUBLIC_INTENTIS_PROGRAM_ID");
}

export const INTENTIS_PROGRAM_ID = new PublicKey(programId);
