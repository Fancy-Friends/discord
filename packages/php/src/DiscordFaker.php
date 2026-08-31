<?php

declare(strict_types=1);

namespace ParticleAcademy\Discord;

use ParticleAcademy\Connectors\FakeRequest;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- discord
 */
/**
 * The Discord faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class DiscordFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'message_create' => self::MessageCreate($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'discord: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function MessageCreate(array $config, mixed $fake): array
    {
        return [
        'id' => '1409987654321098765',
        'channel_id' => '1409123456789012345',
        'author' => [
            'id' => '1409000000000000001',
            'username' => 'Release Bot',
            'avatar' => null,
            'discriminator' => '0000',
            'public_flags' => 0,
            'flags' => 0,
            'bot' => true,
            'banner' => null,
            'accent_color' => null,
            'global_name' => null,
            'avatar_decoration_data' => null,
            'collectibles' => null,
            'primary_guild' => null,
        ],
        'content' => 'Deployment finished successfully.',
        'timestamp' => '2026-08-30T18:42:15.123000+00:00',
        'edited_timestamp' => null,
        'tts' => false,
        'mention_everyone' => false,
        'mentions' => [],
        'mention_roles' => [],
        'attachments' => [],
        'embeds' => [],
        'pinned' => false,
        'type' => 0,
        'flags' => 0,
        'components' => [],
        'nonce' => 'run42-step7',
    ];
    }
}
