const Discord = require('discord.js');

module.exports = {
    name: 'gl',
    aliases: ['good-luck', 'goodluck', 'wish'],
    description:'wish you the best of luck',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let Knight = message.guild.roles.cache.get('618413471079596043');

        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(Knight.id)){
            return
        }

        let Member = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))
        if(!Member){
            return await message.channel.send('Ping your friends to wish them').then(m => m.delete({timeout: 5000}))
        }else if (Member.id === message.author.id){
            return message.channel.send("SadBot wishes your the best of luck").then(m => m.delete({timeout: 5000}))
        }else {
            message.channel.send(`${message.author.username} wishes you the best of luck ${Member} <a:valobasha:697729673001566228>`)
        }
    }
}