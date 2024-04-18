const Recipe = require("../models/Recipe");

module.exports = {
  addRecipe: async (req, res) => {
    try {
      const { user } = req;
      const { title, servings, unitType, ingredients, directions, pricing } =
        req.body;

      const recipe = new Recipe({
        ownerId: "5a9427648b0beebeb6957bdc", // using dummy, after authentication use user.id as ownerId
        title,
        servings,
        unitType,
        ingredients,
        directions,
        pricing,
      });

      await recipe.save();

      return res.status(200).json({
        success: true,
        msg: "Recipe added successfully!",
        data: recipe?._id,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong!" });
    }
  },
  updateRecipe: async (req, res) => {
    try {
      const { user } = req;
      const {
        id,
        title,
        servings,
        unitType,
        ingredients,
        directions,
        pricing,
        expenses,
      } = req.body;

      const recipe = await Recipe.findByIdAndUpdate(id, {
        title,
        servings,
        unitType,
        ingredients,
        directions,
        pricing,
        expenses,
      });

      return res.status(200).json({
        success: true,
        msg: "Recipe updated successfully!",
        data: recipe?._id,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong!" });
    }
  },
  getUserRecipe: async (req, res) => {
    try {
      const { user } = req;

      const userRecipes = await Recipe.find({
        ownerId: "5a9427648b0beebeb6957bdc", //using dummy user id if authentication completes then use user.id
      })
        .sort({ createdAt: -1 })
        .select("_id title pricing");

      return res
        .status(200)
        .json({ success: true, msg: "All Recipes", data: userRecipes });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong!" });
    }
  },
  getRecipeDetails: async (req, res) => {
    try {
      const { user } = req;
      const { id } = req.query;

      const recipe = await Recipe.findOne({
        ownerId: "5a9427648b0beebeb6957bdc", //using dummy user id if authentication completes then use user.id
        _id: id,
      });

      return res
        .status(200)
        .json({ success: true, msg: "Recipe Details", data: recipe });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, msg: "Something went wrong!" });
    }
  },
};
