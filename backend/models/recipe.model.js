const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  id: { 
    type: Number, 
    required: true, 
    unique: true,
  },
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  dish: { 
    type: String, 
    required: true 
  },
  ingredients: { 
    type: Array, 
    required: true 
  },
  procedures: { 
    type: Array, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;