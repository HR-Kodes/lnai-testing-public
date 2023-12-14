const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const AWS = require('aws-sdk');

const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const s3 = new AWS.S3({
    accessKeyId: "AKIAW2CLDMGVULENQAVM",
    secretAccessKey: "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"
});


function uploadToS3(bucketName, filePath, img) {
    var fileName = path.basename(img);
    var fileStream = fs.createReadStream(img);

    var keyName = path.join(fileName); 

    return new Promise(function (resolve, reject) {
        fileStream.once('error', reject);
        s3.upload({
            Bucket: "legalnitiai", // Correct the variable name here
            Key: keyName,
            Body: fileStream,
            ACL: "public-read"
        })
            .promise()
            .then(resolve, reject);
    });
}

module.exports = {
    s3,
    uploadToS3,
};