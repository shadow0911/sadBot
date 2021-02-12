const Discord = require('discord.js');
const fs = require('fs')
const { Status } = require('../../models')
const moment = require('moment')
module.exports = {
    name: 'status',

    run: async(client, message, args,prefix) =>{

        let MOD = message.guild.roles.cache.get('618420341735161876');
        let trialMod = message.guild.roles.cache.get('780380155029487616');

        if (!message.member.roles.cache.has(MOD.id) && !message.member.roles.cache.has(trialMod.id) && !message.member.permissions.has('MANAGE_GUILD', 'MANAGE_MESSAGES', 'ADMINISTRATOR')){
            return false;
        }

        const reason = args.slice(0).join(' ')

        const DB = await Status.findOne({
            guildID: message.guild.id, 
            userID: message.author.id
        })
        let Embed = new Discord.MessageEmbed()

        if(!DB && !reason){
            Embed.setAuthor(`${client.user.displayName} - Status`)
            Embed.setDescription('Sets a custom afk status, so if anyone pings you then the message shows to them')
            Embed.addFields(
                {
                    name: 'Usage', value: `${prefix}status [Your message]`,
                },
                {
                    name: 'Example', value: `${prefix}status Busy atm. Ping another mod`
                }
            )
            Embed.setFooter("Don't set Troll status")
            Embed.setColor(message.guild.me.displayColor)

            message.channel.send(Embed)

            return false;

        }else if(DB.Enabled === false && !reason){
            Embed.setAuthor(`${client.user.username} - Status`)
            Embed.setDescription('Sets a custom afk status, so if anyone pings you and the message shows to them')
            Embed.addFields(
                {
                    name: 'Usage', value: `${prefix}status [Your message]`,
                },
                {
                    name: 'Example', value: `${prefix}status Busy atm. Ping another mod`
                }
            )
            Embed.setFooter("Don't set Troll status")
            Embed.setColor(message.guild.me.displayColor)

            message.channel.send(Embed)

            return false;
        }else if(!DB){
            new Status({
                guildID: message.guild.id,
                guildName: message.guild.name,
                userID: message.author.id,
                userName: message.author.tag,
                Enabled: true,
                Message: reason,
                Time: new Date()
            }).save()

            await Embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({
                dynamic: true , type: 'png'}))
            await Embed.setDescription(`> ${reason}`)
            await moment(Embed.setTimestamp()).format("LL")
            await Embed.setColor(message.guild.me.displayColor)
        
            await message.channel.send(Embed)
                
            
        }else if(DB && DB.Enabled == false){
            await Status.findOneAndUpdate({
                guildID: message.guild.id, 
                userID: message.author.id
            },{
                Enabled: true,
                Message: reason
            })

            await Embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({
                dynamic: true , type: 'png'}))
            await Embed.setDescription(`> ${reason}`)
            await moment(Embed.setTimestamp()).format("LL")
            await Embed.setColor(message.guild.me.displayColor)
    
            await message.channel.send(Embed)

        }else if(DB && DB.Enabled == true){
            await Status.findOneAndUpdate({
                guildID: message.guild.id, 
                userID: message.author.id
            },{
                Enabled: false,
                Message: null
            })
            await Embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({
                dynamic: true , type: 'png'}))
            await Embed.setDescription('> Your status has been removed')
            await moment(Embed.setTimestamp()).format("LL")
            await Embed.setColor(message.guild.me.displayColor)
    
            await message.channel.send(Embed)
        }
    }
}