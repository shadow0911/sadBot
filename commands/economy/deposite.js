const Discord = require('discord.js');
const fs = require('fs')
const talkedRecently = new Set();
module.exports = {
    name: 'deposite',
    aliases: ['dep'],
    description:'sets a status message',
    category: 'economy',
    usage:'status',
    run: async(client, message, args,prefix) =>{
        let cmds = args[0]

        let userProfile = JSON.parse(fs.readFileSync("./database.json", "utf8"))

        // switch(cmds){
        //     case'all':{
                
        //         userProfile[message.author.id].Balance = userProfile[message.author.id].Balance - userProfile[message.author.id].Balance
        //         userProfile[message.author.id].bank = userProfile[message.author.id].bank + userProfile[message.author.id].Balance
        //         await message.channel.send({embed: new Discord.MessageEmbed()
        //             .setAuthor(message.author.tag, message.author.avatarURL({ dynamic:true }))
        //             .setDescription(`<:sabbirCoins:774943750136791070> ${userProfile[message.author.id].Balance} has been deposit to your account`)
        //         })
        //     }
        // }

        let amount = parseInt(args[0])
        if(!amount){
            return message.channel.send(`${prefix}dep <amount> | ${prefix}dep 1000/ >dep all`)
        }
        if(isNaN(amount)){
            return message.channel.send(`${prefix}dep <amount> | ${prefix}dep 1000/ >dep all`)
        }

        if(userProfile[message.author.id].Balance < amount){
            return message.channel.send('You can\'t deposite more money  you have in your pocket you litte cheater').then(msg =>{
                msg.delete({timeout: 5000})
            })
        }
        userProfile[message.author.id].Balance = userProfile[message.author.id].Balance - amount
        userProfile[message.author.id].bank = userProfile[message.author.id].bank + amount
        
        await message.channel.send({embed: new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic:true }))
            .setDescription(`<:sabbirCoins:774943750136791070> ${amount} has been deposit to your account`)
            .setColor('#00ff6e')
        })

        fs.writeFile("./database.json" , JSON.stringify(userProfile), (err) =>{
            if(err) console.log(err)
        })
    }
}