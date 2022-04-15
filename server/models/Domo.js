const mongoose = require('mongoose');
const _ = require('underscore');

let DomoModel = {};

const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    attack: {
        type: Number,
        min: 1,
        default: 1,
    },
    speed: {
        type: Number,
        min: 1,
        default: 1,
    },
    health: {
        type: Number,
        min: 20,
        default: 20,
    },
});

DomoSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    attack: doc.attack,
    speed: doc.speed,
    health: doc.health,
});

DomoSchema.statics.findByOwner = (ownerID, callback) => {
    const search = {
        owner: mongoose.Types.ObjectId(ownerID)
    };

    return DomoModel.find(search).select('name attack speed health').lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports = DomoModel;