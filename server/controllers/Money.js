const models = require('../models');
const MoneyModel = require('../models/Money');
const Money = models.Money;

const payCost = async (req, res) => {
    const test = await Money.findOne({ owner: req.session.account._id });
    //const test = MoneyModel.findByOwner(req.session.account._id);
    test.money = test.money - 100;
    test.save();
    console.log(test);
}

const start = async (req, res) => {
    const moneyData = {
        owner: req.session.account._id,
        money: 1000,
    };

    try{
        const newMoney = new Money(moneyData);
        await newMoney.save();
        return res.status(201).json({ money: newMoney.money});
    } catch (err) {
        console.log(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'Money already initialized' });
        }
        return res.status(400).json({ error: 'An error occured' });
    }
}

module.exports = {
    payCost,
    start
}