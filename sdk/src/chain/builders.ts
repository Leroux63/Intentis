import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

import { anchorDiscriminator } from "./discriminator.js";
import { concatBytes } from "./bytes.js";
import {
  deriveIntentPda,
  deriveReceiptPda,
  deriveDisclosurePda,
} from "./pdas.js";
import {
  encodeSettleArgs,
  encodeDiscloseArgs,
} from "./layout.js";

export async function buildSettleIntentTx(params: {
  connection: Connection;
  programId: PublicKey;
  payer: PublicKey;
  intentHash: Uint8Array;
  proofHash: Uint8Array;
}): Promise<{
  tx: Transaction;
  intentPda: PublicKey;
  receiptPda: PublicKey;
}> {
  const {
    connection,
    programId,
    payer,
    intentHash,
    proofHash,
  } = params;

  const intentPda = deriveIntentPda(programId, intentHash);
  const receiptPda = deriveReceiptPda(programId, intentPda);

  const discriminator = await anchorDiscriminator("settle_intent");
  const args = encodeSettleArgs(proofHash);
  const data = Buffer.from(concatBytes(discriminator, args));

  const ix = new TransactionInstruction({
    programId,
    keys: [
      { pubkey: intentPda, isSigner: false, isWritable: true },
      { pubkey: receiptPda, isSigner: false, isWritable: true },
      { pubkey: payer, isSigner: true, isWritable: true }, // authority
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data,
  });

  const { blockhash } = await connection.getLatestBlockhash("confirmed");

  const tx = new Transaction({
    feePayer: payer,
    recentBlockhash: blockhash,
  }).add(ix);

  return { tx, intentPda, receiptPda };
}

export async function buildDiscloseTx(params: {
  connection: Connection;
  programId: PublicKey;
  payer: PublicKey;
  intentHash: Uint8Array;
  disclosureHash: Uint8Array;
}): Promise<{
  tx: Transaction;
  disclosurePda: PublicKey;
}> {
  const {
    connection,
    programId,
    payer,
    intentHash,
    disclosureHash,
  } = params;

  const intentPda = deriveIntentPda(programId, intentHash);
  const disclosurePda = deriveDisclosurePda(
    programId,
    intentPda,
    disclosureHash
  );

  const discriminator = await anchorDiscriminator("disclose");
  const args = encodeDiscloseArgs(disclosureHash);
  const data = Buffer.from(concatBytes(discriminator, args));

  const ix = new TransactionInstruction({
    programId,
    keys: [
      { pubkey: disclosurePda, isSigner: false, isWritable: true },
      { pubkey: payer, isSigner: true, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data,
  });

  const { blockhash } = await connection.getLatestBlockhash("confirmed");

  const tx = new Transaction({
    feePayer: payer,
    recentBlockhash: blockhash,
  }).add(ix);

  return { tx, disclosurePda };
}
