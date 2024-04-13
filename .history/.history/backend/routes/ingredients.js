const express = require('express');
const router = express.Router();
const Ingredient = require('../models/ingredient');

// Get all ingredients and render them using EJS
router.get('/', (req, res) => {
    Ingredient.find((err, ingredients) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('ingredients', { ingredients: ingredients });
        }
    });
});

// Additional routes for posting, updating, deleting ingredients can be added here

module.exports = router;
