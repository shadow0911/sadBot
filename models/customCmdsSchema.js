const mongoose = require('mongoose');

const commandsSchema = mongoose.Schema({
    cmdID: String,
    Active: Boolean,
    guildID: String,
    guildName: String,
    userName: String,
    key: String,
    content: String,
    Embed: Boolean,
    rolePerm: String,
    image: String,
    color: Boolean,
})

module.exports = mongoose.model('Custom-commands', commandsSchema);