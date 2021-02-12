const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'forbidden-cmd-One',
    description:'cleans an amount of chat',
    category: 'moderation',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("ADMINISTRATOR")){
            return
        }

        let roleName = message.content.split(" ").slice(1).join(" ");

        let membersWithRole = message.guild.members.cache.filter(member => { 
            return member.roles.cache.get("625210556860596255");
        }).map(member => {
            return member.user.tag;
        })

        let Embed = new Discord.MessageEmbed()
        .setAuthor(`Members in ${roleName}`)
        .setDescription(membersWithRole.join('\n'));

        message.channel.send(Embed)
    }
}