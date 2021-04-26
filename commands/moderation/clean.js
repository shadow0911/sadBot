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

        let Settings = await Guild.findOne({
            guildID: message.guild.id
        })

        const { ModAction } = Settings

        const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
        
        
        switch(cmd){
            case "bot":{
                message.channel.messages.fetch({
                    limit: 100,
                }).then(async messages => {
                    messages = messages.filter(m => m.author.bot && !m.pinned).array().slice(0, amount ? amount : 100);
                    await message.channel.bulkDelete(messages).then(async () =>{
                        await message.guild.channels.cache.get(ModAction).send({embed: new Discord.MessageEmbed()
                            .setAuthor('Cleaned meesages send by BOTS',`${message.author.avatarURL({
                                dynamic: true , format: 'png', size: 1024
                            }
                            )}`)
                            .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
                            .addField('Message Amount', `\`\`\`${amount ? amount : "100"}\`\`\``, true)
                            .addField('Channel', `${message.channel}`, true)
                            .setTimestamp()
                            .setColor(message.guild.me.displayColor)
                        })
                    })
                })
            }
            break;

            case "human":{
                message.channel.messages.fetch({
                    limit: 100,
                }).then(async messages => {
                    messages = messages.filter(m => !m.author.bot && !m.pinned).array().slice(0, amount ? amount : 100);
                    await message.channel.bulkDelete(messages).then(async () =>{
                        await message.guild.channels.cache.get(ModAction).send({embed: new Discord.MessageEmbed()
                            .setAuthor('Cleaned meesages send by HUMANS',`${message.author.avatarURL({
                                dynamic: true , format: 'png', size: 1024
                            }
                            )}`)
                            .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
                            .addField('Message Amount', `\`\`\`${amount ? amount : "100"}\`\`\``, true)
                            .addField('Channel', `${message.channel}`, true)
                            .setTimestamp()
                            .setColor(message.guild.me.displayColor)
                        })
                    })
                })
            }
            break;

            case "pinned":{
                message.channel.messages.fetch({
                    limit: 100,
                }).then(async messages => {
                    messages = messages.filter(m => m.pinned).array().slice(0, amount ? amount : 100);
                    await message.channel.bulkDelete(messages).then(async () =>{
                        await message.guild.channels.cache.get(ModAction).send({embed: new Discord.MessageEmbed()
                            .setAuthor('Cleaned meesages send by BOTS',`${message.author.avatarURL({
                                dynamic: true , format: 'png', size: 1024
                            }
                            )}`)
                            .addField('Moderator', `\`\`\`${message.author.tag}\`\`\``, true)
                            .addField('Message Amount', `\`\`\`${amount ? amount : "?"}\`\`\``, true)
                            .addField('Channel', `${message.channel}`, true)
                            .setTimestamp()
                            .setColor(message.guild.me.displayColor)
                        })
                    })
                })
            }
            break;

            case `${amount}`: {
                if(amount >= 101) return message.channel.send({embed: new Discord.MessageEmbed()
                    .setDescription('I Can\'t clean more than 100 message at once 😢')
                    .setColor('#FF0000')
                }).then(m =>m.delete ({timeout: 5000}))
        
                await message.channel.messages.fetch().then(messages =>{
                    messages = messages.filter(m => !m.pinned).array().slice(0, amount ? amount : 100)
                    message.channel.bulkDelete(messages).then(async () =>{
        
                    })
                }).catch((err) => console.log(err))
        
                const status = await Status.findOne({
                    userID: message.author.id,
                    guildID: message.guild.id
                })
            }
            break;

            case 'help': {
                message.channel.send({embed: Embed})
            }
        }
        const status = Status.findOne({
            userID: message.author.id,
            guildID: message.guild.id
        })

        const modData = await ModProfile.findOneAndUpdate({
            userID: message.author.id,
            guildID: message.guild.id
        },{
            userID: message.author.id,
            guildID: message.guild.id,
            guildName: message.guild.name,
            userName: message.author.tag,
            Status: status.Enabled ? status.Enabled : false,
            $inc:{
                Clean: amount ? amount : 100,
                Command: 1
            }
        },{
            upsert: true,
            new: false
        })

    }
}