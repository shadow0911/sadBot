const Discord = require('discord.js');

module.exports = {
    name: 'nou',


    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let Emperor = message.guild.roles.cache.get('789482505517531157');

        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(Emperor.id)){
            return
        }

        let tenor = [
            "https://media.tenor.com/images/2f3f6a77d4a356d8a742d6c7696f4334/tenor.gif",
            "https://media.tenor.com/images/5d592f30440519c37d3f8724e30a87ac/tenor.gif",
        ]

        let GIF = tenor[Math.floor(Math.random() * tenor.length)]

        message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription(`NO U`)
        .setImage(GIF)
        .setColor(message.guild.me.displayColor)})
    }
}