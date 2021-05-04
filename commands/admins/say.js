const Discord = require('discord.js');

module.exports = {
    name: 'say',
    aliases: ['copycat', 'repeat'],
    description:'returns the arguement',
    category: 'moderation',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        if(!message.member.permissions.has("MANAGE_GUILD","ADMINISTRATOR")) return message.author.send('None of your role proccess to use this command')

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
        async function sayMessage(value, Msg, mentionChannel){
            switch(value){
                case 'normal':
                    await message.channel.send(Msg)
                    break;
                
                case 'channel':
                    await mentionChannel.send(Msg)
                    break;

                case 'embed':
                    const Embed = new Discord.MessageEmbed()
                    .setDescription(Msg)
                    .setColor(message.guild.me.displayColor)
                    await message.channel.send(Embed)
            }
        }

        const valueMessage = args.slice(1).join(' ');
        const regularMsg = args.slice(0).join(' ');
       
        const cmd = message.content.split(" ")[1]
        console.log(cmd)
        const channel = message.guild.channels.cache.find(c => c.id == cmd.replace('<#','').replace('>',''))

        switch(cmd){
            case 'embed':
                sayMessage('embed', valueMessage)
                break;
            
            case `${channel}`:
                sayMessage('channel', valueMessage, channel)
                break;
            
            default:
                sayMessage('normal', regularMsg)
        }
    }
}