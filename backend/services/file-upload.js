const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
 
require('dotenv').config();

aws.config.update({
    secretAccessKey: process.env.Secret_Access_Key,
    accessKeyId: process.env.Access_Key_Id,
    region: 'ca-central-1'
})

const s3 = new aws.S3();
const FILE_PERMISSION = "public-read-write";
 

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

const upload = multer({
  fileFilter, 
  storage: multerS3({
    acl: FILE_PERMISSION, 
    s3: s3,
    bucket: 'penguins-image', 
    metadata: function (req, file, cb) {
      cb(null, {fieldName: "Testing_Meta_data"});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;