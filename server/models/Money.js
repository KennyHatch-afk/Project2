const mongoose = require('mongoose');

let MoneyModel = {};

const MoneySchema = new mongoose.Schema({
    money: {
        type: Number,
        min: 0,
        required: true,
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account',
    },
});

MoneySchema.statics.toAPI = (doc) => ({
    money: doc.money,
});

MoneySchema.statics.findByOwner = (ownerID) => {
    const search = {
        owner: mongoose.Types.ObjectId(ownerID)
    };

    return MoneyModel.find(search).select('money').lean();
};

MoneyModel = mongoose.model('Money', MoneySchema);
module.exports = MoneyModel;