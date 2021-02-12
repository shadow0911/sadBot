const Discord = require('discord.js');

module.exports = {
    name: 'thanks',
    description:'slap a user',
    category: 'fun',

    run: async (client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let Elite = message.guild.roles.cache.get('619568950463692820');


        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(Elite.id)){
            return
        }

        let thanksUser = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))
        if(!thanksUser){
            return await message.channel.send('Thank you friend, not mee').then(m => m.delete({timeout: 5000}))
        }else if (thanksUser.id === message.author.id){
            return message.channel.send("lol look at that user, thanking himself").then(m => m.delete({timeout: 5000}))
        }

       await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription(`**Thank you ${thanksUser}**`)
        .setImage("https://media.tenor.com/images/c4467cfa29c1689ee511bfb2e6b3e6d9/tenor.gif")
        .setColor(message.guild.me.displayColor)
        })
    }
}