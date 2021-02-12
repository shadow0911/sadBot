const Discord = require('discord.js')
module.exports = {
    name: 'report',
    aliases: ["ticket"],
    description:'creates a channel for report',
    category: 'moderation',
    run: async(client, message, args,prefix) =>{

        if(!message.member.permissions.has("SEND_MESSAGES")){
            return
        };

            message.guild.channels.create(`report-by-${message.author.tag}`,
            {
                type: 'text',
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"]
                    },
                ],
                reason: 'sadBot report detection'
            }).then(async channel =>{
                let category =  message.guild.channels.cache.find(c => c.id === '617359436381421587' && c.type == "category");
                    await channel.setParent(category.id);
    
                await channel.updateOverwrite(message.guild.roles.everyone, 
                    {
                        VIEW_CHANNEL: false,
                        SEND_MESSAGES: false
                    },
                );

                await channel.updateOverwrite(message.author.id, 
                    {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true
                    },
                )

                let Embed = new Discord.MessageEmbed()
                .setAuthor(`welcome to ${message.guild.name}'s report panel`)
                .setDescription('Please submit your report, a moderator will review it shortly.')
                .addField('How to report:', 
                [
                    `• First submit the reason for reporting `,
                    "• If its dm advertising (such as asking for sub, join server or any kind) then please provide the user along with the screenshot",
                    "• if its doxxing, cyber bullying (such as sending ip grabber, threatening, sending malware or any kind) please provide the user along with screenshot",
                    "• If its any user please provide the reason for reporting them"
                ])
                .addField('**MUST REMEMBER:**', 
                [
                    "• We don't take action against dm drama, cussing, swearing or any kind. If it happened to you then just block them",
                    "• You must have to provide screenshot for dm advertising or doxxing",
                    "• Also keep in mind that we don't accept cropped screenshot",
                    "• Do NOT try to make fake report. Do NOT make a ticket to troll moderators",
                    "• All server rules applies in report channel. So you have to obey them",
                    "• Must mention the user you are reporting",
                    "Be patient. Don't start pinging moderators. They will come to provide help eventually"
                ])
                .setFooter('Breaking any of the rules can get you **Muted** so be careful :D')
                .setColor(message.guild.me.displaycolor)

                await channel.send(Embed);
                await message.reply(`Please go to <#${channel.id}> and submit your report.`);
                await channel.send(`You can submit your report here ${message.author}. Please read the embed above ^`);

                let ModSID = 
                [
                    "571964900646191104",
                    "560792103303512065",
                    "498103090432442369",
                    "566275785258958859",
                    "761618808715870281"
                ];

                let Mods = ModSID[Math.floor(Math.random() * ModSID.length)];

                message.guild.channels.cache.get('779623283082395688').send(`Hey <@${Mods}>. We have got a new report. Please go to <#${channel.id}> and review it. Thank you`);

                message.guild.channels.cache.get('777068832946257922').send({embed: new Discord.MessageEmbed()
                    .setAuthor('New report channel creation',`${message.author.avatarURL({
                        dynamic: true , format: 'png'
                    })}`)
                    .addField('Made by', `${message.author}`, true)
                    .addField('Moderator:', `<@${Mods}>`, true)
                    .setFooter(`${message.author.id}`)
                    .setTimestamp()
                    .setColor(message.guild.me.displaycolor)
                });

        })
    }
}