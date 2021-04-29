const Discord = require('discord.js');
const { Guild} = require('../../models')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'setup',
    run: async(client, message, args, prefix) =>{

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return
        }

        const data = await Guild.findOne({
            guildID: message.guild.id, 
            Active: true
        }) // Database

        const entries = Object.entries(data.LogChannels) // Finding the object from database
        const ErrorsEmbed = new MessageEmbed() // New message Embed if any error occures

        const Embed = new MessageEmbed() // Message embed
        .setAuthor(`${message.guild.name} - Settings`)
        .setFooter(`settings [field name] to change the settings`)
        .setColor(message.guild.me.displayColor)

        Embed.addField("Prefix", data.prefix)

        const channelArr = new Array(); // Array of Moderator roles
        for (const [logChannel, channelID] of entries) {
            let objectLogChannels = message.guild.channels.cache.find(c => c.id == channelID)
            channelArr.push(`**${logChannel}** -      ${objectLogChannels ? objectLogChannels : 'NONE'}`)
            
        }
        const adminRoleArr = []
        data.Admin.forEach(rolesID =>{
            let searchForAdmin = message.guild.roles.cache.find(r => r.id == rolesID)
            adminRoleArr.push(searchForAdmin.toString())
        })
        const modRoleArr = []
        data.Moderator.forEach(rolesID =>{
            let searchForMod = message.guild.roles.cache.find(r => r.id == rolesID)
            modRoleArr.push(searchForMod.toString())
        })          
        
        Embed.addField("LOG CHANNELS",`${channelArr.join(',\n')}`)
        Embed.addField(`Admin`, adminRoleArr.length ? `${adminRoleArr.join(',')}` : 'NONE')
        Embed.addField(`Moderator`, modRoleArr.length ? `${modRoleArr.join(',')}` : 'NONE')
        

        if(!args.length){
            message.channel.send(Embed) // IF [2]nd argument is missing, send flat embed
            return false;
        }

        async function configOfGuilds(key, value) {
            await Guild.findOneAndUpdate({
                guildID: message.guild.id,
                Active: true
            },{
                [key]: value,
                guildID: message.guild.id,
                guildName: message.guild.name,
            },{
                upsert: true
            })

            await message.channel.send(`${logChannels} Updated`,Embed)
            // Flat funtion fo Prefix
        }

        async function channelOptions (Channels, key){
            const logChannels = message.guild.channels.cache.find(c => c.id == Channels.replace('<#','').replace('>','')) || 
            message.guild.channels.cache.find(c => c.name == Channels) || 
            message.guild.channels.cache.find(c => c.id == Channels)

            if(!logChannels){
                return message.channel.send({embed: new Discord.MessageEmbed()
                    .setDescription(`Ping/Type channel name/ID to set it as log channel`)
                })
            }else {
                await Guild.findOneAndUpdate({
                    guildID: message.guild.id,
                    Active: true
                },{
                    Active: true,
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    $set: {
                        [`LogChannels.${key}`]: logChannels.id,
                        [`Module.${key}`]: true
                    }
                },{
                    upsert: true
                })

                await message.channel.send(`${logChannels} Updated`,Embed)
            }
            // Fucntion for log channels
        }

        async function rolesOption (Roles, key, roleName){
            let roleSet = new Set(Roles)
                        
            roleSet.forEach(async rolename => {
                const roles = message.guild.roles.cache.find(c => c.id == rolename.replace('<@&','').replace('>','')) || 
                message.guild.roles.cache.find(r => r.name.toLowerCase() == rolename.toLowerCase()) || 
                message.guild.roles.cache.find(c => c.id == rolename)

                if(!roles){
                    return message.channel.send(`Couldn't find ${Roles}`)
                }else {
                    await Guild.findOneAndUpdate({
                        guildID: message.guild.id,
                        Active: true
                    },{
                        Active: true,
                        guildID: message.guild.id,
                        guildName: message.guild.name,
                        $addToSet: {
                            [key]: roles,
                        }
                    },{
                        upsert: true
                    })
                }
                // Function for roles
            })
        }

        let cmd = args[0].toLowerCase()

        const logChannelsOfConfig = message.content.split(" ")[2]
        if(!logChannelsOfConfig){
            ErrorsEmbed.setDescription(`Missing \`channel\` arguments \n**Usage:**\n ${prefix}settings [logs-channel] [channel] \n**Example**\n${prefix}settings mod-logs #mod-actions \n${prefix}settings admin-logs 12345678901234567`)
            return message.channel.send(ErrorsEmbed)
        }

        switch(cmd){
            case 'prefix':
                    let keyValue = message.content.split(" ")[2]
                    configOfGuilds('prefix', keyValue)
                    
                break;
                
            case 'moderator':
                let valueOfMod = message.content.split(" ").slice(2).join(" ")
                let modRoleValue = valueOfMod.split(/,\s+/)

                rolesOption(modRoleValue, 'Moderator')
                
                await message.channel.send(Embed)
                break;

            case 'admin':
                let valueOfAdmin = message.content.split(" ").slice(2).join(" ")
                let adminRoleValue = valueOfAdmin.split(/,\s+/)

                rolesOption(adminRoleValue, 'Admin')

                await message.channel.send(Embed)
                break;

            case 'messagelog':

                channelOptions(logChannelsOfConfig, 'MessageLog' )
                break;

            case 'infractionlog':

                channelOptions(logChannelsOfConfig, 'InfractionLog' )
                break;
            case 'memberjoin':

                channelOptions(logChannelsOfConfig, 'MemberJoin' )
                break;
            case 'memberleft':

                channelOptions(logChannelsOfConfig, 'MemberLeft' )
                break;

            case 'rolelog':

                channelOptions(logChannelsOfConfig, 'RoleLog' )
                break;

            case 'voicelog':

                channelOptions(logChannelsOfConfig, 'VoiceLog' )
                break;

            case 'memberlog':

                channelOptions(logChannelsOfConfig, 'MemberLog' )
                break;

            case 'channelslog':

                channelOptions(logChannelsOfConfig, 'ChannelsLog' )
                break;

            case 'serverlog':

                channelOptions(logChannelsOfConfig, 'ServerLog' )
                break;
            case 'moderationlog':

                channelOptions(logChannelsOfConfig, 'ModerationLog' )
                break;

            case 'adminlog':

                channelOptions(logChannelsOfConfig, 'adminlog' )
                break;

            case 'announcementchannel':

                channelOptions(logChannelsOfConfig, 'AnnouncementChannel' )
                break;
        }

    }
}