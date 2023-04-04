const AWS = require("aws-sdk");
require("dotenv").config();

const uploadToS3 = (data, filename) => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };
  return new Promise((resolve, rejects) => {
    s3bucket.upload(params, (err, response) => {
      if (err) {
        rejects(err);
        // console.log("something went wrong", err);
      } else {
        // console.log("success", response);
        resolve(response.Location);
      }
    });
  });
};

module.exports = uploadToS3;
