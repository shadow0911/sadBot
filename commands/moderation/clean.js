const Discord = require('discord.js');
const flag = (
    "MANAGE_MESSAGES"
)
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

        let msgCount = parseInt(args[0]);

        if(!msgCount) return message.channel.send({embed: new Discord.MessageEmbed()
        .setAuthor('Commands: Clean')
        .setDescription("Cleans an amount of messages (limit:100)")
        .setTitle("Aliases: clear")
        .addField('Usage:', `${prefix}clean <number of message> \nExample:\n${prefix}clean 100 \n${prefix}clear 50`)
        .setColor(message.guild.me.displayColor)
        })

        if(isNaN(msgCount)) return message.channel.send('Please provide a number between to 1 - 100').then(m =>{
            m.delete({timeout: 5000})
        })

        if(msgCount > 101) return message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription('❌ |I Can\'t delete more than 100 message at once 😭')
        .setColor('#FF0000')
        }).then(m =>{
            m.delete({timeout: 5000})
        })

        await message.channel.messages.fetch({limit: msgCount}).then(msg =>{
            message.channel.bulkDelete(msg)
        }).catch((err) => console.log(err))
        await message.channel.send(`Cleaned ${msgCount} messages`).then(msg =>{
            msg.delete({timeout: 3000})
        })

        message.guild.channels.cache.get('797469055001821235').send({embed: new Discord.MessageEmbed()
            .setAuthor('Action: Clean',`${message.author.avatarURL({
                dynamic: true , format: 'png'
            }
            )}`)
            .addField('Moderator:', `${message.author}`, true)
            .addField('Message Amount:', `${msgCount}`, true)
            .addField('Channel:', `${message.channel}`, true)
            .setTimestamp()
            .setColor('FF0000')
            })

    }
}