import { join } from 'path';
import fs from 'fs';
import { GuildMember, TextChannel } from 'discord.js';
import { Listener, ListenerOptions } from 'discord-akairo';
import { createCanvas, loadImage, registerFont } from 'canvas';
import { channels, emotes } from '../../lib/utils/Constants';
import ApplyOptions from '../../lib/utils/ApplyOptions';

@ApplyOptions<ListenerOptions>('guildMemberAdd', {
  emitter: 'client',
  event: 'guildMemberAdd',
})
export default class GuildMemberAdd extends Listener {
  public async exec(member: GuildMember): Promise<void> {
    const asset = (path: string) => join(__dirname, '../../../assets', path);

    registerFont(asset('fonts/mario.ttf'), {
      family: 'Super Mario Maker Font',
    });
    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await loadImage(
      fs.readFileSync(asset('images/welcome.jpg'))
    );
    ctx.drawImage(background, 0, 0, 700, 250);

    let font = 95;
    let num = 1.4;
    do {
      num += 0.07;
      ctx.font = `${(font -= 10)}px Super Mario Maker Font`;
    } while (ctx.measureText(member.user.username).width > 450);

    ctx.fillText(member.user.username, 250, 250 / num);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await loadImage(
      member.user.displayAvatarURL({ format: 'jpg', size: 4096 })
    );
    ctx.drawImage(avatar, 25, 25, 200, 200);

    void ((await this.client.channels.fetch(
      channels.welcome
    )) as TextChannel).send(
      `Hey ${member}, welcome to **Team Jamp!** To gain access to the rest of the Discord, please read <#${channels.rules}> and agree to the message near the bottom!\n\Have a great time, and remember to contact a mod with any questions ${emotes.pog}`,
      { files: [canvas.toBuffer()] }
    );
  }
}
