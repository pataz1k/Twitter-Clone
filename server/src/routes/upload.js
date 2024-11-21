const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images")); // Обратите внимание на изменение пути
  },
  filename: function (req, file, cb) {
    const uniqueName = uuidv4();
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.array("images", 10), (req, res) => {
  const imagePaths = req.files.map((file) => "/images/" + file.filename);

  const jsonResponse = {
    status: "success",
    paths: imagePaths,
  };

  try {
    res.status(200).json(jsonResponse);
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
