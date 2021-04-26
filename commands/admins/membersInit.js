const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'role-members',

    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("ADMINISTRATOR")){
            return
        }
        let roleArgs = message.content.split(" ").slice(1)

        let role = message.mentions.roles.first() || 
        message.guild.roles.cache.find(r => r.name == roleArgs.join(" ")) || 
        message.guild.roles.cache.find(r => r.id == args[0]);

        if(!role) return message.reply('that role does not exist!');
        let arr = new Array();
        role.members.forEach(user => {
            arr.push(`${user}`);
        });
        const embed = new Discord.MessageEmbed()
        embed.setAuthor(`Members in ${role.name}`)
        embed.setDescription(arr.join('\n'))
        embed.setFooter(`Total - ${arr.length} members`)
        
        message.channel.send(embed);
    }
}