import type { PublicKey, Connection } from "@solana/web3.js";

export type Cluster = "devnet" | "mainnet-beta";

export interface IntentInput {
  token: "USDC";
  amount: number;
  merchant: PublicKey;
  reference?: string;
  metadata?: Record<string, unknown>;
}

export interface Intent {
  id: string;
  hash: Uint8Array;
  createdAt: number;
  payer: PublicKey;
}

export interface SDKConfig {
  connection: Connection;
  wallet: {
    publicKey: PublicKey;
    signTransaction(tx: unknown): Promise<unknown>;
  };
  cluster: Cluster;
  programId: PublicKey;
  engine?: {
    endpoint?: string;
  };
}
