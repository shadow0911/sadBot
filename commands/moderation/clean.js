const Discord = require('discord.js');
const { ModProfile, Status, Guild} = require('../../models');
const flag = (
    "MANAGE_MESSAGES"
)
module.exports = {
    name: 'clean',
    aliases: ['clear'],

    run: async(client, message, args,prefix) =>{
        await message.delete();

        if(!message.guild.me.permissions.has(
        "MANAGE_MESSAGES",
        "MANAGE_GUILD",
        "ADMINISTRATOR"
        ))return

        const cmd = args[0]

        if(!message.member.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.author.send("None of your role process to use this command")

        const Embed = {
            color: message.guild.me.displayColor,
            author: {
                name: "Command - Clean"
            },
            description: `${prefix}clean [amount] \n ${prefix}clean 10`,
            fields: [
                {
                    name: 'Sub commands',
                    value: `${prefix}clean [amount] - Cleans every single messages, \n${prefix}clean bot [amount] - Cleans messages send by bots, \n${prefix}clean human [amount] - Cleans messages send by humans, \n${prefix}clean pinned [amount] - cleans pinned messages of the channel` 
                },
                {
                    name: 'Usage',
                    value: `${prefix}clean 10, \n${prefix}clean bot 30, \n${prefix}clean human 20, \n${prefix}clean pinned 50`
                }
            ],
            footer: {
                text: "Note - Bot can clean upto 100 messages"
            },
            timestamp: new Date()
        }

        const Settings = await Guild.findOne({
            guildID: message.guild.id,
            Active: true
        })
        
        async function purgeMessage(amount, individual, MessageToPurge){
            const Embed = new Discord.MessageEmbed()
                .addField('Message Amount', `\`\`\`${amount}\`\`\``, true)
                .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
                .setColor("#f2f4f7")
                .setTimestamp()
            switch(individual){
                case 'bots':
                    await message.channel.messages.fetch({limit: 100}).then(messages =>{
                        messages = messages.filter(m => m.author.bot && !m.pinned).array().slice(0, amount ? amount : 100)
                        message.channel.bulkDelete(messages)

                        Embed.setAuthor("Bots message deletion")
                        if(Settings.LogChannels.ModerationLog){
                            message.guild.channels.cache.get(Settings.LogChannels.ModerationLog).send({Embed})
                        }else {
                            return
                        }
                    }).catch((err) => console.log(err))
                    break;
                
                case 'humans':
                    await message.channel.messages.fetch({limit: 100}).then(messages =>{
                        messages = messages.filter(m => !m.author.bot && !m.pinned).array().slice(0, amount ? amount : 100)
                        message.channel.bulkDelete(messages)

                        Embed.setAuthor("Humans message deletion")
                        if(Settings.LogChannels.ModerationLog){
                            message.guild.channels.cache.get(Settings.LogChannels.ModerationLog).send({Embed})
                        }else {
                            return
                        }
                    }).catch((err) => console.log(err))
                    break;
                    
                case 'startsWith':
                    await message.channel.messages.fetch({limit: 100}).then(messages =>{
                        messages = messages.filter(m => !m.pinned && m.content.startsWith(MessageToPurge)).array().slice(0, amount ? amount : 100)
                        message.channel.bulkDelete(messages)

                        Embed.setAuthor("Starts-with message deletion")
                        Embed.addField("Starts-with", `\`\`\`${MessageToPurge}\`\`\``, true)
                        if(Settings.LogChannels.ModerationLog){
                            message.guild.channels.cache.get(Settings.LogChannels.ModerationLog).send({Embed})
                        }else {
                            return
                        }
                    }).catch((err) => console.log(err))
                    break;

                case 'endsWith':
                    await message.channel.messages.fetch({limit: 100}).then(messages =>{
                        messages = messages.filter(m => !m.pinned && m.content.endsWith(MessageToPurge)).array().slice(0, amount ? amount : 100)
                        message.channel.bulkDelete(messages)

                        Embed.setAuthor("Ends-with message deletion")
                        Embed.addField("Ends-with", `\`\`\`${MessageToPurge}\`\`\``, true)
                        if(Settings.LogChannels.ModerationLog){
                            message.guild.channels.cache.get(Settings.LogChannels.ModerationLog).send({Embed})
                        }else {
                            return
                        }
                    }).catch((err) => console.log(err))
                    break;

                case 'matchedWord':
                    await message.channel.messages.fetch({limit: 100}).then(messages =>{
                        messages = messages.filter(m => !m.pinned && m.content.includes(MessageToPurge)).array().slice(0, amount ? amount : 100)
                        message.channel.bulkDelete(messages)

                        
                        Embed.setAuthor("Match message deletion")
                        Embed.addField("Matched word", `\`\`\`${MessageToPurge}\`\`\``, true)
                        if(Settings.LogChannels.ModerationLog){
                            message.guild.channels.cache.get(Settings.LogChannels.ModerationLog).send({Embed})
                        }else {
                            return
                        }
                    }).catch((err) => console.log(err))
                    break;

                case 'notIncludes':
                    await message.channel.messages.fetch({limit: 100}).then(messages =>{
                        messages = messages.filter(m => !m.pinned && !m.content.includes(MessageToPurge)).array().slice(0, amount ? amount : 100)
                        message.channel.bulkDelete(messages)

                        Embed.setAuthor("Doesn't match message deletion")
                        Embed.addField("Doesn't Match", `\`\`\`${MessageToPurge}\`\`\``, true)
                        if(Settings.LogChannels.ModerationLog){
                            message.guild.channels.cache.get(Settings.LogChannels.ModerationLog).send({Embed})
                        }else {
                            return
                        }
                    }).catch((err) => console.log(err))
                    break;

                case 'pinnedMessage':
                    case 'notIncludes':
                        await message.channel.messages.fetch({limit: 100}).then(messages =>{
                            messages = messages.filter(m => m.pinned).array().slice(0, amount ? amount : 100)
                            message.channel.bulkDelete(messages)

                            Embed.setAuthor("Pinned message deletion")
                            if(Settings.LogChannels.ModerationLog){
                                message.guild.channels.cache.get(Settings.LogChannels.ModerationLog).send({Embed})
                            }else {
                                return
                            }
                        }).catch((err) => console.log(err))
                    break;
            }
        }

        const amount = !!parseInt(message.content.split(' ')[2]) ? parseInt(message.content.split(' ')[2]) : parseInt(message.content.split(' ')[3])
        const solidMessage = parseInt(message.content.split(' ')[1])

        if(amount >= 101){
            return message.channel.send("i can't delete more than 100")
        }else if(solidMessage >= 101){
            return message.channel.send("i can't delete more than 100")
        }

        switch(cmd) {
            case 'match':
                let matchMessage = args[1]
                purgeMessage(amount, 'matchedWord', matchMessage)
                break;

            case 'bots':
                purgeMessage(amount, 'bots')
                break;

            case 'humans':
                purgeMessage(amount, 'humans')
                break;

            case 'starts':
                let startsMsg = args[1]
                purgeMessage(amount, 'startsWith', startsMsg)
                break;

            case 'ends':
                let endsMsg = args[1]
                purgeMessage(amount, 'endsWith', endsMsg)
                break;

            case 'nope':
                let notIncludesMsg = args[1]
                purgeMessage(amount, 'notIncludes', notIncludesMsg)
                break;

            case 'pinned':
                purgeMessage(amount, 'pinnedMessage')
                break;

            case `${solidMessage}`:
                await message.channel.messages.fetch({limit: 100}).then(messages =>{
                    messages = messages.filter(m => !m.pinned).array().slice(0, solidMessage ? solidMessage : 100)
                    message.channel.bulkDelete(messages)

                    if(Settings.LogChannels.ModerationLog){
                        message.guild.channels.cache.get(Settings.LogChannels.ModerationLog).send({embed: new Discord.MessageEmbed()
                            .setAuthor("Message deletion")
                            .addField("Amount", `\`\`\`${solidMessage}\`\`\``, true)
                            .addField("Moderator", `\`\`\`${message.author.tag}\`\`\``, true)
                            .setTimestamp()
                            .setColor("#f2f4f7")
                        })
                    }else {
                        return
                    }
                }).catch((err) => console.log(err))
            break;

        }
    }
}