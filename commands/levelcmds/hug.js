const Discord = require('discord.js');

module.exports = {
    name: 'hug',
    description:'hug a user',
    category: 'fun',

    run: async(client, message, args,prefix) =>{
        await message.delete()
        
        let hugUser = message.guild.member(message.mentions.users.first() || 
        message.guild.members.cache.fetch(args[0]))

        if(!hugUser){
            return message.channel.send('Ping your friend to hug them.').then(m => {
                m.delete({timeout: 5000})
            })
        }
        if(hugUser.id === message.author.id){
            return message.channel.send('You are so lonely that you are hugging yourself 😢')
        }
        
         let tenor = ["https://tenor.com/view/teria-wang-kishuku-gakkou-no-juliet-hug-anime-gif-16509980", 
        "https://tenor.com/view/hug-cuddle-comfort-love-friends-gif-5166500",
        "https://tenor.com/view/anime-hug-love-smile-gif-15942846",
        "https://tenor.com/view/hug-anime-love-dragon-loli-gif-9920978",
        "https://tenor.com/view/hug-anime-love-gif-7324587",
        "https://tenor.com/view/sakura-quest-anime-animes-hug-hugging-gif-14721541",
        "https://tenor.com/view/anime-hug-gif-15249774",
        "https://tenor.com/view/anime-hug-manga-cuddle-japan-gif-10522729",
        "https://tenor.com/view/cuddle-nuzzle-cute-hug-hugging-gif-9375012",
        "https://tenor.com/view/anime-cheeks-hugs-gif-14106856",
        "https://tenor.com/view/cute-anime-hug-love-come-here-gif-7864716",
        "https://tenor.com/view/anime-hug-hug-hugs-anime-girl-anime-girl-hug-gif-16787485",
        "https://tenor.com/view/love-hug-cry-tears-gif-7274071",
        "https://tenor.com/view/hug-love-sweet-anime-imiss-you-gif-17178151",
        "https://tenor.com/view/anime-cute-sweet-hug-gif-12668677",
        "https://tenor.com/view/abra%C3%A7o-hug-miss-you-gif-14903944",
        "https://tenor.com/view/hug-love-sweet-anime-couple-gif-16300141",
        "https://tenor.com/view/hug-sad-cry-run-sweet-gif-16935460",
       ]

       let hugGIF = tenor[Math.floor(Math.random() * tenor.length)]

        message.channel.send(`${message.author.username} gave <@${hugUser.user.id}> a nice and warn hug 😊 \n${hugGIF}`)
    }
}
