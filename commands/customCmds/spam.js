const Discord = require('discord.js');

module.exports = {
    name: 'spam',
    aliases:['nospam'],
    description:'Gives a spam not allowed message',
    category: 'customCmds',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        if(!message.member.permissions.has("MANAGE_MESSAGES","ADMINISTRATOR")) return
        await message.channel.send({embed: new Discord.MessageEmbed()
        .setAuthor('NOTE')
        .setDescription('Spamming not allowed. Spamming can get you **Muted/Banned** from the server. Be a good member and follow the rules of the community. Thank you.')
        .setColor(message.guild.me.displayColor)
        })
    }
}