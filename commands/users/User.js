const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const { MuteDataBase} = require('../../models/')
const moment = require('moment')

module.exports = {
    name: 'seek',
    run: async(client, message, args,prefix) =>{
        
        const Member = message.guild.member(message.mentions.users.first() || 
        await message.guild.members.fetch(args[0]));

        let helpEmbed = new MessageEmbed()
        .setAuthor('Command - seek')
        .setDescription('Identify a user and show all the informations about them')
        .setFooter('Usage', `${prefix}seek [mention/ID]`)
        .setFooter('Usage', `${prefix}seek @shadow~ \n${prefix}seek 157395462019463529`)

        let DB = await MuteDataBase.findOne({guildID: message.guild.id, userID: Member.id})
        let data = await MuteDataBase.countDocuments({guildID: message.guild.id, userID: Member.id})

        const roles = Member.roles.cache
        .sort((a,b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1)
        .join(', ') || "none"

        let array = Member.permissions.toArray()
        .join(', ') || "No Permissions"
        let keyperms = array.split("_").join(' ')

        if(!Member){
            message.channel.send(helpEmbed)
            return false;
        }else{
            let Embed = new MessageEmbed()
            Embed.setAuthor(`${Member.user.tag}'s informations`, Member.user.avatarURL({dynamic: true, type: 'png', size: 1024}))
            Embed.addField('User', `\`\`\`${Member.user.tag}\`\`\``, true)
            Embed.addField('User ID', `\`\`\`${Member.user.id}\`\`\``, true)
            if(DB){
                Embed.addField("Logs",`\`\`\`${data}\`\`\``,true)
            }else{
                Embed.addField("Logs", `\`\`\`0\`\`\``,true)
            }
            Embed.addField('Created At', `\`\`\`${moment(Member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(Member.user.createdAt, "YYYYMMDD").fromNow()}\`\`\``,true)
            Embed.addField('Joined at', `\`\`\`${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(Member.joinedAt, "YYYYMMDD").fromNow()}\`\`\``,true)
            Embed.setColor(Member.displayColor)
            message.channel.send(Member.user, Embed).then( async msg => {
                await msg.react("❓")

            const filter = (reaction, user) =>{
                return reaction.emoji.name === '❓' && user.id === message.author.id
            }

            msg.awaitReactions(filter, { max :1}).then(async collected => {

                let Embed = new MessageEmbed()
                Embed.setAuthor(`${Member.user.tag}'s informations`, Member.user.avatarURL({dynamic: true, type: 'png', size: 1024}))
                Embed.addField('User', `\`\`\`${Member.user.tag}\`\`\``, true)
                Embed.addField('User ID', `\`\`\`${Member.user.id}\`\`\``, true)
                if(DB){
                  Embed.addField("Logs",`\`\`\`${data}\`\`\``, true)
                }else{
                  Embed.addField("Logs", `\`\`\`0\`\`\``, true)
                }
                Embed.addField('Created At', `\`\`\`${moment(Member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(Member.user.createdAt, "YYYYMMDD").fromNow()}\`\`\``,true)
                .addField('Joined at', `\`\`\`${moment(Member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(Member.joinedAt, "YYYYMMDD").fromNow()}\`\`\``,true)
                Embed.addField('Roles', roles)
                Embed.addField('Key perms', keyperms.toLowerCase())
                Embed.setColor(Member.displayColor)

                await msg.edit(Embed)
            })
        });


        }
    }
};