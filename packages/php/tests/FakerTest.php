<?php

declare(strict_types=1);

use ParticleAcademy\Discord\DiscordFaker;
use ParticleAcademy\Connectors\FakeValues;

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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('message_create fakes the shape Discord publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('discord', 'message_create', $config));

    $faked = DiscordFaker::respond('message_create', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
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
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('discord', 'no_such_operation', []));

    expect(fn () => DiscordFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
