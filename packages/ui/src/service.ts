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
 * Discord's identity on the authoring surface, shared by every Discord node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * Create a development-only Discord application, install its bot into a
 * dedicated test server, and use a test channel id. Messages are real and can
 * notify members of that server; production credentials sent in sandbox mode
 * are not technically rejected.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const DISCORD_SERVICE = {
  service: "discord",
  serviceTitle: "Discord",
  domain: "messaging",
  sandbox: "separate-account",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a Discord connection holds. */
export const DISCORD_CREDENTIALS = [
  {
    "key": "botToken",
    "label": "Bot token",
    "scope": "account",
    "secret": true,
    "help": "The token from the application's Bot page. Treat it as a password and install that bot into the target server with Send Messages permission."
  }
] as const;

/** Build a Discord node's connector metadata from the operation it performs. */
export function discordMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...DISCORD_SERVICE, role, operation, docs };
}
