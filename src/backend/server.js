/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const { connection } = mongoose;
connection.once('open', () => {
  console.log('MongoDB Database connection established successfully');
});

const users = require('./routes/user');
const notes = require('./routes/note');

// Allows access to /users and /notes routes
app.use('/users', users);
app.use('/notes', notes);

// Allows use of sessions
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
app.listen(port, () => {
  console.log('Server is running on port: ', port);
});
