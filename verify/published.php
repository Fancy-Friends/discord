<?php

declare(strict_types=1);

/*
 * Discord — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/discord-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Discord\DiscordFaker;

$goldens = [
    [
        'operation' => 'message_create',
        'config' => [],
        'expected' => [
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
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('discord', $operation, $config));
    $faked = DiscordFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
