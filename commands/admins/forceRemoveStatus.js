const Discord = require('discord.js')
const fs = require('fs')
const { Status } = require('../../models')
module.exports = {
    name: 'remove-status',
    aliases: ['force-remove-status'],

    run: async(client, message, args,prefix) =>{

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return message.author.send('None of your role proccess to use this command')
        }

        if(!args.length){
            return message.channel.send({embed: new Discord.MessageEmbed().setDescription(`ping the user you wants reset their status`).setColor('#ff4f42')}).then(m => m.delete({timeout: 5000}))
        }

        let Member = message.guild.member(message.mentions.users.first() || 
        await message.guild.members.fetch(args[0]));
        if(!Member){
            await message.channel.send('Invalid user | Please provide a valid user').then(m => m.delete({timeout: 5000}))
            return false;
        }

        const DB = await Status.findOne({
            guildID: message.guild.id,
            userID: Member.user.id
        })
        if(!DB){
            await message.channel.send(`Sorry, ${Member.user.tag} data doesn't exist`).then(m=> m.delete({timeout: 5000}))
        }else if(DB.Enabled === false){
            await message.channel.send(`${Member.user.tag} Don't have active status`).then(m=> m.delete({timeout: 5000}))
            return false;

        }else if(DB.Enabled === true){
            await Status.findOneAndUpdate({
                guildID: message.guild.id,
                userID: Member.user.id
            },{
                Enabled: false,
                Message: null
            })

            await message.channel.send(`${Member.user.tag} status has been forced removed`)
        }
    }
};