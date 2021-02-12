const Discord = require('discord.js');

module.exports = {
    name: 'ban',
    description:'Bans a user',
    category: 'moderation',
    usage:'ban <id> <reason>',
    run: async(client, message, args,prefix) =>{

        let Banmem = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))

        if(!message.guild.me.permissions.has("BAN_MEMBERS","ADMINISTRATOR")) return message.channel.send("I dont have Ban permission. Please provide me Ban member permission")

        if(!message.member.permissions.has("BAN_MEMBERS", "ADMINISTRATOR")) return message.author.send("None of your role process to use this command")

        // if(Banmem.permissions.has("MANAGE_MESSAGES","MANAGE_GUILD","ADMINISTRATOR")) return message.channel.send("Seems like they are Admin/Mod. Couldn't Ban them 😭").then(message =>{
        //     message.delete({timeout: 5000})
        // })

        if(!Banmem) return message.channel.send("can't find that user").then(message =>{
        message.delete({timeout: 5000});
    });
        let authorHighestRole1 = message.member.roles.highest.position;
        let mentionHighestRole1 = Banmem.roles.highest.position;
        if(mentionHighestRole1 >= authorHighestRole1) {
        message.channel.send("You can't **Ban** Higher role or equal as yours").then(message =>{
            message.delete({timeout: 5000});
        });
    }
        if(Banmem.bannable === false) return message.channel.send('Sorry can\'t ban that user 😢')
        
        let banreason = args.slice(1).join(' ');

        await message.guild.member.ban(Banmem)

        Banmem.send(`You are banned from ${message.guild.name} Reason: ${banreason}`)

        message.channel.send(`⚒**${Banmem.user.tag}** *is banned from the server*`)

        message.guild.channels.cache.get('777068832946257922').send({embed: new Discord.MessageEmbed()
            .setAuthor('Action: Ban',`${Banmem.user.avatarURL({
                dynamic: true , format: 'png'
            }
            )}`)
            .addField('Banned-Member:', `${Banmem}`, true)
            .addField('Moderator:', `${message.author}`, true)
            .addField('Ban-Reason:', `${banreason}`)
            .setTimestamp()
            .setColor('FF0000')
            })
    }
}