const { Guild, GuildRole, GuildChannel } = require('../models')
const { default_prefix } = require('../config.json')
module.exports = async client =>{
    
    client.guilds.cache.forEach(async (guild) =>{
    const newGuild = async () =>{
        
            let conditional = {
                guildID: guild.id,
                Active: true
            }
            const Data = await Guild.findOne(conditional)
            const Channels = await GuildRole.findOne(conditional),
            const Roles = await GuildChannel.findOne(conditional)
        
            if(!Data){
                new Guild({
                    guildID: guild.id,
                    guildName: guild.name,
                    Active: true,
                    prefix: default_prefix,
                    ownerID: guild.ownerID,
                }).save()
            }
            if(!Channels){
              new GuildChannel({
                    guildID: guild.id,
                    guildName: guild.name,
                    Active: true,
                    LogChannels: {
                      MessageLog: null,
                      ActionLog: null,
                    }
              })
            }
            setTimeout(newGuild, 10000)
        }
        newGuild()
    })
    
    
}