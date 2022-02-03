interface Config {
    clientId: string; 
    guildID?: string;
    // file location of error message 
    // example: '../util/error'
    // the handler will provide a default error message if one is not provided
    // see more at ./error
    errorFile?: string;
}

export default Config;