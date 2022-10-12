// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// import { useEffect, useState } from 'react'
// import './App.css'
// // import { createffmpeg, fetchFile} from

// function App() {
//   // async function getUser() {
//   //   fetch('http://localhost:3000/user').then(res => res.json()).then(res => console.log(res))
//   // }
//   const [videoSrc, setVideoSrc] = useState("");
//   const [imageFile, setImageFile] = useState({});
//   const [soundFile, setSoundFile] = useState({});

//   const ffmpeg = createFFmpeg({ log: true })

//   // useEffect(() => {
//   //   ffmpeg.load();
//   //   console.log('cristian')
//   // }, [])

//   const handleChangeImage = (e) => {
//     const file = e.target.files[0];
//     console.log(file)
//     setImageFile(file);
//   }

//   const handleChangeSound = (e) => {
//     const file = e.target.files[0];
//     console.log(file);
//     setSoundFile(file);
//   }

//   const createVideo = async () => {
//     console.log('entre')
//     await ffmpeg.load()
//     console.log('pase1')
//     // ffmpeg.FS("WriteFile", "video.mp4", await fetchFile(imageFile));
//     // console.log('pase2')
//     // ffmpeg.FS("WriteFile", "sound.mp3", await fetchFile(soundFile));
//     // console.log('1')
//     // await ffmpeg.run("-framerate", "1/10", "-i", "image.png", "-i", "sound.mp3", "-c:v", "libx264", "-t", "10", "-pix_fmt", "yuv420p", "-vf", "scale=1920:1080", "test.mp4")
//     // console.log('data')
//     // const data = ffmpeg.FS("readFile", "test.mp4")
//     // console.log('3')
//     // console.log(data);
//     // const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
//     // console.log(url);
//     // setVideoSrc(url);
//   }

//   return (
//     <div className="App">
//       <video src={videoSrc} controls></video><br />
//       <input type="file" id="video" accept="video/*" onChange={handleChangeImage}></input>
//       {/* <input type="file" id="image" accept="image/*" onChange={handleChangeImage}></input> */}
//       <p></p>
//       <input type="file" id="sound" accept="sound/*" onChange={handleChangeSound}></input>
//       <button onClick={createVideo}>Create a video from the things above!</button>

//       {/* <button onClick={getUser}>Obteneruser</button> */}
//     </div>
//   )
// }

// export default App

// import React, { useState, useCallback } from 'react';
// import './App.css';

// import transformer from './transformer'

// function App() {
//   const [videoSrc, setVideoSrc] = useState('');

//   const handleTranscode = useCallback(async ({ target: { files } }) => {
//     // you can use range slider
//     const url = await transformer(files[0], '00:01:30', 30, 'test.mp4')
//     setVideoSrc(url);
//   }, [])

//   return (
//     <div className="App">
//       <input type="file" onChange={handleTranscode} />
//       <p />
//       <video src={videoSrc} controls></video><br />
//     </div>
//   );
// }

// export default App;


// import React, { useState } from 'react';
// import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// import './App.css';

// function App() {
//   const [videoSrc, setVideoSrc] = useState('');
//   const [message, setMessage] = useState('Click Start to transcode');
//   const ffmpeg = createFFmpeg({
//     log: true,
//   });
//   const doTranscode = async () => {
//     setMessage('Loading ffmpeg-core.js');
//     await ffmpeg.load();
//     setMessage('Start transcoding');
//     ffmpeg.FS('writeFile', 'test.avi', await fetchFile('../video.mp4'));
//     await ffmpeg.run('-i', 'test.avi', 'test.mp4');
//     setMessage('Complete transcoding');
//     const data = ffmpeg.FS('readFile', 'test.mp4');
//     setVideoSrc(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })));
//   };
//   return (
//     <div className="App">
//       <p />
//       <video src={videoSrc} controls></video><br />
//       <button onClick={doTranscode}>Start</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default App;