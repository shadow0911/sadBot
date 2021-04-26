module.exports = {
    event: "message",
    once: false,
    run: async(message)=> {
        if(message.channel.type === 'dm') return;
        let Memes = message.guild.channels.cache.get('617360433765941269')
        let Media = message.guild.channels.cache.get('617360464656990219')
        let insultTheOwner = message.guild.channels.cache.get('773243876840308807')

        if(message.channel == Memes){
        let content = message.attachments.first()
        if(!content){
            if(message.member.permissions.has('MANAGE_MESSAGES')) return
            if(message.author.bot) return
            await message.delete()
            
            setTimeout(function(){
            message.channel.send(`Anything except **Memes** are not allowed to post in this channel ${message.author}`).then(m => m.delete({timeout: 5000}))
            }, 100)
        }
        }else if(message.channel == Media){
            let content = message.attachments.first()
            if(!content){
                if(message.member.permissions.has('MANAGE_MESSAGES')) return
                if(message.author.bot) return
                await message.delete()
                
                setTimeout(function(){
                message.channel.send(`Anything except **Image/Videos** are not allowed to post in this channel ${message.author}`).then(m => m.delete({timeout: 5000}))
                }, 100)
            }
        }else if(message.channel == insultTheOwner){
            let content = message.attachments.first()
            if(!content){
                if(message.member.permissions.has('MANAGE_MESSAGES')) return
                if(message.author.bot) return
                await message.delete()
                
                setTimeout(function(){
                message.reply("You're allowed to post Memes about Sabbir only.").then(m => m.delete({timeout: 5000}))
                }, 100)
            }
        }
    }
}