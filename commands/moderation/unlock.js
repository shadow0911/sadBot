const Discord = require('discord.js');
const ms = require('ms')
module.exports = {
    name: 'unlock',
    description:'unlock a locked channel',
    category: 'moderation',
    usage:'unlock #chat',
    run: async(client, message, args,prefix) =>{
        message.delete();

        if (!message.guild.me.permissions.has('MANAGE_GUILD', 'MANAGE_CHANNELS', 'ADMINISTRATOR')) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor( 'Provide me permission please ;-;')
            .setColor('FF0000')
            }).then(message => {
                message.delete({timeout: 5000})
        })
        
        if (!message.member.permissions.has('MANAGE_GUILD', 'MANAGE_CHANNELS', 'ADMINISTRATOR')) return

        let unlockChannel = message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) ||
        message.channel;

        unlockChannel.overwritePermissions([
            {
                id: message.guild.id,
                null : ['SEND_MESSAGES'],
            },
        ],);

        const embed = new Discord.MessageEmbed()
        .setTitle("Channel permission updated")
        .setDescription(`🔓 ${unlockChannel} has been Unlocked`)
        .setColor('#03fc35');
        await message.channel.send(embed)
            
    }
}