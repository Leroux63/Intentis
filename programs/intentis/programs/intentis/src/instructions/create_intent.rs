use anchor_lang::prelude::*;
use crate::state::*;
use crate::constants::*;

#[derive(Accounts)]
#[instruction(intent_hash: [u8; 32])]
pub struct CreateIntent<'info> {
    #[account(
        init,
        payer = authority,
        space = IntentAccount::SIZE,
        seeds = [INTENT_SEED, intent_hash.as_ref()],
        bump
    )]
    pub intent: Account<'info, IntentAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn create_intent(
    ctx: Context<CreateIntent>,
    intent_hash: [u8; 32],
) -> Result<()> {
    let intent = &mut ctx.accounts.intent;

    intent.authority = ctx.accounts.authority.key();
    intent.intent_hash = intent_hash;
    intent.status = IntentStatus::Pending;
    intent.created_at = Clock::get()?.unix_timestamp;

    Ok(())
}
