const Nutrition = require('../model/nutrition');
module.exports.getAddData = (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }
    res.render('addData', { user: req.session.user });
}


module.exports.postAddData = async (req, res, next) => {
    const { name, fat, cholesterol, sugar, calories, protein ,carbohydrates } = req.body;
    try {
        if (!name || !fat || !cholesterol || !sugar || !calories || !protein || !carbohydrates) {
            return res.redirect('/admin/add')
        }
        let present = await Nutrition.findOne({ name });
        if (!present) {
            await Nutrition.create({
                name,
                fat,
                cholesterol,
                sugar,
                calories,
                protein,
                carbohydrates
            })
        }
        res.redirect('/admin/add');
    }
    catch (err) {
        next(err);
    }
}
