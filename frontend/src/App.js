import React from 'react'
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Join from './component/join/Join'
import Chat from './component/chat/Chat'


export default function App() {

  return <>
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Join />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>

    </div>
  </>
}
