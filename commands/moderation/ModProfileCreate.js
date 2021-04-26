const Discord = require('discord.js');
const { ModProfile, Status } = require('../../models')
module.exports = {
    name: 'agree',

    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("MANAGE_MESSAGES","ADMINISTRATOR")) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor('Only moderators can use this command')
            .setColor('#FF0000')
        })

        if(!message.guild.me.permissions.has("SEND_MESSAGES", "MANAGE_MESSAGES")) return message.author.send(`I Dont have Send message or Manage message permission on ${message.guild.name}`)

        let DB = await ModProfile.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        })

        let statusDB = await Status.findOne({
            guildID: message.guild.id,
            userID: message.author.id
        })

        if(!DB){
            await new ModProfile({
                guildID: message.guild.id,
                guildName: message.guild.name,
                userName: message.author.tag,
                userID: message.author.id,
                Mute: "0",
                Warn: "0",
                Ban: "0",
                Kick: "0",
                Purge: "0",
                clean: "0",
                Status: statusDB ? statusDB.Enabled : false,
                Disconnect: "0",
                Command: "0"
            }).save()

            await message.channel.send('Thank you')
        }else{
            return
        }

    }
}