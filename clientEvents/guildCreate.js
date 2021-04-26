const { Guild } = require('../models')
const { default_prefix } = require('../config.json')
module.exports = async client =>{
    
    client.guilds.cache.forEach(async (guild) =>{
    const newGuild = async () =>{
        
            let conditional = {
                guildID: guild.id,
                Active: true
            }
            const Data = await Guild.findOne(conditional)
        
            if(!Data){
                new Guild({
                    guildID: guild.id,
                    guildName: guild.name,
                    Active: true,
                    prefix: default_prefix,
                    ownerID: guild.ownerID,
                    MutedRole: "Muted",
                    LogChannels: {
                        MessageLog: "",
                        InfractionLog: "",
                        MemberJoin: "",
                        MemberLeft: "",
                        RoleLog: "",
                        VoiceLog: "",
                        MemberLog: "",
                        ChannelsLog: "",
                        ServerLog: "",
                        ModerationLog: "",
                        AdminLog: "",
                        AnnouncementChannel: "",
                    },
                    IgnoreChannels: [],
                    IgnoreRoles: [],
                    BotMaster: [],
                    Moderator: [],
                    Admin: [],
                    WelcomeMessage: "",
                    Module: {
                        MessageLog: false,
                        InfractionLog: false,
                        MemberJoin: false,
                        MemberLeft: false,
                        RoleLog: false,
                        VoiceLog: false,
                        MemberLog: false,
                        ChannelsLog: false,
                        ServerLog: false,
                        ModerationLog: false,
                        AdminLog: false,
                        AnnouncementChannel: false,
                    }
                }).save()
            }
            setTimeout(newGuild, 10000)
        }
        newGuild()
    })
    
    
}