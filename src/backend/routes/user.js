const router = require("express").Router();
const User = require("../models/user.model");

// Grab all users an their associated notes
router.route("/").get((req, res) => {
  User.find()
    .populate("notes")
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(`Error: , ${err}`));
});

// Need to work with sessions
router.route("/login").post((req, res) => {
  const { name } = req.body;
  User.findOne({ name })
    .then((data) => {
      if (data) res.json(data);
      else { res.status(400).json("User doesn't exist!") }
    })
    .catch((err) => res.status(400).json(`Error: , ${err}`));
});

// Register new User
router.route("/register").post(async (req, res, next) => {
  const { name } = req.body;
  const newUser = new User({ name: name.toLowerCase() });

  const userExists = await User.findOne({ name });

  try {
    if (userExists) {
      throw new Error("Username taken.");
    }
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

module.exports = router;
