const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: {type: String,unique: true},
    prefix: String,
});
guildSchema.index({ guildID: 1 });

module.exports = mongoose.model('Guilds', guildSchema);