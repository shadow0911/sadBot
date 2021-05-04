const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
  guildID: String,
  guildName: String,
  Active: Boolean,
    LogChannels: {
      MessageLog: String,
      ActionLog: String,
    }
})

module.exports = mongoose.model('Guild-Channels', serverSchema);