module.exports = {
    event: "message",
    once: false,
    run: async(message) => {
        if(message.content.includes('would you rather')){
            let onlyChan = message.guild.channels.cache.get('641938889451241473')
            if(message.channel.id !== '641938889451241473'){
                return false
            }
            await message.react('✅')
            await message.react('❌')
        }
    }
}