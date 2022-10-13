const ffmpeg = require('fluent-ffmpeg');

function captureImage(file) {
    const inStream = file.tempFilePath
    console.log(inStream)
    ffmpeg({ source: inStream })
        .on('error', function (err) {
            console.log('An error occurred: ' + err.message);
        })
        .on('end', function () {
            console.log('Processing finished !');
        })
        .screenshots({
            timestamps: [3],
            filename: 'screenshots.png',
            size: '320x240'
        });
}

export default captureImage;