use anchor_lang::prelude::*;
use crate::state::*;
use crate::constants::*;
use crate::error::*;

#[derive(Accounts)]
pub struct SettleIntent<'info> {
    #[account(
        mut,
        has_one = authority
    )]
    pub intent: Account<'info, IntentAccount>,

    #[account(
        init,
        payer = authority,
        space = ReceiptAccount::SIZE,
        seeds = [RECEIPT_SEED, intent.key().as_ref()],
        bump
    )]
    pub receipt: Account<'info, ReceiptAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn settle_intent(
    ctx: Context<SettleIntent>,
    execution_proof_hash: [u8; 32],
) -> Result<()> {
    let intent = &mut ctx.accounts.intent;

    if intent.status == IntentStatus::Settled {
        return err!(VeilError::IntentAlreadySettled);
    }

    intent.status = IntentStatus::Settled;

    let receipt = &mut ctx.accounts.receipt;
    receipt.intent = intent.key();
    receipt.execution_proof_hash = execution_proof_hash;
    receipt.settled_at = Clock::get()?.unix_timestamp;

    Ok(())
}
