const Discord = require('discord.js');

module.exports = {
    name: 'gg',
    aliases: ["ggwp", 'wp'],
    description:'no one cares one your joke',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let overLord = message.guild.roles.cache.get('668846734725873685');

        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(overLord.id)){
            return
        }

        let Gamer = message.guild.member(message.mentions.users.first() || 
        message.guild.members.cache.fetch(args[0]))

        await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription(`Good game, well played ${Gamer}`)
        .setImage('https://media1.tenor.com/images/71e05e2a809fd3c5553631022834be37/tenor.gif?itemid=15351423')
        .setColor(message.guild.me.displayColor)
        })
    }
}