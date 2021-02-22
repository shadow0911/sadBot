const Discord = require('discord.js');
const mongoose = require('mongoose');
const { MuteDataBase } = require('../models')
const { Guild } = require('../models');

module.exports = (client, message) =>{
    const checkMute = async () =>{
        const now = new Date()
        const conditional = {
            expire: {
                $lt: now
            }, 
            isMuted: true
        }

        const results = await MuteDataBase.find(conditional)
        if(results && results.length){
           for (const result of results) {
               const {guildID, userID} = result

               const guild = client.guilds.cache.get(guildID)
               const member = await guild.members.fetch()
               const memberID = member.get(userID)

               const muteRole = guild.roles.cache.find(role =>{
                   return role.name === "Muted"
               })
               if(muteRole){
                   memberID.roles.remove(muteRole.id)
               }else {
                   return console.log("The user don't have the mute role")
               }


                let logChannel = await Guild.findOne({
                    guildID: guildID
                })
                if(!logChannel) return false

                guild.channels.cache.get(logChannel.actionLogChannel).send({embed: new Discord.MessageEmbed()
                    .setAuthor('Muke has been revoked',`${memberID.user.avatarURL({
                        dynamic: false , format: 'png'
                    }
                )}`)
                .addField('User', `\`\`\`${memberID.user.tag}\`\`\``, true)
                .addField('Moderator', `\`\`\`${client.user.tag}\`\`\``, true)
                .addField('Reason', `\`\`\`sadBot auto mute\`\`\``)
                .setFooter(`${memberID.id}`)
                .setTimestamp()
                .setColor("#03fc4e")
                })
           }
        }

        setTimeout(checkMute, 1000)
        

        await MuteDataBase.updateMany(conditional,{
            isMuted: false
        })
    }
    checkMute()

    client.on('guildMemberAdd', async (member) => {
        const { guild, id} = member

        const muteEvade = await MuteDataBase.findOne({
            userID: id,
            guildID: guild,
            isMuted: true
        })

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i <= 10; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
        }

        const date = new Date()

        if(muteEvade){
            const muteRole = guild.roles.cache.find(role =>{
                return role.name === "Muted"
            })

            if(muteRole){
                member.roles.add(muteRole.id)

                        await new MuteDataBase({
            caseID: makeid(),
            Action: 'Mute',
            guildID: guild.id,
            guildName: guild.name,
            userName: member.user.tag,
            userID: member.id,
            Reason: "SadBot manual mute",
            Moderator: client.user.tag,
            Date: date
        }).save()

        let logChannel = await Guild.findOne({
            guildID: guild.id
        })
        if(!logChannel) return false

        guild.channels.cache.get(logChannel.actionLogChannel).send({embed: new Discord.MessageEmbed()
        .setAuthor('Auto-mute')
        .addField('User:', `\`\`\`${member.user.tag}\`\`\``, true)
        .addField('Moderator:', `\`\`\`${client.user.tag}\`\`\``, true)
        .addField('Reason:', `\`\`\`SadBot mute evade detection [ Manual muted ]\`\`\``)
        .setFooter(`${member.user.id}`)
        .setTimestamp()
        .setColor("#fc5947")
        })
            }else {
                return console.log(`${guild} don't have muted role`)
            }
        }

    })
}