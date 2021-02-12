const Discord = require('discord.js');
const { Guild } = require('../../models');
const { MuteDataBase }= require('../../models')
const moment = require('moment');
module.exports = {
    name: 'delete-log',
    aliases: ['remove-log'],

    run: async(client, message, args,prefix) =>{

    let Managers = message.guild.roles.cache.get('666432713472868354');

    if (!message.member.roles.cache.has(Managers.id) && !message.member.permissions.has("ADMINISTRATOR")){
        return
    }

    let logID = args[0]
    if(!logID){
        return message.channel.send('Invalid log ID | Please provide a valid log ID')
    }

    let findLog = await MuteDataBase.findOne({guildID: message.guild.id, caseID: logID})
    if(!findLog){
        return message.channel.send('no case by this ID')
    }else{
        let Embed = new Discord.MessageEmbed()
        .setAuthor(`${findLog.userName} - Log ID: ${findLog.caseID}`)
        .setDescription(`\`\`\`yml\nUser:          ${findLog.userName}\nReason:        ${findLog.Reason}\nModerator:     ${findLog.Moderator}\nTime:          ${moment(findLog.Date).format('llll')}\nAuthor:        ${message.author.tag}\`\`\``)
        .setColor("#f25044")
        .setFooter('Type "cancel" to cancel the command')

        message.channel.send("Do you want to delete the Log? Type 'yes' in chat to continue...",Embed)  
        
        
        const filter = (m) => {
            if(m.content.toLowerCase() == 'cancel'){
                message.channel.send('❎canceled command').then(m => m.delete({timeout: 5000}))
                return false;
            }
            return m.author.id === message.author.id;
        };

        const Collector = message.channel.createMessageCollector(filter, { max: 1});
        Collector.on('collect', async(collected) =>{
            if (collected.content.toLowerCase() === 'yes'){

                let logChannel = await Guild.findOne({guildID: message.guild.id })

                let Embed = new Discord.MessageEmbed()
                .setAuthor(`Log ID: ${findLog.caseID} has been removed`)
                .setDescription(`\`\`\`yml\nUser:          ${findLog.userName}\nReason:        ${findLog.Reason}\nModerator:     ${findLog.Moderator}\nTime:          ${moment(findLog.Date).format('llll')}\nAuthor:        ${message.author.tag}\`\`\``)
                .setFooter(findLog.userID)
                .setTimestamp()
                .setColor("#f25044")

                await message.guild.channels.cache.get(logChannel.adminLogChannel).send(Embed)

                await MuteDataBase.findOneAndDelete({guildID: message.guild.id, caseID: logID}, function(err, doc){
                    if(err) console.log(err)
                })

                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`sadBot - Detete Log`)
                    .setDescription(`Log **${logID}** has been deleted from database`)
                    .setColor("#66ff6b")
                    .setFooter("Once a data has been delete, there's no way to retrieve it")
                    .setThumbnail("https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png")
                }).then(m =>m.delete({timeout: 5000}))
            }
        })

        Collector.on('end', () =>{

        })
        }
    }
}