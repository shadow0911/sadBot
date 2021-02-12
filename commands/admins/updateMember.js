const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'update-member',
    description:'cleans an amount of chat',
    category: 'moderation',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("ADMINISTRATOR")){
            return message.reply('None of your role proccess to use this command')
        }
        const channelId = '771987308797755412'
 
        const updateMembers = (guild) => {
         const channel = guild.channels.cache.get(channelId)
         channel.setName(`Members: ${guild.memberCount.toLocaleString()}`)
        }

        const guild = client.guilds.cache.get("617358352468541440")
        updateMembers(guild)

        await message.channel.send(`Member count updated. current member is **${guild.memberCount.toLocaleString()}**`)
    }
}