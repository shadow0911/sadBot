const Discord = require('discord.js');
const ms = require('ms')
const { Profiles } = require('../../models');

module.exports = {
    name: 'afk',

    run: async(client, message, args,prefix) =>{
        await message.delete();


        let Time = args[0]

        if(!Time){
            console.log("time not defined")
            return false;
        }
        let duration = ms(Time)

        const irlTime = new Date()
        irlTime.setMilliseconds(irlTime.getMilliseconds() + duration)

        let DB = await Profiles.findOne({
            guildID: message.guild.id,
            userID: message.author.id,
            AFK: false
        })
        
        if(!DB){
            await new Profiles({
                guildID: message.guild.id,
                guildName: message.guild.name,
                userID: message.author.id,
                userName: message.guild.name,
                AFK: true,
                AFKTIME: irlTime,
            }).save()

            await message.channel.send({embed: new Discord.MessageEmbed()
                .setDescription(`${message.author} is AFK and will be back in ${ms(ms(Time, {long: true}))}`)
                .setColor("#fafeff")
            }).then(m => m.delete({timeout: 10000}))

        }else {
            await Profiles.findOneAndUpdate({
                guildID: message.guild.id,
                userID: message.author.id
            },{
                AFK: true,
                AFKTIME: irlTime,
            },{
                upsert: true
            })

            await message.channel.send({embed: new Discord.MessageEmbed()
                .setDescription(`${message.author} is AFK and will be back in  ${ms(ms(Time, {long: true}))}`)
                .setColor("#fafeff")
            }).then(m => m.delete({timeout: 10000}))

        }
        
        
    }
}