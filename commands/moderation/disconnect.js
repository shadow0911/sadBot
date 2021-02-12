const Discord = require('discord.js');
const ms = require('ms')
module.exports = {
    name: 'disconnect',
    aliases: ['dc'],
    description:'lock a channel',
    category: 'moderation',
    usage:'lock #chat',
    run: async(client, message, args,prefix) =>{

        if(!message.guild.me.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR", "MANAGE_ROLES")) return message.channel.send('None of my role proccess to use this command')
        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.author.send('None of your role proccess to use this command')

        let voiceMember = message.guild.member(message.mentions.users.first() || 
        await message.guild.members.fetch(args[0]))

        if(voiceMember.permissions.has("ADMINISTRATOR")) return message.channel.send('Sorry i can\'t disconnect this user')

        voiceMember.voice.kick(['Diconnected by a moderator']);

        await message.channel.send(`${voiceMember.user.tag} has been disconnected`)

        message.guild.channels.cache.get('777068832946257922').send({embed: new Discord.MessageEmbed()
            .setAuthor('Action: Disconnect',`${voiceMember.user.avatarURL({
                dynamic: true , format: 'png'
            }
            )}`)
            .addField('User:', `${voiceMember.user}`, true)
            .addField('Moderator:', `${message.author}`, true)
            .setTimestamp()
            .setColor('#42f563')
        })
    }
}