const Discord = require('discord.js')
module.exports = {
    name: 'find-number',
    description:'cleans an amount of chat',
    category: 'moderation',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        await message.delete()

        let Admin = message.guild.roles.cache.get('617361095685832723')
        if(!message.member.roles.cache.has(Admin.id)){
            return
        }

        let minNumb = parseInt(args[0])
        let maxNumb = parseInt(args[1])



       let evtChan = message.guild.channels.cache.get('827596625714741248')
           let randomNumb = Math.floor(Math.random() * maxNumb);
           let Array = []
           Array.push(randomNumb)

           message.guild.channels.cache.get('707663597194444800').send({embed: new Discord.MessageEmbed()
            .setDescription(`The Number is ${randomNumb}`)
                .setTimestamp()
                .setColor('FF0000')
            })

            const filter = (m) => {
                return m.content == Array;
            };

            await message.channel.send({embed: new Discord.MessageEmbed()
                .setAuthor('Find the number')
                .setDescription(`The number is between ${minNumb} to ${maxNumb}, Good luck finding the number`)
                .setColor(message.guild.me.displayColor)
                .setTimestamp()
            }).then(() => {
                message.channel.awaitMessages(filter, { max: 1, })
                    .then(collected => {
                        message.channel.send(`The number was ${Array}. ${collected.first().author} got the correct number 🎉`);
                    })
                    .catch(collected => {
                        message.channel.send('Looks like nobody got the answer this time.');
                    });
            });
    }
}