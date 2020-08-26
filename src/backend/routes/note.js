const router = require("express").Router();
const User = require("../models/user.model");
const Note = require("../models/note.model");
const multer = require("multer");
const upload = multer({ dest: "/tmp" });
const cloudinary = require("cloudinary").v2;
process.env.NODE_ENV !== "production" ? require("dotenv").config() : null;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Grab all notes by pageLink
router.route("/").get((req, res) => {
  const { pageLink } = req.body;
  Note.find({ pageLink })
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json(`Error: , ${err}`));
});

// Grab all notes by pageLink(optional) and user_id
router.route("/users/:userID").get(async (req, res) => {
  const pageLink = req.body.pageLink;
  const userID = req.params.userID;
  const user = await User.findById(userID);

  if (pageLink) {
    Note.find({ pageLink, userID })
      .then((data) =>
        res.json({
          user: { name: user.name },
          notes: data,
        })
      )
      .catch((err) => res.status(400).json(`Error: , ${err}`));
  } else {
    Note.find({ userID })
      .then((data) =>
        res.json({
          user: { name: user.name },
          notes: data,
        })
      )
      .catch((err) => res.status(400).json(`Error: , ${err}`));
  }
});

// Create a plain text note
router.post("/upload/text", upload.none(), (req, res) => {
  const { pageLink, body, userID, videoTimeStamp } = req.body;
  const newNote = new Note({
    pageLink,
    body,
    userID,
    videoTimeStamp,
  });

  newNote
    .save()
    .then(() => User.findById(userID))
    .then((user) => {
      user.notes.push(newNote);
      return user.save();
    })
    .then(() => res.json({ message: "new Note created", note: newNote }))
    .catch((err) => res.status(400).json(`Error: , ${err}`));
});

// Create a note with media
router.post("/upload/media", upload.single("file"), (req, res) => {
  // pass a file from the FE
  const file = req.file;

  // get other items in request body
  const { pageLink, body, userID, videoTimeStamp } = req.body;

  // check if file is an img or video

  if (file.mimetype.split("/")[0] === "image") {
    //upload img
    console.log("file is an img");
    cloudinary.uploader.upload(
      file.path,
      {
        resource_type: "image",
        public_id: `chromies/${file.originalname}`,
      },
      function (error, result) {
        if (result) {
          const newNote = new Note({
            pageLink,
            body,
            userID,
            imgLink: result.secure_url,
            videoTimeStamp,
          });

          newNote
            .save()
            .then((data) => User.findById(userID))
            .then((user) => {
              user.notes.push(newNote);
              return user.save();
            })
            .then((data) => {
              res.json({ message: "new Note created", note: newNote });
              console.log("** file uploaded to Cloudinary service");
            })
            .catch((err) => res.status(400).json(`Error: , ${err}`));
        } else {
          res.status(400).json({ error: error });
        }
      }
    );

    // upload video
  } else if (file.mimetype.split("/")[0] === "video") {
    console.log("file is a video");
    cloudinary.uploader.upload(
      file.path,
      {
        resource_type: "video",
        public_id: `chromies/${file.filename}`,
        chunk_size: 6000000,
        eager_async: true,
      },
      function (error, result) {
        if (result) {
          const newNote = new Note({
            pageLink,
            body,
            userID,
            videoLink: result.secure_url,
            videoTimeStamp,
          });

          newNote
            .save()
            .then((data) => User.findById(userID))
            .then((user) => {
              user.notes.push(newNote);
              return user.save();
            })
            .then(() => {
              res.json({ message: "new Note created", note: newNote });
              console.log("** file uploaded to Cloudinary service");
            })
            .catch((err) => res.status(400).json(`Error: , ${err}`));
        } else {
          res.status(400).json({ error: error });
        }
      }
    );
  }
});

module.exports = router;
