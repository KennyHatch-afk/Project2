const models = require('../models');
const DomoModel = require('../models/Domo');
const Domo = models.Domo;

const makerPage = (req, res) => {
    return res.render('app');
};

const makeDomo = async (req, res) => {
    if(!req.body.name) {
        return res.status(400).json({ error: 'Name is required!' });
    }

    const domoData = {
        name: req.body.name,
        owner: req.session.account._id,
    };

    try{
        const newDomo = new Domo(domoData);
        await newDomo.save();
        return res.status(201).json({ name: newDomo.name });
    } catch (err) {
        console.log(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'Domo already exists!' });
        }
        return res.status(400).json({ error: 'An error occured' });
    }
}

const changeDomo = (req, res) => {
    return DomoModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: 'No such Domo exists!' });
        }

        console.log({domos: docs});


        return res.json({ domos: docs });
    });
}

const getDomos = (req, res) => {
    return DomoModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred!' });
        }

        return res.json({ domos: docs });
    });
}

module.exports = {
    makerPage,
    makeDomo,
    getDomos,
    changeDomo,
};