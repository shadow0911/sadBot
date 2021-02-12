const Discord = require('discord.js')
module.exports = {
    name: 'event-end',
    description:'cleans an amount of chat',
    category: 'moderation',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MSg = message.channel.send('Deleted')

        let Manager = message.guild.roles.cache.get('666432713472868354')
        if(!message.member.roles.cache.has(Manager.id)){
            return
        }

       let evtChan = message.guild.channels.cache.find(c => c.name === 'event-zone')
       evtChan.delete()


       message.guild.channels.cache.get('777068832946257922').send({embed: new Discord.MessageEmbed()
        .setAuthor(`AN event ended by ${message.author.tag}`,`${message.author.avatarURL({
            dynamic: true , format: 'png'
        }
        )}`)
            .setTimestamp()
            .setColor('FF0000')
        })

    }
}