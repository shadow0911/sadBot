const Discord = require('discord.js')
module.exports = {
    name: 'react',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        if (!message.member.permissions.has("ADMINISTRATOR")){
            return
        }
        let fetch = message.content.split(" ")[1]
        let emojiname = message.content.split(" ")[2]

        const MSG = await message.channel.messages.fetch(fetch)
        const emoji = await message.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() == emojiname.toLowerCase())
        if(!MSG){
            return console.log('not found')
        }else if(!emoji){
            return console.log('emoji not found')
        }else {
            await MSG.react(emoji.id)
        }
    }
}