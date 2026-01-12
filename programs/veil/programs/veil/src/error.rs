use anchor_lang::prelude::*;

#[error_code]
pub enum VeilError {
    #[msg("Intent already settled")]
    IntentAlreadySettled,

    #[msg("Invalid execution proof")]
    InvalidExecutionProof,

    #[msg("Unauthorized")]
    Unauthorized,
}
