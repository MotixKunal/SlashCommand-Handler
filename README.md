# SlashCommand-Handler

**this is not finished just yet!**

A Modern Discord.JS Slash Command Handler

Type DiscordJS code like normal but forget the hassle of handling the slash commands and get straight into coding your commands!

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

# Example slashconfig.json

```json
{
    "clientID": "your client id",
    "guildID": "your test guild's id",
    "errorFile": "path to file that exports error message/embed", // the path has to be considered from where you ran, for example:
    // if I wanted to make it example/error.ts but wanted to write the run command from this directory, We would set it as:
    // /example/error
}
```
