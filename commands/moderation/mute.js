const Discord = require('discord.js');
const ms = require('ms')
const { MuteDataBase, Guild, ModProfile } = require('../../models')

module.exports = {
    name: 'mute',

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
        
        let muteMember = message.guild.member(message.mentions.users.first() || 
        await message.guild.members.fetch(args[0]))

        let muteEmbed = new Discord.MessageEmbed()
        .setAuthor( 'Command: Mute')
        .setDescription('Gives someone a muted role and prevents them from speaking/reading channels')
        .addField("Usage:", `${prefix}mute [@user/userID] [duration] [reason]`)
        .addField("Example:", `${prefix}mute @shadow~ 20m for Spamming \n${prefix}mute 142374054245675890 1d Spamming\n${prefix}mute @shadow 3h \n \`(reason is optional)\``)
        .setFooter("Bot needs 'MANAGE_ROLES' permission to add mute role")
        .setColor(message.guild.me.displayColor)

        if(!muteMember){
            return message.channel.send(muteEmbed).then(m =>m.delete({timeout: 5000}))
        }

        if(muteMember.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor( 'I can\'t mute an Admin/Moderators 😭')
            .setColor('FF0000')
        }).then(m => m.delete({timeout: 5000}))

        let muteReason = args.slice(2).join(' ') || 'No reason Provided'

        const previosMute = await MuteDataBase.find({
            userID: muteMember.id
        })

        const currentlyMuted = previosMute.filter(mute => {
            return mute.isMuted === true
        })

        if (currentlyMuted.length){
            message.channel.send({embed: new Discord.MessageEmbed()
            .setDescription( `${muteMember.user.username} is already Muted`)
            .setColor('FF0000')
            }).then(me => {
                me.delete({timeout: 5000})
            })
        }

        let time = args[1]
        
        if(!time){
            return await message.channel.send(muteEmbed).then(m=>m.delete({timeout: 5000}))
        }

        let muteLength = ms(time)
        
        const irlTime = new Date()

        irlTime.setMilliseconds(irlTime.getMilliseconds() + muteLength)

        let muteRole = await message.guild.roles.cache.find(r => r.name === 'Muted' && 'muted')
        if(!muteRole){
            await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: '#000000',
                    permissions: []
                },
                reason: 'sadBot mute role creation'
            })

            await message.guild.channels.cache.forEach(channel => {
                channel.overwritePermissions([
                    {
                        id: muteRole.id,
                        deny : ['SEND_MESSAGES', 'ADD_REACTIONS'],
                    }
                ], "Muted role overWrites")
            })
        }

        if(muteMember.roles.cache.has(muteRole.id)){
            return message.channel.send({embed: new Discord.MessageEmbed()
            .setDescription(`**${muteMember.user.tag}** is already Muted`)
            .setColor("#fc5947")
            }).then(m =>m.delete({timeout: 5000}))
        } else{
            muteMember.roles.add(muteRole.id)
            message.channel.send({embed: new Discord.MessageEmbed()
            .setDescription(`**${muteMember.user.tag}** is now muted | ${muteReason}`)
            .setColor("#45f766")
            }).then(m =>m.delete({timeout: 10000}))
        }

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i <= 10; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
        }

        const TodayDate = new Date()

        let muteLog = await new MuteDataBase({
            caseID: makeid(),
            Action: 'Mute',
            guildID: message.guild.id,
            guildName: message.guild.name,
            userName: muteMember.user.tag,
            userID: muteMember.id,
            Reason: muteReason,
            Moderator: message.author.tag,
            expire: irlTime,
            isMuted: true,
            Date: `${TodayDate}`,
            timestamps: message.createdAt
        })
        muteLog.save().catch(err => console.log(err))

        let logChannel = await Guild.findOne({
            guildID: message.guild.id,
            Active: true,
        })

        if(!logChannel){
            return
        }else {
            try {
                message.guild.channels.cache.get(logChannel.LogChannels.InfractionLog ? logChannel.LogChannels.InfractionLog : null).send({embed: new Discord.MessageEmbed()
                    .setAuthor('A MUTE HAS BEEN DETECTED')
                    .addField('User', `\`\`\`${muteMember.user.tag}\`\`\``, true)
                    .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
                    .addField('Time', `\`\`\`${ms(ms(time))}\`\`\``, true)
                    .addField('Reason', `\`\`\`${muteReason}\`\`\``)
                    .setFooter(`${muteMember.id}`)
                    .setTimestamp()
                    .setColor("#fc5947")
                })
            }catch(err){
                console.log(err)
            }
        } 
    }
}