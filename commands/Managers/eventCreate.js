const Discord = require('discord.js')
module.exports = {
    name: 'event-create',
    description:'cleans an amount of chat',
    category: 'moderation',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MSg = message.channel.send('Creating..').then(msg => {
            setTimeout(function(){
                msg.edit('✅| Done')
            }, 5000)
        })

        let Manager = message.guild.roles.cache.get('666432713472868354')
        if(!message.member.roles.cache.has(Manager.id)){
            return
        }
        
        message.guild.channels.create('event-zone',
        {
            type: 'text',
            permissionOverwrites: [
                {
                    id: message.guild.roles.everyone,
                    deny: ["SEND_MESSAGES"]
                },
                {
                    id: Manager.id,
                    allow: ["SEND_MESSAGES"],
                },
            ],
            reason: 'Event time!'
        }).then(async channel =>{
    
            let category =  message.guild.channels.cache.find(c => c.name == "💰 ⟩ Only Fans" && c.type == "category")
            if(!category) throw new Error ('The category doesn\'t exist')
            channel.setParent(category.id)

            await channel.updateOverwrite(message.guild.roles.everyone, 
                {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: false
                }
            );
            await channel.updateOverwrite(Manager.id, 
                {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    MANAGE_MESSAGES: true,
                    MANAGE_CHANNELS: false,
                    MENTION_EVERYONE: true
                }
            );
        })

        
       message.guild.channels.cache.get('777068832946257922').send({embed: new Discord.MessageEmbed()
        .setAuthor(`AN event started by ${message.author.tag}`,`${message.author.avatarURL({
            dynamic: true , format: 'png'
        }
        )}`)
            .setTimestamp()
            .setColor('FF0000')
        })

    }
}