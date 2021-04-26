const Discord = require('discord.js');
const ms = require('ms')
const { MuteDataBase } = require('../../models')
const { Guild } = require('../../models')

module.exports = {
    name: 'unmute',
    description:'unmutes a muted member',

    run: async(client, message, args,prefix) =>{
        await message.delete();

        if(!message.guild.me.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR", "MANAGE_ROLES")) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor( '| meehh! Sorry I dont have any permissions')
            .setColor('FF0000')
        })
        
        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.author.send('None of your role proccess to use this command')

        let unMuteMember = message.guild.member(message.mentions.users.first() || 
        message.guild.members.fetch(args[0]))

        const Embed = new Discord.MessageEmbed()
        .setAuthor( 'Command - Unmute')
        .addField("Usage", `${prefix}unmute [@user/userID]`)
        .addField("Example", `${prefix}mute @shadow \n${prefix}unmute 1252434566515780`)
        .setFooter("Bot needs 'MANAGE_ROLES' permission to Unmute Members")
        .setColor(message.guild.me.displayColor)

        if(!unMuteMember) return message.channel.send(Embed).then(m =>m.delete({timeout: 10000}))

        const data = MuteDataBase.findOne({
            guildID: message.guild.id,
            userID: unMuteMember.id,
            isMuted: true
        })

        let logChannel = await Guild.findOne({
            guildID: message.guild.id
        })

        if(!logChannel) return false

        let mutedRole = message.guild.roles.cache.find(role=> role.name === 'Muted')
        if(!unMuteMember.roles.cache.has(mutedRole.id)){
            return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor( `**${unMuteMember.user.tag}** is not Muted`)
            .setColor('#FF0000')
        }).then(m=>m.delete({timeout: 5000}))

        
        }else if(data.isMuted == false){
            return message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor( `**${unMuteMember.user.tag}** is not Muted`)
                .setColor('#FF0000')
            }).then(m=>m.delete({timeout: 5000}))
        }else if(data.isMuted == true) {
            await MuteDataBase.findOneAndUpdate({
                userID: unMuteMember.id,
                guildID: message.guild.id,
                isMuted: true
            },{
                isMuted: false
            })

            unMuteMember.roles.remove(mutedRole.id)
            message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor( `**${unMuteMember.user.tag}** is successfully Unmuted`)
                .setColor('#03ff70')
            }).then(m=>m.delete({timeout: 5000}))

            await message.guild.channels.cache.get(logChannel.actionLogChannel).send({embed: new Discord.MessageEmbed()
                .setAuthor('COMMAND EXECUTED UNMUTE')
                .addField('User', `\`\`\`${unMuteMember.user.tag}\`\`\``, true)
                .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
                .addField('Reason', `\`\`\`AUTO\`\`\``)
                .setFooter(`${unMuteMember.id}`)
                .setTimestamp()
                .setColor("#2de355")
            }) 
    
        }else {
            unMuteMember.roles.remove(mutedRole.id)
            message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor( `**${unMuteMember.user.tag}** is successfully Unmuted`)
                .setColor('#03ff70')
            }).then(m=>m.delete({timeout: 5000}))

            await message.guild.channels.cache.get(logChannel.actionLogChannel).send({embed: new Discord.MessageEmbed()
                .setAuthor('COMMAND EXECUTED UNMUTE')
                .addField('User', `\`\`\`${unMuteMember.user.tag}\`\`\``, true)
                .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
                .addField('Reason', `\`\`\`AUTO\`\`\``)
                .setFooter(`${unMuteMember.id}`)
                .setTimestamp()
                .setColor("#2de355")
            }) 
    
        }

    }
}