const Discord = require('discord.js');
const fs = require('fs')
const talkedRecently = new Set();
module.exports = {
    name: 'beg',
    aliases: ['vikkha'],
    description:'begs for money',
    category: 'economy',
    usage:'beg',
    run: async(client, message, args,prefix) =>{

        let userProfile = JSON.parse(fs.readFileSync("./database.json", "utf8"))

        let moneyAmt = Math.floor((Math.random() * 200));

        let begWin = [`You begged for money and earned <:sabbirCoins:774943750136791070> ${moneyAmt}`,
        `Elon musk gave you <:sabbirCoins:774943750136791070> ${moneyAmt}`,
        `Discord fairy saw you begging and gave you <:sabbirCoins:774943750136791070> ${moneyAmt}`,
        `You were begging near KFC and someone gave you <:sabbirCoins:774943750136791070> ${moneyAmt}`, 
        `Sabbir gave you <:sabbirCoins:774943750136791070> ${moneyAmt} for begging`,
        `Goverment gave you <:sabbirCoins:774943750136791070> ${moneyAmt} for begging`,
        `You begged for food so sakib khan gave you <:sabbirCoins:774943750136791070> ${moneyAmt}`,
        `Sakib al-hassna gave you <:sabbirCoins:774943750136791070> ${moneyAmt} for begging near stadium`,
        `Another begger gave you <:sabbirCoins:774943750136791070> ${moneyAmt} for begging, get a job dude`,
        `Shadow felt sad that you are begging so he gave you <:sabbirCoins:774943750136791070> ${moneyAmt}`,
        `You asked Rikai for money, he is so kind that gave you <:sabbirCoins:774943750136791070> ${moneyAmt}`]

        let begLost = ["Justin beiber: No u",
        "You got a slap instead of money for begging",
        "You begged for money but the house owners dog start chassing, you barely made it this time",
        "You asked money to donald trump and he told you to get a job tou idiot",
        "You asked Alvi for money and alvi gave you a uno reverse card",
        "You were begging on street, void saw you and dabbed on you"]

        let begWinRes = begWin[Math.floor((Math.random() * begWin.length))];
        let begLostRes = begLost[Math.floor((Math.random() * begLost.length))];


        let bothCombine = [`${begWinRes}`,`${begLostRes}`];

        let choice = bothCombine[Math.floor((Math.random() * bothCombine.length))];

        if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 5 minutes to beg again" + ` <@${message.author.id}>`);
        } else {
        if(choice === begWinRes){
            userProfile[message.author.id].Balance = userProfile[message.author.id].Balance + moneyAmt;
            await message.channel.send(`${begWinRes}`)

        }else if(choice === begLostRes){
            await message.channel.send(`${begLostRes}`)
        }
        talkedRecently.add(message.author.id);
        setTimeout(() => {

          talkedRecently.delete(message.author.id);
        }, 300000);
    }

        fs.writeFile("./database.json" , JSON.stringify(userProfile), (err) =>{
            if(err) console.log(err)
        })
    }
}