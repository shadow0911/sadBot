const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    Active: Boolean,
    prefix: String,
    ownerName: String,
    ownerID: String,
    botOwnerGuild: String,
    MutedRole: String,
    LogChannels: {
        MessageLog: String,
        InfractionLog: String,
        MemberJoin: String,
        MemberLeft: String,
        RoleLog: String,
        VoiceLog: String,
        MemberLog: String,
        ChannelsLog: String,
        ServerLog: String,
        ModerationLog: String,
        AdminLog: String,
        AnnouncementChannel: String,
    },
    IgnoreChannels: Array,
    IgnoreRoles: Array,
    BotMaster: Array,
    Moderator: Array,
    Admin: Array,
    WelcomeMessage: String,
    Module: {
        MessageLog: Boolean,
        InfractionLog: Boolean,
        MemberJoin: Boolean,
        MemberLeft: Boolean,
        RoleLog: Boolean,
        VoiceLog: Boolean,
        MemberLog: Boolean,
        ChannelsLog: Boolean,
        ServerLog: Boolean,
        ModerationLog: Boolean,
        AdminLog: Boolean,
        AnnouncementChannel: Boolean,
    }
})

module.exports = mongoose.model('Server_Settings', serverSchema);