const Discord = require('discord.js');

module.exports = {
    name: 'pet',
    description:'pet your friends',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        let MVP = message.guild.roles.cache.get('675372147811811328');
        let Mod = message.guild.roles.cache.get('618420341735161876');
        let Nitro = message.guild.roles.cache.get('697708336866525205');
        let Guardian = message.guild.roles.cache.get('618412313849888808');


        if (!message.member.roles.cache.has(MVP.id) && !message.member.roles.cache.has(Mod.id) && !message.member.roles.cache.has(Nitro.id) && !message.member.roles.cache.has(Guardian.id)){
            return
        }

        let petUser = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))
        
        if(!petUser){
            return await message.channel.send('Bruh, ping your crush to tell them they are cute').then(m => m.delete({timeout: 5000}))
        }else if (petUser.id === message.author.id){
            return message.channel.send("How long you gonna pet yourself? ").then(m => m.delete({timeout: 5000}))
        }else {
            message.channel.send(`${message.author.username} pets you ${petUser} <a:pat:794963764009107477>`)
        }
    }
}