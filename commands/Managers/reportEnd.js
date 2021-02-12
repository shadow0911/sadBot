const Discord = require('discord.js');

module.exports = {
    name: 'end-report',
    description:'ends the report channel',
    category: 'moderation',
    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return

        if(!message.channel.name.startsWith('report-by')){
            return message.channel.send('you can end reports channel only')
        }

       await message.channel.delete()


       message.guild.channels.cache.get('777068832946257922').send({embed: new Discord.MessageEmbed()
        .setAuthor('Report ended',`${message.author.avatarURL({
            dynamic: true , format: 'png'
        })}`)
        .addField('Report ended by:', `${message.author}`, true)
        .setTimestamp()
        .setColor(message.guild.me.displaycolor)
    });
    }
}