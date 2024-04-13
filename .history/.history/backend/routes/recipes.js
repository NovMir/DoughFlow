const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// Create a new Recipe
router.post('/', async (req, res) => {
    try {
        const newRecipe = new Recipe(req.body);
        const savedRecipe = await newRecipe.save();
        res.status(201).send(savedRecipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all Recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.send(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read a single Recipe by id
router.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).send();
        }
        res.send(recipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a Recipe
router.put('/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedRecipe) {
            return res.status(404).send();
        }
        res.send(updatedRecipe);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a Recipe
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).send();
        }
        res.send(deletedRecipe);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/view', async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('ingredients');
        console.log(recipes)
        res.render('recipes', { recipes: recipes });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;
