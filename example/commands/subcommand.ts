import { CommandBuilder } from '../../src/index';

export default {
	data: new CommandBuilder()
		.setName('hello')
		.setDescription('Replies with hey!')
        // group sub commands also exist!
        .addSubcommand(subCommand => subCommand
            .setName('world')
            .setDescription('Replies with hello world!')    
        )
        ,
	async execute(interaction) {
        if (interaction.options._subcommand == 'hello') {
           await interaction.reply('world!');
        } else await interaction.reply('hey!');
	}
}