module.exports = {
    event: "message",
    once: false,
    run(message) {
        let brbMessage = 
        [
            `Ight take your time <@${message.author.id}>.`,
            `Ight take your time <@${message.author.id}>, we ain't going anywhere.`,
            `No problem <@${message.author.id}>, take your time.`,
            `cya <@${message.author.id}>.`
        ]

        let randomBrb = brbMessage[Math.floor(Math.random() * brbMessage.length)]
        
        if(message.content.toLowerCase() === 'brb'){
            message.channel.send(`${randomBrb}`).then(m => {
                m.delete({timeout: 5000})
            })
        };
    }
};