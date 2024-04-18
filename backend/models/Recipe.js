const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.ObjectId, required: true },
    title: { type: String, default: "" },
    servings: { type: Number, default: 12 },
    unitType: { type: String, default: "" },
    ingredients: { type: Object, default: {} },
    directions: { type: String, default: "" },
    expenses: { type: Object, default: {} },
    pricing: { type: Object, default: {} },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model("Recipe", recipeSchema) || mongoose.models.Recipe;
