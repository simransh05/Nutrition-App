const Nutrition = require('../model/nutrition')
module.exports.getTotal = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login')
    }
    if (!req.session.history2) {
        req.session.history2 = [];
    }
    res.render('FindTotal', { user: req.session.user, history2: req.session.history2 });
}


module.exports.postTotal = async (req, res) => {
    try {
        let foodNames = req.body.name; 

        if (!foodNames || foodNames.length === 0) {
            return res.status(400).send("No food names provided.");
        }

        if (!Array.isArray(foodNames)) {
            foodNames = [foodNames];
        }

        const foods = await Nutrition.find({
            $or: foodNames.map(name => ({
                name: { $regex: name, $options: 'i' } 
            }))
        });

        if (foods.length === 0) {
            return res.status(404).send("No matching food items found.");
        }
        const total = {
            protein: 0,
            carbohydrates: 0,
            fat: 0,
            calories: 0,
            cholesterol: 0,
            sugar: 0
        };

        foods.forEach(food => {
            total.protein += food.protein || 0;
            total.carbohydrates += food.carbohydrates || 0;
            total.fat += food.fat || 0;
            total.calories += food.calories || 0;
            total.sugar += food.sugar || 0;
            total.cholesterol += food.cholesterol || 0;
        });
        if (!req.session.history2) req.session.history2 = [];
        const input = foodNames.join(',');
        let foodArray = input.split(',').map(f => f.trim());
        req.session.history2.push({ foodNames: foodArray, id: Date.now().toString() });
        if (!req.session.history2) req.session.history2 = [];

        res.render('resultTotal', { total, items: foods, user: req.session.user, history2: req.session.history2 }); // Adjust view name as needed
    } catch (err) {
        console.error("Error in /findTotal:", err);
        res.status(500).send("Server Error");
    }
};
