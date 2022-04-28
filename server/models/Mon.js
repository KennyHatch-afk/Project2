const mongoose = require('mongoose');
const _ = require('underscore');

let MonModel = {};

const setName = (name) => _.escape(name).trim();

const MonSchema = new mongoose.Schema({
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

MonSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    attack: doc.attack,
    speed: doc.speed,
    health: doc.health,
});

MonSchema.statics.findByOwner = (ownerID, callback) => {
    const search = {
        owner: mongoose.Types.ObjectId(ownerID)
    };

    return MonModel.find(search).select('name attack speed health').lean().exec(callback);
};

MonModel = mongoose.model('Mon', MonSchema);

module.exports = MonModel;