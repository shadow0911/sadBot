const Discord = require('discord.js');

module.exports = {
    name: 'awesome',
    description:'you\'re awsome',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let Divine = message.guild.roles.cache.get('618411489409368084');

        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(Divine.id)){
            return
        }

        let Member = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))
        if(!Member){
            return await message.channel.send('Bruh, ping your frind cause they\'re awsome').then(m => m.delete({timeout: 5000}))
        }else if (Member.id === message.author.id){
            return message.channel.send("ok you're awsome").then(m => m.delete({timeout: 5000}))
        }else {
            message.channel.send(`${message.author.username} thinks you're an awesome ${Member} person 😃`)
        }
    }
}