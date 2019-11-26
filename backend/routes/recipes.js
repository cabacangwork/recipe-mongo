const multer = require('multer');
const uuidv4 = require('uuid/v4');
const router = require('express').Router();
const auth = require('../middleware/auth');

// For Image Upload (using Multer)

const DIR = './public/'; 

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
    storage: storage,        //1Mb Max
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// END FOR UPLOAD

let Recipe = require('../models/recipe.model');

router.get('/list/:filter?', (req, res) => {
    const filterVal = req.query.filter;
    (filterVal === 'all')? 
      ( Recipe.find({userId: req.query.userId}).then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))):
      Recipe.find({userId: req.query.userId, dish: req.query.filter}).then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))
  });

// Get All Recipes from All Users
router.get('/recipe-list', (req, res) => {
    Recipe.find().then(recipes => res.json(recipes)).catch(err => res.status(400).json('Error: ' + err))
});

router.post('/add', upload.single('imgUrl'), (req, res) => {
    const url = req.protocol + '://' + req.get('host'); 
    const { title, description, dish, ingredients, procedures, date, userId } = req.body;
    const editDate = req.body.date;
    const imgUrl = url + '/public/' + req.file.filename;

    const newRecipe = new Recipe({
        title, description, dish, ingredients, procedures, date, imgUrl, editDate, userId
    });

    newRecipe.save()
        .then(() => res.json('Recipe Added!'))
        .catch(err => {
        return res.status(400).json('Error: ' + err)
        });
});

router.get('/view/:id', (req, res) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', (req, res) => {
    const imgDel = 'public/' + req.body.imgPath
    var fs = require('fs');
    fs.unlink(imgDel, (err) => {
        if (err) throw err;
        console.log('Image deleted in local folder');
    })
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.json('Recipe deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/update/:id', upload.single('imgUrl'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  Recipe.findById(req.params.id)
    .then(recipe => {
      recipe.title = req.body.title;
      recipe.description = req.body.description;
      recipe.dish = req.body.dish;
      recipe.ingredients = req.body.ingredients;
      recipe.procedures = req.body.procedures;
      recipe.editDate = req.body.editDate;

      if (req.file && req.file.filename) recipe.imgUrl = url + '/public/' + req.file.filename;

      recipe.save()
        .then(() => res.json('Recipe Updated!'))
        .catch(err => {
          console.log('update failed', err);
          return res.status(400).json('Error: ' + err);
        });
    })
    .catch(err => {
      console.log('update find error', err);
      return res.status(400).json('Error: ' + err);
    });
});

module.exports = router;