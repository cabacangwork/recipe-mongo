const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use('/public', express.static('public'));

// const uri = process.env.ATLAS_URI;
const uri = config.get('mongoURI');

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.use('/recipes', require('./routes/recipes'));
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});