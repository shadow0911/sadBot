const Discord = require('discord.js');
const fs = require('fs')
const talkedRecently = new Set();
module.exports = {
    name: 'balance',
    aliases: ['bal'],
    description:'sets a status message',
    category: 'economy',
    usage:'status',
    run: async(client, message, args,prefix) =>{
        let user = message.guild.member(message.mentions.users.first() || 
        message.guild.members.cache.get(args[0]) || 
        message.author)

        let userProfile = JSON.parse(fs.readFileSync("./database.json", "utf8"))

        if(!userProfile[user.id]){
            message.channel.send('This user don\'t even have a profile lol')
        }else {
            message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor(user.user.tag, user.user.avatarURL({ dynamic:true }))
            .addField('Balance:', `${userProfile[user.id].Balance}`)
            .addField('Bank:', `${userProfile[user.id].bank}`)
            .addField('Net worth:', `${userProfile[user.id].bank + userProfile[user.id].Balance}`)
            .setColor('RANDOM')
            .setTimestamp()
            })
        }


    }
}