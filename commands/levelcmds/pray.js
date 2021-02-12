const Discord = require('discord.js');

module.exports = {
    name: 'pray',
    description:'pet your friends',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let Emperor = message.guild.roles.cache.get('789482505517531157');


        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(Emperor.id)){
            return
        }

        let prayUser = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))
        
        if(!prayUser){
            return await message.channel.send('Ping your friend to pray for them').then(m => m.delete({timeout: 5000}))
        }else if (prayUser.id === message.author.id){
            return message.channel.send("i prayed for you lol").then(m => m.delete({timeout: 5000}))
        }else {
            message.channel.send(`${message.author.username} prays for ${prayUser}'s good health `)
        }
    }
}