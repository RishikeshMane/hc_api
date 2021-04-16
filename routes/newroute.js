var express = require('express');
var mongoose = require('mongoose');
var db = require('../models/model');
var cors = require('cors')
const multer = require('multer');
//const path = require('path')
var router = express.Router();
const path = require('path')



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/img') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
  });
  



router.get("/", async (req, res) => {
    //res.send('found')
    try {
      const content = await db.find();
      res.json(content);
      console.log(content)
    } catch (err) {
      res.send("Error " + err);
    }
  });

  router.post('/', upload.single('image'), async (req, res) => {
    console.log('req vol');
    // console.log(req.body);
    console.log("file",req.file);
    console.log(req.image);
    const {Title,Password,Content} = req.body;
   // try {
      const dbsv = new db({
       slug:Title,
       password:Password,
       content:Content,
       image:req.file.path,
      });
      
      try {
        const a1 = await dbsv.save();
      // console.log(a1)
      return res.status(200).send(a1)
      } catch (error) {
        console.log(error);
           return res.status(500).send({ err, msg: "something went wrong " })
      }
  
  });
  
  
module.exports = router;