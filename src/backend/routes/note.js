const router = require('express').Router();
const Note = require('../models/note.model');

// Grab all notes by pageLink
router.route('/notes').get((req, res) => {
  const { pageLink } = req.body;
  Note.find({ pageLink })
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ', err));
});

// Grab all notes by pageLink and user_id
router.route('/users/:userID/notes').get((req, res) => {
  const pageLink = req.query.pageLink;
  const userID =  req.params.userID;
  Note.find({ pageLink, userID })
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Error: ', err));
});

// Create a new note
router.route('/notes').post((req, res) => {
  const { pageLink, body, videoLink, imgLink, user_id } = req.body;

  const newNote = new Note(
    { pageLink, body, videoLink, imgLink, user_id },
  );

  newNote.save()
    .then(() => res.json('new Note created'))
    .catch(err => res.status(400).json(err));
});

module.exports = router;