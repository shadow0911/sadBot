const Discord = require('discord.js');
const ms = require('ms')
const { Guild } = require('../../models')
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

        voiceMember.voice.kick([`SadBot disconnect command - used by ${message.author.tag}`]);

        await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription(`${voiceMember.user.tag} has been disconnected`)
        .setColor(message.guild.me.displayColor)
        })

        let Settings = await Guild.findOne({
            guildID: message.guild.id
        })

        message.guild.channels.cache.get(Settings.ModAction).send({embed: new Discord.MessageEmbed()
            .setAuthor('Command executed DISCONNECT',`${voiceMember.user.avatarURL({
                dynamic: true , format: 'png'
            }
            )}`)
            .addField('User', `\`\`\`${voiceMember.tag || voiceMember.user.tag}\`\`\``, true)
            .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
            .setFooter(`${voiceMember.id}`)
            .setTimestamp()
            .setColor(message.guild.me.displayColor)
        })
    }
}