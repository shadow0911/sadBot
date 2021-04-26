const Discord = require('discord.js');
const { MuteDataBase } = require('../../models')
const moment = require('moment')
module.exports = {
    name: 'admin-log',
    aliases: ["adminlog"],

    run: async(client, message, args,prefix) =>{
        let cmd = args[0];

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return message.author.send('None of your role proccess to use this command')
        }

        switch(cmd){
            case "infraction":{
                await MuteDataBase.find({
                    guildID: message.guild.id,
                }).sort([
                    ['Time','ascending']
                ]).exec((err, res) => {
                    if(err){
                        console.log(err)
                    }
                    let logEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Logs`)

                    let pageNo = Math.ceil(res.length / 10)
                    let page = parseInt(args[1])
                    if(page != Math.floor(page)) page = 1
                    if(!page) page = 1
                    let end = page * 10
                    let start = (page * 10) - 10

                    if(res.length === 0){
                        message.channel.send({embed: new Discord.MessageEmbed()
                        .setDescription(`**${message.guild.name}** has no logs yet`)
                        .setColor("#fc5947")
                        }).then(m=>m.delete({timeout: 5000}))
                        return false
                    }else if(res.length <= start){
                        message.channel.send({embed: new Discord.MessageEmbed()
                            .setDescription(`Page ${page} does not exist`)
                            .setColor("#fc5947")
                            }).then(m=>m.delete({timeout: 5000}))
                            return false
                    }else if(res.length <= end){
                        logEmbed.setColor(message.guild.me.displayColor)
                        logEmbed.setFooter(`Page: ${page}/${pageNo}`,)
                        logEmbed.setTimestamp()
                        for(i = start; i < res.length; i++){
                            logEmbed.addField(`**${i + 1}**• [ ${res[i] && res[i].Action} ]`,[
                                `\`\`\`yml\nUser:      ${res[i] && res[i].userName}`,
                                `Reason:    ${res[i] && res[i].Reason}`,
                                `Moderator: ${res[i] && res[i].Moderator}`,
                                `Time:      ${moment(res[i] && res[i].Date).format('llll')}`,
                                `LogID:     ${res[i] && res[i].caseID}\`\`\``
                            ])
                        }
                    }else {
                        logEmbed.setColor(message.guild.me.displayColor)
                        logEmbed.setFooter(`Page: ${page}/${pageNo}`,)
                        logEmbed.setTimestamp()
                        for(i = start; i < end; i++){
                            logEmbed.addField(`**${i + 1}**• [ ${res[i] && res[i].Action} ]`,[
                                `\`\`\`yml\nUser:      ${res[i] && res[i].userName}`,
                                `Reason:    ${res[i] && res[i].Reason}`,
                                `Moderator: ${res[i] && res[i].Moderator}`,
                                `Time:      ${moment(res[i] && res[i].Date).format('llll')}`,
                                `LogID:     ${res[i] && res[i].caseID}\`\`\``
                            ])
                        }
                    }
                    message.channel.send(logEmbed)
                })
            }
            break;

            case "ismuted":{
                await MuteDataBase.find({
                    guildID: message.guild.id,
                    isMuted: true
                }).sort([
                    ['Time','ascending']
                ]).exec((err, res) => {
                    if(err){
                        console.log(err)
                    }
                    let logEmbed = new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - isMuted`)

                    let pageNo = Math.ceil(res.length / 10)
                    let page = parseInt(args[1])
                    if(page != Math.floor(page)) page = 1
                    if(!page) page = 1
                    let end = page * 10
                    let start = (page * 10) - 10

                    if(res.length === 0){
                        message.channel.send({embed: new Discord.MessageEmbed()
                        .setDescription(`No one is muted`)
                        .setColor("#fc5947")
                        }).then(m=>m.delete({timeout: 5000}))
                        return false
                    }else if(res.length <= start){
                        message.channel.send({embed: new Discord.MessageEmbed()
                            .setDescription(`Page ${page} does not exist`)
                            .setColor("#fc5947")
                            }).then(m=>m.delete({timeout: 5000}))
                            return false
                    }else if(res.length <= end){
                        logEmbed.setColor(message.guild.me.displayColor)
                        logEmbed.setFooter(`Page: ${page}/${pageNo}`,)
                        logEmbed.setTimestamp()
                        for(i = start; i < res.length; i++){
                            logEmbed.addField(`**${i + 1}**• [ ${res[i] && res[i].Action} ]`,[
                                `\`\`\`yml\nUser:      ${res[i] && res[i].userName}`,
                                `Reason:    ${res[i] && res[i].Reason}`,
                                `Moderator: ${res[i] && res[i].Moderator}`,
                                `Time:      ${moment(res[i] && res[i].Date).format('llll')}`,
                                `user ID: ${res[i] && res[i].userID}`,
                                `LogID:     ${res[i] && res[i].caseID}\`\`\``
                            ])
                        }
                    }else {
                        logEmbed.setColor(message.guild.me.displayColor)
                        logEmbed.setFooter(`Page: ${page}/${pageNo}`,)
                        logEmbed.setTimestamp()
                        for(i = start; i < end; i++){
                            logEmbed.addField(`**${i + 1}**• [ ${res[i] && res[i].Action} ]`,[
                                `\`\`\`yml\nUser:      ${res[i] && res[i].userName}`,
                                `Reason:    ${res[i] && res[i].Reason}`,
                                `Moderator: ${res[i] && res[i].Moderator}`,
                                `Time:      ${moment(res[i] && res[i].Date).format('llll')}`,
                                `user ID: ${res[i] && res[i].userID}`,
                                `LogID:     ${res[i] && res[i].caseID}\`\`\``
                            ])
                        }
                    }
                    message.channel.send(logEmbed)
                })
            }
        }
    }
}