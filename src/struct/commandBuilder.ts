import { SlashCommandBuilder } from "@discordjs/builders";

export default class CommandBuilder extends SlashCommandBuilder {
    public guildID: string
    public _isGlobal: boolean = false;

    constructor() { super(); }

    public isGlobal() {
       this._isGlobal = true; 
       return this;
    }
}
