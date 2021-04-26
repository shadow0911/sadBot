const Discord = require('discord.js');
const fs = require('fs')
const { ModProfile } = require('../../models')
const moment = require('moment')
module.exports = {
    name: 'status',

    run: async(client, message, args,prefix) =>{

        let MOD = message.guild.roles.cache.get('618420341735161876');
        let trialMod = message.guild.roles.cache.get('780380155029487616');

        if (!message.member.roles.cache.has(MOD.id) && !message.member.roles.cache.has(trialMod.id) && !message.member.permissions.has('MANAGE_GUILD', 'MANAGE_MESSAGES', 'ADMINISTRATOR')){
            return false;
        }

        const reason = args.slice(0).join(' ');
        const date = new Date().toLocaleString();
        const Embed = new Discord.MessageEmbed();

        async function statusData(value, msg, dateToday){
            await ModProfile.findOneAndUpdate({
                guildID: message.guild.id, 
                userID: message.author.id
            }, {
                userName: message.author.tag,
                Status: value,
                statusMessage: msg,
                statusTime: dateToday
            }, {
                upsert: true
            })
        }

        const database = await ModProfile.findOne({
            guildID: message.guild.id,
            userID: message.author.id
        })

        if(!database ){
            statusData(true, reason ? reason : null, date)

            Embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({
                dynamic: true , type: 'png'}))
            Embed.setDescription(`> ${reason}`)
            moment(Embed.setTimestamp()).format("LL")
            Embed.setColor(message.guild.me.displayColor)

            await message.channel.send(Embed)
        }else if(!args.length && database.Status == true){ 

            statusData(false, null, date)

            Embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({
                dynamic: true , type: 'png'}))
            Embed.setDescription('> Your status has been removed')
            moment(Embed.setTimestamp()).format("LL")
            Embed.setColor(message.guild.me.displayColor)
    
            await message.channel.send(Embed)

            return false;
        }else if(!args.length && database.Status == false){
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

        }else if(database.Status == false){
            statusData(true, reason ? reason : null, date)

            Embed.setAuthor(`${message.author.tag}`, message.author.avatarURL({
                dynamic: true , type: 'png'}))
            Embed.setDescription(`> ${reason}`)
            moment(Embed.setTimestamp()).format("LL")
            Embed.setColor(message.guild.me.displayColor)

            await message.channel.send(Embed)
        }
    }
}