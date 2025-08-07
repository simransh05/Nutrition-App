const Nutrition = require('../model/nutrition');
module.exports.getSearchName = (req, res, next) => {
    if (!req.session.history1) {
        req.session.history1 = [];
    }
    res.render('searchByName', { history1: req.session.history1, user:req.session.user });
}

module.exports.postSearchName = async (req, res, next) => {
    const { name } = req.body;
    try {
        const item = await Nutrition.findOne({
            name: { $regex: name.trim(), $options: 'i' }  // 'i' = case-insensitive
        });
        if (!req.session.history1) req.session.history1 = [];
        req.session.history1.push({ name,id :Date.now().toString() });
        res.render('resultName', {
            item,
            user: req.session.user,
            history1:req.session.history1
        })
    }
    catch (err) {
        next(err);
    }
}