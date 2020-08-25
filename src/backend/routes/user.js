const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find().populate('notes')
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ', err));
});

// Need to work with sessions
router.route('/login').post((req, res) => {
  const { name } = req.body;
  User.findOne({ name })
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/register').post((req, res) => {
  const { name } = req.body;

  const newUser = new User(
    { name: name.toLowerCase() },
  );

  newUser.save()
    .then(() => res.json('new User created'))
    .catch(err => res.status(400).json(err));
});

module.exports = router;