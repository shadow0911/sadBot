const Discord = require('discord.js');
const fs = require('fs')
const talkedRecently = new Set();
module.exports = {
    name: 'work',
    description:'sets a status message',
    category: 'economy',
    usage:'status',
    run: async(client, message, args,prefix) =>{

        let userProfile = JSON.parse(fs.readFileSync("./database.json", "utf8"))

        let money = Math.floor(Math.random() * 500) 
        let BankMoney = Math.floor(Math.random() * 1) 

        let workMsg = [`You worked as a farmer and earned <:sabbirCoins:774943750136791070> ${money}`,
        `You edited a video for sabbir and earned <:sabbirCoins:774943750136791070> ${money}`,
        `You made a meme for Sabbir, Sabbir really liked the meme and gave you <:sabbirCoins:774943750136791070> ${money}`,
        `You robbed a diamond shop and earned <:sabbirCoins:774943750136791070> ${money}`,
        `You participated in a eating compitation and won the first place prize <:sabbirCoins:774943750136791070> ${money}`,
        `You made a bad joke but still people laughed and gave you <:sabbirCoins:774943750136791070> ${money}`,
        `A fairy just dropped you <:sabbirCoins:774943750136791070> ${money}`,
        `You earned <:sabbirCoins:774943750136791070> ${money} by making a youtube video`,
        `You robbed your uber driver and earned${money}`,
        `You developed a bot and earned ${money}`,
        `You developed a bot and earned ${money}`,
        `You worked as a sabbirs chakor and earned ${money}`, 
        `You worked on discord and earned ${money}`, 
        `You used the work command and earned and ${money}`]

        let choice = workMsg[Math.floor(Math.random() * workMsg.length)]

        if(!userProfile[message.author.id]) {
            userProfile[message.author.id] = {
                passiveMode: true,
                Balance: money,
                bank: BankMoney,
                Roles: 'None',
            }
        } 

        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 10 minute to work again" + `<@${message.author.id}>`);
        } else {
        userProfile[message.author.id].Balance = userProfile[message.author.id].Balance + money;

        await message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic:true }))
            .setDescription(choice)
            .setColor('RANDOM')
            .setTimestamp()
            })
        talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
        }, 600000);
    }

    fs.writeFile("./database.json" , JSON.stringify(userProfile), (err) =>{
        if(err) console.log(err)
    })
    }
}