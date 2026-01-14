export async function sha256Hash(
  input: string | Uint8Array
): Promise<Uint8Array> {
  const data =
    typeof input === "string"
      ? new TextEncoder().encode(input)
      : input;

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(hashBuffer);
}
