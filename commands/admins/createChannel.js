const Discord = require('discord.js')
module.exports = {
    name: 'create-channel',
    description:'deletes a channel',
    category: 'Admin',
    run: async(client, message, args,prefix) =>{

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return
        }

        let chanName = args[0]

        message.channel.send('Creating...').then(message => {
            message.guild.channels.create(`${chanName}`,
            {
                type: 'text',
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone,
                        deny: ["SEND_MESSAGES"]
                    },
                ],
                reason: 'sadBot channel creation'
            }).then(async channel =>{
                let CateID = args[1]
                let category =  message.guild.channels.cache.find(c => c.id === CateID && c.type == "category")
                if(category){
                    await channel.setParent(category.id)
                }else {
                    return false
                }
    
                await channel.updateOverwrite(message.guild.roles.everyone, 
                    {
                        VIEW_CHANNEL: false,
                        SEND_MESSAGES: false
                    }
                );
    
                let ChanEmbed = new Discord.MessageEmbed()
                .setAuthor('Channel created')
                .addField('Name', chanName)
                .setTimestamp()
                .setColor(message.guild.me.displayColor)
                if(category){
                    ChanEmbed.addField('Category', category.name)
                }
                
    
                message.edit(ChanEmbed)
            })
        })
    }
}