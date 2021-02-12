const Discord = require('discord.js');

module.exports = {
    name: 'namaz',
    description:'no one cares one your joke',
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

        message.channel.send('its namaz time. Let\s read our namaz and pray to Almighty Allah')
    }
}