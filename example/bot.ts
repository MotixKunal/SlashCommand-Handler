import { SlashCommandHandler } from '../src/index';
import { Client, Intents } from'discord.js';
import { join } from 'path'

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
});

// DO NOT PUT THIS INSIDE client.once('ready', () => {}) or any client events
const Handler = new SlashCommandHandler(client)
	.register(join(__dirname, 'commands')) // or .register(join(process.cwd(), example, 'commands'))
	.start('token');
