'use client'
import clsx from "clsx";
import { useEffect, useState } from "react";
import WelcomeScr from "./components/WelcomeScr";
import AnswerArea from "./components/AnswerArea";
import Input from "./components/Input";
import Header from "./components/Header";
import { useChat } from 'ai/react'


export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isWelcomeScrOn, setIsWelcomeScrOn] = useState(true)
  const [showLoader, setShowLoader] = useState(false)
  const [query, setQuery] = useState('')
  const chatState = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
  });

  const {messages} = chatState;

  useEffect(() => {
    if(!query || query === '')
      return

    if(isWelcomeScrOn) 
      setIsWelcomeScrOn(false)
  }, [query])

  useEffect(() => {
    if (showLoader && messages[messages.length - 1]?.role !== 'user') setShowLoader(false);

    console.log(messages)
  }, [messages])
    
  
  return (
    <>
      <button id="open-chatbot-popup-btn" onClick={()=> setIsPopupOpen(pre => !pre)}>
        <img src="/chatbot-icon.svg" alt="C"/>
      </button>
      <div id="main-container" className={clsx(!isPopupOpen && 'hide')}>
        <div style={{position: "relative"}}>
          <Header />

          <main>
            <WelcomeScr chatState={chatState} isWelcomeScrOn={isWelcomeScrOn} setQuery={setQuery} setShowLoader={setShowLoader}/>
            <AnswerArea chatState={chatState} isWelcomeScrOn={isWelcomeScrOn} showLoader={showLoader}/>
            <Input chatState={chatState} isPopupOpen={isPopupOpen} isWelcomeScrOn={isWelcomeScrOn} setQuery={setQuery} setShowLoader={setShowLoader}/>
            <div id="hidder"></div>
          </main>
        </div>
      </div>
      </>
  );
}
