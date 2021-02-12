module.exports = {
    name: 'slice',
    description: 'ping pong',
    category: 'utils',
    run: async(client, message, args)=> {
        let Msg = "what a great --test day to die "
        message.channel.send(Msg.split("", 4).join(" "))
    }
}