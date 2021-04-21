const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
    Archetype: {
        type: String,
        required: true,

    },
    Player: {
        type: String,
        required: true
    },
    Overall: {
        type: String,
        required: true,
    },
    Winpercentage: {
        type: String,
        required: true,
    },
    Rep: {
        type: String,
        required: true,
    },

    Position: {
        type: String,
        required: true,
    },

    System: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: false
    },
    Gamertag: {
        type: String,
        required: true
    },
    Bio: {
        type: String,
        required: true
    },
    Twitter: {
        type: String,
        required: false
    },
    Youtube: {
        type: String,
        required: false
    },
    Instagram: {
        type: String,
        required: false
    },
    Twitch: {
        type: String,
        required: false
    }

}, { timestamps: true, toJSON: { virtuals: true } })
module.exports = mongoose.model('info', InfoSchema);