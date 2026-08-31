# Discord

Discord for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/discord-ui` | `npm install @particle-academy/discord-ui` |
| Node | `@particle-academy/discord-js` | `npm install @particle-academy/discord-js` |
| PHP 8.4+ | `particle-academy/discord-php` | `composer require particle-academy/discord-php` |
| Python 3.11+ | `fancy-discord` | `pip install fancy-discord` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Discord SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Discord connection holds 1 value.

Every value here is `account` scope: one per connected account, not one per installation.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **Bot token** | per connected account | **secret** | The token from the application's Bot page. Treat it as a password and install that bot into the target server with Send Messages permission. |

### The estate

Discord has a test estate on the same host, reached with credentials from a SEPARATE test account you register. Selecting sandbox mode uses those credentials.

> Create a development-only Discord application, install its bot into a dedicated test server, and use a test channel id. Messages are real and can notify members of that server; production credentials sent in sandbox mode are not technically rejected.

## What it can do

### Actions

#### `message_create` — Discord message

Send a text message to a Discord channel.

`POST /channels/{channelId}/messages` · idempotent — safe to replay

| Input | Required | What it is |
|---|---|---|
| `channelId` | yes | The Discord snowflake for a guild text channel or DM channel. The bot must be present and have Send Messages permission there. |
| `content` | yes | Plain message content, up to Discord's 2,000-character limit. Mentions are rendered as text but do not notify because this action sends an empty allowed_mentions parse list. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Discord has a sandbox. Set a
node's mode to `fake` and it returns the shape Discord actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/discord`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
