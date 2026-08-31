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
 * Discord message — Send a text message to a Discord channel.
 *
 * https://docs.discord.com/developers/resources/message#create-message
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { discordMeta } from "../service.js";

export const DISCORD_MESSAGE_KIND = "@particle-academy/discord_message";
export const DISCORD_MESSAGE_OPERATION = "message_create";

export const DISCORD_MESSAGE_META = discordMeta("action", "send a Discord message", "https://docs.discord.com/developers/resources/message#create-message");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const DISCORD_MESSAGE_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The created message's Discord snowflake."
  },
  {
    "path": "data.channel_id",
    "type": "string",
    "description": "The channel snowflake where Discord stored the message."
  },
  {
    "path": "data.author",
    "type": "object",
    "description": "The bot user that authored the message."
  },
  {
    "path": "data.content",
    "type": "string",
    "description": "The content Discord stored after stripping any invalid characters."
  },
  {
    "path": "data.timestamp",
    "type": "string",
    "description": "The creation time as an ISO 8601 timestamp."
  },
  {
    "path": "data.nonce",
    "type": "string",
    "description": "The supplied idempotency nonce, echoed on the message."
  },
  {
    "path": "data.attachments",
    "type": "array",
    "description": "Attachment objects; empty for this text-only action."
  },
  {
    "path": "data.embeds",
    "type": "array",
    "description": "Embed objects Discord derived or stored."
  }
];

export const discordMessageKind: NodeKindDefinition = defineConnectorKind(DISCORD_MESSAGE_META, {
  name: DISCORD_MESSAGE_KIND,
  aliases: ["discord_message"],
  label: "Discord message",
  description: "Send a text message to a Discord channel.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "idempotent",
  outputShape: DISCORD_MESSAGE_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "channelId",
      "label": "Channel ID",
      "required": true,
      "description": "The Discord snowflake for a guild text channel or DM channel. The bot must be present and have Send Messages permission there."
    },
    {
      "type": "textarea",
      "key": "content",
      "label": "Message",
      "required": true,
      "max": 2000,
      "description": "Plain message content, up to Discord's 2,000-character limit. Mentions are rendered as text but do not notify because this action sends an empty allowed_mentions parse list."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(DISCORD_MESSAGE_META, config as Record<string, unknown>, "send a Discord message"),
});
