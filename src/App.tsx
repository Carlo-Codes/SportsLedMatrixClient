import { useEffect, useState } from "react";
import './App.css'

const serverAddress = '192.168.1.250:3000'
const HTTPserverURL = 'http://' + serverAddress
const wsServerURL = 'ws://' + serverAddress

function App() {

  const [textToSend, setTextToSend] = useState('')
  const [clientSentText, setClientSentText] = useState('')

  const handleTextChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setTextToSend(e.target.value)
  }

  async function SendData() {
    const res = await fetch(HTTPserverURL + '/sendText', {
        method: 'POST',
        body: textToSend
    })
    return res
  } 

  useEffect(() => {
    const socket = new WebSocket(wsServerURL)
    socket.addEventListener('message', function (e){
      setClientSentText(e.data)
    })
    return () => {
      socket.close()
    }
  },[])

  return(
    <div id ='mainUI' className="mainUI">
    <div id='Title' className="Title">LED Matrix Client</div>
    <div id="rawTextInputDiv" className="textInput">
      <label htmlFor="rawTextInput">Text to show</label>
      <input id="rawTextInput"  className='rawTextinput' onChange={handleTextChange}></input></div>
      <button id="sendButton" onClick={SendData}> Send</button>
      <div className="matrixDisplay">
        <div className="display Title">Currently Displayed</div>
        <div className="diplayMessage">{clientSentText}</div>
      </div>
    </div>
  )

}

export default App
