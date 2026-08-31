/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- discord
 */

/**
 * What Discord actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { discordMessageCreate } from "../src/actions/message-create.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "botToken": "test_botToken"
};

test("message_create sends POST /channels/{channelId}/messages", async () => {
  const { seen, transport } = capture();

  await discordMessageCreate({
    config: {
      "channelId": "example-channelId",
      "content": "example-content"
    },
    credentials: CREDENTIALS,
    mode: "live",
    idempotencyKey: "test-idempotency-key",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/channels/example-channelId/messages"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "nonce": "test-idempotency-key",
    "content": "example-content",
    "enforce_nonce": true,
    "allowed_mentions": {
      "parse": []
    }
  });
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await discordMessageCreate({
    config: {
      "channelId": "example-channelId",
      "content": "example-content"
    },
    credentials: CREDENTIALS,
    mode: "live",
    idempotencyKey: "test-idempotency-key",
    transport,
  });

  assert.equal(seen[0]!.headers["Authorization"], "Bot test_botToken");
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    discordMessageCreate({
      config: {
        "content": "example-content"
      },
      credentials: CREDENTIALS,
      mode: "live",
      idempotencyKey: "test-idempotency-key",
      transport,
    }),
    new RegExp("channelId"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
