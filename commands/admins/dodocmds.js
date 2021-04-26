const Discord = require('discord.js');
const { customCommand } = require('../../models')
const { MessageCollector } = require('discord.js');
const { set } = require('mongoose');
module.exports = {
    name: ' malkmgfalmjgap;mkg;akg,a;lg,ka;gjmka;gvkm,alga',

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

                const rolefilter = async (m) => {
                    return m.author.id == message.author.id
                };

                const roleCollector = message.channel.createMessageCollector(filter, { max: 1})

                roleCollector.on('collect', async(collected) =>{
                    if(collected.content.toLowerCase() === 'cancel'){
                        await customCommand.findOneAndDelete({guildID: message.guild.id, Active: true})
                        return false
                    }
                    let roleName = collected.content.split(/,\s+/)
                    let roleSet = new Set(roleName)

                    let { cache } = message.guild.roles;
                  
                    roleSet.forEach(async roleName => {
                        let role = cache.find(r => r.name.toLowerCase() == roleName)
                        if(!role){
                            return message.channel.send(" Error | Couldn't find any roles by this name")
                        }

                        await customCommand.findOneAndUpdate(
                            {
                                guildID: message.guild.id, 
                                Active: true}, 
                            
                            { $addToSet: { 

                                rolePerm: role.id,
                                roleNames: role.name
                                    
                            }}
                            )
                    })

                    let dataRole = await customCommand.findOne({
                        guildID: message.guild.id,
                        Active: true
                    })

                    const EMBED = new Discord.MessageEmbed()
                    .setAuthor(`${client.user.tag} - custom commands`)
                    .setDescription(`4️⃣ do you want the messgae in Embed?, `)
                    .addField('command:', `\`\`\`${dataRole.key}\`\`\``)
                    .addField('content:', `\`\`\`${dataRole.content}\`\`\``)
                    .addField('Role Perms:', `\`\`\`${dataRole.roleNames}\`\`\``)
                    .setColor(message.guild.me.displayColor)
                    .setFooter('Type \'cancel\' to cancel')
                    await sendMsg.edit('Do you want to send the message in Embed?(y/n)',EMBED)
                })

                roleCollector.on('end', async(collected) =>{
                    const EmbedCollector = message.channel.createMessageCollector(filter, {max: 1})
                    EmbedCollector.on('collect', async(collected) =>{
                        if(collected.content.toLowerCase() === 'y'){
                            await customCommand.findOneAndUpdate({
                                guildID: message.guild.id,
                                Active: true
                            },{
                                Embed: true
                            })

                            let settingsEmbed = await customCommand.findOne({
                                guildID: message.guild.id,
                                Active: true
                            })
                            
                            const EMBED = new Discord.MessageEmbed()
                                .setAuthor(`${client.user.tag} - custom commands`)
                                .setDescription(`5️⃣ Paste image link if you want to set an image, `)
                                .addField('command:', `\`\`\`${settingsEmbed.key}\`\`\``)
                                .addField('content:', `\`\`\`${settingsEmbed.content}\`\`\``)
                                .addField('Role Perms:', `\`\`\`${settingsEmbed.roleNames}\`\`\``)
                                .addField('Embed:', `\`\`\`${settingsEmbed.Embed}\`\`\``)
                                .setColor(message.guild.me.displayColor)
                                .setFooter('Type \'cancel\' to cancel')
                            await sendMsg.edit('Do you want to send an image on the embed? (paste the link is yes or else type "s"',EMBED)

                        }else if(collected.content.toLowerCase() === 'n'){
                            await customCommand.findOneAndUpdate({
                                guildID: message.guild.id,
                                Active: true
                            },{
                                Embed: false
                            })
                            let settingsEmbed = await customCommand.findOne({
                                guildID: message.guild.id,
                                Active: true
                            })
                            

                            const finalEmbed = new Discord.MessageEmbed()
                            .setAuthor(`${client.user.tag} - custom commands`)
                            .setDescription(`Setup Complete`)
                            .addField('command:', `\`\`\`${settingsEmbed.key}\`\`\``)
                            .addField('content:', `\`\`\`${settingsEmbed.content}\`\`\``)
                            .addField('Role Perms:', `\`\`\`${settingsEmbed.roleNames}\`\`\``)
                            .addField('Embed:', `\`\`\`${settingsEmbed.Embed}\`\`\``)
                            .setColor(message.guild.me.displayColor)

                            await sendMsg.edit('done',finalEmbed)
                        }
                    })
    
                    EmbedCollector.on('end',async(collected) =>{
                        let settingsEmbed = await customCommand.findOne({
                            guildID: message.guild.id,
                            Active: true
                        })

                        if(settingsEmbed.Embed === false){
                            return false
                            
                        }else if(settingsEmbed.Embed === true){
        
                            const imageCollector = message.channel.createMessageCollector(filter, {max: 1})

                            imageCollector.on('collect', async(collected) =>{

                                if(collected.content.toLowerCase() === 's'){
                                    await customCommand.findOneAndUpdate({
                                        guildID: message.guild.id,
                                        Active: true
                                    },{
                                        image: null
                                    })

                                    const finalEmbed = new Discord.MessageEmbed()
                                    .setAuthor(`${client.user.tag} - custom commands`)
                                    .setDescription(`Setup complete`)
                                    .addField('command:', `\`\`\`${searchData.key}\`\`\``)
                                    .addField('content:', `\`\`\`${searchData.content}\`\`\``)
                                    .addField('Role Perms:', `\`\`\`${searchData.roleNames}\`\`\``)
                                    .addField('Embed:', `\`\`\`${searchData.Embed}\`\`\``)
                                    .setColor(message.guild.me.displayColor)
                                    await sendMsg.edit(finalEmbed)

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
                                .setDescription(`Setup complete`)
                                .addField('command:', `\`\`\`${searchData.key}\`\`\``)
                                .addField('content:', `\`\`\`${searchData.content}\`\`\``)
                                .addField('Role Perms:', `\`\`\`${searchData.roleNames}\`\`\``)
                                .addField('Embed:', `\`\`\`${searchData.Embed}\`\`\``)
                                .setImage(searchData.image)
                                .setColor(message.guild.me.displayColor)
                                await sendMsg.edit('setup complete',finalEmbed)

                                await customCommand.findOneAndUpdate({
                                    guildID: message.guild.id,
                                    Active: true
                                },{
                                    Active: false
                                })
                            })
                            imageCollector.on('end', () =>{

                            })

                            }
                        })
                    });
                })

            })

        }
    }
    }
}