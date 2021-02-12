const Discord = require('discord.js');
const fs = require('fs')
const ms = require("parse-ms")
module.exports = {
    name: 'daily',
    description:'begs for money',
    category: 'economy',
    usage:'beg',
    run: async(client, message, args,prefix) =>{
        let cooldown = 8.64e+7
        let dailyAmt = 2500

        let userProfile = JSON.parse(fs.readFileSync("./database.json", "utf8"))

        let lastdaily = userProfile[message.author.id]
        if(lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0){
            let timeObj = ms(cooldown - (Date.now() - lastdaily))
            message.channel.send(`You already claimed your daily. \nWait ${timeObj.hours}h ${timeObj.minutes}m to claim daily`)
        } else {
            message.channel.send(`You earned your daily ${dailyAmt}`)

            userProfile[message.author.id].Balance = userProfile[message.author.id].Balance + dailyAmt
        }

        fs.writeFile("./database.json" , JSON.stringify(userProfile), (err) =>{
            if(err) console.log(err)
        })
    }
}