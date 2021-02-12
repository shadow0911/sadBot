const Discord = require('discord.js');

module.exports = {
    name: 'kill',
    description:'kill a user',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        message.delete()

        let victim = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))

        if(!victim){
            return message.channel.send('ping your enemy/friend to kill').then(m => {
                m.delete({timeout: 5000})
            })
        }
        if(victim.id === message.author.id){
            return message.channel.send('You can\'t kill yourself lol')
        }

        let killMsg = [`${message.author.username} stabbed <@${victim.user.id}> to death`, 
        `${message.author.username} dabbed on <@${victim.user.id}> and they died`,
        `${message.author.username} get <@${victim.user.id}> infected by corona and they died`,
        `${message.author.username} shouted on <@${victim.user.id}>'s ears so loud that they died`,
        `${message.author.username} married <@${victim.user.id}>'s waifu so they died by heart attack`]

        let choice = killMsg[Math.floor(Math.random() * killMsg.length)]

        message.channel.send(`${choice}. <:more_gese:619057836743458827>`)
    }
}