const Discord = require('discord.js');
const ms = require('ms')
const { MuteDataBase } = require('../../models')
const { Guild } = require('../../models')


module.exports = {
    name: 'warn',

    run: async(client, message, args,prefix) =>{
        await message.delete();

        if(!message.guild.me.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR", "MANAGE_ROLES")){
            return await message.channel.send({embed: new Discord.MessageEmbed()
                .setDescription('Sorry I dont have permission')
                .setColor('FF0000')
            }).then(m => {m.delete({timeout: 5000})
        })
        };

        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")){
            return false;
        }
        
        let warnMember = message.guild.member(message.mentions.users.first() || 
        await message.guild.members.fetch(args[0]))

        let Embed = new Discord.MessageEmbed()
        .setAuthor( 'Command: Warn')
        .setDescription('Warn someone for breaking rules')
        .addField("Usage:", `${prefix}warn [@user/userID] [reason string]`)
        .addField("Example:", `${prefix}warn @shadow~ 1 \n${prefix}warn 142374054245675890 spamming`)
        .setFooter("Bot needs 'MANAGE_ROLES' permission to add mute role")
        .setColor(message.guild.me.displayColor)

        if(!warnMember){
            return await message.channel.send(muteEmbed).then(m =>m.delete({timeout: 10000}))
        }

        if(warnMember.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor("Sorry, you can't warn Mod/Admin😭")
            .setColor('FF0000')
        }).then(m => m.delete({timeout: 5000}))


        let warnReason = args.slice(1).join(' ')
        if(!warnReason.toLowerCase().startsWith("don't") && !warnReason.toLowerCase().startsWith("please")){
            return message.channel.send({embed: new Discord.MessageEmbed()
            .setDescription("Sorry this is not a valid way to warn someone, Please start the message with Don't/Please")
            }).then(m => m.delete({timeout: 5000}))
        }
        console.log(warnReason)

        // const previosMute = await MuteDataBase.find({
        //     userID: muteMember.id
        // })

        // const currentlyMuted = previosMute.filter(mute => {
        //     return mute.isMuted === true
        // })

        // if (currentlyMuted.length){
        //     message.channel.send({embed: new Discord.MessageEmbed()
        //     .setDescription( `${muteMember.user.username} is already Muted`)
        //     .setColor('FF0000')
        //     }).then(me => {
        //         me.delete({timeout: 5000})
        //     })
        // }

        // let time = args[1]
        
        // if(!time){
        //     return await message.channel.send(muteEmbed).then(m=>m.delete({timeout: 5000}))
        // }

        // let muteLength = ms(time)
        
        // const irlTime = new Date()

        // irlTime.setMilliseconds(irlTime.getMilliseconds() + muteLength)

        // let muteRole = await message.guild.roles.cache.find(r => r.name === 'Muted' && 'muted')
        // if(!muteRole){
        //     await message.guild.roles.create({
        //         data: {
        //             name: 'Muted',
        //             color: '#000000',
        //             permissions: []
        //         },
        //         reason: 'sadBot mute role creation'
        //     })

        //     await message.guild.channels.cache.forEach(channel => {
        //         channel.overwritePermissions([
        //             {
        //                 id: muteRole.id,
        //                 deny : ['SEND_MESSAGES', 'ADD_REACTIONS'],
        //             }
        //         ], "Muted role overWrites")
        //     })
        // }

        // if(muteMember.roles.cache.has(muteRole.id)){
        //     return message.channel.send({embed: new Discord.MessageEmbed()
        //     .setDescription(`**${muteMember.user.tag}** is already Muted`)
        //     .setColor("#fc5947")
        //     }).then(m =>m.delete({timeout: 5000}))
        // } else{
        //     muteMember.roles.add(muteRole.id)
        //     message.channel.send({embed: new Discord.MessageEmbed()
        //     .setDescription(`**${muteMember.user.tag}** is now muted | ${muteReason}`)
        //     .setColor("#45f766")
        //     }).then(m =>m.delete({timeout: 10000}))
        // }

        // function makeid() {
        //     var text = "";
        //     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
        //     for (var i = 0; i <= 10; i++)
        //       text += possible.charAt(Math.floor(Math.random() * possible.length));
          
        //     return text;
        // }

        // const TodayDate = new Date()

        // let muteLog = await new MuteDataBase({
        //     caseID: makeid(),
        //     Action: 'Mute',
        //     guildID: message.guild.id,
        //     guildName: message.guild.name,
        //     userName: muteMember.user.tag,
        //     userID: muteMember.id,
        //     Reason: muteReason,
        //     Moderator: message.author.tag,
        //     expire: irlTime,
        //     isMuted: true,
        //     Date: `${TodayDate}`,
        //     timestamps: message.createdAt
        // })
        // muteLog.save().catch(err => console.log(err))

        // let logChannel = await Guild.findOne({
        //     guildID: message.guild.id
        // })

        // if(!logChannel) return false

        // message.guild.channels.cache.get(logChannel.actionLogChannel).send({embed: new Discord.MessageEmbed()
        //     .setAuthor('Action: Mute',`${muteMember.user.avatarURL({
        //         dynamic: false , format: 'png'
        //     }
        //     )}`)
        //     .addField('User:', `\`\`\`${muteMember.user.tag}\`\`\``, true)
        //     .addField('Moderator:', `\`\`\`${message.author.tag}\`\`\``, true)
        //     .addField('Time:', `\`\`\`${ms(ms(time))}\`\`\``, true)
        //     .addField('Reason:', `\`\`\`${muteReason}\`\`\``)
        //     .setFooter(`${muteMember.id}`)
        //     .setTimestamp()
        //     .setColor("#fc5947")
        //     }) 
    }
}