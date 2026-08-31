<?php

declare(strict_types=1);

namespace ParticleAcademy\Discord\Actions;

use ParticleAcademy\Discord\Discord;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/message-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/message-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- discord
 */
/**
 * Send a text message to a Discord channel.
 *
 * POST /channels/{channelId}/messages —
 * https://docs.discord.com/developers/resources/message#create-message
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Discord or calls the faker.
 */
final class MessageCreate
{
    public const OPERATION = 'message_create';
    public const METHOD = 'POST';
    public const PATH = '/channels/{channelId}/messages';
    public const SIDE_EFFECTS = 'idempotent';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Discord.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config, ?string $idempotencyKey): array|\stdClass
    {
        if ($idempotencyKey === null || $idempotencyKey === '') {
            throw new ConnectorConfigException(
                'message_create: an idempotencyKey is required — derive it from the RUN and the STEP, '.
                'never fresh, or a retried run takes a second payment.'
            );
        }

        if (strlen($idempotencyKey) > 25) {
            throw new ConnectorConfigException(
                'message_create: idempotencyKey must be at most 25 characters.'
            );
        }

        if (($config['channelId'] ?? null) === null || ($config['channelId'] ?? null) === '') {
            throw new ConnectorConfigException('message_create: "channelId" is required (Channel ID).');
        }

        if (($config['content'] ?? null) === null || ($config['content'] ?? null) === '') {
            throw new ConnectorConfigException('message_create: "content" is required (Message).');
        }

        $body = [];

        $value = $config['content'] ?? null;
        $body['content'] = (string) $value;

        $body['nonce'] = $idempotencyKey;

        $body['enforce_nonce'] = true;

        $body['allowed_mentions'] = [
    'parse' => [],
];

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/channels/'.rawurlencode((string) ($config['channelId'] ?? '')).'/messages';
    }
}
