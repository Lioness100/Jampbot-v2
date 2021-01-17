import type { Headers } from 'node-fetch';

export const clocks = [
  '🕛',
  '🕐',
  '🕑',
  '🕒',
  '🕓',
  '🕔',
  '🕕',
  '🕖',
  '🕗',
  '🕘',
  '🕙',
  '🕚',
];

export const logLevels = {
  fatal: '\x1b[31m\x1b[30m\x1b[1m',
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[34m',
  debug: '\x1b[32m',
};

export const channels = {
  welcome: '710497845278670989',
  log: '699230720392167482',
  rules: '699220667484078131',
};

export const emotes = {
  pog: '<:PridePog:796585159607975947>',
  sad: '<:SadBowser:717925128331329607>',
  hype: '<:KomodoHype:796594674029821962>',
};

export const roles = {
  member: '699232048644227115',
};

export const generalChannels = [
  '699220239698886679',
  '699221859580903435',
  '699222200787402762',
  '699704365799440526',
  '699672275854819408',
  '699633909595635783',
  '699221277008855071',
];

export const spamChannels = [
  '699220239698886679',
  '699222200787402762',
  '699221277008855071',
  '699612856018272289',
  '699704365799440526',
  '722174152357707776',
  '699230720392167482',
];

export const measures = {
  yearly: '0 0 1 1 *',
  annually: '0 0 1 1 *',
  monthly: '0 0 1 * *',
  weekly: '0 0 * * 1',
  daily: '0 0 * * *',
  hourly: '0 * * * *',
};

export const categories: Record<string, string> = {
  info: '👀',
  misc: '🤡',
  utility: '🤖',
  moderation: '🛠',
};

export interface Leaderboard {
  xp: number;
  level: number;
  position: number;
  tag: string;
}

export interface Response {
  status: number;
  headers?: Headers;
  body?: Buffer | Record<string, unknown>;
  text?: string;
}

export const blacklist: string[] = [];

const styles = ['SMB1', 'SMB3', 'SMW', 'NSMBU', '3DW'];

const isNot = (...gameStyles: string[]) =>
  styles.filter((style) => !gameStyles.includes(style));

const themes = [
  'Ground',
  'Underground',
  'Ghost House',
  'Airship',
  'Castle',
  'Desert',
  'Snow',
  'Forest',
  'Sky',
];

const gizmos = {
  burners: isNot('3DW'),
  cannons: isNot('3DW'),
  vines: isNot('3DW'),
  lifts: isNot('3DW'),
  'flimsy lifts': isNot('3DW'),
  'lava lifts': isNot('3DW'),
  'fast lava lifts': isNot('3DW'),
  seesaws: isNot('3DW'),
  grinders: isNot('3DW'),
  bumpers: isNot('3DW'),
  'swinging claws': isNot('3DW'),
  skewers: isNot('3DW'),
  'fire bars': isNot('3DW'),
  'one-way walls': isNot('3DW'),
  tracks: isNot('3DW'),
  'conveyor belts': styles,
  'ON/OFF switches': styles,
  'dotted-line blocks': styles,
  'snake blocks': styles,
  'P blocks': styles,
  'P switches': styles,
  'POW blocks': styles,
  springs: styles,
  icicles: styles,
  twisters: styles,
  'bill blasters': styles,
  'banzai bills': styles,
  'a cursed key': ['SMB1'],
  crates: ['3DW'],
  '! blocks': ['3DW'],
  'blinking blocks': ['3DW'],
  'track blocks': ['3DW'],
  trees: ['3DW'],
  'ON/OFF trampolines': ['3DW'],
  'mushroom trampolines': ['3DW'],
  'dash blocks': ['3DW'],
  'spike blocks': ['3DW'],
  'cloud lifts': ['3DW'],
  'red POW blocks': ['3DW'],
  'note blocks': isNot('3DW'),
  'donut blocks': styles,
  'hidden blocks': styles,
  '? blocks': styles,
  spikes: isNot('3DW'),
  'clear pipes': ['3DW'],
};

const powerups = {
  'the Super Mushroom': styles,
  'the Master Sword': ['SMB1'],
  'the Fire Flower': styles,
  'the Superball Flower': ['SMB1'],
  'the Big Mushroom': ['SMB1'],
  'the Super Leaf': ['SMB3'],
  'the Cape Feather': ['SMW'],
  'the Propeller Mushroom': ['NSMBU'],
  'the Super Bell': ['3DW'],
  'the Super Hammer': ['3DW'],
  'the SMB Mushroom': ['SMB1'],
  'the Frog Suit': ['SMB3'],
  'the Power Balloon': ['SMW'],
  'the Super Acorn': ['NSMBU'],
  'the Boomerang Flower': ['3DW'],
  'the Super Star': styles,
  'the Rotten Mushroom': isNot('3DW'),
  'the Shoe Goomba': ['SMB1', 'SMB3'],
  "Yoshi's Egg": ['SMW', 'NSMBU'],
  'the Cannon Box': ['3DW'],
  'the Propeller Box': ['3DW'],
  'the Goomba Mask': ['3DW'],
  'the Bullet Bill Mask': ['3DW'],
  'the Red POW Box': ['3DW'],
};

const enemies = {
  'Koopa Troopas': styles,
  'Buzzy Beetles': isNot('3DW'),
  'Buzzy Shells': isNot('3DW'),
  'Spike Tops': isNot('3DW'),
  'Ant Troopers': ['3DW'],
  Spinies: styles,
  'Spiny Shells': isNot('3DW'),
  Bloopers: isNot('3DW'),
  'Cheep Cheeps': styles,
  Skipsqueaks: ['3DW'],
  Stingbies: ['3DW'],
  'Piranha Plants': styles,
  Munchers: isNot('3DW'),
  'Piranha Creepers': ['3DW'],
  Thwomps: styles,
  'Monty Moles': isNot('3DW'),
  'Rocky Wrenches': isNot('3DW'),
  'Chain Chomps': isNot('3DW'),
  'Unchained Chomps': isNot('3DW'),
  'Hop-Chops': ['3DW'],
  Snowballs: styles,
  Wigglers: isNot('3DW'),
  Boos: styles,
  'Lava Bubbles': styles,
  'Bob-ombs': styles,
  'Dry Bones': styles,
  'Dry Bone Shells': isNot('3DW'),
  'Fish Bones': styles,
  Magikoopas: styles,
  Pokeys: styles,
  Bowser: styles,
  'Bowser Jr.': isNot('3DW'),
  'Boom Boom/Pom Pom': styles,
  Mechakoopas: isNot('3DW'),
  'Angry Sun': isNot('3DW'),
  "Lakitu/Lakitu's cloud": isNot('3DW'),
  Charvaarghs: ['3DW'],
  Bullies: ['3DW'],
  Porcupuffers: ['3DW'],
  'Clown Cars': isNot('3DW'),
  'Koopa Troopa Cars': ['3DW'],
  Larry: isNot('3DW'),
  Iggy: isNot('3DW'),
  Wendy: isNot('3DW'),
  Lemmy: isNot('3DW'),
  Roy: isNot('3DW'),
  Morton: isNot('3DW'),
  Ludwig: isNot('3DW'),
};

export const levelData: Record<string, Record<string, string[]> | string[]> = {
  styles,
  themes,
  gizmos,
  powerups,
  enemies,
};

export const replies = [
  'Maybe.',
  'Certainly not.',
  'I hope so.',
  'Not in your wildest dreams.',
  'There is a good chance.',
  'Quite likely.',
  'I think so.',
  'I hope not.',
  'I hope so.',
  'Never!',
  'Pfft.',
  'Sorry, bucko.',
  'Hell, yes.',
  'Hell to the no.',
  'The future is bleak.',
  'The future is uncertain.',
  'I would rather not say.',
  'Who cares?',
  'Possibly.',
  'Never, ever, ever.',
  'There is a small chance.',
  'Yes!',
  'lol no.',
  'There is a high probability.',
  'What difference does it makes?',
  'Not my problem.',
  'Ask someone else.',
  'All I know is madlad go brrrrrr',
];

export const dikdiks = [
  'https://cdn.discordapp.com/attachments/699612856018272289/796056667523252254/wtg6p8kwu3v31.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/735301972420329530/266px-Dik-dik.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/735903024769138778/oNYchXMEZRmirb0-tn5wnrsl6i-_iCey2qJBnjrmQxI.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/797419483299971090/dikdik-at-the-zoo-square.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/798171373482016768/fit.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/800388513949679656/9k.png',
  'https://cdn.discordapp.com/attachments/699612856018272289/797907054609039391/Damara-dik-dik.png',
];

export const quags = [
  'https://media.discordapp.net/attachments/720850648740134994/720850757511020554/image0.png?width=721&height=406',
  'https://media.discordapp.net/attachments/72085064874,0134994/720850785822572596/image0.png?width=287&height=406',
  'https://media.discordapp.net/attachments/720850648740134994/720850816038338640/image0.png',
  'https://media.discordapp.net/attachments/720850648740134994/720850844932767754/image0.png',
  'https://media.discordapp.net/attachments/720850648740134994/720850995630047232/dapper_quag.jpg?width=287&height=406',
  'https://media.discordapp.net/attachments/720850648740134994/720851068535177277/250px-Aether_Paradise_Quagsire.png',
  'https://media.discordapp.net/attachments/720850648740134994/720851133446488149/hblcs328wod41.png?width=620&height=406',
  'https://media.discordapp.net/attachments/720850648740134994/720851165683646494/images.png',
  'https://media.discordapp.net/attachments/720850648740134994/720851249838293032/54544357bac3e228f852048be373432e.png?width=228&height=405',
  'https://media.discordapp.net/attachments/720850648740134994/720851646791548938/tumblr_pn7w5huG4W1r8r6mfo1_500.png',
  'https://media.discordapp.net/attachments/720850648740134994/720851729804951602/images.png',
  'https://media.discordapp.net/attachments/720850648740134994/720852120487592026/31ab26696215031f4b8691ff43d8ef84.png?width=574&height=406',
  'https://media.discordapp.net/attachments/720850648740134994/720852398389854268/hqdefault.png',
  'https://media.discordapp.net/attachments/720850648740134994/720852674135851018/stsmall507x507-pad600x600f8f8f8.png?width=406&height=406',
  'https://cdn.bulbagarden.net/upload/thumb/a/a4/195Quagsire.png/1200px-195Quagsire.png',
  'https://vignette.wikia.nocookie.net/sonicpokemon/images/1/17/Quagsire.jpg/revision/latest/scale-to-width-down/340?cb=20130626042020',
  'https://static.pokemonpets.com/images/monsters-images-800-800/8195-Mega-Quagsire.png',
  'https://img.pokemondb.net/sprites/silver/normal/quagsire.png',
  'https://img.pokemondb.net/sprites/silver/shiny/quagsire.png',
  'https://img.pokemondb.net/sprites/diamond-pearl/shiny/quagsire-f.png',
  'https://img.pokemondb.net/sprites/sword-shield/normal/quagsire.png',
  'https://img.pokemondb.net/sprites/black-white/anim/normal/quagsire.gif',
  'https://img.pokemondb.net/sprites/black-white/anim/shiny/quagsire-f.gif',
  'https://img.pokemondb.net/sprites/black-white/anim/back-normal/quagsire-f.gif',
  'https://img.pokemondb.net/sprites/black-white/anim/back-shiny/quagsire.gif',
  'https://i.gifer.com/CNLB.gif',
  'https://i.pinimg.com/originals/43/9f/d2/439fd2bdaceb90e61a86ec138e03837b.gif',
  'https://media1.tenor.com/images/3f3166ea4f2ce96a56b9a93ca581eeea/tenor.gif?itemid=9489944',
  'https://66.media.tumblr.com/55c8c6831f6d1556496cbe38d896b258/tumblr_inline_p7gpw5KExR1s288xq_500.gif',
  'https://66.media.tumblr.com/70537d7954e0126ecec24f22caa37ed3/tumblr_inline_p7gpw74ljX1s288xq_500.gif',
  'https://i.chzbgr.com/full/8549387520/h025FE16C/pokemon-memes-quagsire-gif',
  'https://media1.tenor.com/images/2f984f266d8fddd452fbb2a6dae06567/tenor.gif?itemid=8412737',
  'https://66.media.tumblr.com/bc00161140a944f6483d8d9c08eca6ed/tumblr_inline_p7gpw4EWsn1s288xq_500.gif',
  'https://i.gifer.com/Fd80.gif',
  'https://thumbs.gfycat.com/SmoggyPalatableGull-size_restricted.gif',
  'https://media1.tenor.com/images/9e1ff827cf91f0b13eefaf98b498ff91/tenor.gif?itemid=16035458',
  'https://66.media.tumblr.com/916ae3058eadaa9a24f7dca874374ea2/tumblr_onul93897s1umhpd4o1_400.gifv',
  'https://i.pinimg.com/originals/4b/d7/61/4bd7614b494ec68c26cab8db4aea9540.jpg',
  'https://i.pinimg.com/originals/31/8f/6e/318f6e8de8626122879bea410fa949c4.jpg',
  'https://fc04.deviantart.net/fs71/f/2014/196/4/1/quagsire_shaming_by_dragonith-d7qsid7.png',
  'https://i.redd.it/vq7a9geu5py21.jpg',
  'https://i.pinimg.com/originals/9b/52/7d/9b527db5fe062c6cf573053689c7dd82.jpg',
  'https://i.chzbgr.com/full/5300105216/h60AB456D/four-times-effective',
  'https://i.chzbgr.com/full/8493294336/h388E0A90/pokemon-memes-ice-cream-quagsire',
  'https://static.fjcdn.com/large/pictures/a8/a9/a8a9d2_2285752.jpg',
  'https://25.media.tumblr.com/05574fb8631f61bca2f6eb0c1142472f/tumblr_msh4lfXYkE1scncwdo1_500.gif',
  'https://i.pinimg.com/originals/e8/c3/2e/e8c32ed4119e104fd05cdb0e6ed74e82.png',
  'https://archive-media-0.nyafuu.org/vp/image/1418/76/1418764806225.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSenLm0X8aIHrYcmUd4MoUV8xPyTd3BQ-OYcoA4CnYW0vLecOxR&usqp=CAU',
  'https://pa1.narvii.com/5717/6a6afdf97d9b6794ff0cb4cb319c78ef9b9b9a9b_00.gif',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQgQG7PcINr4h49t4n-jUIeFrlQZh3_OUN-kz1zMbW8Q6PZIIrM&usqp=CAU',
  'https://i.makeagif.com/media/3-21-2015/C0Fn2m.gif',
  'https://i.ytimg.com/vi/pXpYA0Y1xsk/hqdefault.jpg',
  'https://media.discordapp.net/attachments/699222200787402762/721903785596682351/QuaqJamp.png',
  'https://i.redd.it/1dje6peppb831.png',
  'https://pics.me.me/thumb_this-is-the-quagsire-of-power-his-name-is-phil-7998109.png',
  'https://i.redd.it/y08bip7wrae41.png',
  'https://pics.awwmemes.com/random-characters-giving-you-choccy-milk-everyday-until-i-find-71912501.png',
  'https://pm1.narvii.com/6148/9a1404023d60adf9465cffa45c1bca330cf723a8_hq.jpg',
  'https://i.kym-cdn.com/photos/images/facebook/000/741/268/526.png',
  'https://pics.me.me/lv-20-woopeir-the-water-fish-pokemon-quagsire-the-water-43957455.png',
  'https://i.kym-cdn.com/photos/images/facebook/001/013/097/266.jpg',
  'https://i.ytimg.com/vi/p-JLSO9DTrM/hqdefault.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRnIYV_ERnoj-FW9A0hUDAiOQ3VmwmyapoT_DuCtKUmELb-9Mt&usqp=CAU',
  'https://i.chzbgr.com/full/5948626944/h6C4C04DE/play-em-off-keyboard-quagsire',
  'https://i.pinimg.com/originals/5f/ad/7d/5fad7da4f9773da4e8e2505164627665.jpg',
  'https://pics.ballmemes.com/oc-quagsire-peter-70110935.png',
  'https://i.pinimg.com/originals/8a/30/1a/8a301a058925979e4ecd879738d0e923.png',
  'https://i7.pngguru.com/preview/277/718/354/pokemon-sun-and-moon-pokemon-ultra-sun-and-ultra-moon-quagsire-pokedex-risitas-sticker.jpg',
  'https://a.wattpad.com/cover/79634967-256-k513655.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRYw5P48RWfLfoRQGWvfuFB44XBC7IZlWbE3Hptj2KQBjbVXGpG&usqp=CAU',
  'https://videogamefunclub.com/wp-content/uploads/2019/12/EMtnkZAUcAI5Y_C-1-1024x819.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFSnU-cJQwnXHoFyHE5daABeU3liX4osE6o_8xzHO7BWZQ9aor&usqp=CAU',
  'https://i.kym-cdn.com/photos/images/original/001/357/505/3c3.gif',
  'https://cdn.weasyl.com/~derfisch/submissions/1631219/d672b24b7cc1f0dfaf803d40c174bed0cf22fe6bea26fd1239934b336155ed54/derfisch-smug-quagsire.png',
  'https://ih1.redbubble.net/image.330379615.7227/st,small,507x507-pad,600x600,f8f8f8.u2.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdmNg_YYREaFadkJCRxiV2Av5zdrs9mNELFxhK9l4AjMHsK73_&usqp=CAU',
  'https://41.media.tumblr.com/183afb99487c518bed2d77b4fd7e0046/tumblr_nokvg3uWzM1sk5oq0o1_500.png',
  'https://ih1.redbubble.net/image.245799558.3596/flat,750x1000,075,f.jpg',
  'https://www.pngkey.com/png/detail/390-3905215_298kib-600x713-googly-quagsire-quagsire.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMZXcTjdpfDTEMrr34hfiHQxKRERdCd7ZpOTxg0HEs_nLR5i-E&usqp=CAU',
  'https://cdn.weasyl.com/static/media/34/28/8c/34288c2f7eed708f30f0161d7527c20ac35dff1706577fc89bb7b1221e3f6185.png',
  'https://static1.fjcdn.com/comments/+_25b3e006b8c7e37d6d810c2a327e8a12.jpg',
  'https://i.redd.it/58jbvgcq7en11.png',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROqw-fu42LvnwCd87tMoB-FwiRjJvISwStQCV6WOWWHgb8YWhd&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQnFP5gDAifsVOBQSSuqDngJIFE3VK7QOQr7OvqeGHCQUqhJCb&usqp=CAU',
  'https://cdn130.picsart.com/267890903031211.png?type=webp&to=min&r=240',
  'https://scontent-atl3-1.cdninstagram.com/v/t51.2885-15/e35/81686557_136747818011345_5041779367638072839_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_cat=105&_nc_ohc=kqkK85XyBgEAX8XjA29&oh=a93c5020c6abeb347d2e2aff50b31f61&oe=5F007DCA',
  'https://ci.memecdn.com/9799751.gif',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRRy2SFYw1DntC1swS3W5bCqIitAj_jYbcKi71RViogZB8mJHfT&usqp=CAU',
  'https://66.media.tumblr.com/95db9028a20f8beb6a4b6f2f10abe873/9e9f118cb492c342-9f/s1280x1920/23b7cd63f03b505a0ac58f60a3385737405b34e5.png',
  'https://cdn.discordapp.com/attachments/725035266703753460/728364467632603136/20200702_174008.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033281263501382/20200715_134326.jpg?width=670&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033281867481239/20200715_134252.jpg?width=503&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033282408677426/20200715_134233.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033282584707162/20200715_134217.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033282798747789/20200715_134119.jpg?width=876&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033283029303336/20200715_134104.jpg?width=668&height=669',
  'https://media.discordapp.net/attachments/719694477027180544/733033283385950268/20200715_134115.jpg?width=881&height=626',
  'https://media.discordapp.net/attachments/719694477027180544/733033283633545236/20200715_134109.jpg?width=670&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033283813638224/20200715_134042.jpg?width=881&height=495',
  'https://media.discordapp.net/attachments/719694477027180544/733033283994124338/20200715_134037.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033317179326504/20200715_134033.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033317422727289/20200715_134013.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033317586174032/20200715_134028.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033317875581049/20200715_134017.jpg?width=881&height=661',
  'https://media.discordapp.net/attachments/719694477027180544/733033318274302134/20200715_133944.jpg?width=881&height=497',
  'https://media.discordapp.net/attachments/719694477027180544/733033318538281020/20200715_134010.jpg?width=881&height=496',
  'https://media.discordapp.net/attachments/719694477027180544/733033318735675535/20200715_133954.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033318907641866/20200715_133909.jpg?width=881&height=585',
  'https://media.discordapp.net/attachments/719694477027180544/733033319159038002/20200715_133928.jpg?width=670&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033319343849562/20200715_133920.jpg?width=568&height=671',
  'https://media.discordapp.net/attachments/719694477027180544/733033415900921926/20200715_133905.jpg?width=881&height=505',
  'https://media.discordapp.net/attachments/719694477027180544/733033416282341426/20200715_133841.jpg?width=549&height=671',
  'https://media.discordapp.net/attachments/719694477027180544/733033416479604756/20200715_133846.jpg?width=670&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033416701771816/20200715_133735.jpg?width=881&height=598',
  'https://media.discordapp.net/attachments/719694477027180544/733033416903229520/20200715_133813.jpg?width=705&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033417230254181/EXcJFA1XgAAvoLH.gif',
  'https://media.discordapp.net/attachments/719694477027180544/733033417503015002/20200715_133723.jpg?width=502&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033417930834011/20200715_133712.jpg?width=838&height=669',
  'https://media.discordapp.net/attachments/719694477027180544/733033418178428968/20200715_133709.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033514072670248/20200715_133703.jpg?width=670&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033514378854540/20200715_133655.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033514580312145/20200715_133659.jpg?width=881&height=471',
  'https://media.discordapp.net/attachments/719694477027180544/733033515142086737/20200715_133607.jpg?width=503&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033515482087564/20200715_133626.jpg?width=881&height=585',
  'https://media.discordapp.net/attachments/719694477027180544/733033515981078538/20200715_133615.jpg?width=881&height=497',
  'https://media.discordapp.net/attachments/719694477027180544/733033516304171150/20200715_133527.jpg?width=881&height=497',
  'https://media.discordapp.net/attachments/719694477027180544/733033517067272272/20200715_133517.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033517344227458/20200715_133604.jpg?width=670&height=670',
  'https://media.discordapp.net/attachments/719694477027180544/733033517637959720/20200715_133510.jpg?width=881&height=497',
  'https://media.discordapp.net/attachments/719694477027180544/733033652232912996/20200715_133459.jpg?width=478&height=670',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033653260648558/20200715_133450.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033653650587828/20200715_133455.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033654087057438/20200715_133453.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033654460088321/20200715_133437.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033654816866314/20200715_133440.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033655156473906/20200715_133443.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033655496343613/20200715_133435.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033655806722188/20200715_133427.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033681161027665/20200715_133424.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033681521868970/20200715_133422.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033682058739796/20200715_133420.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033682365055006/7e88c6fd-bac6-4098-9452-795d9f1172cb_base_resized.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033682918441000/ec245f66-79d0-4d74-956d-ee431f994d7b_base_resized.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033683287801906/20200715_133229.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033683535003748/20200715_133244.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033684122468473/20200715_133204.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033684353155212/20200715_133208.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033684566802532/20200715_133214.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033824740704368/EXcJFA1XgAAvoLH.gif',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033825650606090/EcwR3bnVAAAK9iI.gif',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033826116436078/Ec40gJhWoAIvmqd.gif',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033955829350470/20200715_133116.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033956085071902/20200715_133102.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033956810948729/20200715_133022.jpg',
  'https://cdn.discordapp.com/attachments/719694477027180544/733033957276385400/20200715_133002.jpg',
  'https://media.discordapp.net/attachments/719694477027180544/733033957570117742/20200715_132959.jpg',
];
