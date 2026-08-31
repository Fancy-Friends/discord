# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/message-create.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/message-create.json (or weaver's template/) and regenerate:
#
# npm run provider -- discord

"""Send a text message to a Discord channel.

POST /channels/{channelId}/messages —
https://docs.discord.com/developers/resources/message#create-message

This describes the request. `call` resolves the connection, picks the
estate, and either calls Discord or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "message_create"
METHOD = "POST"
PATH = "/channels/{channelId}/messages"
SIDE_EFFECTS = "idempotent"


def body(config: dict[str, Any], idempotency_key: str | None) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if idempotency_key is None or idempotency_key == "":
        raise ConnectorConfigError(
            "message_create: an idempotency_key is required — derive it from the RUN and the "
            "STEP, never fresh, or a retried run takes a second payment."
        )

    if len(idempotency_key) > 25:
        raise ConnectorConfigError("message_create: idempotencyKey must be at most 25 characters.")

    if config.get("channelId") is None or config.get("channelId") == "":
        raise ConnectorConfigError(
            "message_create: \"channelId\" is required (Channel ID)."
        )

    if config.get("content") is None or config.get("content") == "":
        raise ConnectorConfigError(
            "message_create: \"content\" is required (Message)."
        )

    out: dict[str, Any] = {}
    _value = config.get("content")
    if _value is None or _value == "":
        raise ConnectorConfigError("message_create: \"content\" is required.")

    out["content"] = str(_value)

    out["nonce"] = idempotency_key
    out["enforce_nonce"] = True
    out["allowed_mentions"] = {
    "parse": [],
}
    return out



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/channels/"
        + quote(str(config.get("channelId") or ""), safe="")
        + "/messages"
    )

def message_create(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    # Derived from the run and the step, never fresh. A retried durable run must
    # send the same key or Discord creates a second one.
    idempotency_key: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Send a text message to a Discord channel."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config, idempotency_key),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
