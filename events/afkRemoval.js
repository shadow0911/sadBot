const { Profiles } = require('../models');
const Discord = require('discord.js')
const ms = require("ms")

module.exports = {
    event: 'message',
    once: false,
    run: async(message) =>{
        const DB = await Profiles.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
            AFK: true
        })
        if(DB){
            await Profiles.findOneAndUpdate({
                guildID: message.guild.id,
                userID: message.author.id,
                AFK: false
            })
            const irlTime = new Date()
            irlTime.setMilliseconds(irlTime.getMilliseconds())

            const backTIme = DB.AFKTIME - irlTime
            message.channel.send({embed: new Discord.MessageEmbed()
                .setDescription(`Welcome back ${message.author}, you were afk for ${ms(backTIme, {long: true})}`)
            })
        }
    }
}