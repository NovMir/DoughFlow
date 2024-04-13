const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

// GET all recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('ingredients');
        res.render('recipes/index', { recipes });
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET the form to create a new recipe
router.get('/new', async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.render('recipes/new', { ingredients });
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST a new recipe
router.post('/', async (req, res) => {
    const { title, ingredientIds } = req.body;
    const recipe = new Recipe({
        title,
        ingredients: ingredientIds
    });
    try {
        await recipe.save();
        res.redirect('/recipes');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
