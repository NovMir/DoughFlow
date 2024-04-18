const express = require("express");

const router = express.Router();

const auth = require("../middlewares/auth");
const recipeController = require("../controllers/recipeController");

let recipesDatabase = [
  {
    id: 1,
    name: "Chocolate Cake",
    ingredients: "Flour, Sugar, Cocoa Powder",
    steps: "Mix, Bake, Eat",
  },
];

// Route to display the recipes list
router.post("/add-recipe", recipeController.addRecipe);
router.post("/update-recipe", recipeController.updateRecipe);
router.get("/get-recipe-details", recipeController.getRecipeDetails);
router.get("/get-user-recipes", recipeController.getUserRecipe);

// Route to display the recipe form for adding new recipes
// router.get("/recipes/new", (req, res) => {
//   res.render("recipe-form");
// });

// // Route to handle the recipe form submission
// router.post("/recipes", (req, res) => {
//   const { name, ingredients, steps } = req.body;
//   const newRecipe = {
//     id: recipesDatabase.length + 1,
//     name,
//     ingredients,
//     steps,
//   };
//   recipesDatabase.push(newRecipe);
//   res.redirect("/recipes");
// });

// // Route to show a specific recipe
// router.get("/recipes/:id", (req, res) => {
//   const recipe = recipesDatabase.find((r) => r.id.toString() === req.params.id);
//   if (recipe) {
//     res.render("recipe-detail", { recipe });
//   } else {
//     res.status(404).send("Recipe not found");
//   }
// });

module.exports = router;
