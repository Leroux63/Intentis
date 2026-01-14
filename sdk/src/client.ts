import type { SDKConfig, IntentInput, Intent } from "./core/types.js";
import * as intent from "./intent/index.js";

export class Intentis {
  constructor(private readonly config: SDKConfig) {}

  intent = {
    create: (input: IntentInput): Promise<Intent> =>
      intent.createIntent(input, this.config.wallet.publicKey),
  };

  async pay(): Promise<unknown> {
    throw new Error("Not implemented: pay");
  }

  async disclose(): Promise<unknown> {
    throw new Error("Not implemented: disclose");
  }
}
