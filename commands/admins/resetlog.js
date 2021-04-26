const Discord = require('discord.js');
const { Guild } = require('../../models');
const { MuteDataBase }= require('../../models')
const moment = require('moment');
const ms = require('ms');
module.exports = {
    name: 'reset-log',
    aliases: ['remove-log'],

    run: async(client, message, args,prefix) =>{

        if (!message.member.permissions.has("ADMINISTRATOR")){
            return
        }
        let Member = message.guild.member(message.mentions.users.first() || 
        await message.guild.members.fetch(args[0]))

        let Embed = new Discord.MessageEmbed()
        .setAuthor('RESET - LOGS')
        .setDescription(`\`\`\`${Member.user.tag} all logs will deleted from the database. Do you want to continue?\`\`\``)
        .setColor('#f25044')

        let MSG = await message.channel.send(`${Member.user.tag} all logs will deleted from the database. Do you want to continue? (yes/cancel)`,Embed)

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

                let newEmbed = new Discord.MessageEmbed()
                .setAuthor(`LOG RESET`)
                .setDescription(`\`\`\`${Member.user.tag} logs has been deleted\`\`\``)
                .setThumbnail("https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png")
                .setFooter(Member.userID)
                .setTimestamp()
                .setColor("#f25044")


                await message.guild.channels.cache.get(logChannel.adminLogChannel).send(newEmbed)

                await MuteDataBase.deleteMany({guildID: message.guild.id, userID: Member.id}, function(err, doc){
                    if(err) console.log(err)
                })

                MSG.edit(newEmbed)
            }
        })
        Collector.on('end', () =>{

        })
    }
}