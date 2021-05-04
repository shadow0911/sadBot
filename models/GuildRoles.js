const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
  guildID: String,
  guildName: String,
  Active: Boolean,
  Moderator: Array,
  Admin: Array,
  BotOverlord: Array,
})

module.exports = mongoose.model('Guild-Roles', serverSchema);