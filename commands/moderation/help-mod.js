const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description:'Helps to see what cmd perm they have and such',
    category: 'moderation',
    run: async(client, message, args,prefix) =>{

        const Menu = {
            author: {
                name: `${client.user.username} Help Menu`
            },
            description: "Which help menu you're looking for? please type in the chat",
            fields: [
                {
                    name: "Moderation",
                    value: "Server moderation type commands like Mute/Purge etc"
                },
                {
                    name: "Fun",
                    value: "Funny commands, just to have some fun"
                },
                {
                    name: "lvl-cmd",
                    value: "Commands you can use based on your levels"
                },
                {
                    name: "Money",
                    value: "Not available xd"
                },
                {
                    name: "Admin",
                    value: "Restricted zone, only admins can open it 🔒"
                },
                {
                    name: "Utils",
                    value: "Utility type commands"
                },
            ],
            footer: {
                text: `Type your desire option to open it`
            }
        }

        const filter = async (m) => {
            return m.content.toLowerCase() && m.author.id == message.author.id
        };
        const collector = message.channel.createMessageCollector(filter, {time: 300000, errors: ['time']});

        const MSG = await message.channel.send({embed: Menu})

        collector.on('collect', async(collected) =>{
            switch(collected.content.toLowerCase()){
                case 'admin':
                    if(!message.member.permissions.has("ADMINISTRATOR")){
                        return MSG.edit('Not enough permissions')
                    }else {
                        const adminMenu = {
                            author: {
                                name: `${client.user.username} - Administration Menu`
                            },
                            fields: 
                            [
                                {
                                    name: "Settings",
                                    value: `\`\`\`${prefix}settings \n - Bot guild settings management, control the bot for entire server.\`\`\``
                                },
                                {
                                    name: "Admin-logs",
                                    value: `\`\`\`${prefix}admin-log | ${prefix}adminlog \n - Server mod logs management.\`\`\``
                                },
                                {
                                    name: "Custom command",
                                    value: `\`\`\`${prefix}custom-command | ${prefix}[customcmd/cc] \n - Custom bot commands.\`\`\``
                                },
                                {
                                    name: "Mod-Activity",
                                    value: `\`\`\`${prefix}activity | ${prefix}mod-activity \n - Manage server moderators, how good they're moderating.\`\`\``
                                },
                                {
                                    name: "Say",
                                    value: `\`\`\`${prefix}say \n - Bot repeats your message, very useful and funny command.\`\`\``
                                },
                                {
                                    name: "Reset-log",
                                    value: `\`\`\`${prefix}reset-log \n - Reset all the logs for a member.\`\`\``
                                },
                                {
                                    name: "Role-members",
                                    value: `\`\`\`${prefix}role-members \n - Check how many members in a role.\`\`\``
                                },
                                {
                                    name: "Create-channel",
                                    value: `\`\`\`${prefix}create-channel \n - Creates a new channel on the server.\`\`\``
                                },
                                {
                                    name: "Delete-channel",
                                    value: `\`\`\`${prefix}delete-channel \n - Deletes an existing channel.\`\`\``
                                },
                                {
                                    name: "Move-channels",
                                    value: `\`\`\`${prefix}move-channel \n - Moves a channel to different category.\`\`\``
                                },
                                {
                                    name: "Remove-status",
                                    value: `\`\`\`${prefix}remove-status \n - Remove active status of a moderator.\`\`\``
                                },
                                {
                                    name: "Emoji",
                                    value: `\`\`\`${prefix}emoji \n - Send a nitro emoji with the help of bot 😀.\`\`\``
                                },
                            ]
                        }
                        MSG.edit({embed: adminMenu})
                    }
                    break;

                    case "moderation":
                        if(!message.member.permissions.has("MANAGE_MESSAGES")){
                            return MSG.edit('Not enough permissions')
                        }else {
                            await MSG.edit({embed: new Discord.MessageEmbed()
                                .setDescription("Please specify which moderation menu you're looking for. Reply in the channel")
                                .addField("options", [
                                    "Mod",
                                    "Lead",
                                    "Core",
                                    "Manager"
                                ])
                            })
                        }
                    break;
                    case "mod":
                        const moderatorMenu = {
                            author: {
                            name: `${client.user.username} - Moderation Menu`
                                },
                            fields: 
                            [
                                {
                                    name: "Mute",
                                    value: `\`\`\`${prefix}mute \n - Mute a member for a specific amount of time.\`\`\``
                                },
                            {
                                name: "Unmute",
                                value: `\`\`\`${prefix}unmute \n - Unmute a muted member.\`\`\``
                            },
                            {
                                name: "Purge",
                                value: `\`\`\`${prefix}purge \n - Bulk delete messages of one member.\`\`\``
                            },
                            {
                                name: "Clean",
                                value: `\`\`\`${prefix}clean \n - Delete bulk amount of messages.\`\`\``
                            },
                            {
                                name: "Warn",
                                value: `\`\`\`${prefix}warn \n - Warn a rules breaker.\`\`\``
                            },
                            {
                                name: "Mod-logs",
                                value: `\`\`\`${prefix}logs \n - Check moderation logs of a member.\`\`\``
                            }
                            ]
                            }
                        MSG.edit({embed: moderatorMenu})
                        break;

                    case "lead":
                        const leadMenu = {
                            author: {
                                name: `${client.user.username} - Moderation Menu`
                                },
                                fields: 
                                [
                                {
                                    name: "Ban",
                                    value: `\`\`\`${prefix}ban \n - Ban a naughty member.\`\`\``
                                },
                                {
                                    name: "Kick",
                                    value: `\`\`\`${prefix}kick \n - Kick a annoying member.\`\`\``
                                },
                                {
                                    name: "Disconnect",
                                    value: `\`\`\`${prefix}disconnect \n - Disconnect a member for VC.\`\`\``
                                },

                            ]
                        }
                    MSG.edit({embed: leadMenu})
                    break;

                    case "core":
                        const coreMenu = {
                            author: {
                                name: `${client.user.username} - Moderation Menu`
                            },
                            fields: 
                            [
                                {
                                    name: "Delete-logs",
                                    value: `\`\`\`${prefix}delete-log \n - Delete a log of a user.\`\`\``
                                },
                                {
                                    name: "Lock",
                                    value: `\`\`\`${prefix}lock \n - Lock a channel.\`\`\``
                                },
                                {
                                    name: "Unlock",
                                    value: `\`\`\`${prefix}unlock \n - Unlock a locked channel.\`\`\``
                                },
                            ]
                            }
                    MSG.edit({embed: coreMenu})
                    break;
                    case "manager":
                        await message.channel.send('Nothing to see here')
                    break;

                    case "cancel":
                        collector.stop()
                    break;
            }
        })
    }
}