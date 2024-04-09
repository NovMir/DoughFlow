"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;

let recipesDatabase = [
    { id: 1, name: 'Chocolate Cake', ingredients: 'Flour, Sugar, Cocoa Powder', steps: 'Mix, Bake, Eat' },
 
];

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/recipes', (req, res) => {
    res.render('recipes', { title: 'Recipes' });
});

router.get('/recipes-list', (req, res) => {
    res.render('recipes-list', { title: 'Recipes List', recipes: recipesDatabase });
});

// Route to handle the recipe form submission
router.post('/recipes', (req, res) => {
    const { name, ingredients, steps } = req.body;
    const newRecipe = { id: recipesDatabase.length + 1, name, ingredients, steps };
    recipesDatabase.push(newRecipe);
    res.redirect('/recipes');
});

// Route to show a specific recipe
router.get('/recipes/:id', (req, res) => {
    const recipe = recipesDatabase.find(r => r.id.toString() === req.params.id);
    if (recipe) {
        res.render('recipe-detail', { recipe });
    } else {
        res.status(404).send('Recipe not found');
    }
});
//# sourceMappingURL=index.js.map