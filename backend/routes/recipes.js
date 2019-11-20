const multer = require('multer');
const uuidv4 = require('uuid/v4');
const router = require('express').Router();

/**
 * FOR UPLOAD
 * adi man tutorial - https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/
 */

const DIR = './public/'; // temporary la ini na storage kuntaloy (backend > public)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

/**
 * END FOR UPLOAD
 */

let Recipe = require('../models/recipe.model');

router.route('/').get((req, res) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(err => res.status(400).json('Error: ' + err));
});

// it upload.single('imgUrl') - middleware hit '/users/add' na route
router.post('/add', upload.single('imgUrl'), (req, res) => {
  const url = req.protocol + '://' + req.get('host'); // get current server url

  const title = req.body.title;
  const description = req.body.description;
  const dish = req.body.dish;
  const ingredients = req.body.ingredients;
  const procedures = req.body.procedures;
  const date = req.body.date;
  const imgUrl = url + '/public/' + req.file.filename;

  const newRecipe = new Recipe({
    title, description, dish, ingredients, procedures, date, imgUrl,
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