const Discord = require('discord.js');

module.exports = {
    name: 'slap',
    aliases: ['thappor'],
    description:'slap a user',
    category: 'fun',

    run: (client, message, args,prefix) =>{
        message.delete()
        
        let slapper = message.guild.member(message.mentions.users.first() || 
        message.guild.members.cache.get(args[0]))

        if(!slapper){
            return message.channel.send('Ping your enemy/friend to slap them 😞').then(m => {
                m.delete({timeout: 5000})
            })
        }
        if(slapper.id === message.author.id){
            return message.channel.send('You can\'t slap yourself unless a mosquito sits on your face')
        }
        let tenor = ["https://tenor.com/view/no-angry-anime-slap-gif-7355956", 
        "https://tenor.com/view/anime-manga-japanese-anime-japanese-manga-toradora-gif-5373994",
        "https://tenor.com/view/bunny-girl-slap-angry-girlfriend-anime-gif-15144612",
        "https://tenor.com/view/chika-loveiswar-anime-slap-funny-gif-13595529",
        "https://tenor.com/view/oreimo-anime-slap-gif-10936993",
        "https://tenor.com/view/mad-angry-pissed-upset-slap-gif-4436362",
        "https://tenor.com/view/girl-slap-anime-mad-student-gif-17423278",
        "https://tenor.com/view/anime-slap-hit-hurt-angry-gif-12396060","https://tenor.com/view/shikamaru-temari-naruto-gif-shippuden-gif-8576304",
        "https://tenor.com/view/anime-slap-slapping-smacking-heavens-lost-property-gif-5738394",
        "https://tenor.com/view/anime-slap-slap-in-the-face-smash-gif-17314633",
        "https://tenor.com/view/mm-emu-emu-anime-slap-strong-gif-7958720",
        "https://tenor.com/view/anime-slap-onepeace-angry-mad-gif-7202047",
        "https://tenor.com/view/anime-slap-slapping-hit-mad-gif-17897236",
        "https://tenor.com/view/naruto-anime-slap-slapping-sakura-gif-17897216",
        "https://tenor.com/view/anime-slap-girl-boy-gif-7919028",
        "https://tenor.com/view/my-collection-anime-slap-gif-16819981",
        "https://tenor.com/view/anime-slap-gif-12946466",
        "https://tenor.com/view/anime-slap-gif-12946466",
       ]

       let slapGIF = tenor[Math.floor(Math.random() * tenor.length)]

        message.channel.send(`${message.author.username} gave <@${slapper.user.id}> a massive slap!!! \n${slapGIF}`)
    }
}