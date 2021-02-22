const Discord = require('discord.js');
const flag = (
    "MANAGE_MESSAGES"
)
const { Guild } = require('../../models')
module.exports = {
    name: 'clean',
    aliases: ['clear'],
    description:'cleans an amount of chat',
    category: 'moderation',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        await message.delete();

        if(!message.guild.me.permissions.has(
        "MANAGE_MESSAGES",
        "MANAGE_GUILD",
        "ADMINISTRATOR"
        ))return

        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.author.send("None of your role process to use this command")

        let EMBED = new Discord.MessageEmbed()
        .setAuthor('COMMAND - PURGE')
        .setDescription('Clean every message of the channel. Limit: 100')
        .addField('Usage:', `${prefix}purge [number of message] [@user/userID] \nExample:\n${prefix}purge 10 @shadow~`)
        .setColor(message.guild.me.displayColor)

        const amount = parseInt(message.content.split(' ')[1])

        if (!amount){
            message.channel.send(EMBED).then(m =>m.delete({timeout: 5000}))
        }

        if(isNaN(amount)) return message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription('Please provide number between 1 - 100 to clean')}).then(m =>{
            m.delete({timeout: 5000})
        })

        if(amount >= 501) return message.channel.send({embed: new Discord.MessageEmbed()
            .setDescription('❌ | I Can\'t clean more than 100 message at once 😢')
            .setColor('#FF0000')
            }).then(m =>{
                m.delete({timeout: 5000})
        })

        await message.channel.messages.fetch().then(messages =>{
            messages = messages.filter(m =>!m.pinned).array().slice(0, amount)
            message.channel.bulkDelete(messages).then(async () =>{
                let Settings = await Guild.findOne({
                    guildID: message.guild.id
                })

                await message.guild.channels.cache.get(Settings.ModAction).send({embed: new Discord.MessageEmbed()
                    .setAuthor('Command executed CLEAN',`${message.author.avatarURL({
                        dynamic: true , format: 'png'
                    }
                    )}`)
                    .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
                    .addField('Message Amount', `\`\`\`${amount}\`\`\``, true)
                    .addField('Channel', `${message.channel}`, true)
                    .setTimestamp()
                    .setColor(message.guild.me.displayColor)
                    })
            })
        }).catch((err) => console.log(err))

    }
}