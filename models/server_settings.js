const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    Online: Boolean,
    prefix: String,
    ownerName: String,
    ownerID: String,
    deleteMsgLog: String,
    actionLogChannel: String,
    adminLogChannel: String,
    welcomechannel: String,
    ModRole: String,
    AdminRole: String
})

module.exports = mongoose.model('Server_Settings', serverSchema);