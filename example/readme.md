# How to use each *thing* inside this package!
## Please make sure you do everything as showed below or you could run into errors

# Example bot.ts:

```ts
import { SlashCommandHandler } from '../src/index';
import { Client, Intents } from 'discord.js';
import { join } from 'path'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('Ready!');
});

const Handler = new SlashCommandHandler(client)
    .register(join(__dirname, 'commands')) 
    .start('token here');
```
# Example Command (Global)

```ts
import { CommandBuilder } from '../../src/index';

export default {
    data: new CommandBuilder()
	.setName('ping')
	.setDescription('Replies with pong!')
	.isGlobal(),
    async execute(interaction) {
    	await interaction.reply('pong!');
    }
}
```

# Example Command (guild based)

```ts
import { CommandBuilder } from '../../src/index';

export default {
    data: new CommandBuilder()
	.setName('ping')
	.setDescription('Replies with pong!')
    async execute(interaction) {
    	await interaction.reply('pong!');
    }
}
```

# Example slashconfig.json

```json
{
    "clientID": "your client id",
    "guildID": "your test guild's id",
    "errorFile": "/example/error"
}
```

# Example Error file

```ts
import { MessageEmbed } from "discord.js";

const embed = new MessageEmbed()
    .setTitle('Oops!')
    .setDescription('Looks like something went wrong!')
    .setColor('RED')

export default embed;
```
