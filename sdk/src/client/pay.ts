import { Connection, PublicKey, Transaction } from "@solana/web3.js";

import type { Intent } from "../core/types.js";
import { execute } from "../engine/index.js";
import { buildSettleIntentTx } from "../chain/builders.js";
import { DEVNET_PROGRAM_ID } from "../constants.js";

export async function pay(params: {
  connection: Connection;
  payer: PublicKey;
  intent: Intent;
}): Promise<{
  transaction: Transaction;
  intentPda: PublicKey;
  receiptPda: PublicKey;
}> {
  const { connection, payer, intent } = params;

  const programId = DEVNET_PROGRAM_ID;

  const { proofHash } = await execute(intent);

  const { tx, intentPda, receiptPda } =
    await buildSettleIntentTx({
      connection,
      programId,
      payer,
      intentHash: intent.hash,
      proofHash,
    });

  return {
    transaction: tx,
    intentPda,
    receiptPda,
  };
}
