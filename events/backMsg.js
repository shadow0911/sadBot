module.exports = {
    event: "message",
    once: false,
    run(message) {
        let backMessage = 
        [
            `welcome back <@${message.author.id}>.`,
            `welcome back<@${message.author.id}>, Have a nice day/night.`,
            `we was waiting for you <@${message.author.id}>.`,
            `Glad to see you again <@${message.author.id}>.`
        ]
          
          let randomBack = backMessage[Math.floor(Math.random() * backMessage.length)]
        
          if(message.content.toLowerCase() === 'back'){
            message.channel.send(`${randomBack}`).then(m => {
              m.delete({timeout: 5000})
            })
        }
    }
};