import dotenv from 'dotenv'
dotenv.config()


const AWS = require('aws-sdk')
const fs = require('fs')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')

const client = new S3Client({
    region: process.env.REGION, credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
})

const s3 = new AWS.S3({
    region: process.env.REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
})

// s3.createBucket({
//     Bucket: 'hola-este-es-mi-bucket'
// }, (error, success)=> {
//     if (error) console.log(error)
//     console.log(success)
// })


// async function uploadFile(pathFile) {

//     const stream = fs.createReadStream(pathFile.tempFilePath)
//     const uploadParams = {
//         Bucket: 'cristian-ssd-vanegas',
//         key: pathFile.name,
//         Body: stream
//     }
//     // console.log(Buffer('hola'))
//     const command = new PutObjectCommand(uploadParams)
//     const res = await client.send(command)
//     console.log(res);
//     return res
// }
async function uploadFile(pathFile) {
    console.log(pathFile)
    const stream = await fs.createReadStream(pathFile.tempFilePath)
    // const stream = fs.createReadStream("archivos\\tmp-1-1665553889686")
    console.log(stream)
    // const uploadParams = {
    //     Bucket: 'hola-este-es-mi-bucket',
    //     key: pathFile.name,
    //     Body: stream
    // }
    // archivos\\tmp-1-1665553889686
    s3.putObject({
        Bucket: process.env.BUCKET,
        key: pathFile.name,
        Body: stream
    }, (error, success) => {
        if (error) console.log(error)
        console.log(success)
    })
    // console.log(Buffer('hola'))
    // const command = new PutObjectCommand(uploadParams)
    // const res = await client.send(command)
    // console.log(res);
    // return res
}

// uploadFile();
// const stream = fs.createReadStream(ima)
// console.log(stream)
// s3.putObject({
//     Bucket: 'hola-este-es-mi-bucket',
//     key:'hola.png',
//     Body: stream
//   }, (error, success) => {
//     if (error) console.log(error)
//     console.log(success)
//   })
module.exports = uploadFile;