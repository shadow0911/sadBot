const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description:'Bans a user',
    category: 'moderation',
    usage:'ban <id> <reason>',
    run: async(client, message, args,prefix) =>{
        await message.delete();

        const ErrorEmbed = {
            color: '#fc433d',
            author: {
                name: `Command - BAN`
            },
            description: 'Ban a member from server if they are being too naughty 😛. \nBot can ban a member if they are not in server.',
            fields: [
                {
                    name: `Usage`,
                    value: `${prefix}ban [user/userID] [reason]`
                },
                {
                    name: `Example`,
                    value: `${prefix}ban @shadow~9999 \n${prefix}ban @shadow~#9999 Reached last mute \n${prefix}ban @dyno~#3861 sadBot is better`
                }
            ],
            footer: {
                text: "Bot require 'Ban_Members' permission"
            }
        }

        if(!args.length){
            return message.channel.send({embed: ErrorEmbed}).then(m=>m.delete({timeout: 10000}))
        };

        let findMember = message.content.split(" ")[1];
        const Member = findMember.replace('<@', '').replace('>', '').replace('!', '');

        const Embed = new Discord.MessageEmbed();

        if(!message.guild.me.permissions.has("BAN_MEMBERS","ADMINISTRATOR")){
            Embed.setDescription(`Missing require permission \`BAN_MEMBERS"\` to Ban a member`)
            Embed.setColor('#fc433d')
            return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
        }else if(!message.member.permissions.has("BAN_MEMBERS", "ADMINISTRATOR")){
            return false
        }

        if(message.guild.member(Member)){
            const User = await message.guild.members.fetch(Member)

            let authorHighestRole1 = message.member.roles.highest.position;
            let mentionHighestRole1 = User.roles.highest.position;

            if(!User){
                Embed.setDescription(`Couldn't find <@${Member}>`)
                Embed.setColor('#fc433d')
                return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
            }else if(User.bannable === false){
                Embed.setDescription(`This user is not Ban able`)
                Embed.setColor('#fc433d')
                return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
            }else if(User.hasPermission("BAN_MEMBERS", "MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")){
                Embed.setDescription(`I can't ban a Mod/Admin`)
                Embed.setColor('#fc433d')
                return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
            }else if(mentionHighestRole1 >= authorHighestRole1) {
                Embed.setDescription(`Couldn't BAN a member with Higher or Equal role as yours`)
                Embed.setColor('#fc433d')
                return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
            }else {
                const banReason = message.content.split(" ").slice(2).join(" ");
                if(!banReason){
                    Embed.setDescription(`Please provide a reason for the BAN`)
                    Embed.setColor('#fc433d')
                    return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
                }

                try {
                    await message.guild.members.ban(User, {reason: banReason ? banReason + ' | ' + `${User.user.id}` + ' | ' + `${message.author.tag}` : `No reason provided | ${Member.id} | ${message.author.tag}`})
                    Embed.setDescription(`${user} is Banned from the server | ${banReason ? banReason : 'No reason provivded'}`)
                    Embed.setColor('#3df258')
                    return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
                }catch(err){
                    console.log(`Couldn't Ban ${User.user.tag} : ${err}`)
                }
            }
        }else {
            const reasonForBan = message.content.split(" ").slice(2).join(" ");
            const fetchMember = client.users.fetch(Member)
            if(!fetchMember){
                Embed.setDescription(`Couldn't find <@${Member}>`)
                Embed.setColor('#fc433d')
                return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
            }
            try {
                await message.guild.members.ban(Member, {reason: reasonForBan ? reasonForBan + ' | ' + `${Member}` + ' | ' + `${message.author.tag}` : `No reason provided | ${Member.id} | ${message.author.tag}`})
                Embed.setDescription(`<@${Member}> is Banned from the server | ${reasonForBan ? reasonForBan : 'No reason provivded'}`)
                Embed.setColor('#3df258')
                return message.channel.send(Embed).then(m=>m.delete({timeout: 10000}))
            }catch(err){
                console.log(`Couldn't Ban ${fetchMember} : ${err}`)
            }
        }
        
    }
}