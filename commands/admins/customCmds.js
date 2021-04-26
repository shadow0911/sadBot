const { customCommand } = require('../../models')
const { MessageCollector, MessageEmbed } = require('discord.js');
const { set } = require('mongoose');
module.exports = {
    name: 'custom-command',
    aliases: ["customcmd", "cc"],

    run: async(client, message, args,prefix) =>{

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return message.author.send('None of your role proccess to use this command')
        }

        const filter = async (m) => {
            return m.content.toLowerCase() && m.author.id == message.author.id
        };

        async function commandCreate(object, value){
            await customCommand.findOneAndUpdate({
                guildID: message.guild.id,
                Active: true
            },{
                guildName: message.guild.name,
                [object]: value,

            },{
                upsert: true
            }).catch(err => console.log(err))

            await message.channel.send(`${object}: ${value.split(',').join(" ")}`)
        }

        async function commandRoles(object, Roles, objectName){
            let roleSet = new Set(Roles)
                        
            roleSet.forEach(async rolename => {
                const roles = message.guild.roles.cache.find(c => c.id == rolename.replace('<@&','').replace('>','')) || 
                message.guild.roles.cache.find(r => r.name.toLowerCase() == rolename.toLowerCase()) || 
                message.guild.roles.cache.find(c => c.id == rolename)

                if(!roles){
                    return message.channel.send(`Couldn't find ${Roles}`)
                }else {
                    await customCommand.findOneAndUpdate({
                        guildID: message.guild.id,
                        Active: true
                    },{
                        guildName: message.guild.name,
                        $addToSet: {
                            [object]: roles.id,
                            [objectName]: roles.name
                        }
                    },{
                        upsert: true
                    })
                }
            })
        }


        const embed = {
            color: message.guild.me.displayColor,
            author: 'Custom command - creation',
            fields: [
                {
                    name: 'Key / command\*\**\*\*',
                    value: 'key [value] \nExample: key ping'
                },
                {
                    name: 'Content of the command\*\**\*\*',
                    value: 'content [value] \nExample: welcome to the server {author}'
                },
                {
                    name: 'Dete the key when command executed\*\**\*\*',
                    value: 'deletekey [true/false] \nExample: deletekey true = Bot will delete the key when execute, \ndeletekey false = Command key won\'t delete when executed'
                },
                {
                    name: 'Which role will be able to use the command\*\**\*\*',
                    value: 'roles [value] \nExample: roles everyone, admin, moderator \n(use `,` to separate each roles)'
                },
                {
                    name: 'mention any user\*\**\*\*',
                    value: 'mention [true/false] \nExample: mention true = author have to ping a individual to run the command, \nmention false = command will run with only key'
                },
                {
                    name: 'Embed the command\*\**\*\*',
                    value: 'embed [true/false] \nExample: embed true = send the message in embed, \nembed false = send regular message'
                },
                {
                    name: 'Author of the embed',
                    value: 'author [value] \nExample: author THE PING COMMAND'
                },
                {
                    name: 'Title of the embed',
                    value: 'title [value] \nExample: title click here for free robux'
                },
                {
                    name: 'URL of the title',
                    value: 'URL [link] \nExample: URL youtube.com/rickroll'
                },
                {
                    name: 'Footer of the embed',
                    value: 'footer [value] \nExample: footer {author.id}'
                },
                {
                    name: 'Time Stamp',
                    value: 'timestamp [true/false] \nExample: timestamp true = todays date, timestamp false = no time'
                },
                {
                    name: 'Color of the embed',
                    value: 'color [hex color] \nExample: color #ff00ff'
                },
                {
                    name: 'Image of the embede',
                    value: 'image [link] \nExample: image tenor.com/rickroll'
                },
                {
                    name: 'Variable reference',
                    value: '```diff\n- {author} author of the message \n- {author.id} ID of the author \n- {author.tag} authors name with tag \n- {author.name} authors user name \n- {user} pinged individual \n- {user.id} ID of the pinged individual \n- {user.tag} pinged individuals name with tag \n- {user.name} pinged individuals user name \n- {server} name of the current server \n- {server.id} ID of the current server \n- {channel} messaged channel \n- {channel.id} messaged channel ID \n- {channel.name} name of the messaged channel```'
                },
                {
                    name: "**__NOTE__**",
                    value: "> This command creates a message collector, so you don't have to type prefix easch time. \n > [key] (reference to individual command) [value] (value of the individual commands) \n> \*\**\*\* means the command is required \n> If mention enabled, the {user} will work, unless it won't work"
                },
                {
                    name: 'MORE COMMANDS',
                    value: 'cancel - canceles the command creation \nsetup-complete - end the command creation'
                },
            ]
        }

        function antonyms(Array) {
            return Array
            .toString().replace("{author}", '${message.author}')
            .toString().replace("{author.id}", '${message.author.id}')
            .toString().replace("{author.tag}", '${message.author.tag}')
            .toString().replace("{author.name}", '${message.author.username}')
            .toString().replace("{user}", '${member.user}')
            .toString().replace("{user.id}", '${member.user.id}')
            .toString().replace("{user.tag}", '${member.user.tag}')
            .toString().replace("{user.name}", '${member.user.username}')
            .toString().replace("{channel}", '${message.channel}')
            .toString().replace("{channel.name}", '${message.channel.name}')
            .toString().replace("{channel.id}", '${message.channel.id}')
            .toString().replace("{server}", '${message.guild.name}')
            .toString().replace("{server.id}", '${message.guild.id')
            .toString().replace(/^\s+|\s+$/g,'')
        }

        switch(cmd){
            case 'create': {
                await message.channel.send({embed: embed})

                const collector = message.channel.createMessageCollector(filter);

                collector.on('collect', async (collected) =>{
                    // COMMAND KEY
                    if(collected.content.includes("key:")){
                        const keyValue = collected.content.split(" ")[1]

                        commandCreate('key', keyValue)
                    }
                    // MENTION A USER
                    if(collected.content.includes("mention:")){
                        const mentionable = collected.content.split(" ")[1]

                        if(mentionable == "true"){
                            commandCreate('Mention', true)
                        
                        }else if(mentionableValue[0] === "false"){
                            commandCreate('Mention', false)
                        }else {
                            await message.channel.send('Mention a user to run the command? `(true/false)`')
                        }
                    }
                    // CONTENT OF THE COMMANDS
                    if(collected.content.includes("content:")){
                        const contentValue = collected.content.split(" ").slice(1)
                        if(contentValue.length == 0){
                            return message.channel.send('Please type content for your command')
                        }

                        commandCreate('content', antonyms(contentValue))
                    }
                    // EMBED THE COMMAND
                    if(collected.content.includes("embed:")){
                        const embedMsg = collected.content.split(" ")[1]

                        if(embedMsg == "true"){
                            commandCreate('Embed', true)
                        
                        }else if(embedMsg === "false"){
                            commandCreate('Embed', false)
                        }else {
                            await message.channel.send('Send the command in embed when the command is executed? `(true/false)`')
                        }
                    }
                    // ROLES ACCESS OF THE COMMAND
                    if(collected.content.includes("roles:")){
                        let collectedRoles = collected.content.split(" ").slice(1).join(" ")
                        let rolesValue = collectedRoles.split(/,\s+/)
        
                        commandRoles('rolesID', rolesValue, 'rolesNames')
                    }
                    // DELETE THE COMMAND
                    if(collected.content.includes("delete:")){
                        const deleteCmd = collected.content.split(" ")[1]

                        if(deleteCmd == "true"){
                            commandCreate('deleteKey', true)
                    
                        }else if(deleteCmd === "false"){
                            commandCreate('deleteKey', false)
                        }else {
                            await message.channel.send('Delete the command when executed? `(true/false)`')
                        }
                    }
                    // IMAGE LINK
                    if(collected.content.includes("image:")){
                        const imageLink = collected.content.split(" ").slice(1).join(" ")
                        if(!imageLink.startsWith('https://')){
                            return message.channel.send("This isn't a valid link")
                        }else {
                            commandCreate('image', imageLink)
                        }
                    }
                    // EMBED COLOR
                    if(collected.content.includes("color:")){
                        const colorValue = collected.content.split(" ").slice(1).join(" ")

                        commandCreate('color', colorValue ? colorValue : 'RANDOM')
                    }
                    // AUTHOR
                    if(collected.content.includes("author:")){
                        const authorValue = collected.content.split(" ").slice(1)
                        if(authorValue.length == 0){
                            return message.channel.send('Please type the Author of the message')
                        }

                        commandCreate('Author', antonyms(authorValue))
                    }
                    // TITLE
                    if(collected.content.includes("title:")){
                        const titleValue = collected.content.split(" ").slice(1)
                        if(titleValue.length == 0){
                            return message.channel.send('Please type the Title of the message')
                        }

                        commandCreate('Title', antonyms(titleValue)) 
                    }
                    // URL OF TITLE
                    if(collected.content.includes("URL:")){
                        const URL = collected.content.split(" ").slice(1).join(" ")
                        if(!URL.content.startsWith('https://')){
                            return message.channel.send("This isn't a valid link")
                        }else {
                            commandCreate('URL', URL)
                        }
                    }
                    // FOOTER
                    if(collected.content.includes("footer:")){
                        const footerValue = collected.content.split(" ").slice(1)
                        if(footerValue.length == 0){
                            return message.channel.send('Please type the Footer of the message')
                        }

                        commandCreate('Footer', antonyms(footerValue)) 
                    }
                    // TIMESTAMP
                    if(collected.content.includes("timestamp")){
                        const timeStampValue = collected.content.split(" ")[1]

                        if(timeStampValue == "true"){
                            commandCreate('TimeStamp', true)
                    
                        }else if(timeStampValue === "false"){
                            commandCreate('TimeStamp', false)
                        }else {
                            await message.channel.send('Add a timestamp on the embed? `(true/false)`')
                        }
                    }

                    if(collected.content.includes("--save")){
                        const data = await customCommand.findOne({
                            guildID: message.guild.id,
                            Active: true
                        })

                        const setup = {
                            color: data.color ? data.color : message.guild.me.displayColor,
                            author: data.Author ? data.Author : 'NONE',
                            title: data.Title ? data.Title : 'NONE',
                            url: data.URL ? data.URL : null,
                            description: data.content ? data.content.split(',').join(" ") : 'NONE',
                            image: {
                                url: data.image ? data.image : 'NONE'
                            },
                            timestamp: data.TimeStamp ? data.TimeStamp == new Date() : 'FALSE',
                            footer: data.Footer ? data.Footer : 'NONE',
                            fields: [
                                {
                                    name: 'More Command settings',
                                    value: `\`\`\`Embed the command - ${data.Embed ? data.Embed : "False"}, \nRequire to mention user to execure the command - ${data.Mention ? data.Mention : "False"} \nDelete the key when executed - ${data.deleteKey ? data.deleteKey : "False"}\`\`\``
                                },
                                {
                                    name: 'Roles',
                                    value: `\`\`\`${data.rolesNames ? data.rolesNames : "None"}\`\`\``
                                }

                            ]
                        }

                        message.channel.send('Setup complete',{embed: setup})
                        await customCommand.findOneAndUpdate({
                            guildID: message.guild.id,
                            Active: true
                        },{
                            Active: false,
                            guildID: message.guild.id,
                            guildName: message.guild.name,
                        },{
                            upsert: true
                        }).catch(err => console.log(err))
                        await collected.react("👍")

                        collector.stop();
                    }

                    if(collected.content.includes("--cancel")){

                        await customCommand.findOneAndDelete({
                            guildID: message.guild.id,
                            Active: true
                        });

                        await collected.react("👍");
                        message.channel.send('Command canceled')
                        collector.stop()
                    }

                })
            }
            break;

            case 'delete': {
                let findCmd = args[1]

                const data = await customCommand.findOne({
                    guildID: message.guild.id,
                    key: findCmd
                })

                if(data){
                    message.channel.send(`Do you want to delete the command \`${data.key}\`? (yes/no)`).then(() =>{
                        const collector = message.channel.createMessageCollector(filter);
                        
                        collector.on('collect', async (collected) =>{
                            if(collected.content.startsWith('yes')){
                                await message.channel.send(`Command \`${data.key}\` has been deleted`)

                                await customCommand.findOneAndDelete({
                                    guildID: message.guild.id,
                                    key: findCmd
                                })
                            }else if(collected.content.startsWith('no')){
                                await message.channel.send('command canceled')
                                collector.stop()
                            }else {
                                return false;
                            }
                        })
                    })
                }

            }
            break;

            case 'list': {
                await customCommand.find({
                    guildID: message.guild.id,
                    Active: false
                }).sort([
                    ['key','ascending']
                ]).exec((err, res) => {
                    if(err){
                        console.log(err)
                    }
                    const listEmbed = new MessageEmbed()
                    .setAuthor(`${message.guild.name} - Custom Commands`)
                    if(res.length === 0){
                        message.channel.send({embed: new MessageEmbed()
                        .setDescription(`No custom commands in this server yet. Start making custom commands by ${prefix}custom-command create`)
                        .setColor("#fc5947")
                        }).then(m=>m.delete({timeout: 5000}))
                        return;
                    }else if(res.length){
                        listEmbed.setColor(message.guild.me.displayColor)
                        for(i = 0; i < res.length; i++){
                            listEmbed.addField(`**${i + 1}**`,[
                                `\`\`\`yml\nKey: ${res[i] && res[i].key ? res[i].key : 'NONE'}\`\`\``,
                            ])
                        }
                    }
                    message.channel.send(listEmbed)
                })
            }
            break;

            case 'edit': {
                const commandName = args[1]

                if(!commandName){
                    return message.channel.send("Please provide the command name you wants to edit")
                }else {
                
                    await customCommand.find({
                        guildID: message.guild.id,
                        key: commandName
                    }).sort([
                        ['key','ascending']
                    ]).exec(async (err, res) => {
                        if(err){
                            console.log(err)
                        }
                        const Embed = new MessageEmbed()
                        .setAuthor(`${message.guild.name} - Custom Command`)
                        if(res.length === 0){
                            message.channel.send({embed: new MessageEmbed()
                            .setDescription(`No custom-command found by this name ${findCmd}`)
                            .setColor("#fc5947")
                            }).then(m=>m.delete({timeout: 5000}))
                            return;
                        }else if(res.length){
                            Embed.setColor(message.guild.me.displayColor)
                            for(i = 0; i < res.length; i++){
                                Embed.addField(`**${i + 1}**`,[
                                    `Key:            ${res[i] && res[i].key ? res[i].key : 'NONE'}`,
                                    `Content:        [ ${res[i] && res[i].content ? res[i].content.split(',').join(" ") : 'NONE'} ]`,
                                    `deleteKey:      ${res[i] && res[i].deleteKey ? res[i].deleteKey : "False"}`,
                                    `Embed:          ${res[i] && res[i].Embed ? res[i].Embed : "False"}`,
                                    `Author:         ${res[i] && res[i].Author? res[i].Author : "NONE"}`,
                                    `Title:          ${res[i] && res[i].Title ? res[i].Title : "NONE"}`,
                                    `Title URL:      ${res[i] && res[i].URL ? res[i].URL : "NONE"}`,
                                    `Image URL:      ${res[i] && res[i].image ? res[i].image : "NONE"}`,
                                    `Color:          ${res[i] && res[i].color ? res[i].color : "NONE"}`,
                                    `Footer:         ${res[i] && res[i].Footer ? res[i].Footer : "NONE"}`,
                                    `TimeStamp:      ${res[i] && res[i].TimeStamp ? res[i].TimeStamp : "False"}`,
                                    `Mention:        ${res[i] && res[i].Mention ? res[i].Mention : "False"}`,
                                    `Permissions:    ${res[i] && res[i].rolesNames ? res[i].rolesNames : "NONE"}`
                                ])
                            }
                            await message.channel.send(Embed)
                        }
                    })

                }

                async function commandedit(object, value){
                    await customCommand.findOneAndUpdate({
                        guildID: message.guild.id,
                        key: commandName,
                        Active: false
                    },{
                        guildName: message.guild.name,
                        [object]: value,
        
                    },{
                        upsert: true
                    }).catch(err => console.log(err))
        
                    await message.channel.send(`${object}: ${value}`)
                }
        
                async function rolesEdit(object, Roles, objectName){
                    let roleSet = new Set(Roles)
                                
                    roleSet.forEach(async rolename => {
                        const roles = message.guild.roles.cache.find(c => c.id == rolename.replace('<@&','').replace('>','')) || 
                        message.guild.roles.cache.find(r => r.name.toLowerCase() == rolename.toLowerCase()) || 
                        message.guild.roles.cache.find(c => c.id == rolename)
        
                        if(!roles){
                            return message.channel.send(`Couldn't find ${Roles}`)
                        }else {
                            await customCommand.findOneAndUpdate({
                                guildID: message.guild.id,
                                Active: true
                            },{
                                guildName: message.guild.name,
                                $addToSet: {
                                    [object]: roles.id,
                                    [objectName]: roles.name
                                }
                            },{
                                upsert: true
                            })
                        }
                    })
                }

                const collector = message.channel.createMessageCollector(filter);

                collector.on('collect', async (collected) =>{
                    // COMMAND KEY
                    if(collected.content.includes("key:")){
                        const keyValue = collected.content.split(" ")[1]

                        commandedit('key', keyValue)
                    }
                    // MENTION A USER
                    if(collected.content.includes("mention:")){
                        const mentionable = collected.content.split(" ")[1]

                        if(mentionable == "true"){
                            commandedit('Mention', true)
                        
                        }else if(mentionableValue[0] === "false"){
                            commandedit('Mention', false)
                        }else {
                            await message.channel.send('Mention a user to run the command? `(true/false)`')
                        }
                    }
                    // CONTENT OF THE COMMANDS
                    if(collected.content.includes("content:")){
                        const contentValue = collected.content.split(" ").slice(1)
                        if(contentValue.length == 0){
                            return message.channel.send('Please type content for your command')
                        }

                        commandedit('content', antonyms(contentValue))
                    }
                    // EMBED THE COMMAND
                    if(collected.content.includes("embed:")){
                        const embedMsg = collected.content.split(" ")[1]

                        if(embedMsg == "true"){
                            commandedit('Embed', true)
                        
                        }else if(embedMsg === "false"){
                            commandedit('Embed', false)
                        }else {
                            await message.channel.send('Send the command in embed when the command is executed? `(true/false)`')
                        }
                    }
                    // ROLES ACCESS OF THE COMMAND
                    if(collected.content.includes("roles:")){
                        let collectedRoles = collected.content.split(" ").slice(1).join(" ")
                        let rolesValue = collectedRoles.split(/,\s+/)
        
                        rolesEdit('rolesID', rolesValue, 'rolesNames')
                    }
                    // DELETE THE COMMAND
                    if(collected.content.includes("delete:")){
                        const deleteCmd = collected.content.split(" ")[1]

                        if(deleteCmd == "true"){
                            commandedit('deleteKey', true)
                    
                        }else if(deleteCmd === "false"){
                            commandedit('deleteKey', false)
                        }else {
                            await message.channel.send('Delete the command when executed? `(true/false)`')
                        }
                    }
                    // IMAGE LINK
                    if(collected.content.includes("image:")){
                        const imageLink = collected.content.split(" ").slice(1).join(" ")
                        if(!imageLink.startsWith('https://')){
                            return message.channel.send("This isn't a valid link")
                        }else {
                            commandedit('image', imageLink)
                        }
                    }
                    // EMBED COLOR
                    if(collected.content.includes("color:")){
                        const colorValue = collected.content.split(" ").slice(1).join(" ")

                        commandedit('color', colorValue ? colorValue : 'RANDOM')
                    }
                    // AUTHOR
                    if(collected.content.includes("author:")){
                        const authorValue = collected.content.split(" ").slice(1)
                        if(authorValue.length == 0){
                            return message.channel.send('Please type the Author of the message')
                        }

                        commandedit('Author', antonyms(authorValue))
                    }
                    // TITLE
                    if(collected.content.includes("title:")){
                        const titleValue = collected.content.split(" ").slice(1)
                        if(titleValue.length == 0){
                            return message.channel.send('Please type the Title of the message')
                        }

                        commandedit('Title', antonyms(titleValue)) 
                    }
                    // URL OF TITLE
                    if(collected.content.includes("URL:")){
                        const URL = collected.content.split(" ").slice(1).join(" ")
                        if(!URL.content.startsWith('https://')){
                            return message.channel.send("This isn't a valid link")
                        }else {
                            commandedit('URL', URL)
                        }
                    }
                    // FOOTER
                    if(collected.content.includes("footer:")){
                        const footerValue = collected.content.split(" ").slice(1)
                        if(footerValue.length == 0){
                            return message.channel.send('Please type the Footer of the message')
                        }

                        commandedit('Footer', antonyms(footerValue)) 
                    }
                    // TIMESTAMP
                    if(collected.content.includes("timestamp")){
                        const timeStampValue = collected.content.split(" ")[1]

                        if(timeStampValue == "true"){
                            commandedit('TimeStamp', true)
                    
                        }else if(timeStampValue === "false"){
                            commandedit('TimeStamp', false)
                        }else {
                            await message.channel.send('Add a timestamp on the embed? `(true/false)`')
                        }
                    }

                    if(collected.content.includes("--save")){
                        const data = await customCommand.findOne({
                            guildID: message.guild.id,
                            Active: false,
                            key: commandName
                        })

                        const setup = {
                            color: data.color ? data.color : message.guild.me.displayColor,
                            author: data.Author ? data.Author : 'NONE',
                            title: data.Title ? data.Title : 'NONE',
                            url: data.URL ? data.URL : null,
                            description: data.content ? data.content.split(',').join(" ") : 'NONE',
                            image: {
                                url: data.image ? data.image : 'NONE'
                            },
                            timestamp: data.TimeStamp ? data.TimeStamp == new Date() : 'FALSE',
                            footer: data.Footer ? data.Footer : 'NONE',
                            fields: [
                                {
                                    name: 'More Command settings',
                                    value: `\`\`\`Embed the command - ${data.Embed ? data.Embed : "False"}, \nRequire to mention user to execure the command - ${data.Mention ? data.Mention : "False"} \nDelete the key when executed - ${data.deleteKey ? data.deleteKey : "False"}\`\`\``
                                },
                                {
                                    name: 'Roles',
                                    value: `\`\`\`${data.rolesNames ? data.rolesNames : "None"}\`\`\``
                                }

                            ]
                        }

                        message.channel.send('Edit complete',{embed: setup})
                        await customCommand.findOneAndUpdate({
                            guildID: message.guild.id,
                            Active: true
                        },{
                            Active: false,
                            guildID: message.guild.id,
                            guildName: message.guild.name,
                        },{
                            upsert: true
                        }).catch(err => console.log(err))
                        await collected.react("👍")

                        collector.stop();
                    }

                    if(collected.content.includes("--cancel")){

                        await customCommand.findOneAndDelete({
                            guildID: message.guild.id,
                            Active: true
                        });

                        await collected.react("👍");
                        message.channel.send('Command canceled')
                        collector.stop()
                    }

                })
            }
            break;

            case 'command': {
                let findCmd = args[1]

                await customCommand.find({
                    guildID: message.guild.id,
                    key: findCmd
                }).sort([
                    ['key','ascending']
                ]).exec((err, res) => {
                    if(err){
                        console.log(err)
                    }
                    const Embed = new MessageEmbed()
                    .setAuthor(`${message.guild.name} - Custom Command`)
                    if(res.length === 0){
                        message.channel.send({embed: new MessageEmbed()
                        .setDescription(`No custom-command found by this name ${findCmd}`)
                        .setColor("#fc5947")
                        }).then(m=>m.delete({timeout: 5000}))
                        return;
                    }else if(res.length){
                        Embed.setColor(message.guild.me.displayColor)
                        for(i = 0; i < res.length; i++){
                            Embed.addField(`**${i + 1}**`,[
                                `\`\`\`yml\nKey:            ${res[i] && res[i].key ? res[i].key : 'NONE'}\`\`\``,
                                `Content:        [ ${res[i] && res[i].content ? res[i].content.split(',').join(" ") : 'NONE'} ]`,
                                `\`\`\`yml\ndeleteKey:      ${res[i] && res[i].deleteKey ? res[i].deleteKey : "False"}`,
                                `Embed:          ${res[i] && res[i].Embed ? res[i].Embed : "False"}`,
                                `Author:         ${res[i] && res[i].Author? res[i].Author : "NONE"}`,
                                `Title:          ${res[i] && res[i].Title ? res[i].Title : "NONE"}`,
                                `Title URL:      ${res[i] && res[i].URL ? res[i].URL : null}`,
                                `Image URL:      ${res[i] && res[i].image ? res[i].image : null}`,
                                `Color:          ${res[i] && res[i].color ? res[i].color : "NONE"}`,
                                `Footer:         ${res[i] && res[i].Footer ? res[i].Footer : "NONE"}`,
                                `TimeStamp:      ${res[i] && res[i].TimeStamp ? res[i].TimeStamp : "False"}`,
                                `Mention:        ${res[i] && res[i].Mention ? res[i].Mention : "False"}`,
                                `Permissions:    ${res[i] && res[i].rolesNames ? res[i].rolesNames : "NONE"}\`\`\``
                            ])
                        }
                        message.channel.send(Embed)
                    }
                })
            }
            break;

        }
    }
}