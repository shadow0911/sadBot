const mongoose = require('mongoose');
const type = {
    type: Number,
    default: 0
}

const moderatorSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    userName: String,
    userID: String,
    Rank: String,
    Mute: type,
    Warn: type,
    Ban: type,
    Kick: type,
    Purge: type,
    Clean: type,
    Command: type,
    Disconnect: type,
    Status: Boolean,
    statusMessage: String,
    statusTime: String
})

module.exports = mongoose.model('Moderators-Activities', moderatorSchema);