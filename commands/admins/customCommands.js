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

            //first embed
            const firstMsg = new Discord.MessageEmbed()
            .setAuthor(`${client.user.tag} - custom commands`)
            .setDescription(`First choose your custom command trigger that will run the command \nCommand has to be one word e.g ${prefix}welcome`)
            .addField('Command:', '\`\`\`none\`\`\`')
            .setColor(message.guild.me.displayColor)
            .setFooter('Type \'cancel\' to cancel')

            let sendMsg = await message.channel.send('1️⃣First choose cmd key',firstMsg)
            
            const filter = async (m, collected) => {
                if(collected.content.toLowerCase() === 'cancel'){
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

                sendMsg.edit("2️⃣ Type the message content",cmdEmbed)
            });
            

            collector.on('end', async(collected) => {
            const contentCollector = message.channel.createMessageCollector(filter, { max: 1});
            
            contentCollector.on('collect', async(collected) => {
                

                const contentEmbed = new Discord.MessageEmbed()
                .setAuthor(`${client.user.tag} - custom commands`)
                .setDescription(`3️⃣ Which role can use this command, `)
                .addField('command:', `\`\`\`${searchCmd.command}\`\`\``)
                .addField('content:', `\`\`\`${collected.first()}\`\`\``)
                .setColor(message.guild.me.displayColor)
                .setFooter('Type \'cancel\' to cancel')
                sendMsg.edit(contentEmbed)
            });
            })
            
            contentCollector.on('end', async(collected) => {

                const rolefilter = async (m, collected) => {
                    if(collected.content.toLowerCase() === 'cancel'){
                        await customCommand.findOneAndDelete({guildID: message.guild.id, Active: true})
                        return false
                    }
                    let roleName = m.content.split(/,\s+/)
                    let role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleName.toLowerCase())
    
                    if(!role){
                        return message.channel.send("Couldn't find any role by this name, please try again")
                    }
    
                    await customCommand.findOneAndUpdate({guildID: message.guild.id, Active: true}, {rolePerm: `${role.id}`})
    
                    return m.author.id == message.author.id
                };

                let roleCollector = message.channel.createMessageCollector(rolefilter, { max: 1})

                roleCollector.on()
        });

        }
    }
    }
}