const Discord = require('discord.js');

module.exports = {
    name: 'say',
    aliases: ['copycat', 'repeat'],
    description:'returns the arguement',
    category: 'moderation',

    run: (client, message, args,prefix) =>{
        message.delete()

        let sayCmd = args[0]
        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.author.send('None of your role proccess to use this command')

        if(!message.guild.me.permissions.has("SEND_MESSAGES", "MANAGE_MESSAGES")){
            return message.channel.send(`Rip! I don't have permission`)
        }
        if(!args.length){
            return message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor("Command: Say", client.user.avatarURL({
                    dynamic: true , format: 'png'
                }))
                .setDescription('Bot returns the Arguments')
                .setTitle('Aliases: copycat, repeat')
                .addField('Commands :', [
                    '• say',
                    '• <@channel/ID>',
                    '• embed'
                ])
                .addField('Usage: ', [
                    `${prefix}say <your message>`,
                    `${prefix}say <@channel/ID>`,
                    `${prefix}say embed <your message>`
                ])
                .addField('Example: ', [
                    `${prefix}say Hi!`,
                    `${prefix}say #announcement Huge Announcement!`,
                    `${prefix}say embed Hello everyone!`
                ])
                .setColor('#9000ff')
            })
        }

        let sayMessage = args.slice(0).join(' ');

        let sayMessageChannel = message.mentions.channels.first() || 
        message.guild.channels.cache.get(args[0])

        if(sayMessageChannel){
            let sayChannel = args.slice(1).join(' ')
            sayMessageChannel.send(sayChannel)
        } else {
            if(sayCmd === 'embed'){
            let sayMessage = args.slice(1).join(' ')
            let sayEmbed = new Discord.MessageEmbed()
            .setDescription(`${sayMessage}`)
            .setColor(message.guild.me.displayColor)
            message.channel.send({embed: sayEmbed})
        }else{
            message.channel.send(sayMessage)
        }
        }
    }
}