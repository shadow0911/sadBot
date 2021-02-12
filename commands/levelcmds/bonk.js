const Discord = require('discord.js');

module.exports = {
    name: 'bonk',
    description:'bonk a user',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let Council = message.guild.roles.cache.get('619561274212220941');


        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(Council.id)){
            return
        }
        
        let bonk = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))

        if(!bonk){
            return message.channel.send("Bruh! bonk your friend. just do @friend").then(m => {
                m.delete({timeout: 5000})
            })
        }
        if(bonk.id === message.author.id){
            return message.channel.send("Lol you can't bonk yourself with hammer. i mean you can do, but not by me xd")
        }
        let tenor = 
        [
            "https://media.tenor.com/images/47a5ca35634ac96fefebb493b4b92abf/tenor.gif",
        ]

       let bonkGIF = tenor[Math.floor(Math.random() * tenor.length)]

       await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription(`${bonk} Get boked by ${message.author} kek`)
        .setImage(bonkGIF)
        .setColor(message.guild.me.displayColor)
        })
    }
}