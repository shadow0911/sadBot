const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    Active: Boolean,
    prefix: String,
    ownerName: String,
    ownerID: String,
    botOwnerGuild: String,
    WelcomeMessage: String,
})

module.exports = mongoose.model('Server_Settings', serverSchema);