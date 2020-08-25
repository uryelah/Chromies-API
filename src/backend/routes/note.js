const router = require("express").Router();
const User = require("../models/user.model");
const Note = require("../models/note.model");
const multer = require("multer");
const upload = multer();

// Grab all notes by pageLink
router.route("/").get((req, res) => {
  const { pageLink } = req.body;
  Note.find({ pageLink })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(`Error: , ${err}`));
});

// Grab all notes by pageLink(optional) and user_id
router.route("/users/:userID").get((req, res) => {
  const pageLink = req.body.pageLink;
  const userID = req.params.userID;
  if (pageLink) {
    Note.find({ pageLink, userID })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(`Error: , ${err}`));
  } else {
    Note.find({ userID })
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(`Error: , ${err}`));
  }
});

// Create a new note
router.post("/", upload.single("file"), (req, res) => {
  // pass a file from the FE
  const file = req.file;
  // check if file is an img or video
  if (file.mimetype.split("/")[0] === "image") {
    console.log("file is an img");
  } else if (file.mimetype === "video") {
    console.log("file is a video");
  }
  const { body, userID } = req.body;

  const newNote = new Note({ pageLink, body, videoLink, imgLink, userID });

  newNote
    .save()
    .then(() => User.findById(userID))
    .then((user) => {
      user.notes.push(newNote);
      return user.save();
    })
    .then(() => res.json("new Note created"))
    .catch((err) => res.status(400).json(`Error: , ${err}`));
});

module.exports = router;
