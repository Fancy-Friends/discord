# Changelog

All notable changes to `@particle-academy/discord-ui`,
`@particle-academy/discord-js`, `particle-academy/discord-php` and `fancy-discord`.

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
