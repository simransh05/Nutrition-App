const nutrition = require('../model/nutrition');
const Nutrition = require('../model/nutrition')
module.exports.getSearch = (req, res, next) => {
    if (!req.session.history) {
        req.session.history = [];
    }
    res.render('search', { history: req.session.history, user:req.session.user });
}

module.exports.postSearch = async (req, res) => {
    let { nutrient, amount } = req.body;

    amount = parseFloat(amount);
    if (isNaN(amount)) return res.status(400).send("Amount must be a number");

    try {
        const toPrefer = await Nutrition.find({ [nutrient]: { $lte: amount } });
        const toAvoid = await Nutrition.find({ [nutrient]: { $gt: amount } });

        if (!req.session.history) req.session.history = [];
        req.session.history.push({ nutrient, amount,id :Date.now().toString() });
        res.render('result', {
            toPrefer,
            toAvoid,
            nutrient,
            amount,
            history: req.session.history,
            user: req.session.user
        });
    } catch (error) {
        res.status(500).send("Error filtering");
    }
};
