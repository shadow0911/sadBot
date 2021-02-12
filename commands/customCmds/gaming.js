const Discord = require('discord.js');

module.exports = {
    name: 'gaming',
    aliases: ['game'],
    description:'Gives a spam not allowed message',
    category: 'customCmds',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        if(!message.member.permissions.has("MANAGE_MESSAGES","ADMINISTRATOR")) return
        await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription("If you're a gamer and looking for some Gaming partner. Then procced to <#704986524135063601>. You can find your fellow gamer boys/girls there. And you can chat about games and stuff")
        .setColor(message.guild.me.displayColor)
        })
    }
}