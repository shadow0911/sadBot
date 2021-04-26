const { muteEmbed } = require('../moderation/mute')
const Discord = require('discord.js')
module.exports = {
    name: 'split',
    description: 'ping pong',
    category: 'utils',
    run: async(client, message, args)=> {

        let rolemap = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");
        if (!rolemap) rolemap = "No roles";
        const embed = new Discord.MessageEmbed()
        .addField("Role List" , rolemap.name)
        message.channel.send(embed);
    }
}