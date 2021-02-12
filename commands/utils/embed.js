const Discord = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'ping pong',
    category: 'utils',
    run: async(client, message, args)=> {
        let sliceFirst = args.slice(1)
        

        let embed = new Discord.MessageEmbed()
        if(message.content.includes('--author', 0)){
            let AuthMsg = message.split("--author")
            
        }
    }
}