const Discord = require('discord.js');
const { Guild, MuteDataBase } = require('../models');

module.exports = async (client, message) =>{

    client.on('guildBanAdd', async(guild, member) =>{
        let logChannel = await Guild.findOne({
            guildID: guild.id
        })
        if(!logChannel){
            return false
        }

        const fetchedLogs = await guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD'
        })

        const BanLog = fetchedLogs.entries.first()
        
        if(!BanLog){
            return console.log(`${member.id} was banned from ${guild.name} but couldn't find any informations`)
        }

        const { executor, target, reason } = BanLog

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i <= 10; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
        }

        const banEmbed = {
            color: "#fc5947",
            author: {
                name: `SADBOT BAN DETECTION`,
                icon_url: member.avatarURL({
                    dynamic: true , 
                    type: 'png'
                })
            },
            fields: [
                {
                    name: `User`,
                    value: `\`\`\`${member.tag}\`\`\``,
                    inline: true
                },
                {
                    name: `Moderator`,
                    value: `\`\`\`${executor.tag}\`\`\``,
                    inline: true
                },
                {
                    name: `Reason for Ban`,
                    value: `\`\`\`${reason || 'No reason provided'}\`\`\``,
                    inline: false
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `${member.id}`
            }
        }

        if(target.id === member.id){

            await new MuteDataBase({
                caseID: makeid(),
                Action: "BAN",
                guildID: guild.id,
                guildName: guild.name,
                userName: member.tag,
                userID: member.id,
                Reason: reason || 'No reason provided',
                Moderator: executor.tag,
                Banned: true,
                Date: new Date(),
            }).save().catch(err => console.log(err.message))

            guild.channels.cache.get(logChannel.adminLogChannel).send({embed: banEmbed})
        }else {
            guild.channels.cache.get(logChannel.adminLogChannel).send({embed: banEmbed})
        }
    })
}