import { CommandBuilder } from '../../src/index';

export default {
	data: new CommandBuilder()
		.setName('bye')
		.setDescription('Replies with bye!'),
	async execute(interaction) {
       		await interaction.reply('bye!');
	}
}
