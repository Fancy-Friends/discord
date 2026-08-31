# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- discord

"""Discord, as one service descriptor shared by every Discord operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Create a development-only Discord application, install its bot into a
dedicated test server, and use a test channel id. Messages are real and can
notify members of that server; production credentials sent in sandbox mode
are not technically rejected.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "discord"
TITLE = "Discord"
SANDBOX = "separate-account"
BASE_URLS = {
    "live": "https://discord.com/api/v10",
    "sandbox": "https://discord.com/api/v10",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "botToken",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Discord's auth scheme to an outgoing request.
    
    A bot token authenticates as the application's dedicated bot user, not as a
    human through OAuth2. Discord requires the literal `Bot ` scheme; using
    Bearer would describe a user OAuth token and a different permission model.
    """
    request.headers["Authorization"] = f"Bot {credentials.get('botToken') or ''}"


def descriptor() -> ServiceDescriptor:
    """The Discord service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
