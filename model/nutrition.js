const mongoose = require("mongoose");
const { Schema } = mongoose;

const nutritionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    cholesterol: {
        type: Number,
        required: true
    },
    sugar: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    carbohydrates : {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Nutrition', nutritionSchema);
