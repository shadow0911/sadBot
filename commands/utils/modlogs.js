const Discord = require('discord.js');
const fs = require('fs')
module.exports = {
    name: 'log',
    description: 'ping pong',
    category: 'utils',
    run: (client, message, args)=> {

        let userStatus = JSON.parse(fs.readFileSync("./modlogs.json", "utf8"))

        let user = userStatus[message.author.id]

        message.channel.send(`${user.test} \n ${user.Reason} \n ${user.Author}`)
    }
}