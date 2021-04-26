const mongoose = require('mongoose');

const profilesSchema = mongoose.Schema({
    guildID: String,
    guildName: String,
    userID: String,
    userName: String,
    AFK: Boolean,
    AFKTIME: Date,
})

module.exports = mongoose.model('Profiles', profilesSchema);