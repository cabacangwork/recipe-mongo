const router = require('express').Router();
let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const description = req.body.description;
  const dish = req.body.dish;
  const ingredients = req.body.ingredients;
  const procedures = req.body.procedures;
  const date = req.body.date;

  const newRecipe = new Recipe({
    id, title, description, dish, ingredients, procedures, date
  });

  newRecipe.save()
    .then(() => res.json('Recipe Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json('Recipe deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.title = req.body.title;
      recipe.description = req.body.description;
      recipe.dish = req.body.dish;
      recipe.ingredients = req.body.ingredients;
      recipe.procedures = req.body.procedures;
      recipe.date = req.body.date;

      recipe.save()
        .then(() => res.json('Recipe Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;