const Discord = require('discord.js');
module.exports = {
    name: 'scam',
    description:'scam troll for kids',
    category: 'fun',
    usage:'scam <number of scam>',
    run: async(client, message, args,prefix) =>{
        await message.delete();

        if(!args[0]) return message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor('Command: Scam')
            .setDescription('Scam your friends with some scam message 😂')
            .addField('Scam list: ', [
                '• vbucks - Fortnite currency',
                '• robux - Roblox currency',
                '• gtaMoney - GTA-V currency',
                '• vgrass - vhera Currency ',
            ])
            .addField('Usage: ', `${prefix}scam <scam name> \n${prefix}scam vbucks`)
            .setColor(message.guild.me.displayColor)
            .setFooter("• 'Embed_links', 'Add_Reaction' premission is necessary")
        })
        let scamCmd = args[0]
        switch(scamCmd){
            case'vbucks':{
                let vbucksScam =  new Discord.MessageEmbed()
                .setTitle('Free V-bucks')
                .setDescription('Free 10,000 V-bucks on the line')
                .setThumbnail('https://freethevbucks.com/wp-content/uploads/v-bucks.png')
                .addField("Claim your free V-bucks today", 'Click on the reaction below to claim your free V-bucks')
                .setFooter("click on the '✅' ")
                .setColor('#c5fcf9')
                .setTimestamp()
                message.channel.send({embed: vbucksScam}).then( embedMessage => {
                    embedMessage.react("✅")
                const filter = (reaction,user) => reaction.emoji.name === '✅' || message.guild.members
                embedMessage.awaitReactions(filter, { max :3, time: 30000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '✅'){
                    setTimeout(function(){
                        message.channel.send('LoL get scammed')
                    }, 10000)
                }
                }).catch(collected => {
                message.channel.send('No one reacted so None got the prize');
                });
            });
        }
        break;
            case'robux':{
                let robuxScam =  new Discord.MessageEmbed()
                .setTitle('Absolute Free Robux')
                .setDescription('Free 1,00,000 Robux on the line')
                .setThumbnail('https://production-gameflipusercontent.fingershock.com/us-east-1:79af1e75-3cdd-445c-b755-7a06eedd537a/f9b8b503-d207-494e-835f-7a7c210a13e9/801cab10-08a9-4219-a44e-587798857219')
                .addField("Claim your free Robux and builder club membership today", 'Click on the reaction below to claim your free Robux')
                .setFooter("click on the '✅' ")
                .setColor('#31b522')
                .setTimestamp()
                message.channel.send({embed: robuxScam}).then( robuxEmbedMessage => {
                    robuxEmbedMessage.react("✅")
                const filter = (reaction,user) => reaction.emoji.name === '✅' || message.guild.members
                robuxEmbedMessage.awaitReactions(filter, { max :3, time: 30000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '✅'){
                    setTimeout(function(){
                        message.channel.send({embed: new Discord.MessageEmbed()
                        .setTitle(`Claim it here`)
                        .setFooter('Note:The Link does not contain any IP grabber or virus')
                        .setURL('https://www.youtube.com/watch?v=Rt6z5K__228')
                        .setColor('RANDOM')
                        })
                    }, 10000)
                }
                }).catch(collected => {
                message.channel.send('LoL y\'all didn\'t reacted so you didn\'t got the prize xD');
                });
            });
            }
        break;
            case'gtamoney':{
                let gtaScam =  new Discord.MessageEmbed()
                .setTitle('Free money and RP')
                .setDescription('Claim your free 1,000,000+ Gta cash and 10,000+ Rp')
                .setThumbnail('https://cdn.discordapp.com/attachments/703935143068565505/750268096337674320/maxresdefault.jpg')
                .addField("Claim your money no hack required. NO BAN, 100% free", 'Say \`yes\` in chat to claim')
                .setFooter("Type 'yes' in chat ")
                .setColor('#31b522')
                .setTimestamp()
                message.channel.send({embed: gtaScam})
                message.channel.awaitMessages(m => m.content.includes('yes'),
                    { max :1, time: 30000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();

                if (collected.first().content.toLowerCase() == 'yes'){
                    setTimeout(function(){
                        message.channel.send('https://tenor.com/view/rick-roll-stick-bug-stick-bugged-gif-18088057')
                    }, 10000)
                }
                }).catch(collected => {
                message.channel.send('Can\'t belive people don\'t wants gta money anymore 🤔');
                });
            }
        }
    }
}