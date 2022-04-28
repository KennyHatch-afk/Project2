const models = require('../models');
const MonModel = require('../models/Mon');
const Mon = models.Mon;

const makerPage = (req, res) => {
    return res.render('app');
};

const makeMon = async (req, res) => {
    if(!req.body.name) {
        return res.status(400).json({ error: 'Name is required!' });
    }

    const monData = {
        name: req.body.name,
        owner: req.session.account._id,
    };

    try{
        const newMon = new Mon(monData);
        await newMon.save();
        return res.status(201).json({ name: newMon.name });
    } catch (err) {
        console.log(err);
        if(err.code === 11000) {
            return res.status(400).json({ error: 'That Mon already exists!' });
        }
        return res.status(400).json({ error: 'An error occured' });
    }
}

const changeMon = async (req, res) => {
    const test = await Mon.findOne({ name: req.body.name });

    switch(req.body.train)
    {
        case "health":
            test.health = test.health + 10;
            break;
        case "attack":
            test.attack = test.attack + 1;
            break;
        case "speed":
            test.speed = test.speed + 1;
            break;
        default:
            return res.status(400).json({ error: "An error occured." });
            break;
    }

    console.log(test);

    test.save();
}

const getMons = (req, res) => {
    return MonModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occurred!' });
        }

        return res.json({ mons: docs });
    });
}

module.exports = {
    makerPage,
    makeMon,
    getMons,
    changeMon,
};