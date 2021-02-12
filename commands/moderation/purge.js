const Discord = require('discord.js');
module.exports = {
    name: 'purge',
    aliases: ['purne'],
    description:'purges a sepcified users chat',
    category: 'moderation',
    usage:'purge 10 @user',
    run: async(client, message, args,prefix) =>{
       await message.delete()

        if(!message.guild.me.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return

        if(!message.member.permissions.has("MANAGE_GUILD","ADMINISTRATOR", "MANAGE_MESSAGES")) return message.author.send('None of your role process to use this command')

        const amount = parseInt(args[0]);

        const user = message.mentions.users.last() || await message.guild.members.fetch(args[1]);

        let purgeChannel = message.channel

        if (!amount) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor('Command: Purge')
            .setDescription('Purges specified number of messages of mentioned user. Limit(100)')
            .addField('Usage:', `${prefix}purge <number of message> <@user/userID> \nExample:\n${prefix}purge 10 @shadow~`)
            .setColor(message.guild.me.displayColor)
        }).then(m =>{
            m.delete({timeout: 5000})
        })

        if(isNaN(amount)) return message.channel.send('PLease provide number between 1 - 100 to purge').then(m =>{
            m.delete({timeout: 5000})
        })

        if(!user) return message.channel.send({embed: new Discord.MessageEmbed()
        .setTitle('Command: Purge')
        .setDescription('Purges a specified number of message of a specified user. Limit(100)')
        .addField('Usage:', `${prefix}purge <number of message> <@user/userID> \nExample:\n${prefix}purge 10 @shadow~`)
        .setColor(message.guild.me.displayColor)
        }).then(m =>{
            m.delete({timeout: 5000})
        })

        if(amount > 101) return message.channel.send({embed: new Discord.MessageEmbed()
            .setDescription('❌ | I Can\'t delete more than 100 message at once 😢')
            .setColor('#FF0000')
            }).then(m =>{
                m.delete({timeout: 5000})
            })
            
        message.channel.messages.fetch({
            limit: 100,
        }).then(async (messages) => {
        if (user) {
            const filterBy = user ? user.id : client.user.id;
            messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        }
        await message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
   });

   message.guild.channels.cache.get('797469055001821235').send({embed: new Discord.MessageEmbed()
    .setAuthor('Action: Purge',`${message.author.avatarURL({
        dynamic: true , format: 'png'
    }
    )}`)
        .addField('Moderator:', `${message.author}`, true)
        .addField('Message Amount:', `${amount}`, true)
        .addField('User:', `${user}`, true)
        .addField('Channel:', `${purgeChannel}`, true)
        .setFooter(`${user.id}`)
        .setTimestamp()
        .setColor('FF0000')
    })

    }
};