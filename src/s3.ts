require('dotenv').config()


const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const storage = new S3({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadFile = (file) => {
    const stream = fs.createReadStream(file);
    const params = {
        Bucket: process.env.BUCKET,
        Key: file,
        Body: stream
    };
    return storage.upload(params).promise();
};

export default uploadFile;