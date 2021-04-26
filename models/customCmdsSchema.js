const mongoose = require('mongoose');

const commandsSchema = mongoose.Schema({
    cmdID: String,
    Active: {
        type: Boolean,
        required: true,
        default: true
    },
    guildID: {
        type: String,
        required: true
    },
    guildName: {
        type: String
    },
    key: {
        type: String,
        required: true,
        default: "no-key-command"
    },
    content: {
        type: String,
        required: true,
        default: 'no-content-command'
    },
    deleteKey: {
        type: Boolean,
        required: true,
        default: false
    },
    Embed: {
        type: Boolean,
        required: true,
        default: false
    },
    Mention: {
        type: Boolean,
        required: true,
        default: false
    },
    rolesID: {
        type: Array,
    },
    rolesNames: {
        type: Array
    },
    image: {
        type: String,
        default: null
    },
    color: {
        type: String,
        default: null
    },
    Author: {
        type: String,
        default: null
    },
    Title: {
        type: String,
        default: null
    },
    URL: {
        type: String,
        default: null
    },
    Footer: {
        type: String,
        default: null
    },
    TimeStamp: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Custom-commands', commandsSchema);