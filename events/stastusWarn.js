const fs = require('fs')
const Discord = require('discord.js')
const { ModProfile } = require('../models')
module.exports = {
    event: 'message',
    once: false,
    run: async(message) =>{
        message.mentions.users.forEach(async (user) => {
            const DB = await ModProfile.findOne({
                    guildID: message.guild.id,
                    userID: user.id,
                    Status: true
                })

            if (message.author.bot) return false;
          
            if (
                message.content.includes('@here') ||
                message.content.includes('@everyone')
            )
            return false;

            if(!DB) return false;
            //if(user.id == message.author.id) return false;
            if(DB.Status === true){

              message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor(user.tag, user.avatarURL({
                    dynamic: true , type: 'png'
                }))
                .setDescription(`> ${DB.statusMessage}`)
                .setColor(message.guild.me.displayColor)
                .setFooter(DB.statusTime)
                }).then(m => m.delete({timeout: 8000}))

            }else {
                return false;
            }
        });
    }
}