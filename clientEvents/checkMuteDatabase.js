const Discord = require('discord.js');
const mongoose = require('mongoose');
const { MuteDataBase } = require('../models')
const { Guild } = require('../models');

module.exports = (client, message) =>{
    const checkMute = async () =>{
        console.log("checking")
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
               if(!memberID){
                  await MuteDataBase.findOneAndUpdate({
                   guildID: guildID,
                   userID: userID,
                   isMuted: true
                 },{
                   isMuted: false
                 })
                 return false
               }
               if(muteRole){
                   memberID.roles.remove(muteRole.id)
               }else {
                 await console.log(`${guild.name} don't have muted role`)
               }

               let unMuteEmbed = {
                color: "#03fc4e",
                author: {
                    name: "SADBOT UNMUTE",
                },
                fields: [
                    {
                        name: 'User',
                        value: `\`\`\`${memberID.user.tag}\`\`\``,
                        inline: true
                    },
                    {
                        name: 'Moderator',
                        value: `\`\`\`${client.user.tag}\`\`\``,
                        inline: true
                    },
                    {
                        name: 'Reason for Unmute',
                        value: `\`\`\`[ AUTO ]\`\`\``
                    },
    
                ],
                timestamp: new Date(),
                footer: {
                    text: `${memberID.user.id}`
                }
    
            }

            let logChannel = await Guild.findOne({
                guildID: guildID,
                Active: true
            })
            if(logChannel.LogChannels.InfractionLog){
                try{
                    guild.channels.cache.get(logChannel.LogChannels.InfractionLog).send({embed: unMuteEmbed})
                }catch(err){
                    console.log(err)
                }
            }else {
                return
            }
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
            userID: member.id,
            guildID: guild.id,
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

        const logChannel = await Guild.findOne({
            guildID: guild.id,
            Active: true
        })

        let logEmbed = {
            color: "#fc5947",
            author: {
                name: "SADBOT AUTO MUTE",
            },
            fields: [
                {
                    name: 'User',
                    value: `\`\`\`${member.user.tag}\`\`\``,
                    inline: true
                },
                {
                    name: 'Moderator',
                    value: `\`\`\`${client.user.tag}\`\`\``,
                    inline: true
                },
                {
                    name: 'Duration',
                    value: `\`\`\`∞\`\`\``,
                    inline: true
                },
                {
                    name: 'Reason for Mute',
                    value: `\`\`\`SadBot mute evade detection [ Manual muted ]\`\`\``
                },

            ],
            timestamp: new Date(),
            footer: {
                text: `${member.user.id}`
            }

        }
        if(logChannel.LogChannels.InfractionLog){
            try{
                guild.channels.cache.get(logChannel.LogChannels.InfractionLog).send({embed: logEmbed})
            }catch(err){
                console.log(err)
            }
        }else {
            return
        }

        
            }else {
                return console.log(`${guild} don't have muted role`)
            }
        }

    })
}