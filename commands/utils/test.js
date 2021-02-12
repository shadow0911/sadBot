const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')

module.exports = {
    name: 'logit',
    description: 'ping pong',
    category: 'utils',
    run: async(client, message, args)=> {
    	let logMsg = args.slice(1).join(" ")

        let Member = message.guild.member(message.mentions.users.first() || 
                await message.guild.members.fetch(args[0]))

        let userLogs = JSON.parse(fs.readFileSync("./modLogs.json", "utf8"))

        let randomNumb = Math.floor(Math.random()* 999999999999999)

        userLogs[randomNumb] = 
        {
                userID: Member.user.id,
                userName: Member.user.tag,
                Reason: logMsg,
                Author: message.author.tag,
                Time: new Date(), 
                LogID: randomNumb
        }
        await message.channel.send('did')

        fs.writeFile("./modLogs.json" , JSON.stringify(userLogs, null, 4), (err) =>{
                if(err){
                    console.log(err)    
                }
        });

    }  
}