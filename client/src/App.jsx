import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [image, setImage] = useState(null);
  const [user, setUser] = useState({})

  function handleChangeImage(e) {
    const file = e.target.files[0]
    setImage(e.target.files[0])
    console.log(file)
  }

  async function sendImage() {
    console.log("imag", image)

    const formData = new FormData()
    formData.append('file', image)
    // formData.append("upload_preset", 'songImage')
    console.log(formData)

    const response = await axios.post('http://localhost:3000/video', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    console.log(response.data);
  }
  // async function getUser() {
  //   fetch('http://localhost:3000/user').then(res => res.json()).then(res => console.log(res))
  // }
  // const [videoSrc, setVideoSrc] = useState("");

  function createVideo() {
    console.log('a')
  }
  const videoSrc = 'https://ssd-cristian-ty.s3.amazonaws.com/video%20de%20prueba.mp4'
  // return (
  //   <div className="App">
  //     <video width={250} src={videoSrc} controls></video><br />
  //     {/* <input type="file" id="image" accept="image/*" onChange={handleChangeImage}></input>
  //     <button onClick={sendImage}>enviar</button> */}
  //     <input type="file" id="video" accept="video/*" onChange={handleChangeImage}></input>
  //     <button onClick={sendImage}>enviar</button>
  //     <button onClick={createVideo}>Create a video from the things above!</button>
  //     {/* <img width={250} src="https://ssd-cristian-ty.s3.amazonaws.com/home+Countries.png" alt="" /> */}

  //     {/* <button onClick={getUser}>Obteneruser</button> */}
  //   </div>
  // )
}

export default App
