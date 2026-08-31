"""
Discord — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_discord._fake import FakeValues, seed_for_call
from fancy_discord.faker import respond

GOLDENS = [
    {
        "operation": "message_create",
        "config": {},
        "expected": {
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
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-discord")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("discord", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
