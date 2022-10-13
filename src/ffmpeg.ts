import uploadFile from "./s3"

const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

async function ffmpegProcess(file) {
    const video = await videoEdit(file)
    const image = await captureImage(file)
    return { video, image }
}

function deleteFile(name) {
    try {
        fs.unlinkSync(name)
        console.log('File removed')
    } catch (err) {
        console.error('Something wrong happened removing the file', err)
    }
}

async function videoEdit(file) {
    return (await new Promise((resolve, reject) => {
        const inStream = file.tempFilePath
        ffmpeg({ source: inStream })
            .withNoAudio()
            .setDuration(20)
            .withSize('640x480')
            .on('end', async () => {
                console.log('Done')
                const result = await uploadFile(file.name)
                console.log(result)
                return resolve(result);
            })
            .on('err', (err) => {
                return reject(err)
            })
            .saveToFile(file.name)

    }))
}

async function captureImage(file) {
    return (await new Promise((resolve, reject) => {
        const inStream = file.tempFilePath
        const screenshot = `screenshot${file.name}.png`
        ffmpeg({ source: inStream })
            .on('end', async () => {
                console.log('Done')
                const result = await uploadFile(screenshot)
                deleteFile(file.name);
                deleteFile(file.tempFilePath);
                deleteFile(`screenshot${file.name}.png`);
                console.log(result)
                return resolve(result);
            })
            .on('err', (err) => {
                return reject(err)
            })
            .screenshots({
                timestamps: [3],
                filename: screenshot,
                size: '320x240'
            });
    }))
}

export default ffmpegProcess;