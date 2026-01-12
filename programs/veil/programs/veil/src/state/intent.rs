use anchor_lang::prelude::*;

#[account]
pub struct IntentAccount {
    pub authority: Pubkey,        // creator (wallet)
    pub intent_hash: [u8; 32],     // hash of off-chain intent
    pub status: IntentStatus,      // Pending / Settled
    pub created_at: i64,           // timestamp
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum IntentStatus {
    Pending,
    Settled,
}

impl IntentAccount {
    pub const SIZE: usize = 8  // discriminator
        + 32                  // authority
        + 32                  // intent_hash
        + 1                   // status enum
        + 8;                  // timestamp
}
