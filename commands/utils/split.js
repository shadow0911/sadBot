module.exports = {
    name: 'split',
    description: 'ping pong',
    category: 'utils',
    run: async(client, message, args)=> {
            let Msg = message.content.split(/,\s+/)
            let slice = Msg.content.split('-author').join(' ')
            message.replace('-author', 'display')
            message.channel.send(slice)
        
    }
}