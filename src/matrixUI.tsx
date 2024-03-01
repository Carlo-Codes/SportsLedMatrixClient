import { useEffect, useState } from "react";
import './App.css'

const serverAddress = '192.168.1.250:3000'
const HTTPserverURL = 'http://' + serverAddress
const wsServerURL = 'ws://' + serverAddress

function MatrixUi(props:{route:string, name:string}) {

  const [textToSend, setTextToSend] = useState('')
  const [clientSentText, setClientSentText] = useState('')

  const handleTextChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setTextToSend(e.target.value)
  }

  async function SendText() {
    const res = await fetch(HTTPserverURL + props.route +'/sendText', {
        method: 'POST',
        body: textToSend
    })
    return res
  }

  async function sendFootball(){
    const res = await fetch(HTTPserverURL + props.route +'/football', {
        method: 'GET',
    })
    return res
  }
  

  useEffect(() => {
    const socket = new WebSocket(wsServerURL + props.route)
    socket.addEventListener('message', function (e){
      setClientSentText(e.data)
    })
    return () => {
      socket.close()
    }
  },[])

  return(
    <div id ='mainUI' className="mainUI">
    <div id='Title' className="Title">{props.name}</div>
    <div id="rawTextInputDiv" className="textInput">
      <label htmlFor="rawTextInput">Text to show</label>
      <input id="rawTextInput"  className='rawTextinput' onChange={handleTextChange}></input>
    </div>
      <button id="sendButton" onClick={SendText}> Send</button>
      <button id="footballButton" onClick={sendFootball}>Football</button>
      <div className="matrixDisplay">
        <div className="display Title">Currently Displayed</div>
        <div className="diplayMessage">{clientSentText}</div>
      </div>
    </div>
  )

}

export default MatrixUi