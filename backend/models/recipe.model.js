const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
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
    type: String, 
    required: true 
  },
  imgUrl: {
    type: String,
    required: false,
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;