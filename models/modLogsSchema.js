const mongoose = require('mongoose');

const modLogSchema = mongoose.Schema({
    caseID: String,
    Action: String,
    guildID: String,
    guildName: String,
    userName: String,
    userID: String,
    Reason: String,
    Moderator: String,
    expire: Date,
    isMuted: Boolean,
    Banned: Boolean,
    Date: Date,
    time: String
})

module.exports = mongoose.model('Moderation-Logs', modLogSchema);