const { customCommand } = require('../../models')
const { MessageCollector, MessageEmbed, Message } = require('discord.js');
const { set } = require('mongoose');
module.exports = {
    name: 'scheme',

    run: async(client, message, args,prefix) =>{
        const filterOne = m=> {
            console.log(m.author.id, message.author.id)
            return m.author.id == message.author.id
        }
        const filterTwo = m =>{
            return m.author.id == message.author.id
        }
        
        message.channel.send('What will be the key?').then(() => {
          message.channel.awaitMessages(filterOne, {max: 1, time: 50000, errors: ['time']})
          .then(collected => {
        
            message.channel.send(`the key is ${collected.content}`).then(() => {
          message.channel.awaitMessages(filterTwo, {max: 1, time: 50000, errors: ['time']})
        
          .then(collected => {
           message.channel.send(`the content is ${collected.content}`)
           })
           .catch(collected => {
           message.channel.send('Error 2')
           })
        })
        
           }).catch(collected => {
            message.channel.send('Error')
           })
        })


    }
}