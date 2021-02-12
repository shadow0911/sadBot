module.exports = {
    event: "message",
    once: false,
    run: async(message)=> {
        if(message.channel.type === 'dm') return;
        let linkChan = message.guild.channels.cache.get('750987371742494751')
        if(message.channel == linkChan){
        if(!message.content.startsWith('https://')){
            if(message.member.permissions.has('MANAGE_MESSAGES')) return
            if(message.author.bot) return
            await message.delete()
            
            setTimeout(function(){
            message.reply("Links only channel. Don't send anything except video URL.").then(m => m.delete({timeout: 5000}))
            }, 1000)
        }
        }
    }
}