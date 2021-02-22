const Discord = require('discord.js');
const { customCommand } = require('../../models')
module.exports = {
    name: 'custom-command',
    aliases: ["cc"],

    run: async(client, message, args,prefix) =>{
    let cmd = args[0];

    if(!message.member.permissions.has("ADMINISTRATOR")){
        return message.author.send('None of your role proccess to use this command')
    }

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 8; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }

    switch(cmd){
        case'create':{

            await new customCommand({
                cmdID: makeid(),
                guildID: message.guild.id,
                guildName: message.guild.name,
                Active: true,
            }).save()

            const firstMsg = new Discord.MessageEmbed()
            .setAuthor(`${client.user.tag} - custom commands`)
            .setDescription(`First choose your custom command key that will run the command \nCommand has to be one word e.g ${prefix}welcome`)
            .addField('Command:', '\`\`\`none\`\`\`')
            .setColor(message.guild.me.displayColor)
            .setFooter('Type \'cancel\' to cancel')

            let sendMsg = await message.channel.send('1️⃣First choose cmd key',firstMsg)
            
            const filter = async (m) => {
                if(m.content.toLowerCase() === 'cancel'){
                    await customCommand.findOneAndDelete({guildID: message.guild.id, Active: true})
                    return false
                }
                return m.content.toLowerCase() && m.author.id == message.author.id
            };

            const collector = message.channel.createMessageCollector(filter, { max: 1});

            collector.on('collect', async(collected) => {
                await customCommand.findOneAndUpdate({
                    guildID: message.guild.id, 
                    Active: true
                },{
                    key: collected.content
                })

                let dataKey = await customCommand.findOne({
                    guildID: message.guild.id,
                    Active: true
                })

                const cmdEmbed = new Discord.MessageEmbed()
                .setAuthor(`${client.user.tag} - custom commands`)
                .setDescription(`{user} to tag the user, {user.id} to user id, {user.tag} to get user tag. \n{channel} to get the channel, {channel.id} to get the channel id. \n{author} to get message author, {author.id} to get author id`)
                .addField('command:', `\`\`\`${dataKey.key}\`\`\``)
                .addField('Content:', '\`\`\`None\`\`\`')
                .setColor(message.guild.me.displayColor)
                .setFooter('Type \'cancel\' to cancel')

                await sendMsg.edit("2️⃣ Type the message content",cmdEmbed)
            });
            

            collector.on('end', async(collected) => {
            const contentCollector = message.channel.createMessageCollector(filter, { max: 1});
            
            contentCollector.on('collect', async(collected) => {
                await customCommand.findOneAndUpdate({
                    guildID: message.guild.id, 
                    Active: true
                }, {
                    content: collected.content
                })

                let dataContent = await customCommand.findOne({
                    guildID: message.guild.id,
                    Active: true
                })
                
                const contentEmbed = new Discord.MessageEmbed()
                .setAuthor(`${client.user.tag} - custom commands`)
                .setDescription(`3️⃣ Which role can use this command, `)
                .addField('command:', `\`\`\`${dataContent.key}\`\`\``)
                .addField('content:', `\`\`\`${dataContent.content}\`\`\``)
                .setColor(message.guild.me.displayColor)
                .setFooter('Type \'cancel\' to cancel')
                await sendMsg.edit(contentEmbed)
            });

            contentCollector.on('end', async(collected) => {

                const rolefilter = async (newMsg, originalMsg) => {
                    if(newMsg.content.toLowerCase() === 'cancel'){
                        await customCommand.findOneAndDelete({guildID: message.guild.id, Active: true})
                        return false
                    }
                    let lower = newMsg.content.toLowerCase()
                    let roleName = lower.split(/,\s+/)
                    console.log(roleName)
                    originalMsg.channel.send('blelele')
                    let role = await newMsg.guild.roles.cache.find(r => r.name.toLowerCase() === roleName)
                    console.log(role)
    
                    if(!role){
                        return message.channel.send("Couldn't find any role by this name, please try again")
                    }
    
                    await customCommand.findOneAndUpdate(
                        {
                            guildID: message.guild.id, 
                            Active: true}, 
                        {
                            rolePerm: `${role.id}`
                        })
    
                    return newMsg.author.id == originalMsg.author.id
                };

                let roleCollector = message.channel.createMessageCollector(rolefilter, { max: 1})

                roleCollector.on('collect', async(collected) =>{

                    let dataRole = await customCommand.findOne({
                        guildID: message.guild.id,
                        Active: true
                    })

                    const EMBED = new Discord.MessageEmbed()
                    .setAuthor(`${client.user.tag} - custom commands`)
                    .setDescription(`3️⃣ Which role can use this command, `)
                    .addField('command:', `\`\`\`${dataRole.key}\`\`\``)
                    .addField('content:', `\`\`\`${dataRole.content}\`\`\``)
                    .addField('Role Perms:', `\`\`\`${dataRole.rolePerm}\`\`\``)
                    .setColor(message.guild.me.displayColor)
                    .setFooter('Type \'cancel\' to cancel')
                    await sendMsg.edit('Do you want to send the message in Embed?(y/n)',EMBED)
                })

                let EmbedCollector = message.channel.createMessageCollector(filter, {max: 1})
                EmbedCollector.on('collect', async(collected) =>{
                    if(collected.content.toLowerCase() === 'y'){
                        await customCommand.findOneAndUpdate({
                            guildID: message.guild.id,
                            Active: true
                        },{
                            Embed: true
                        })
                    }else if(collected.content.toLowerCase() === 'n'){
                        await customCommand.findOneAndUpdate({
                            guildID: message.guild.id,
                            Active: true
                        },{
                            Embed: false
                        })
                    }
                })

                let searchEmbed = await customCommand.findOne({
                    guildID: message.guild.id,
                    Active: true
                })

                if(searchEmbed.Embed === false){
                    return false
                }else if(searchEmbed.Embed === true){

                    const imageEmbed= new Discord.MessageEmbed()
                    .setAuthor(`${client.user.tag} - custom commands`)
                    .setDescription(`4️⃣Image/GIF link`)
                    .addField('command:', `\`\`\`${searchEmbed.key}\`\`\``)
                    .addField('content:', `\`\`\`${searchEmbed.content}\`\`\``)
                    .addField('Role Perms:', `\`\`\`${searchEmbed.rolePerm}\`\`\``)
                    .addField('Embed:', `\`\`\`${searchEmbed.Embed}\`\`\``)
                    .setColor(message.guild.me.displayColor)
                    .setFooter('Type \'cancel\' to cancel')
                    await sendMsg.edit('If you want to set image paste the image link else type "s" to skip',imageEmbed)

                    let imageCollector = message.channel.createMessageCollector(filter, {max: 1})
                    imageCollector.on('collect', async(collected) =>{
                        if(collected.content.toLowerCase() === 's'){
                            await customCommand.findOneAndUpdate({
                                guildID: message.guild.id,
                                Active: true
                            },{
                                image: null
                            })
                        }else{
                            await customCommand.findOneAndUpdate({
                                guildID: message.guild.id,
                                Active: true
                            },{
                                image: collected.content
                            })
                        }

                        let searchData = await customCommand.findOne({
                            guildID: message.guild.id,
                            Active: true
                        })

                        const finalEmbed = new Discord.MessageEmbed()
                        .setAuthor(`${client.user.tag} - custom commands`)
                        .setDescription(`👍`)
                        .addField('command:', `\`\`\`${searchData.key}\`\`\``)
                        .addField('content:', `\`\`\`${searchData.content}\`\`\``)
                        .addField('Role Perms:', `\`\`\`${searchData.rolePerm}\`\`\``)
                        .addField('Embed:', `\`\`\`${searchData.Embed}\`\`\``)
                        .setColor(message.guild.me.displayColor)
                        .setFooter('Type \'cancel\' to cancel')
                        await sendMsg.edit('If you want to set image paste the image link else type "s" to skipDone',finalEmbed)
                    })
                }
        });
            })

        }
    }
    }
}