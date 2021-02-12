const Discord = require('discord.js');
const ms = require('ms')
const fs = require('fs')
module.exports = {
    name: 'away',
    description:'hug a user',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        await message.delete()

        let userAway = JSON.parse(fs.readFileSync("./away.json", "utf8"))

        let Time = parseInt(args[0])
        if(!Time){
            return
        }
        
        if(!userAway[message.author.id])  {
            userAway[message.author.id] = {
                userName: message.author.tag,
                Time: ms(ms(Time)),
                Away: true
            }
            
        } else if(userAway[message.author.id].Away === false){
            userAway[message.author.id] = {
                userName: message.author.tag,
                Time: ms(ms(Time)),
                Away: true
            }
        }
        await message.channel.send({embed: new Discord.MessageEmbed()
        .setDescription(`${message.author.username} set to be away for ${Time} minutes`)
        .setDescription(message.guild.me.displayColor)
        }).then(m => m.delete({timeout: 5000}))

        fs.writeFile("./away.json" , JSON.stringify(userAway), (err) =>{
            if(err) console.log(err)
        })
    }
}