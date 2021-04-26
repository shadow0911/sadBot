const { Profiles } = require('../models');
const Discord = require('discord.js')
const ms = require('ms')
const moment = require('moment')

module.exports = {
    event: 'message',
    once: false,
    run: async(message) =>{
        message.mentions.users.forEach(async (user) => {
            const DB = await Profiles.findOne({
                guildID: message.guild.id, 
                userID: user.id,
                AFK: true
            })

            if (message.author.bot) return false;
          
            if (
                message.content.includes('@here') ||
                message.content.includes('@everyone')
            )
            return false;

            if(!DB) return false;
            if(user.id == message.author.id) return false;
            console.log(backTIme)
            if(DB){
                const irlTime = new Date()
                irlTime.setMilliseconds(irlTime.getMilliseconds())
    
                const backTIme = DB.AFKTIME - irlTime
              message.channel.send({embed: new Discord.MessageEmbed()
                .setDescription(`${user} is afk and will be back in ${ms(backTIme, {long: true})}`)
                .setColor("#fafeff")
                }).then(m => {m.delete({timeout: 5000})})

            }else if(DB.AFK == false){
              return false
            }
        });
    }
}