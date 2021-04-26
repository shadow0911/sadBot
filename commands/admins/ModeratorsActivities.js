const Discord = require('discord.js');
const { ModProfile } = require('../../models')
module.exports = {
    name: 'activity',
    aliases: ["mod-activity"],

    run: async(client, message, args,prefix) =>{
        await message.delete();

        if(!message.member.permissions.has("ADMINISTRATOR")){
            return message.author.send('None of your role proccess to use this command')
        }

        const Moderator = message.guild.member(message.mentions.users.first() || await message.guild.members.fetch(args[0]))
        let MODID = Moderator.id

        let DB = await ModProfile.findOne({
            guildID: message.guild.id,
            userID: MODID
        })

        if(!DB){
            return message.channel.send('No user found by this name/ID')
        }else {
            const Embed = new Discord.MessageEmbed()
            .setAuthor(`${Moderator.user.tag} - Moderation activities`)
            .setDescription(`\`\`\`User is ${DB.Rank}\`\`\``)
            .addField("Total Mute", `\`\`\`${DB.Mute}\`\`\``, true)
            .addField("Total Warn", `\`\`\`${DB.Warn}\`\`\``, true)
            .addField("Total Message Purgeed", `\`\`\`${DB.Purge}\`\`\``,true)
            .addField("Total Message Cleaned", `\`\`\`${DB.Clean}\`\`\``,true)
            .addField("Total Kicked", `\`\`\`${DB.Kick}\`\`\``,true)
            .addField("Total Banned", `\`\`\`${DB.Ban}\`\`\``,true)
            .addField("Total Disconnected Members", `\`\`\`${DB.Disconnect}\`\`\``,true)
            .addField("Total Command used", `\`\`\`${DB.Command}\`\`\``,true)
            .addField("Status", `\`\`\`${DB.Status ? DB.Status : "False"}\`\`\``,true)

            await message.channel.send(Embed)
        }
        
    }
}