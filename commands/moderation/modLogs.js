const Discord = require('discord.js');
const { MuteDataBase} = require('../../models/')
const moment = require('moment');

module.exports = {
    name: 'logs',
    aliases: ['modlogs'],
    description:'mutes a memer for a specific amount of time',
    category: 'moderation',
    usage:'mute @user 10m for spamming',
    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")){
            return false;
        }

        let muteMember = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))

         await MuteDataBase.find({
            guildID: message.guild.id,
            userID: `${muteMember.id}`
        }).sort([
            ['Time','ascending']
        ]).exec((err, res) => {
            if(err){
                console.log(err)
            }
            let logEmbed = new Discord.MessageEmbed()
            .setAuthor(`${muteMember.user.tag} - Logs`, `${muteMember.user.avatarURL({
                dynamic: true , format: 'png'
            })}`)
            if(res.length === 0){
                message.channel.send({embed: new Discord.MessageEmbed()
                .setDescription(`**${muteMember.user.tag}** has no logs yet`)
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
                logEmbed.setFooter(`${muteMember.user.id}`,)
                logEmbed.setTimestamp()
            }
            message.channel.send(`${muteMember.user}`,{embed: logEmbed})
        })
    }
}