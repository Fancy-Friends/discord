<?php

declare(strict_types=1);

namespace ParticleAcademy\Discord;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- discord
 */
/**
 * Discord, as one service descriptor shared by every Discord operation.
 *
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Create a development-only Discord application, install its bot into a
 * dedicated test server, and use a test channel id. Messages are real and can
 * notify members of that server; production credentials sent in sandbox mode
 * are not technically rejected.
 */
final class Discord
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'discord';

    public const LIVE_URL = 'https://discord.com/api/v10';
    public const SANDBOX_URL = 'https://discord.com/api/v10';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'botToken',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'Discord',
            sandbox: SandboxKind::SeparateAccount,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
                Mode::Sandbox->value => self::SANDBOX_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            // The core calls a faker ($operation, $config, $fake, $input); respond()
            // takes TypeScript's FakeRequest shape. This is the translation.
            faker: static fn (string $operation, array $config, FakeValues $fake, mixed $input = null): mixed => DiscordFaker::respond(
                $operation,
                ['config' => $config, 'fake' => $fake, 'input' => $input],
            ),
        );
    }

    /**
     * Apply Discord's auth scheme to an outgoing request.
     *
     * A bot token authenticates as the application's dedicated bot user, not as a
     * human through OAuth2. Discord requires the literal `Bot ` scheme; using
     * Bearer would describe a user OAuth token and a different permission model.
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $request->withHeader('Authorization', 'Bot '.($credentials['botToken'] ?? ''));
    }
}
