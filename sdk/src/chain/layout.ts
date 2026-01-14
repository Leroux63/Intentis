/**
 * Anchor settle_intent args:
 * - execution_proof_hash: [u8; 32]
 */
export function encodeSettleArgs(
  proofHash: Uint8Array
): Uint8Array {
  if (proofHash.length !== 32) {
    throw new Error("execution_proof_hash must be 32 bytes");
  }
  return proofHash;
}

/**
 * Anchor disclose args (si applicable)
 * - disclosure_hash: [u8; 32]
 */
export function encodeDiscloseArgs(
  disclosureHash: Uint8Array
): Uint8Array {
  if (disclosureHash.length !== 32) {
    throw new Error("disclosure_hash must be 32 bytes");
  }
  return disclosureHash;
}
