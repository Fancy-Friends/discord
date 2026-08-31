/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/message-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/message-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- discord
 */

/**
 * Send a text message to a Discord channel.
 *
 * POST /channels/{channelId}/messages —
 * https://docs.discord.com/developers/resources/message#create-message
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Discord or calls the faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { DISCORD } from "../service.js";

export const MESSAGE_CREATE_OPERATION = "message_create";

export type MessageCreateOptions = {
  /** The node's resolved config. Keys: channelId, content. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  /** Derived from the run and the step, never fresh. See the note above. */
  idempotencyKey?: string;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function discordMessageCreate(options: MessageCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.channelId === undefined || config.channelId === null || config.channelId === "") {
    throw new Error(`message_create: "channelId" is required (Channel ID).`);
  }

  if (config.content === undefined || config.content === null || config.content === "") {
    throw new Error(`message_create: "content" is required (Message).`);
  }

  if (options.idempotencyKey === undefined || options.idempotencyKey === "") {
    throw new Error(
      "message_create: an idempotencyKey is required — derive it from the RUN and the STEP, " +
      "never fresh, or a retried run takes a second payment.",
    );
  }

  if (options.idempotencyKey.length > 25) {
    throw new Error("message_create: idempotencyKey must be at most 25 characters.");
  }

  return callConnector(DISCORD, {
    operation: MESSAGE_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/channels/${encodeURIComponent(String(config.channelId))}/messages`,
      json: {
        "content": String(config.content),
        "nonce": options.idempotencyKey,
        "enforce_nonce": true,
        "allowed_mentions": {"parse":[]},
      },
    },
  });
}
