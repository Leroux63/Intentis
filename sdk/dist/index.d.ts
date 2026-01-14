import { Connection, PublicKey, Transaction } from '@solana/web3.js';

type Cluster = "devnet" | "mainnet-beta";
interface IntentInput {
    token: "USDC";
    amount: number;
    merchant: PublicKey;
    reference?: string;
    metadata?: Record<string, unknown>;
}
interface Intent {
    id: string;
    hash: Uint8Array;
    createdAt: number;
    payer: PublicKey;
}
interface SDKConfig {
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

declare class Intentis {
    private readonly config;
    constructor(config: SDKConfig);
    intent: {
        create: (input: IntentInput) => Promise<Intent>;
    };
    pay(): Promise<unknown>;
    disclose(): Promise<unknown>;
}

declare function pay(params: {
    connection: Connection;
    payer: PublicKey;
    intent: Intent;
}): Promise<{
    transaction: Transaction;
    intentPda: PublicKey;
    receiptPda: PublicKey;
}>;

export { type Cluster, type Intent, type IntentInput, Intentis, type SDKConfig, pay };
