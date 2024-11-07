const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/post");
const connectToDb = require("./utils/db");
const errorHandler = require("./middlewares/errorHandler");
const rateLimit = require("express-rate-limit");

const multer = require("multer");
const path = require("path");

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});

connectToDb();
app.use(express.json());
app.use(express.static("public"));

const apiLimiter = new rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", apiLimiter);

var corsOptions = {
  origin: process.env.URI || "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images")); // указываем папку, куда сохранять файлы
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // генерируем уникальное имя файла
  },
});

const upload = multer({ storage: storage });

// Роут для загрузки файла
app.post("/api/v1/upload", upload.array("images", 10), (req, res) => {
  // Создаем массив для хранения путей к изображениям
  const imagePaths = req.files.map((file) => "/images/" + file.filename);

  // Формируем JSON ответ
  const jsonResponse = {
    status: "success",
    paths: imagePaths,
  };

  // Отправляем JSON в ответ на запрос
  try {
    console.log(jsonResponse);
    res.status(200).json(jsonResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.use(cors(corsOptions));
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/posts", post);

app.use(errorHandler);

module.exports = { app };
