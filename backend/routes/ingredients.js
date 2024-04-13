const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');

// GET request to show the ingredient form and existing ingredients
router.get('/', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render('ingredients', { ingredients });
});

router.post('/', async (req, res) => {
    const { name, cost, quantity } = req.body;
    const ingredient = new Ingredient({ name, cost, quantity });
    try {
        await ingredient.save();
        res.redirect('/ingredients');
    } catch (error) {
        res.render('ingredients/new', { ingredient, errorMessage: 'Error creating Ingredient' });
    }
});

module.exports = router;
