const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'ping',
    description: 'ping pong',
    category: 'utils',
    run: (client, message, args)=> {
        message.channel.send("Pinging...").then(m =>{
        let Ping = m.createdTimestamp - message.createdTimestamp
        let botping = Math.round(client.ws.ping)
        let choices = ["Pong","My ping is", "Heres the ping", "Ping Pong"]
        let response = choices[Math.floor(Math.random() * choices.length)]
            m.edit({embed : new Discord.MessageEmbed()
            .setAuthor(`${response}`)
            .addField('🏓Bot latency', `${Ping}`)
            .addField('🏓Api latency', `${botping}`)
            .setColor(message.guild.me.displayColor)
            })
        })
    }
}