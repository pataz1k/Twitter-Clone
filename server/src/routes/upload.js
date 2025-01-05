const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
let EasyYandexS3 = require('easy-yandex-s3').default;

const router = express.Router();

let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_BUCKET_ACCESS_KEY_ID,
    secretAccessKey: process.env.YANDEX_BUCKET_ACCESS_KEY,
  },
  Bucket: 'twitter-clone', // Название бакета
});

router.post('/', async (req, res) => {
  try {
    // Массив для сохранения информации о загрузке каждого файла
    let uploadResults = [];

    // Перебираем все файлы из запроса
    for (let file of req.files) {
      let buffer = file.buffer; // Буфер текущего файла
      let upload = await s3.Upload({ buffer }, '/files/'); // Загрузка файла в бакет
      uploadResults.push(upload.Key); // Добавляем результат загрузки в массив
    }

    // Отправляем все результаты загрузки клиенту
    res.send(uploadResults);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Ошибка загрузки файлов' });
  }
});

module.exports = router;
