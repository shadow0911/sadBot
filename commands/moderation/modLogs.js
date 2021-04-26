const Discord = require('discord.js');
const { MuteDataBase} = require('../../models/')
const moment = require('moment');

module.exports = {
    name: 'logs',
    aliases: ['modlogs'],

    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")){
            return false;
        }

        let findMember = message.content.split(" ")[1]
        const muteMember = findMember.replace('<@', '').replace('>', '').replace('!', '')

        if(!muteMember){
            return message.channel.send({embed: new Discord.MessageEmbed()
                .setDescription(`Couldn't find ${muteMember}`)
                .setColor("#fc5947")
            }).then(m=>m.delete({timeout: 5000}))
        }
        if(message.guild.member(muteMember)){
            const member = await message.guild.members.fetch(muteMember)
            await MuteDataBase.find({
                guildID: message.guild.id,
                userID: `${muteMember}`
            }).sort([
                ['Time','ascending']
            ]).exec((err, res) => {
                if(err){
                    console.log(err)
                }
                let logEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.tag} - Logs`, member.user.avatarURL({
                        dynamic: true, 
                        type: 'png', 
                        size: 1024
                    }))
                if(res.length === 0){
                    message.channel.send({embed: new Discord.MessageEmbed()
                        .setDescription(`<@${muteMember}> has no logs yet`)
                        .setColor("#fc5947")
                    }).then(m=>m.delete({timeout: 5000}))
                    return false
                }else if(res.length){
                    logEmbed.setColor(message.guild.me.displayColor)
                    for(i = 0; i < res.length; i++){
                        logEmbed.addField(`**${i + 1}**• [ ${res[i] && res[i].Action} ]`,[
                            `\`\`\`yml\nUser:      ${res[i] && res[i].userName}`,
                            `Reason:    ${res[i] && res[i].Reason}`,
                            `Moderator: ${res[i] && res[i].Moderator}`,
                            `Time:      ${moment(res[i] && res[i].Date).format('llll')}`,
                            `LogID:     ${res[i] && res[i].caseID}\`\`\``
                        ])
                    }
                    logEmbed.setFooter(`${muteMember.id}`,)
                    logEmbed.setTimestamp()
                }
                message.channel.send(`${member.user}`,{embed: logEmbed})
            })
        }else {
            await MuteDataBase.find({
                guildID: message.guild.id,
                userID: `${muteMember}`
            }).sort([
                ['Time','ascending']
            ]).exec((err, res) => {
                if(err){
                    console.log(err)
                }
                let logEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${muteMember} - Logs`, )
                if(res.length === 0){
                    message.channel.send({embed: new Discord.MessageEmbed()
                        .setDescription(`<@${muteMember}> has no logs yet`)
                        .setColor("#fc5947")
                    }).then(m=>m.delete({timeout: 5000}))
                    return false
                }else if(res.length){
                    logEmbed.setColor(message.guild.me.displayColor)
                    for(i = 0; i < res.length; i++){
                        logEmbed.addField(`**${i + 1}**• [ ${res[i] && res[i].Action} ]`,[
                            `\`\`\`yml\nUser:      ${res[i] && res[i].userName}`,
                            `Reason:    ${res[i] && res[i].Reason}`,
                            `Moderator: ${res[i] && res[i].Moderator}`,
                            `Time:      ${moment(res[i] && res[i].Date).format('llll')}`,
                            `LogID:     ${res[i] && res[i].caseID}`,
                            `Status:     Member left the server of BANNED\`\`\``
                        ])
                    }
                    logEmbed.setFooter(`${muteMember}`,)
                    logEmbed.setTimestamp()
                }
                message.channel.send(`<@${muteMember}>`,{embed: logEmbed})
            })
        }
    }
}