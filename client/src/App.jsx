import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'
import Login from './login';

function App() {

  const [video, setVideo] = useState();
  const [session, setSession] = useState()
  const [res, setRes] = useState({});

  function handleChangeVideo(e) {
    const file = e.target.files[0]
    setVideo(e.target.files[0])
    console.log(file)
  }

  async function sendVideo() {
    // console.log("imag", image)

    console.log('Bearer ' + session)
    const formData = new FormData()
    formData.append('file', video)
    console.log(formData)

    const response = await axios.post('http://localhost:3000/video', formData, {
      headers: {
        'Authorization': 'Bearer ' + session,
        "Content-Type": "multipart/form-data"
      }
    })
    console.log(response.data);
    setRes(response.data)
  }
  // async function getUser() {
  //   fetch('http://localhost:3000/user').then(res => res.json()).then(res => console.log(res))
  // }
  // const [videoSrc, setVideoSrc] = useState("");

  // const videoSrc = 'https://ssd-cristian-ty.s3.amazonaws.com/video%20de%20prueba.mp4'

  if (!session) return <Login setSession={setSession} />
  else return (
    <div className="App">
      <input type="file" id="video" accept="video/*" onChange={handleChangeVideo}></input>
      <button onClick={sendVideo}>EditarVideo</button>
      <video width={250} src={res.video?.Location} controls></video><br />
      <img width={250} src={res.image?.Location} alt="screenshot" />

    </div>
  )
}

export default App
