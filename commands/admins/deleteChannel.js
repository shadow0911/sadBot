const Discord = require('discord.js')
module.exports = {
    name: 'delete-channel',
    description:'deletes a channel',
    category: 'Admin',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{

        if(!message.member.permissions.has("ADMINISTRATOR") && !message.author.id === '571964900646191104'){
            return
        }

        let channel = message.mentions.channels.first() || message.guild.channels.fetch(args[0])
        if(!channel){
            return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor('Command - Delete Channel')
            .setDescription('Ping a channel to delete it.')
            .setColor('#f72828')
            })
        }
        
        const filter = (m) => {
            return m.author.id === message.author.id;
        };

        await message.channel.send({embed: new Discord.MessageEmbed()
        .setAuthor(`Waiting for respond to delete ${channel.name}`)
        .setDescription(`Do you want to delete ${channel}? \nType 'yes' in chat to confirm`)
        .setFooter('Type \'cacnel\' to cancel.')
        .setColor('#f72828')
        })
        message.channel.awaitMessages(filter,
            {max: 1, time: 30000}).then(async collected => {

                    if (collected.first().content.toLowerCase() == 'yes') {
                        channel.delete()
                        await message.channel.send({embed: new Discord.MessageEmbed().setDescription(`channel deleted ${channel.name}`).setColor('#f72828')})
                    }
                    else if(collected.first().content.toLowerCase() == 'cancel'){
                        return message.channel.send('command canceled')
                    }
            }).catch(() => {
                    message.channel.send('command canceled');
            });
    }
}