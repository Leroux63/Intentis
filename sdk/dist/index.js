// src/core/crypto.ts
async function sha256Hash(input) {
  const data = typeof input === "string" ? new TextEncoder().encode(input) : input;
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hashBuffer);
}

// src/intent/index.ts
async function createIntent(input, payer) {
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
    createdAt: Date.now()
  };
  const canonical = JSON.stringify(payload);
  const hash = await sha256Hash(canonical);
  return {
    id: payload.nonce,
    hash,
    createdAt: payload.createdAt,
    payer
  };
}

// src/client.ts
var Intentis = class {
  constructor(config) {
    this.config = config;
  }
  intent = {
    create: (input) => createIntent(input, this.config.wallet.publicKey)
  };
  async pay() {
    throw new Error("Not implemented: pay");
  }
  async disclose() {
    throw new Error("Not implemented: disclose");
  }
};

// src/engine/index.ts
async function execute(intent) {
  const payload = new Uint8Array([
    ...intent.hash,
    ...new TextEncoder().encode(Date.now().toString())
  ]);
  const proofHash = await sha256Hash(payload);
  return { proofHash };
}

// src/chain/builders.ts
import {
  SystemProgram,
  Transaction,
  TransactionInstruction
} from "@solana/web3.js";

// src/chain/discriminator.ts
async function anchorDiscriminator(name) {
  const preimage = `global:${name}`;
  const hash = await sha256Hash(preimage);
  return hash.slice(0, 8);
}

// src/chain/bytes.ts
function concatBytes(...arrays) {
  const length = arrays.reduce((sum, a) => sum + a.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}

// src/chain/pdas.ts
import { PublicKey } from "@solana/web3.js";
var encoder = new TextEncoder();
function deriveIntentPda(programId, intentHash) {
  const [pda] = PublicKey.findProgramAddressSync(
    [encoder.encode("intent"), intentHash],
    programId
  );
  return pda;
}
function deriveReceiptPda(programId, intentPda) {
  const [pda] = PublicKey.findProgramAddressSync(
    [encoder.encode("receipt"), intentPda.toBuffer()],
    programId
  );
  return pda;
}

// src/chain/layout.ts
function encodeSettleArgs(proofHash) {
  if (proofHash.length !== 32) {
    throw new Error("execution_proof_hash must be 32 bytes");
  }
  return proofHash;
}

// src/chain/builders.ts
async function buildSettleIntentTx(params) {
  const {
    connection,
    programId,
    payer,
    intentHash,
    proofHash
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
      { pubkey: payer, isSigner: true, isWritable: true },
      // authority
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ],
    data
  });
  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  const tx = new Transaction({
    feePayer: payer,
    recentBlockhash: blockhash
  }).add(ix);
  return { tx, intentPda, receiptPda };
}

// src/constants.ts
import { PublicKey as PublicKey3 } from "@solana/web3.js";
var DEVNET_PROGRAM_ID = new PublicKey3(
  "DD9vD79VgN3FbwSfpsxfB12ZRZeJtNYpeUT6FhJPZ315"
);

// src/client/pay.ts
async function pay(params) {
  const { connection, payer, intent } = params;
  const programId = DEVNET_PROGRAM_ID;
  const { proofHash } = await execute(intent);
  const { tx, intentPda, receiptPda } = await buildSettleIntentTx({
    connection,
    programId,
    payer,
    intentHash: intent.hash,
    proofHash
  });
  return {
    transaction: tx,
    intentPda,
    receiptPda
  };
}
export {
  Intentis,
  pay
};
//# sourceMappingURL=index.js.map