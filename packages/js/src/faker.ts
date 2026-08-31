/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- discord
 */

/**
 * The Discord faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Discord actually publishes, so an author can wire {{ $json.data.id }}
 * against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeMessageCreate({ config, fake }: FakeRequest): unknown {
  return {
    "id": "1409987654321098765",
    "channel_id": "1409123456789012345",
    "author": {
      "id": "1409000000000000001",
      "username": "Release Bot",
      "avatar": null,
      "discriminator": "0000",
      "public_flags": 0,
      "flags": 0,
      "bot": true,
      "banner": null,
      "accent_color": null,
      "global_name": null,
      "avatar_decoration_data": null,
      "collectibles": null,
      "primary_guild": null,
    },
    "content": "Deployment finished successfully.",
    "timestamp": "2026-08-30T18:42:15.123000+00:00",
    "edited_timestamp": null,
    "tts": false,
    "mention_everyone": false,
    "mentions": [],
    "mention_roles": [],
    "attachments": [],
    "embeds": [],
    "pinned": false,
    "type": 0,
    "flags": 0,
    "components": [],
    "nonce": "run42-step7",
  };
}

export const discordFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "message_create":
      return fakeMessageCreate(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `discord: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
