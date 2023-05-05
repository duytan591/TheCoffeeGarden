const upload = require("../middleware/upload");
const config = require("../config/index");
const mongoDB = require("../utils/mongodb.util");
const UploadService = require("../services/upload.service");
const ApiError = require("../api-error");

const GridFSBucket = require("mongodb").GridFSBucket;


const baseUrl = "http://localhost:3000/api/products/img/files/";


const uploadFiles = async (req, res) => {
    try {
        await upload(req, res);
        console.log(req.file);

        if(req.file == undefined) {
            return res.send({
                message:"You must select a file.",
            });
        }
        return res.send({
            message: "File has been uploaded.",
        });
    } catch (error){
        console.log(error);
        return res.send({
            message: "Error when trying upload image: ${error}",
        });
    }
};
const getListFiles = async (req, res) => {
    try {
      const database = await mongoDB.client.db();
      const images = database.collection(config.imgBucket + ".files");
      const cursor = images.find({});

      if ((await cursor.count()) === 0) {
        return res.status(500).send({
          message: "No files found!",
        });
      }
  
      let fileInfos = [];
      await cursor.forEach((doc) => {
        fileInfos.push({
          name: doc.filename,
          url: baseUrl + doc.filename,
        });
      });
  
      return res.status(200).send(fileInfos);
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };
  
  const download = async (req, res) => {
    try {
      const database = await mongoDB.client.db();
      const bucket = new GridFSBucket(database, {
        bucketName: config.imgBucket,
      });
  
      let downloadStream = bucket.openDownloadStreamByName(req.params.name);
  
      downloadStream.on("data", function (data) {
        return res.status(200).write(data);
      });
  
      downloadStream.on("error", function (err) {
        return res.status(404).send({ message: "Cannot download the Image!" });
      });
  
      downloadStream.on("end", () => {
        return res.end();
      });
    } catch (error) {
      return res.status(500).send({
        message: error.message,
      });
    }
  };

  const getImgFile = async (req, res, next) => {
    try {
      const uploadService = new UploadService(mongoDB.client);
      const document = await uploadService.getImgData();
      if(!document){
        return next(new ApiError(404, "Not Found"));
      }
      return res.send(document);
    } catch(error){
      return next(
        new ApiError(500,'Error')
      );
    }
  }
  const getImgId = async (req, res, next) => {
    try {
      const uploadService = new UploadService(mongoDB.client);
      const document = await uploadService.getLatestImg();
      if(!document){
        return next(new ApiError(404, "Not Found"));
      }
      return res.send(document[0]._id);
    } catch(error){
      return next(
        new ApiError(500,'Error')
      );
    }
  }
  
  
  module.exports = {
    uploadFiles,
    getListFiles,
    download,
    getImgFile,
    getImgId,
  };