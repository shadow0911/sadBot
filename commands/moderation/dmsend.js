const Discord = require('discord.js');
module.exports = {
    name: 'dmsend',
    aliases:['dm'],
    description:'returns the arguement but in dm',
    category: 'moderation',
    usage:'dmsend <message>',
    run: async(client, message, args,prefix) =>{
        message.delete()
        if(!message.member.permissions.has("MANAGE_MESSAGES","ADMINISTRATOR")) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor('Only moderators can use this command')
            .setColor('#FF0000')
        })

        if(!message.guild.me.permissions.has("SEND_MESSAGES", "MANAGE_MESSAGES")) return message.author.send(`I Dont have Send message or Manage message permission on ${message.guild.name}`)

        let dmUSer = message.guild.member(message.mentions.users.first() || 
        await message.guild.members.fetch(args[0]));

        if(!dmUSer){
            return message.channel.send('ping a user to dm them.')
        }

        let sayMessage = args.slice(1).join(' ');
        
        if(!sayMessage){
            return message.channel.send('What you want to dm that user')
        }
        dmUSer.send(sayMessage).catch(err => console.log(err))

        message.guild.channels.cache.get('777068832946257922').send({embed: new Discord.MessageEmbed()
            .setAuthor('Action: Direct Message',`${dmUSer.user.avatarURL({
                dynamic: true , format: 'png'
            }
            )}`)
            .addField('User:', `${dmUSer.user}`, true)
            .addField('Moderator:', `${message.author}`, true)
            .addField('Dm content:', `${sayMessage}`, true)
            .setTimestamp()
            .setColor('#42f563')
        })
    }
}