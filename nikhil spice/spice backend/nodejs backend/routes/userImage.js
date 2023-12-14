const express = require("express");

const multer = require('multer');
const path = require('path');
const { uploadToS3 } = require('../../utils/awsconfig');


const router = express.Router();


const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});



const upload = multer({ storage: Storage }).single("formData");

router.post("/", upload, async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: "No file uploaded" });
    }

    var filePath = `./uploads/${req.file.filename}`;

    try {
        const result = await uploadToS3('legalnitiai', 'documents', filePath);
        var r = result.Location;
        res.send({ message: "Image saved successfully", location: r });
    } catch (error) {
        console.error("Error uploading to S3:", error);
        res.status(500).send({ message: "Failed to upload to S3" });
    }
});



module.exports = router;