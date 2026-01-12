use anchor_lang::prelude::*;

#[account]
pub struct ReceiptAccount {
    pub intent: Pubkey,                 // linked intent
    pub execution_proof_hash: [u8; 32],  // hash of off-chain proof
    pub settled_at: i64,                // timestamp
}

impl ReceiptAccount {
    pub const SIZE: usize = 8   // discriminator
        + 32                   // intent pubkey
        + 32                   // proof hash
        + 8;                   // timestamp
}
