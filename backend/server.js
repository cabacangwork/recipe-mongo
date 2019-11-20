const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// need ini para ma basa hit express it im gin papasa ha 'req.body'
// dapat hini pinaka first before hit iba na middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// para ma-access it localhost:5000/public na route para pag serve hit image
app.use('/public', express.static('public'));

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const recipeRouter = require('./routes/recipes');

app.use('/recipes', recipeRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});