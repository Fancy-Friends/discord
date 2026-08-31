/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- discord
 */

/**
 * Discord, as one service descriptor shared by every Discord operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Discord: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Create a development-only Discord application, install its bot into a
 * dedicated test server, and use a test channel id. Messages are real and can
 * notify members of that server; production credentials sent in sandbox mode
 * are not technically rejected.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { discordFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const DISCORD_BASE_URLS = {
  "live": "https://discord.com/api/v10",
  "sandbox": "https://discord.com/api/v10"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const DISCORD_REQUIRES = [
  "botToken"
] as const;

/**
 * Apply Discord's auth scheme to an outgoing request.
 *
 * A bot token authenticates as the application's dedicated bot user, not as a
 * human through OAuth2. Discord requires the literal `Bot ` scheme; using
 * Bearer would describe a user OAuth token and a different permission model.
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function discordAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers["Authorization"] = `Bot ${credentials.botToken ?? ""}`;
}

/** The Discord service, for the TypeScript runtime. */
export const DISCORD: ServiceDescriptor = {
  service: "discord",
  title: "Discord",
  sandbox: "separate-account",
  baseUrls: { ...DISCORD_BASE_URLS },
  requires: [...DISCORD_REQUIRES],
  authorize: discordAuthorize,
  faker: discordFaker,
};
