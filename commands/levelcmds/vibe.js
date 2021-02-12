const Discord = require('discord.js');

module.exports = {
    name: 'vibe',
    description:'slap a user',
    category: 'fun',

    run: async (client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let Emperor = message.guild.roles.cache.get('789482505517531157');


        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(Emperor.id)){
            return
        }
        
        let GIFs = [
            "https://media.tenor.com/images/a254b8705f8560e3c885f06e07d09022/tenor.gif",
            "https://media.tenor.com/images/934bbbeb1f528a76afd43a7725c3d295/tenor.gif",
            "https://media.tenor.com/images/ca902734ce691c2a9d683f62813e2cf2/tenor.gif",
            "https://media.tenor.com/images/1fa53756f7a1543c031a9b126d13ea53/tenor.gif",
            "https://media.tenor.com/images/a90e36e60f80bd01c5730f744077ac18/tenor.gif",
            "https://media.tenor.com/images/ebff6b9df0ed5d3134701b8783907600/tenor.gif"
        ]

       let randomGIF = GIFs[Math.floor(Math.random() * GIFs.length)]

       await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription(`**${message.author.tag} is vibing**`)
        .setImage(randomGIF)
        .setColor(message.guild.me.displayColor)
        })
    }
}