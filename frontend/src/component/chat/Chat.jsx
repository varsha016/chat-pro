import React, { useEffect, useState } from 'react'
import ReactScrollToBottom from "react-scroll-to-bottom"
import { user } from "../join/Join"
import "../chat/Chat.css"
import cross from "../../images/cross.jpg"
import sendImage from "../../images/sendImage.png"
import socketIo from "socket.io-client"
import Massege from '../massege/massege'
const ENDPOINT = "http://localhost:5000/"

let socket;

export default function Chat() {
    const [id, setId] = useState("")
    const [message, setMessage] = useState([])

    const send = () => {
        const message = document.querySelector("#chatInput").value
        socket.emit(`message`, { message, id })
        document.querySelector("#chatInput").value = ""
    }
    console.log(message);

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ["websocket"] });
        socket.on("connect", () => {
            alert("connected")
            setId(socket.id)
        })
        // console.log(socket);

        socket.emit("joined", { user })

        socket.on(`wellcome`, (data) => {
            setMessage([...message, data])
            // console.log(data.user, data.message);
        })
        socket.on("userjoined", (data) => {
            // console.log(data.user, data.message);
        })
        socket.on('leave', (data) => {
            setMessage([...message, data])
            // console.log(data.user, data.message);
        })
        return () => {
            socket.emit(`disConnect`);
            socket.off()
        }
    }, [])

    useEffect(() => {

        socket.on(`sendMessage`, (data) => {
            setMessage([...message, data])
            // console.log(data.user, data.message, data.id);
        })
        return () => {
            socket.off()
        }
    }, [message])

    return <>
        {/* {JSON.stringify(massege)} */}
        <div className='chatPage'>
            <div className="chatContainer">
                <div className="header">
                    <h3>C Chat</h3>
                    <a href="/"><img src={cross} alt="close" height={30} width={30} /></a>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {message.map((item, i) => <div key={item.i}>
                        <Massege user={item.id === id ? "" : item.user} massege={item.message} classs={item.id === id ? "right" : "left"} />

                    </div>)}

                </ReactScrollToBottom>
                <div className="inputBox">
                    <input type="text" name="" id="chatInput" />
                    <button onClick={send} className='sendBtn'><img src={sendImage} alt="send" /></button>


                </div>
            </div>
        </div>
    </>
}
