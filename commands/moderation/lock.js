const Discord = require('discord.js');
const ms = require('ms')
module.exports = {
    name: 'lock',
    description:'lock a channel',
    category: 'moderation',
    usage:'lock #chat',
    run: async(client, message, args,prefix) =>{
        message.delete();

        if (!message.guild.me.permissions.has('MANAGE_GUILD', 'MANAGE_CHANNELS', 'ADMINISTRATOR')) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor( 'Provide me permission please :/')
            .setColor('FF0000')
            }).then(message => {
                message.delete({timeout: 5000})
        })
        
        if (!message.member.permissions.has('MANAGE_GUILD', 'MANAGE_CHANNELS', 'ADMINISTRATOR')) return message.channel.send({embed: new Discord.MessageEmbed()
        .setAuthor( ' Sorry You don\'t have permission 😢')
        .setColor('FF0000')
        }).then(message => {
            message.delete({timeout: 5000})
        })

        let lockChannel = message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) || 
        message.channel;

        lockChannel.overwritePermissions([
            {
                id: message.guild.id,
                deny : ['SEND_MESSAGES', 'ADD_REACTIONS'],
            },
        ],);
        
        let lockReason = args.slice(1).join(' ') || 'This channel is locked. Come back later'
        await lockChannel.send(lockReason)
        
        let lockEmbed = args.slice(1).join(' ') || 'No reason provided'

        const embed = new Discord.MessageEmbed()
        .setTitle("Channel permission updated")
        .setDescription(`🔒 ${lockChannel} has been Locked`)
        .addField('Reason:', `${lockEmbed}`)
        .setColor("#e0310d");
        await message.channel.send(embed)
            
    }
}