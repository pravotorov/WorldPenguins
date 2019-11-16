const express = require("express");
const router = express.Router(); 

const upload = require('../services/file-upload');

const signleUpload = upload.single('image');


router.post('/image-upload', async (req, res) => {
    
    signleUpload(req, res, (err) => {

        if (err) {
          return res.status(422).send({errors: [{title: 'File Upload Error', detail: err.message}] });
        }
    
        return res.json(req.file.location);
      });
});

module.exports = router;
      