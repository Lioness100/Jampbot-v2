import os from 'os';
import {
  CommandOptions,
  Command,
  version as akairoVersion,
} from 'discord-akairo';
import { Message, version as djsVersion } from 'discord.js';
import { stripIndent } from 'common-tags';
import { formatDistanceToNowStrict } from 'date-fns';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<CommandOptions>('stats', {
  aliases: ['stats', 'statistics'],
  description: "Shows you Jampbot++'s stats",
})
export default class Stats extends Command {
  public exec(message: Message): void {
    const {
      commandHandler,
      inhibitorHandler,
      listenerHandler,
      taskHandler,
      uptime,
      ws,
      user,
    } = this.client;

    void message.util!.send(
      message
        .embed("Jampbot++'s Stats")
        .setThumbnail(user!.displayAvatarURL())
        .addFields([
          {
            name: '❯ General',
            value: stripIndent`
            •  **Version:** ${process.env.npm_package_version}
            •  **Modules:** ${[
              commandHandler,
              inhibitorHandler,
              listenerHandler,
              taskHandler,
            ]
              .reduce((acc, handler) => acc + handler.modules.size, 0)
              .toLocaleString()}
            •  **Prefix:** \`${commandHandler.prefix}\`
            •  **Uptime:** ${formatDistanceToNowStrict(Date.now() - uptime!)}
            •  **Memory usage:** ${this.getPrettyBytes(
              process.memoryUsage().rss
            )}
            •  **Heartbeat:** \`${ws.ping}ms\`
          `,
          },
          {
            name: '❯ System',
            value: stripIndent`
              •  **Node.js:** [${process.versions.node}](${
              process.release.sourceUrl
            })
              •  **discord.js:** [${djsVersion}](https://github.com/hydrabolt/discord.js)
              •  **discord-akairo:** [${akairoVersion}](https://github.com/1Computer1/discord-akairo)
              •  **Platform:** ${os.platform()}-${os.arch()}
              •  **Uptime:** ${formatDistanceToNowStrict(os.uptime() * 1000)}
          `,
          },
          {
            name: '❯ Source Code',
            value: 'https://github.com/Lioness100/Jampbot-v2',
          },
        ])
        .setFooter('© 2020 Lioness100')
    );
  }

  private getPrettyBytes(rss: number) {
    const exponent = Math.min(Math.floor(Math.log10(rss) / 3), 8);
    return `${(rss / Math.pow(1024, exponent)).toPrecision(
      3
    )} ${'MGTPEZY'.charAt(exponent - 1)}iB`;
  }
}
