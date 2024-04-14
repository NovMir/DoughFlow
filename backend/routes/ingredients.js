const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// GET request to show the ingredient form and existing ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    console.log(ingredients)
    res.render('ingredients', { ingredients });
} catch (error) {
    console.error('Failed to fetch ingredients:', error);
    res.status(500).send('Error loading ingredients.');
}
});

router.post('/ingredients', async (req, res) => {
    try {
        const { name, cost, quantity } = req.body;

        if (!name || !cost || !quantity) {
            res.status(400).send("All fields are required.");
            return;
        }

        const costNumber = parseFloat(cost);
        if (isNaN(costNumber)) {
            res.status(400).send("Invalid cost. Please enter a valid number.");
            return;
        }

        const newIngredient = new Ingredient({
            name,
            cost: costNumber,
            quantity
        });

        await newIngredient.save();

        res.redirect('/ingredients');
    } catch (error) {
        res.status(500).send("Failed to save ingredient. Error: " + error.message);
    }
});
module.exports = router;
