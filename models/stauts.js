const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    userID: String,
    userName: String,
    Enabled: Boolean,
    Message: String,
    Time: Date,
})

module.exports = mongoose.model('Status', statusSchema);