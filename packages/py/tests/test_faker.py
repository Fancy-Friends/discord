# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- discord

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_discord._fake import FakeValues, seed_for_call
from fancy_discord.faker import respond


def test_message_create_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("discord", "message_create", config))

    faked = respond("message_create", {"config": config, "fake": fake})

    assert faked == {
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


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("discord", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
