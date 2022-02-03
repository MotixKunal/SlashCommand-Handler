import { CommandBuilder } from '../../src/index';

export default {
	data: new CommandBuilder()
		.setName('ping')
		.setDescription('Replies with pong!')
		.isGlobal(),
	async execute(interaction) {
       	await interaction.reply('dad!');
	}
}