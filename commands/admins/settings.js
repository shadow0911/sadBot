const Discord = require('discord.js');
const { Guild } = require('../../models')
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'settings',
    run: async(client, message, args,prefix) =>{

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return
        }

        const data = await Guild.findOne({guildID: message.guild.id})
        let findMsgChannel = message.guild.channels.cache.find(c => c.id == data.deleteMsgLog)
        let findActionChannel = message.guild.channels.cache.find(c => c.id == data.actionLogChannel)
        let findAdminChannel = message.guild.channels.cache.find(c => c.id == data.adminLogChannel)
        let findWelcomeChannel = message.guild.channels.cache.find(c => c.id == data.welcomechannel)
        let findModAction = message.guild.channels.cache.find(c => c.id == data.ModAction)
        if(!args.length){
            let settingsEmbed = new MessageEmbed()

            .setAuthor(`${message.guild.name} - Settings`)
            .addField('Prefix', `\`\`\`${data.prefix}\`\`\``, true) 
            .addField('Message-logs', `\`\`\`${findMsgChannel.name}\`\`\``, true) 
            .addField('Action-logs', `\`\`\`${findActionChannel.name}\`\`\``, true)
            .addField('Admin-logs', `\`\`\`${findAdminChannel.name}\`\`\``, true) 
            .addField('Members-log', `\`\`\`${findWelcomeChannel.name}\`\`\``, true)
            .addField('Mod-Actions', `\`\`\`${findModAction.name}\`\`\``, true) 
            .addField('Moderator-role', `\`\`\`${data.ModRole.name}\`\`\``, true) 
            .addField('Admin-role', `\`\`\`${data.AdminRole.name}\`\`\``, true) 
            .setFooter(`${prefix}settings [field name] to change the settings`)

            message.channel.send(settingsEmbed)
            return false;
        }

        let cmd = args.shift().toLowerCase()

        switch(cmd){
            case'prefix':{
                let prefixEmbed = new MessageEmbed()
                .setAuthor(`${message.guild.name} - Settings`)
                .setDescription(`If you want to change the prefix, type the new prefix in chat`)
                .addField('Prefix', `\`\`\`${data.prefix}\`\`\``)
                .setFooter(`\`cancel\` to end the command`)
                let MSG = await message.channel.send(prefixEmbed)

                const filter = (m) => {
                    return m.author.id === message.author.id
                };

                const prefixCollector = message.channel.createMessageCollector(filter, { max: 1});
                prefixCollector.on('collect', async(collected) =>{
                    if(collected.content.toLowerCase() == 'cancel'){
                        message.channel.send('❎canceled command').then(m => m.delete({timeout: 5000}))
                        prefixCollector.stop();
                    }else {
                        await client.updateGuild(message.guild, {prefix: collected.content})

                        const prefixData = await Guild.findOne({guildID: message.guild.id})
    
                        let finalEmbed = new MessageEmbed()
                        .setAuthor(`${message.guild.name} - Settings`)
                        .setDescription(`Prefix has been updated`)
                        .addField('Prefix', `\`\`\`${prefixData.prefix}\`\`\``)
    
                        await MSG.edit(finalEmbed)
                    }
                })

                prefixCollector.on('end', async(collected) =>{
                })
            }
            break;

            case 'message-log':{
                let msgLogEmbed = new MessageEmbed()
                .setAuthor(`${message.guild.name} - Settings`)
                .setDescription(`Ping the channel you want to set it as message log channel.`)
                .addField('Message-Logs', `\`\`\`${findMsgChannel.name}\`\`\``)
                .setFooter(`\`cancel\` to end the command`)
                let MSG = await message.channel.send(msgLogEmbed)

                const channelfilter = async(newMsg) => {

                    if(newMsg.content.toLowerCase() == 'cancel'){
                        return message.channel.send('❎canceled command').then(m => m.delete({timeout: 5000}))
                    }
                    let channelid = await newMsg.content.slice(2, 20)
                    let channel = await message.guild.channels.cache.find(c => c.id == channelid)
                    if(!channel){
                        return message.channel.send("This isn't a valid channel. Please ping a valid channel").then(m => m.delete({timeout: 5000}))
                    }

                    await client.updateGuild(message.guild, {deleteMsgLog: channel.id})

                    return newMsg.author.id == message.author.id

                };

                const msgChannelCollector = message.channel.createMessageCollector(channelfilter, {max: 1});

                msgChannelCollector.on('collect', async(collected) =>{
                    const delMsgData = await Guild.findOne({guildID: message.guild.id})
                    let chanName = message.guild.channels.cache.find(c => c.id == delMsgData.deleteMsgLog )

                    let delEndEmbed = new MessageEmbed()
                    .setAuthor(`${message.guild.name} - Settings`)
                    .setDescription(`Message Log channel has been updated`)
                    .addField('Message Logs', `\`\`\`${chanName.name}\`\`\``)

                    await MSG.edit(delEndEmbed)
                })

                msgChannelCollector.on('end', async(collected) =>{
                })
            }
            break;

            case 'action-log':{
                let actionLogEmbed = new MessageEmbed()
                .setAuthor(`${message.guild.name} - Settings`)
                .setDescription(`Ping the channel you want to set it as Action log channel.`)
                .addField('Action-Logs', `\`\`\`${findActionChannel.name}\`\`\``)
                .setFooter(`\`cancel\` to end the command`)
                let MSG = await message.channel.send(actionLogEmbed)

                const actionfilter = async(newMsg) => {

                    if(newMsg.content.toLowerCase() == 'cancel'){
                        return await message.channel.send('❎canceled command').then(m => m.delete({timeout: 5000}))
                    }
                    let channelid = await newMsg.content.slice(2, 20)
                    let channel = await message.guild.channels.cache.find(c => c.id == channelid)
                    if(!channel){
                        return await message.channel.send("This isn't a valid channel. Please ping a valid channel").then(m => m.delete({timeout: 5000}))
                    }

                    await client.updateGuild(message.guild, {actionLogChannel: channel.id})

                    return newMsg.author.id == message.author.id

                };

                const msgChannelCollector = message.channel.createMessageCollector(actionfilter, {max: 1});

                msgChannelCollector.on('collect', async(collected) =>{

                    const actionData = await Guild.findOne({guildID: message.guild.id})
                    let chanName = message.guild.channels.cache.find(c => c.id == actionData.actionLogChannel)

                    let actionEndEmbed = new MessageEmbed()
                    .setAuthor(`${message.guild.name} - Settings`)
                    .setDescription(`Action Log channel has been updated`)
                    .addField('Action Logs', `\`\`\`${chanName.name}\`\`\``)

                    await MSG.edit(actionEndEmbed)
                })

                msgChannelCollector.on('end', async(collected) =>{
                })
            }
            break;

            case 'admin-log':{
                let adminLogEmbed = new MessageEmbed()
                .setAuthor(`${message.guild.name} - Settings`)
                .setDescription(`Ping the channel you want to set it as Admin log channel.`)
                .addField('Admin-Logs', `\`\`\`${findAdminChannel.name}\`\`\``)
                .setFooter(`\`cancel\` to end the command`)
                let MSG = await message.channel.send(adminLogEmbed)

                const adminLogfilter = async(newMsg) => {

                    if(newMsg.content.toLowerCase() == 'cancel'){
                        return await message.channel.send('❎canceled command').then(m => m.delete({timeout: 5000}))
                    }
                    let channelid = await newMsg.content.slice(2, 20)
                    let channel = await message.guild.channels.cache.find(c => c.id == channelid)
                    if(!channel){
                        return await message.channel.send("This isn't a valid channel. Please ping a valid channel").then(m => m.delete({timeout: 5000}))
                    }

                    await client.updateGuild(message.guild, {adminLogChannel: channel.id})

                    return newMsg.author.id == message.author.id

                };

                const msgChannelCollector = message.channel.createMessageCollector(adminLogfilter, {max: 1});

                msgChannelCollector.on('collect', async(collected) =>{

                    const actionData = await Guild.findOne({guildID: message.guild.id})
                    let chanName = message.guild.channels.cache.find(c => c.id == actionData.adminLogChannel)

                    let adminEndEmbed = new MessageEmbed()
                    .setAuthor(`${message.guild.name} - Settings`)
                    .setDescription(`Admin Log channel has been updated`)
                    .addField('Admin-Logs', `\`\`\`${chanName.name}\`\`\``)

                    await MSG.edit(adminEndEmbed)
                })

                msgChannelCollector.on('end', async(collected) =>{
                })
            }
            break;

            case 'member-log':{
                let welcomeEmbed = new MessageEmbed()
                .setAuthor(`${message.guild.name} - Settings`)
                .setDescription(`Ping the channel you want to set it as Members-log  channel.`)
                .addField('Members-log', `\`\`\`${findWelcomeChannel.name}\`\`\``)
                .setFooter(`\`cancel\` to end the command`)
                let MSG = await message.channel.send(welcomeEmbed)

                const memberfilter = async(newMsg) => {

                    if(newMsg.content.toLowerCase() == 'cancel'){
                        return await message.channel.send('❎canceled command').then(m => m.delete({timeout: 5000}))
                    }
                    let channelid = await newMsg.content.slice(2, 20)
                    let channel = await message.guild.channels.cache.find(c => c.id == channelid)
                    if(!channel){
                        return await message.channel.send("This isn't a valid channel. Please ping a valid channel").then(m => m.delete({timeout: 5000}))
                    }

                    await client.updateGuild(message.guild, {welcomechannel: channel.id})

                    return newMsg.author.id == message.author.id

                };

                const msgChannelCollector = message.channel.createMessageCollector(memberfilter, {max: 1});

                msgChannelCollector.on('collect', async(collected) =>{

                    const actionData = await Guild.findOne({guildID: message.guild.id})
                    let chanName = message.guild.channels.cache.find(c => c.id == actionData.welcomechannel)

                    let memberLogEmbed = new MessageEmbed()
                    .setAuthor(`${message.guild.name} - Settings`)
                    .setDescription(`Member-log channel has been updated`)
                    .addField('Member-logs', `\`\`\`${chanName.name}\`\`\``)

                    await MSG.edit(memberLogEmbed)
                })

                msgChannelCollector.on('end', async(collected) =>{
                })
            }
            break;

            case 'mod-action':{
                let msgLogEmbed = new MessageEmbed()
                    .setAuthor(`${message.guild.name} - Settings`)
                    .setDescription(`Ping the channel you want to set it as mod action log channel.`)
                    .addField('Mod-Actions', `\`\`\`${findModAction.name}\`\`\``)
                    .setFooter(`\`cancel\` to end the command`)
                let MSG = await message.channel.send(msgLogEmbed)
            
                const channelfilter = async(newMsg) => {
            
                    if(newMsg.content.toLowerCase() == 'cancel'){
                        return message.channel.send('❎canceled command').then(m => m.delete({timeout: 5000}))
                    }
                    let channelid = await newMsg.content.slice(2, 20)
                        let channel = await message.guild.channels.cache.find(c => c.id == channelid)
                            if(!channel){
                                return message.channel.send("This isn't a valid channel. Please ping a valid channel").then(m => m.delete({timeout: 5000}))
                            }
            
                            await client.updateGuild(message.guild, {ModAction: channel.id})
            
                            return newMsg.author.id == message.author.id
            
                            };
            
                            const msgChannelCollector = message.channel.createMessageCollector(channelfilter, {max: 1});
            
                msgChannelCollector.on('collect', async(collected) =>{
                    const actionData = await Guild.findOne({guildID: message.guild.id})
                    let chanName = message.guild.channels.cache.find(c => c.id == actionData.ModAction )
            
                    let delEndEmbed = new MessageEmbed()
                            .setAuthor(`${message.guild.name} - Settings`)
                            .setDescription(`Message Log channel has been updated`)
                            .addField('Message Logs', `\`\`\`${chanName.name}\`\`\``)
            
                            await MSG.edit(delEndEmbed)
                        })
            
                        msgChannelCollector.on('end', async(collected) =>{
                        })
                    }
            break;
        }

    }
}