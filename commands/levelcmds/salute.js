const Discord = require('discord.js');

module.exports = {
    name: 'salute',
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
        
        let Major = message.guild.member(message.mentions.users.first() || 
        message.guild.members.fetch(args[0]))

        if(!Major){
            return message.channel.send("Ping your boss to salute them").then(m => {
                m.delete({timeout: 5000})
            })
        }
        if(Major.id === message.author.id){
            return message.channel.send('You can\'t salute yourself, become a general and get salute lol')
        }
        let tenor = 
        [
            "https://media.tenor.com/images/640efb9e5984934756c05cb74db8459e/tenor.gif",
            "https://media.tenor.com/images/ad396d9c078e1fd5bb51f5d5138c9e30/tenor.gif",
            "https://media.tenor.com/images/64adf793169d7270f49a5295f7311bf9/tenor.gif",
            "https://media.tenor.com/images/1ce04894e2bd20542480e89d0a083b9f/tenor.gif",
            "https://media.tenor.com/images/75f110116773cb340f951dbc0eb9e1c9/tenor.gif",
            "https://media.tenor.com/images/0cd6fe6a32f2b4c76f8da5076f4d31b0/tenor.gif",
            "https://media.tenor.com/images/80b4b85ce3c8d8f5121623c73583a4d6/tenor.gif",
        ]

       let randomSalute = tenor[Math.floor(Math.random() * tenor.length)]

        await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription(`**${message.author.tag}: Ay Ay captain,** ${Major}`)
        .setImage(randomSalute)
        .setColor(message.guild.me.displayColor)
        })
    }
}