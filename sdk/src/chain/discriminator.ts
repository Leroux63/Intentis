import { sha256Hash } from "../core/crypto.js";

export async function anchorDiscriminator(name: string): Promise<Uint8Array> {
  // Anchor: first 8 bytes of sha256("global:<name>")
  const preimage = `global:${name}`;
  const hash = await sha256Hash(preimage);
  return hash.slice(0, 8);
}
