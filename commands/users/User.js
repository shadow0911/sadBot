const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')
const { MuteDataBase} = require('../../models/')
const moment = require('moment');
const { db } = require('../../models/server_settings');

module.exports = {
    name: 'seek',
    aliases: ["fetch", "whois"],
    run: async(client, message, args,prefix) =>{

        let findMember = message.content.split(" ")[1];
        const Member = findMember.replace('<@', '').replace('>', '').replace('!', '');

        let helpEmbed = new MessageEmbed()
            .setAuthor('Command - seek')
            .setDescription('Identify a user and show all the informations about them')
            .setFooter('Usage', `${prefix}seek [mention/ID]`)
            .setFooter('Usage', `${prefix}seek @shadow~ \n${prefix}seek 157395462019463529`)

        const DB = await MuteDataBase.findOne({
            guildID: message.guild.id, 
            userID: Member
        })
        const data = await MuteDataBase.countDocuments({
            guildID: message.guild.id, 
            userID: Member
        })
        const bannedData = await MuteDataBase.findOne({
            guildID: message.guild.id, 
            userID: Member,
            Action: "BAN"
        })
 
        if(!args.length){
            message.channel.send(helpEmbed)
            return false;
        }else if(message.guild.member(Member)){
            const user = await message.guild.members.fetch(Member);

            const roles = user.roles.cache
            .sort((a,b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1)
            .join(', ') || "none"
    
            let array = user.permissions.toArray()
            .join(', ') || "No Permissions"
            let keyperms = array.split("_").join(' ')

            let Embed = new MessageEmbed()
            Embed.setAuthor(`${user.user.tag}'s informations`, user.user.avatarURL({
                dynamic: true, 
                type: 'png', 
                size: 1024
            }))
            Embed.setThumbnail(user.user.avatarURL({
                dynamic: true, 
                type: 'png', 
                size: 1024
            }))
            Embed.addField('User', `\`\`\`${user.user.tag}\`\`\``, true)
            Embed.addField('User ID', `\`\`\`${user.user.id}\`\`\``, true)
            Embed.addField("Logs", data ? `\`\`\`${data}\`\`\`` : "\`\`\`0\`\`\`", true)
            Embed.addField('Created At', `\`\`\`${moment(user.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(user.user.createdAt, "YYYYMMDD").fromNow()}\`\`\``,true)
            Embed.addField('Joined at', `\`\`\`${moment(user.joinedAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(user.joinedAt, "YYYYMMDD").fromNow()}\`\`\``,true)
            Embed.setColor(user.displayColor)
            message.channel.send(user.user, Embed).then( async msg => {
                await msg.react("❓")

            const filter = (reaction, user) =>{
                return reaction.emoji.name === '❓' && user.id === message.author.id
            }

            msg.awaitReactions(filter, { max :1}).then(async collected => {

                let Embed = new MessageEmbed()
                Embed.setAuthor(`${user.user.tag}'s informations`, user.user.avatarURL({dynamic: true, type: 'png', size: 1024}))
                Embed.addField('User', `\`\`\`${user.user.tag}\`\`\``, true)
                Embed.addField('User ID', `\`\`\`${user.user.id}\`\`\``, true)
                Embed.setThumbnail(user.user.avatarURL({
                    dynamic: true, 
                    type: 'png', 
                    size: 1024
                }))
                Embed.addField("Logs", data ? `\`\`\`${data}\`\`\`` : "\`\`\`0\`\`\`", true)
                Embed.addField('Created At', `\`\`\`${moment(user.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(user.user.createdAt, "YYYYMMDD").fromNow()}\`\`\``,true)
                .addField('Joined at', `\`\`\`${moment(user.joinedAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(user.joinedAt, "YYYYMMDD").fromNow()}\`\`\``,true)
                Embed.addField(`Roles [${user.roles.cache.size}]`, roles)
                Embed.addField('Key perms', `\`\`\`${keyperms.toLowerCase()}\`\`\``)
                Embed.setColor(user.displayColor)

                await msg.edit(Embed)
            })
        });
        }else{
            try {
                const banList = await message.guild.fetchBans(Member);
                const bannedMember = banList.find(user => user.user.id == Member)

                if(banList){
                    let Embed = new MessageEmbed()
                    Embed.setAuthor(`${bannedMember.user.username}'s informations`)
                    Embed.addField('User', `\`\`\`${bannedMember.user.tag}\`\`\``, true)
                    Embed.addField('User ID', `\`\`\`${bannedMember.user.id}\`\`\``, true)
                    Embed.addField("Logs", data ? `\`\`\`${data}\`\`\`` : "\`\`\`0\`\`\`", true)
                    Embed.setThumbnail(bannedMember.user.avatarURL({
                        dynamic: true, 
                        type: 'png', 
                        size: 1024
                    }))
                    Embed.addField("Ban Reason", `\`\`\`${bannedMember.reason}\`\`\``)
                    Embed.addField('Created At', `\`\`\`${moment(bannedMember.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} - ${moment(bannedMember.user.createdAt, "YYYYMMDD").fromNow()}\`\`\``,true)
                    Embed.setColor("#f22944")
                    message.channel.send(Embed)
                }
              } catch{
                message.channel.send({embed: new MessageEmbed()
                    .setDescription(`\`\`\`Couldn't find any user by this ID ${Member}\`\`\``)
                    .setColor("#f22944")
                })
              }
        }
    }
};