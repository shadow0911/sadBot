const Discord = require('discord.js');
const ms = require('ms')
const { MuteDataBase } = require('../../models')
const { Guild } = require('../../models')
const moment = require('moment')


module.exports = {
    name: 'warn',

    run: async(client, message, args,prefix) =>{
        await message.delete();

        if(!message.guild.me.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR", "MANAGE_ROLES")){
            return await message.channel.send({embed: new Discord.MessageEmbed()
                .setDescription('Sorry I dont have permission')
                .setColor('FF0000')
            }).then(m => {m.delete({timeout: 5000})
        })
        };

        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")){
            return false;
        }
        
        let warnMember = message.guild.member(message.mentions.users.first() || 
        await message.guild.members.fetch(args[0]))

        let Embed = new Discord.MessageEmbed()
        .setAuthor( 'Command: Warn')
        .setDescription('Warn someone for breaking rules')
        .addField("Usage:", `${prefix}warn [@user/userID] [reason string]`)
        .addField("Example:", `${prefix}warn @shadow~ 1 \n${prefix}warn 142374054245675890 spamming`)
        .setFooter("Bot needs 'MANAGE_ROLES' permission to add mute role")
        .setColor(message.guild.me.displayColor)

        if(!warnMember){
            return await message.channel.send(muteEmbed).then(m =>m.delete({timeout: 10000}))
        }

        if(warnMember.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor("Sorry, you can't warn Mod/Admin😭")
            .setColor('FF0000')
        }).then(m => m.delete({timeout: 5000}))


        let warnReason = args.slice(1).join(' ')
        if(!warnReason.toLowerCase().startsWith("don't") && !warnReason.toLowerCase().startsWith("please")){
            return message.channel.send({embed: new Discord.MessageEmbed()
            .setDescription("Sorry this is not valid way to warn, Please use valid way to warn. e.g: Don't/Please [reason]")
            .setColor(message.guild.me.displayColor)
            }).then(m => m.delete({timeout: 5000}))
        }

        await message.channel.send(`${warnMember} ${warnReason}`)

        
        function genID() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i < 10; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
        }

        let Time = new Date()

        await new MuteDataBase({
            caseID: genID(),
            Action: 'warn',
            guildID: message.guild.id,
            guildName: message.guild.name,
            userName: warnMember.user.tag,
            userID: warnMember.id,
            Reason: warnReason,
            Moderator: message.author.tag,
            Date: Time,
            timestamps: message.createdAt
        }).save().catch(err => console.log(err))

        let logChannel = await Guild.findOne({
            guildID: message.guild.id
        })

        if(!logChannel) return false

        message.guild.channels.cache.get(logChannel.actionLogChannel).send({embed: new Discord.MessageEmbed()
            .setAuthor('A WARN HAS BEEN DETECTED')
            .addField('User', `\`\`\`${warnMember.user.tag}\`\`\``, true)
            .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
            .addField('Date', `\`\`\`${moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\`\`\``, true)
            .addField('Reason', `\`\`\`${warnReason}\`\`\``)
            .setFooter(`${warnMember.id}`)
            .setTimestamp()
            .setColor("#fc5947")
            }) 
    }
}