const router = require('express').Router();
const User = require('../models/user.model');

router.route('/login').get((req, res) => {
  const nameG = req.query.name.toLowerCase();
  User.findOne({ name: nameG })
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ', err));
});

router.route('/add').post((req, res) => {
  const {
    name,
  } = req.body;

  const newUser = new User(
    { name: name.toLowerCase() },
  );

  newUser.save()
    .then(() => res.json('new User creted'))
    .catch(err => res.status(400).json(err));
});

module.exports = router;