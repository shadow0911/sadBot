const Discord = require('discord.js');
const mongoose = require('mongoose');
const { MuteDataBase } = require('../models')
const { Guild } = require('../models');

module.exports = (client, message) =>{
    
    
    client.on('guildMemberAdd', async (member) => {
        const { guild } = member

        let welcomeArray = [
            `${member.user.username} just landed`, 
            `${member.user.username} entered the arena`, 
            `${member.user.username} Just joined, heres some cookies 🍪`,
            `Woah ${member.user.username} just joined!`,
            `${member.user.username} joined, let's start the party`,
            `Hey ${member.user.username} 👋, welcome to ${guild.name}`,
            `${member.user.username} Joined the party, let's drop on the chat 😂`,
            `Is it a bird or is it a cat, nah its just ${member.user.username}`,
            `Hey our friend ${member.user.username} joined the server. Let's go for mining`,
            `POG, look ${member.user.username} just joined the server`,
            `Thanks for joining ${member.user.username}, Sabbir appreciates it`,
            `Hey ${member.user.username}, i warmly welcome you`,
            `konnichiwa ${member.user.username}, welcome to the server.`,
            `welcome ${member.user.username}, we hope you brought pizza`,
            `${member.user.username} just hopped intro the server`,
            `A wild ${member.user.username} just appearede`,
            `Everyone welcome ${member.user.username}`,
            `${member.user.username} joined the server to light up the dark cave and lead us the way`,
            `Rockstar release gta 6 or not, i'm happy with that ${member.user.username} joined the server :D`,
            `Welcome ${member.user.username}`,
            `Hoppity poppity ${member.user.username} just landed on our property`,
            `Hey ${member.user.username}! Enjoy your time in the server.`
        ]

        let randomMsg = welcomeArray[Math.floor(Math.random() * welcomeArray.length)]

        guild.channels.cache.get("771380513373552701").send({embed: new Discord.MessageEmbed()
            .setAuthor(`${member.user.tag} - ${guild.memberCount.toLocaleString()}` , `${member.user.avatarURL({
                dynamic: true, 
                format: 'png'
            })}`)
            .setThumbnail(`${member.user.avatarURL({
                dynamic: true , type: 'png', size: 1024
            })}`)
            .setDescription(`\`\`\`${randomMsg}\`\`\``)
            .setFooter(member.user.id)
            .setTimestamp()
            .setColor(guild.me.displayColor)

        })
    })
}