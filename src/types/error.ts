// when using make sure your message/embed is the default export (for example line 9)
import { MessageEmbed } from "discord.js"

// The handler will provide an error message as the first argument
// you do not need to use this tho and can use your own message
// just make sure it returns an embed or message object!
type Error = (errorMessage: string) => string | MessageEmbed;

export default Error;