# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- discord

"""The Discord faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _message_create(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "id": "1409987654321098765",
        "channel_id": "1409123456789012345",
        "author": {
            "id": "1409000000000000001",
            "username": "Release Bot",
            "avatar": None,
            "discriminator": "0000",
            "public_flags": 0,
            "flags": 0,
            "bot": True,
            "banner": None,
            "accent_color": None,
            "global_name": None,
            "avatar_decoration_data": None,
            "collectibles": None,
            "primary_guild": None,
        },
        "content": "Deployment finished successfully.",
        "timestamp": "2026-08-30T18:42:15.123000+00:00",
        "edited_timestamp": None,
        "tts": False,
        "mention_everyone": False,
        "mentions": [],
        "mention_roles": [],
        "attachments": [],
        "embeds": [],
        "pinned": False,
        "type": 0,
        "flags": 0,
        "components": [],
        "nonce": "run42-step7",
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "message_create":
        return _message_create(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'discord: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
