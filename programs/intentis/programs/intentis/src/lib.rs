use anchor_lang::prelude::*;

pub mod constants;
pub mod error;
pub mod state;
pub mod instructions;

use instructions::*;

declare_id!("DD9vD79VgN3FbwSfpsxfB12ZRZeJtNYpeUT6FhJPZ315");

#[program]
pub mod intentis {
    use super::*;

    /// Create a new payment intent (hash only)
    pub fn create_intent(
        ctx: Context<CreateIntent>,
        intent_hash: [u8; 32],
    ) -> Result<()> {
        instructions::create_intent::create_intent(ctx, intent_hash)
    }

    /// Settle an intent after off-chain private execution
    pub fn settle_intent(
        ctx: Context<SettleIntent>,
        execution_proof_hash: [u8; 32],
    ) -> Result<()> {
        instructions::settle_intent::settle_intent(ctx, execution_proof_hash)
    }

    /// Optional selective disclosure (compliance / audit)
    pub fn disclose(
        ctx: Context<Disclose>,
        disclosure_hash: [u8; 32],
    ) -> Result<()> {
        instructions::disclose::disclose(ctx, disclosure_hash)
    }
}
