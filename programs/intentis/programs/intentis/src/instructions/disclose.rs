use anchor_lang::prelude::*;
use crate::constants::*;

#[account]
pub struct DisclosureAccount {
    pub intent: Pubkey,
    pub discloser: Pubkey,
    pub disclosure_hash: [u8; 32],
    pub disclosed_at: i64,
}

impl DisclosureAccount {
    pub const SIZE: usize = 8 + 32 + 32 + 32 + 8;
}

#[derive(Accounts)]
pub struct Disclose<'info> {
    #[account(mut)]
    pub intent: Account<'info, crate::state::intent::IntentAccount>,

    #[account(
        init,
        payer = discloser,
        space = DisclosureAccount::SIZE,
        seeds = [DISCLOSURE_SEED, intent.key().as_ref()],
        bump
    )]
    pub disclosure: Account<'info, DisclosureAccount>,

    #[account(mut)]
    pub discloser: Signer<'info>,

    pub system_program: Program<'info, System>,
}

pub fn disclose(
    ctx: Context<Disclose>,
    disclosure_hash: [u8; 32],
) -> Result<()> {
    let disclosure = &mut ctx.accounts.disclosure;

    disclosure.intent = ctx.accounts.intent.key();
    disclosure.discloser = ctx.accounts.discloser.key();
    disclosure.disclosure_hash = disclosure_hash;
    disclosure.disclosed_at = Clock::get()?.unix_timestamp;

    Ok(())
}
