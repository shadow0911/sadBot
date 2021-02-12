const Discord = require('discord.js');

module.exports = {
    name: 'weeb',
    aliases: ['otaku'],
    description:'Gives a spam not allowed message',
    category: 'customCmds',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        if(!message.member.permissions.has("MANAGE_MESSAGES","ADMINISTRATOR")) return
        await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription("If you like anime and consider yourself as weeb/otaku then we have an entire chat for weeb/otaku <#704986448142663701>. You can chat about anime and stuff and make weeb friends")
        .setColor(message.guild.me.displayColor)
        })
    }
}