const Discord = require('discord.js');

module.exports = {
    name: 'welcome',
    aliases:['wel'],
    description:'Gives a welcome message',
    category: 'customCmds',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        if(!message.member.permissions.has("MANAGE_MESSAGES", "ADMINISTRATOR")) return
        message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription("```yml\n         = Welcome to SABBIR OFFICIAL =\n```\n<a:welcomeOne:771398019739287573><a:welcomeTwo:771398051079520307> Make sure to Read <#617360784187719680> and <#619512356787191828>. have fun 😊")
        .setColor(message.guild.me.displayColor)
        })
    }
}