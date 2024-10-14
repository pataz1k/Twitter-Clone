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
app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  // req.file содержит информацию о загруженном файле
  // req.body будет содержать текстовые данные, отправленные вместе с файлом (если есть)

  // Формируем путь к файлу на сервере
  const imagePath = "/images/" + req.file.filename; // заменяем обратные слеши на прямые для Windows

  // Формируем JSON ответ
  const jsonResponse = {
    status: "success",
    path: imagePath,
  };

  // Отправляем JSON в ответ на запрос
  res.status(200).json(jsonResponse);
});

app.use("/api/v1/auth", cors(corsOptions), auth);
app.use("/api/v1/users", cors(corsOptions), user);
app.use("/api/v1/posts", cors(corsOptions), post);

app.use(errorHandler);

module.exports = { app };
