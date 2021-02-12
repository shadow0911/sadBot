const Discord = require('discord.js');
const ms = require('ms')
module.exports = {
    name: 'unmute',
    description:'unmutes a muted member',
    category: 'moderation',
    usage:'unmute @user',
    run: async(client, message, args,prefix) =>{
        message.delete();

        if(!message.guild.me.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR", "MANAGE_ROLES")) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor( '| meehh! Sorry I dont have any permissions')
            .setColor('FF0000')
        })
        
        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.author.send('None of your role proccess to use this command')

        let unMuteMember = message.guild.member(message.mentions.users.first() || 
        message.guild.members.cache.get(args[0]))

        if(!unMuteMember) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor( '| Command: Unmute')
            .addField("Usage:", `${prefix}unmute @user/userID`)
            .addField("Example:", `${prefix}mute @shadow \n${prefix}mute 1234567890`)
            .setFooter("Bot needs 'MANAGE_ROLES' permission to Unmute Members")
            .setColor(message.guild.me.displayColor)
        }).then(m =>{
            m.delete({timeout: 10000})
        })

        let mutedRole = message.guild.roles.cache.find(role=> role.name === 'Muted')
        if(!unMuteMember.roles.cache.has(mutedRole.id)){
            return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor( `😢 ${unMuteMember.user.username} is not Muted`)
            .setColor('#FF0000')
            }).then(m=>{
                m.delete({timeout: 5000})
            })
        } else {
            unMuteMember.roles.remove(mutedRole.id)
            message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor( ` ${unMuteMember.user.username} is successfully Unmuted`)
                .setColor('#03ff70')
            }).then(m=>{
                m.delete({timeout: 5000})
            })
        }

    }
}