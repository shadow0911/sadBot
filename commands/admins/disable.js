const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'disable',
    description:'cleans an amount of chat',
    category: 'moderation',
    usage:'clean 100',
    run: async(client, message, args,prefix) =>{
        if(!message.member.permissions.has("ADMINISTRATOR")){
            return
        }

        let serverSettings = JSON.parse(fs.readFileSync("./endisDatabase.json", "utf8"));

        let cmd = args[0]
        switch(cmd){
            case 'mute':{
                if(!serverSettings[message.guild.id]){
                    serverSettings[message.guild.id] = {
                        mute: false
                    }
                    }else {
                        serverSettings[message.guild.id] = {
                        mute: false
                    }
                    message.channel.send('Mute command disabled')
                }
            }
        }
        fs.writeFile("./endisDatabase.json" , JSON.stringify(serverSettings), (err) =>{
            if(err) console.log(err)
        })
    }
}