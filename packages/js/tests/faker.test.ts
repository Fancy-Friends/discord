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
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { discordFaker } from "../src/faker.js";

test("message_create fakes the shape Discord publishes", () => {
  const config = {};

  const faked = discordFaker("message_create", fakeRequest("discord", "message_create", config));

  assert.deepEqual(faked, {
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
      "primary_guild": null
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
    "nonce": "run42-step7"
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => discordFaker("no_such_operation", fakeRequest("discord", "no_such_operation", {})), /no fake response/);
});
