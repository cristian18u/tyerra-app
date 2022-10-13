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

async function videoEdit(file): Promise<any> {
    return (await new Promise((resolve, reject) => {
        const inStream = file.tempFilePath
        const filename = `${file.tempFilePath}-${file.name}`
        ffmpeg({ source: inStream })
            .withNoAudio()
            .setDuration(20)
            .withSize('640x480')
            .on('end', async () => {
                console.log('Done')
                const result = await uploadFile(filename)
                console.log(result)
                return resolve(result);
            })
            .on('err', (err) => {
                return reject(err)
            })
            .saveToFile(filename)

    }))
}

async function captureImage(file): Promise<any> {
    return (await new Promise((resolve, reject) => {
        const inStream = file.tempFilePath
        const filename = `${file.tempFilePath}-${file.name}`
        const screenshot = `screenshot-${file.tempFilePath}.png`
        ffmpeg({ source: inStream })
            .on('end', async () => {
                console.log('Done')
                const result = await uploadFile(screenshot)
                deleteFile(filename);
                deleteFile(file.tempFilePath);
                deleteFile(screenshot);
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