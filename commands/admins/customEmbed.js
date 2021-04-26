const Discord = require('discord.js');
module.exports = {
    name: 'custom-embed',
    aliases: ["customembed", "ce"],

    run: async(client, message, args,prefix) =>{
        await message.delete()

        let Channel = message.mentions.channels.first() || 
        await message.guild.channels.cache.get(args[0]) || message.channel

        args.shift()

        const Json = JSON.parse(args.join(' '))

        if(Channel){
            Channel.send('', {
                embed: Json
            })
        }else {
            return message.channel.send("That's not correct order")

        }
    }
}