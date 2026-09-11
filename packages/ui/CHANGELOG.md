# Changelog

All notable changes to `@particle-academy/discord-ui`,
`@particle-academy/discord-js`, `particle-academy/discord-php` and `fancy-discord`.

## [0.1.2] — 2026-09-11

### Added

- **`fancy-flow-php` executors for every node.** `src/Flow/` carries one `#[FlowNode]` class per action and trigger, and `DiscordFlow::EXECUTORS` lists them.

A Laravel host running fancy-flow-php could show this connector's nodes in its editor and could not run them: `particle-academy/discord-php` shipped the request builders and no executor. Each one is the PHP twin of the executor in `@particle-academy/discord-js` — the same kind, the same request, the same value on `out` — and an unsafe-to-replay action derives its idempotency key from the run and the node, so a retried durable run sends the key it sent the first time.

Register them by adding `vendor/particle-academy/discord-php/packages/php/src/Flow` to `config('fancy-flow.discover')`. `particle-academy/fancy-flow-php` is SUGGESTED, not required, and conflicts outside `>=0.51.0 <2.0`, the range the executors were tested under. Nothing outside `Flow\` needs it.

### Fixed

- **Fake mode through `ConnectorClient` threw.** `Discord::descriptor()` handed the connector core its faker as `DiscordFaker::respond(...)`, which takes `($operation, $request)`; the core calls a faker `($operation, $config, $fake, $input)`. So `$config` arrived as `$request` and every fake call died on "Call to a member function … on null". The descriptor now translates between the two. Calling `DiscordFaker::respond()` directly — what this package's own tests do, which is why they never saw it — is unchanged.

## [0.1.1] — 2026-09-06

### Changed

- **Published through npm Trusted Publishing, so these packages now carry PROVENANCE.**

Every earlier release went out under a scope-wide npm token. This one is
published by an OIDC exchange from the release workflow itself, and npm records
which workflow in which repository built it.
`npm view @particle-academy/discord-ui@0.1.1` shows the attestation; releases before
this one have none.

What it buys a consumer: the tarball on the registry can be tied to a public
commit and a public workflow run, rather than to whoever held a token. What it
does not buy: nothing about the code changed, and the runtime behaviour of all
four packages is identical to 0.1.0.

- **`repository.directory` in the npm packages.**

`@particle-academy/discord-ui` and `@particle-academy/discord-js` live at
`packages/ui` and `packages/js` inside the provider repo. npm's `repository`
field now says so, which makes the "Repository" link on each package page point
at the package rather than at the repository root.

## [0.1.0] - 2026-08-30

### Added

- Send text messages through Discord API v10 with bot-token authentication.
- Enforced nonces for short-window retry deduplication and a 25-character key limit.
- Safe mention defaults that prevent message text from unexpectedly notifying users or roles.
- Dedicated test-server guidance and a fixture matching Discord's top-level Message object.

[0.1.0]: https://github.com/Fancy-Friends/discord/releases/tag/v0.1.0
