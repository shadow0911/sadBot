const Discord = require('discord.js');

module.exports = {
    name: 'help-mod',
    description:'Helps to see what cmd perm they have and such',
    category: 'moderation',
    run: async(client, message, args,prefix) =>{
        let modRole = message.guild.roles.cache.get('618420341735161876')

        if(!message.member.roles.cache.has(modRole.id) && !message.member.permissions.has('MANAGE_MESSAGES', 'ADMINISTRATOR')){
            return
        }

        if(!args.length){
            return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name} - Moderation commands`)
            .addField('Moderators', [
                `\`\`\`- Mute`,
                "- Unmute",
                "- warn",
                "- purge",
                "- clean",
                "- setnick",
                "- custom-command",
                "- end-report",
                `- status`,
                `- Disconnect\`\`\``
            ], true)
            .addField('Mod+', [
                `\`\`\`- lock`,
                "- unlock",
                "- kick",
                `- Ban\`\`\``,
            ], true)
            .addField('Managers', [
                `\`\`\`- event-create`,
                "- event-end",
                "- Delete-log",
                `- Edit-log\`\`\``
            ], true)
            .addField('Admin', [
                `\`\`\`- create-channel`,
                `- delete-channel`,
                `- embed(disabled)`,
                `- remove-status`,
                `- move-channel`,
                `- reset-role`,
                `- say`,
                `- dm`,
                `- reset-role\`\`\``
            ], true)
            .setFooter('>help-mod (command), e.g >help-mod mute')
            .setColor(message.guild.me.displayColor)
            })
        }

        let cmd = args[0]
        switch(cmd){
            case 'mute':{
                message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor(`${message.guild.name} - Moderation commands`)
                .setTitle('Command: Mute \nCommand access: Moderators')
                .setDescription(`Gives a user \`Muted\` role to prevent them from chatting.`)
                .addFields(
                    {name: 'Mute keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`mute\` <- *key to run the command* \`@user or user ID\` <- *the user you want to mute* \`time\` <- *how long you wants to mute them for* \`reason\` <- *reason for muting*`},
                    {name: '__Usage:__', value: `**Dyno mute**: \n.mute [@user/ID] [time] [reason] \n**sadBot mute**: \n${prefix}mute [@user/ID] [time] [reason] \n**Unbeliveaboat mute**: \n-mute [@user/ID] [time] [reason]`},
                    {name: '__Example:__', value: `**Dyno mute**: \n.mute <@616131030906044416> 10m Spamming chat \n**sadBot mute**: \n${prefix}mute <@616131030906044416> 20m Dm advertising \n**Unbeliveaboat mute**: \n-mute <@616131030906044416> 15m self promotion in chat`},
                    {name: '**__Note__**', value: `• without prefix or key, bot wont respond. \n • Use **Dyno** to mute anyone. \n • You have to provide a short form of minute(m) after time. More shot form seconds(s), day(d). \n • Don't mute anyone over 30 minutes. \n • Provide valid reason when muting to help other mods to understand why they was muted.`}  
                )
                .setColor(message.guild.me.displayColor)
                .setFooter("Don't use any other bots to mute that isn't mentioned above. Try to use Dyno most of the time")
                })
            }
            break;

            case 'unmute':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: Unmute \nCommand access: Moderators')
                    .setDescription(`Removes a user from \`Muted\` role and allows them to chat again.`)
                    .addFields(
                        {name: 'Unmute keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`unmute\` <- *key to run the command* \`@user or user ID\``},
                        {name: '__Usage:__', value: `**Dyno unmute**: \n.unmute [@user/ID] \n**sadBot unmute**: \n${prefix}unmute [@user/ID] \n**Unbeliveaboat unmute**: \n-unmute [@user/ID]`},
                        {name: '__Example:__', value: `**Dyno unmute**: \n.unmute <@616131030906044416> \n**sadBot unmute**: \n${prefix}unmute <@616131030906044416> \n**Unbeliveaboat unmute**: \n-unmute <@616131030906044416>`},
                    )
                    .setColor(message.guild.me.displayColor)
                    .setFooter("Don't use any other bots to mute that isn't mentioned above. Try to use Dyno most of the time")
                })
            }
            break;

            case 'purge':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: Purge \nCommand access: Moderators')
                    .setDescription(`Deletes a bulk number of message of the mentioed user. Helpful to remove spam quickly`)
                    .addFields(
                        {name: 'Purge keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`purge\` <- *key to run the command* \`number of messages\` \`@user or user ID\``},
                        {name: '__Usage:__', value: `**Dyno purge**: \n.purge [number of messages] [@user/ID] \n**sadBot purge**: \n${prefix}purge [number of messages] [@user/ID] \n**Unbeliveaboat purge**: \n-purge [number of messages] [@user/ID]`},
                        {name: '__Example:__', value: `**Dyno purge**: \n.purge 10 <@616131030906044416> \n**sadBot purge**: \n${prefix}purge 50 <@616131030906044416> \n**Unbeliveaboat purge**: \n-purge 35 <@616131030906044416>`},
                        {name: '__Note:__', value: `• Dyno ID purge a bit different. You have to provide ID before number of message \nExample: .purge 1234567891269 33. \n • Dyno and Unbelieabot can bulk delete message without mentioning any user.`}
                    )
                    .setColor(message.guild.me.displayColor)
                    .setFooter("Every bot can purge upto 100 message at once")
                })
            }
            break;

            case 'clean':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: Clean \nCommand access: Moderators')
                    .setDescription(`Deletes a bulk number of messages. Helpful to clear chat quickly`)
                    .addFields(
                        {name: 'clean keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`clean\` <- *key to run the command* \`number of messages\``},
                        {name: '__Usage:__', value: `**sadBot clean**: \n${prefix}clean [number of messages]`},
                        {name: '__Example:__', value: `**sadBot clean**: \n${prefix}clean 50`},
                        {name: '__Note:__', value: `• Only sadbot can use Clean commands \n • You can clean provided amount of message without mentioning any user..`}
                    )
                    .setColor(message.guild.me.displayColor)
                    .setFooter("SadBot can bulk delete 100 message at once")
                })
            }
            break;

            case 'logs':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: Logs/modlogs/punishments \nCommand access: Moderators')
                    .setDescription(`Shows the previous mod action informations about an user`)
                    .addFields(
                        {name: 'Logs/modlogs/punishments keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`Logs/modlogs/punishments\` <- *key to run the command* \`user or userID\` <- *the user you want to see logs*`},
                        {name: '__Usage:__', value: `**Dyno modlogs**:\n.modlogs [user/userID] \n**sadBot Logs**: \n${prefix}logs [user/userID] (work in progress) \n**unbeliveaboat punishments**: \n-punishments [user/userID]`},
                        {name: '__Example:__', value: `**Dyno modlogs**:\n.modlogs <@616131030906044416> \n**sadBot Logs**: \n${prefix}logs <@616131030906044416> (work in progress) \n**unbeliveaboat punishments**: \n-punishments <@616131030906044416>`},
                    )
                    .setColor(message.guild.me.displayColor)
                    .setFooter("SadBot logs will be much better than other bot logs :)")
                })
            }
            break;

            case 'warn':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: warn \nCommand access: NONE')
                    .setDescription(`This command is disabled. Don't use it :D`)
                    .setColor('#f71b1b')
                })
                
            }
            break;

            case 'setnick':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: setnick \nCommand access: Moderators')
                    .setDescription(`changes the nickname of the mentioned user`)
                    .addFields(
                        {name: 'setnick keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`setnick\` <- *key to run the command* \`user or userID\` *the user you want to change nickname* \`name\` <- *name you want to set as nickname*`},
                        {name: '__Usage:__', value: `**Dyno setnick**: \n$.setnick [user or userID] [name you want to set as nickname]`},
                        {name: '__Example:__', value: `**Dyno setnick**: \n$.setnick <@616131030906044416> Change your name `},
                        {name: '__Note:__', value: `• Only dyhno can use setnick command \n • Don't change anyones nickname for fun or troll`}
                    )
                    .setColor(message.guild.me.displayColor)
                })
            }
            break;

            case 'kick':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: integrated \nCommand access: NONE')
                    .setDescription(`Discord has integrated kick to kick anyone. Please use use integrated kick to kick anyone. Don't use any bot kicks so we can keep a track of everything. \nBot kick will mess everything.`)
                    .setColor('#f71b1b')
                })
                
            }
            break;

            case 'whois':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: whois \nCommand access: Moderators')
                    .setDescription(`Fetch a user and shows information about them`)
                    .addFields(
                        {name: 'whois keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`whois\` <- *key to run the command* \`number of messages\``},
                        {name: '__Usage:__', value: `**Dyno whois**: \n$.whois [@user/userID] \n**Unbeliveaboat whois**: \n-whois [@user/userID]`},
                        {name: '__Example:__', value: `**Dyno whois**: \n.whois <@616131030906044416> \n**Unbeliveaboat whois**: \n-whois <@616131030906044416>`},
                    )
                    .setColor(message.guild.me.displayColor)
                })
            }
            break;

            case 'ban':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: ban \nCommand access: NONE')
                    .setDescription(`We want to keep track of everything. So use discord integrated Ban instead of bot ban`)
                    .setColor(message.guild.me.displayColor)
                    .setFooter('Use Discord ban and Change delete message amount to "None"')
                })
            }
            break;

            case 'disconnect':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: disconnect \nCommand access: Mod+')
                    .setDescription(`Disconnect a member from voice channel`)
                    .addFields(
                        {name: 'Disconnect keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`disconnect\` <- *key to run the command* \`user or userID\` <- *the user you want to disconnect from vc`},
                        {name: '__Usage:__', value: `**sadBot disconnect**: \n${prefix}disconnect [@user/UserID]`},
                        {name: '__Example:__', value: `**sadBot disconnect**: \n${prefix}discconnect <@616131030906044416>`},
                        {name: '__Note:__', value: `• Only sadbot can use disconnect command \n • Please don't disconnect anyone for trolling \n • do NOT disconnect Sabbir or his friends from Vc`}
                    )
                    .setColor(message.guild.me.displayColor)
                })
            }
            break;

            case 'lock':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: lock \nCommand access: Mod+')
                    .setDescription(`Lock a channel and prevent everyone from reading or viewing the channel`)
                    .addFields(
                        {name: 'lock keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`lock\` <- *key to run the command* \`Channel or ChannelID\` <- *the channel you want to lock \`reason\` <- The reason why you wants to lock the channel`},
                        {name: '__Usage:__', value: `**sadBot lock**: \n${prefix}lock [channel/channelID] [reason]`},
                        {name: '__Example:__', value: `**sadBot lock**: \n${prefix}lock #ranks-check Bot is down`},
                        {name: '__Note:__', value: `• Only use sadbot to lock channels \n • Please Do NOT lock channels for no reason \n • You can only lock channels if any bot is down`}
                    )
                    .setColor(message.guild.me.displayColor)
                })
            }
            break;

            case 'unlock':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: lock \nCommand access: Mod+')
                    .setDescription(`unocks a channel and let everyone to read the channel again.`)
                    .addFields(
                        {name: 'unlock keys definations:', value:`\`${prefix}\` <- *prefix of the bot. Prefix will trigger the bot* \`lock\` <- *key to run the command* \`Channel or ChannelID\` <- *the channel you want to unlock`},
                        {name: '__Usage:__', value: `**sadBot unlock**: \n${prefix}unlock [channel/channelID]`},
                        {name: '__Example:__', value: `**sadBot unlock**: \n${prefix}unlock #ranks-check`},
                        {name: '__Note:__', value: `• Only use sadbot to unlock channels \n • Please Do NOT unlock any locked channel which is locked for everyone`}
                    )
                    .setColor(message.guild.me.displayColor)
                })
            }
            break;

            case 'custom-cmds':{
                message.channel.send({embed: new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} - Moderation commands`)
                    .setTitle('Command: wel/rr/spam \nCommand access: Moderators')
                    .addField('Custom commands:',
                    [
                        `${prefix}wel *(welcomes a new member)*`,
                        `${prefix}rr *(shows the role system of the server)*`,
                        `${prefix}spam *(shows a message why spam not allowed)*`,
                    ])
                })
            }

        }
    }
}