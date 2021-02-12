const fs = require('fs')
const Discord = require('discord.js')
const { Status } = require('../models')
module.exports = {
    event: 'message',
    once: false,
    run: async(message) =>{
        message.mentions.users.forEach(async (user) => {
            const DB = await Status.findOne({guildID: message.guild.id, userID: user.id})

            if (message.author.bot) return false;
          
            if (
                message.content.includes('@here') ||
                message.content.includes('@everyone')
            )
            return false;

            if(!DB) return false;
            if(user.id == message.author.id) return false;
            if(DB.Enabled === true){

              message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor(DB.userName, user.avatarURL({
                    dynamic: true , type: 'png'
                }))
                .setDescription(`> ${DB.Message}`)
                .setColor(message.guild.me.displayColor)
                }).then(m => {m.delete({timeout: 5000})})

            }else if(DB.Enabled == false){
              return false
            }
        });
    }
}