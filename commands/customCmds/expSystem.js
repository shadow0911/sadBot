const Discord = require('discord.js');

module.exports = {
    name: 'exp',
    aliases:['rr'],
    description:'Gives a exp system message',
    category: 'customCmds',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        if(!message.member.permissions.has("MANAGE_MESSAGES","ADMINISTRATOR")) return
        message.channel.send({embed: new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} Ranking system`)
        .setDescription(`• 15-25 exp per minute for one message \n• Spamming doesn't gives you more EXP \n• Cheating for EXP or any kind will end up in EXP reset. \n• Nitro boosters get aditional 10% EXP boost`)
        .setImage("https://cdn.discordapp.com/attachments/780380673101398036/798818043547484170/unknown.png")
        .setColor(message.guild.me.displayColor)
        })
    }
}