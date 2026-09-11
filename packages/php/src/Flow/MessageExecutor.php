<?php

declare(strict_types=1);

namespace ParticleAcademy\Discord\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Connectors\Idempotency;
use ParticleAcademy\Discord\Actions\MessageCreate;
use ParticleAcademy\Discord\Discord;

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
 * Discord message, run on a fancy-flow-php host.
 *
 * The PHP twin of `discordMessageExecutor` in @particle-academy/discord-js:
 * the same request, built from the node's config by the same
 * `Actions\MessageCreate` a host would call directly, and the same value on
 * `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Discord. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/discord_message',
    aliases: [
        'discord_message',
    ],
    category: 'io',
    label: 'Discord message',
    description: 'Send a text message to a Discord channel.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'idempotent',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The created message\'s Discord snowflake.',
        ],
        [
            'path' => 'data.channel_id',
            'type' => 'string',
            'description' => 'The channel snowflake where Discord stored the message.',
        ],
        [
            'path' => 'data.author',
            'type' => 'object',
            'description' => 'The bot user that authored the message.',
        ],
        [
            'path' => 'data.content',
            'type' => 'string',
            'description' => 'The content Discord stored after stripping any invalid characters.',
        ],
        [
            'path' => 'data.timestamp',
            'type' => 'string',
            'description' => 'The creation time as an ISO 8601 timestamp.',
        ],
        [
            'path' => 'data.nonce',
            'type' => 'string',
            'description' => 'The supplied idempotency nonce, echoed on the message.',
        ],
        [
            'path' => 'data.attachments',
            'type' => 'array',
            'description' => 'Attachment objects; empty for this text-only action.',
        ],
        [
            'path' => 'data.embeds',
            'type' => 'array',
            'description' => 'Embed objects Discord derived or stored.',
        ],
    ],
)]
final class MessageExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        // Derived from the RUN and the NODE, never fresh. A retried durable run
        // must send the same key or Discord creates a second one — the exact
        // failure "idempotent" exists to prevent. It travels in the BODY, as
        // `nonce`, and is deliberately NOT also handed to the client, which only
        // knows how to send one as a header.
        $idempotencyKey = Idempotency::keyFor($ctx, $ctx->node->id, service: Discord::SERVICE, operation: MessageCreate::OPERATION);
        if ($idempotencyKey === null) {
            $ctx->emit(RunEvent::log('warn', MessageCreate::OPERATION.': '.Idempotency::NO_KEY_WARNING, $ctx->node->id));
        }

        $result = ($this->client ?? new ConnectorClient)->call(
            Discord::descriptor(),
            MessageCreate::OPERATION,
            $config,
            [
                'method' => MessageCreate::METHOD,
                'path' => MessageCreate::path($config),
                'json' => MessageCreate::body($config, $idempotencyKey),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'discord message_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
