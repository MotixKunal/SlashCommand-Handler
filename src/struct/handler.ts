import { Client, Collection, MessageEmbed } from 'discord.js';
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9';
import { readdirSync } from 'fs';
import { join } from 'path'

import { Config } from '../index';

export default class SlashCommandHandler {
    public globalCommands = [];
    public guildCommands = [];

    private _client: Client;
    private _guildCommands = new Collection<any, any>();
    private _globalCommands = new Collection<any, any>();
    private __registered: boolean = false;

    constructor(client: Client) {
        this._client = client;
    }

    public async start(token: string) {
        if (!this.__registered) {
            console.error('[ERROR] Please make sure you register a folder for your modules before doing this.'); 
            console.error(' - If you have registered, make sure your file directory is valid.');
            return this;
        } 

        void this._init(token);
        void this._client.login(token);
        void this._listen();

        return this;
    }

    public register(folderPath: string): this {
        const commandFiles = readdirSync(folderPath).filter(file => file.endsWith('.js') || file.endsWith('.ts'));

        for (const file of commandFiles) {
            try {
                var commandFile = require(join(folderPath, file)).default;
                var data = commandFile.data;
            } catch {
                console.error('[ERROR] Could not find data inside folder.');
            }

            if (data._isGlobal) {
                this.globalCommands.push(data.toJSON());
                this._globalCommands.set(data.name, commandFile);
            } 

            const config = this._getconfig();

            if (!config) return this;
            if (!config['guildID'])  {
                console.error('[ERROR] Make sure you have a "guildID" attribute inside your config.');
            }

            this.guildCommands.push(data.toJSON());
            this._guildCommands.set(data.name, commandFile);
        }    
        this.__registered = true;
         
        return this;
    }

    // works 2 directorys deep from the directory you ran from
    private _getconfig() {
        for (const file of readdirSync(process.cwd())) {
            // check if directory script was ran from has file
            if (file.toLowerCase() === 'slashconfig.json') return require(`${process.cwd()}/slashconfig.json`) as Config;
            // check if other folders inside directory has file
            if (!file.includes('.') && file !== 'node_modules') {
                for (const _files of readdirSync(join(process.cwd(), file))) {
                    if (_files.includes('slashconfig.json')) return require(`${process.cwd()}/${file}/slashconfig.json`) as Config;
                }
            }
        }
        return console.error('[ERROR] Could not find slashconfig.json file')
    }

    private _getErrorEmbed(config: Config | void): string | MessageEmbed {
        if (!config) return 'An error occured occurred while trying to run this command.';

        try {
            var errorMessage: string | MessageEmbed = require(join(process.cwd(), config.errorFile)).default;
        } catch(e) {
            console.log(e)
            return 'An error occured occurred while trying to run this command.';
        }

        return errorMessage;
    }

    private async _listen() { 
        this._client.on('interactionCreate', async (interaction) => {
            if (!interaction.isCommand()) return;

            const command = this._guildCommands.get(interaction.commandName) ?? this._globalCommands.get(interaction.commandName);

            try {
                await command.execute(interaction);
            } catch (err) {
                const msg = this._getErrorEmbed(this._getconfig());
                
                if (!(typeof msg === 'string')) {
                    return await interaction.reply({
                        embeds: [msg],
                        ephemeral: true
                    })
                }
                
                await interaction.reply({ 
                   content: msg,
                   ephemeral: true
                });
            }
        })
    }

    private async _init(token: string) {
        const rest = new REST({ version: '9' }).setToken(token);
        const config = this._getconfig();        

        if (!config) return;
        if (!config['clientID']) return console.error('[ERROR] Make sure you have a "clientID" attribute inside your config.')

        try {
            console.log('Started refreshing application (/) commands.');

            if (this.globalCommands.length > 0) await rest.put(
                Routes.applicationCommands(config['clientID']),
                { body: this.globalCommands },
            );

            if (this.guildCommands.length > 0) await rest.put(
                Routes.applicationGuildCommands(config['clientID'], config['guildID']),
                { body: this.guildCommands },
            );
            
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
       }
    }
};
