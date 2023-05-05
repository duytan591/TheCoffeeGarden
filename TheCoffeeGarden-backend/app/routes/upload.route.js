const express = require("express");
const upload = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload.controller");


upload.get("/", homeController.getHome);
upload.post("/upload", uploadController.uploadFiles);
upload.get("/files", uploadController.getListFiles);
upload.get("/files/image", uploadController.getImgFile);
upload.get("/files/imageID",uploadController.getImgId);
upload.get("/files/:name", uploadController.download);
module.exports = upload;