const Discord = require('discord.js')
module.exports = {
    name: 'move-channel',
    description:'Moves a channel',
    category: 'Admin',
    run: async(client, message, args,prefix) =>{

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return
        }

        let channel = message.mentions.channels.first() || message.guild.channels.fetch(args[0])
        if(!channel){
            return message.channel.send('Ping the channel you want to move')
        }
                
        
        let CateID = args[1]
        if(!CateID){
            return message.channel.send('Provide category ID to move the channel')
        }
        let category =  message.guild.channels.cache.find(c => c.id === CateID && c.type == "category")
        if(category){
            await channel.setParent(category.id)
        }else {
            return false
        }
    
        let ChanEmbed = new Discord.MessageEmbed()
            .setAuthor('Channel Moved')
            .addField('Channel-Name', channel)
            .addField('Category', category.name)
            .setTimestamp()
            .setColor(message.guild.me.displayColor)

        await message.channel.send(ChanEmbed)
    }
}