const Discord = require('discord.js');
const { Guild } = require('../../models');
module.exports = {
    name: 'unlock',

    run: async(client, message, args,prefix) =>{
        await message.delete();

        const log = await Guild.findOne({
            guildID: message.guild.id
        })

        if (!message.guild.me.permissions.has('MANAGE_GUILD', 'MANAGE_CHANNELS', 'ADMINISTRATOR')) return message.channel.send({embed: new Discord.MessageEmbed()
            .setDescription( 'Provide me permission please :/')
            .setColor('FF0000')
            }).then(m => m.delete({timeout: 5000}))
        
        if(!message.member.permissions.has('MANAGE_GUILD', 'MANAGE_CHANNELS', 'ADMINISTRATOR')){
            return message.author.send('None of your role proccess to use this command')
        }

        let unlockChannel = message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) || 
        message.channel;

        await unlockChannel.updateOverwrite(message.guild.roles.everyone, 
            {
                VIEW_CHANNEL: null,
                SEND_MESSAGES: true
            }
        );

        const embed = new Discord.MessageEmbed()
        .setAuthor("Channel permission updated")
        .setDescription(`🔓 ${unlockChannel} has been Unlocked`)
        .setThumbnail("https://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png")
        .setColor("#e0310d");
        await message.channel.send(embed)

        if(!log.adminLogChannel){
            return false
        }else {
            const lockDetectionEmbed = {
                author: {
                    name: `${client.user.username} - Unlock detection`
                },
                fields: [
                    {
                        name: "Channel",
                        value: `${unlockChannel}`,
                        inline: true
                    },
                    {
                        name: "Moderator",
                        value: `\`\`\`${message.author.tag}\`\`\``,
                        inline: true
                    }
                ],
                color: message.guild.me.displayColor,
                timeStamp: new Date()
            }
            message.guild.channels.cache.get(log.adminLogChannel).send({embed: lockDetectionEmbed})

        }
            
    }
}