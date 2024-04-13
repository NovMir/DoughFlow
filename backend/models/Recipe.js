const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
});

module.exports = mongoose.model('Recipe', RecipeSchema);
