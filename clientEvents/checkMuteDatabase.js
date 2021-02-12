const Discord = require('discord.js');
const mongoose = require('mongoose');
const { MuteDataBase } = require('../models')
const { Guild } = require('../models');

module.exports = client =>{
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
                   return role.name === "Muted" || "muted"
               })

               memberID.roles.remove(muteRole.id)

                let logChannel = await Guild.findOne({
                    guildID: guildID
                })
                if(!logChannel) return false

                guild.channels.cache.get(logChannel.actionLogChannel).send({embed: new Discord.MessageEmbed()
                    .setAuthor('Action: Unmute',`${memberID.user.avatarURL({
                        dynamic: false , format: 'png'
                    }
                )}`)
                .addField('User:', `\`\`\`${memberID.user.tag}\`\`\``, true)
                .addField('Moderator:', `\`\`\`${client.user.tag}\`\`\``, true)
                .addField('Reason:', `\`\`\`Auto\`\`\``)
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
}