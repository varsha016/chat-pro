import React, { useState } from 'react'
import "./Join.css"
import chatImage from "../../images/chatImage.jpg"
import { Link } from 'react-router-dom'

let user;
export default function Join() {
    const [name, setName] = useState("")
    console.log(name);
    const sendUser = () => {
        user = document.querySelector("#JoinInp").value
        document.querySelector("#JoinInp").value = ""
    }
    return <>
        <div className='JoinPage'>
            <div className="JoinContainer">
                <img src={chatImage} alt="logo" />
                <h1>Join Now</h1>
                <input type="text" name="" id="JoinInp" placeholder='Enter Your Name' onChange={e => setName(e.target.value)} />
                <Link onClick={e => !name ? e.preventDefault() : null} to="/chat"><button className='JoinBtn' onClick={sendUser}>Login</button></Link>
            </div>

        </div>
    </>
}
export { user }
