const Discord = require('discord.js')
module.exports = {
    name: 'emoji',

    run: async(client, message, args,prefix) =>{
        await message.delete();

        if (!message.member.permissions.has("ADMINISTRATOR")){
            return
        };
        let emojiname = message.content.split(" ")[1]

        const emoji = await message.guild.emojis.cache.find(emoji => emoji.name.toLowerCase() == emojiname.toLowerCase())
        if(!emoji){
            return console.log('emoji not found')
        }else {
            let emojiID = client.emojis.cache.get(emoji.id)
            await message.channel.send(`${emojiID}`)
        }
    }
}