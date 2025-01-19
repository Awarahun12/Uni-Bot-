'use client'
import clsx from "clsx";
import { useState } from "react";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isWelcomeScrOn, setIsWelcomeScrOn] = useState(true)

  const handleClick = () => {

  }
  return (
    <>
      <button id="open-chatbot-popup-btn" onClick={()=> setIsPopupOpen(pre => !pre)}>
        <img src="/chatbot-icon.svg" alt="C"/>
      </button>
      <div id="main-container" className={clsx(!isPopupOpen && 'hide')}>
        <div style={{position: "relative"}}>
          {/* <!-- Chatbot Header --> */}
          <header>
            <div className="chat-logo">
              <img
                src="/logo.png"
                alt="logo"
              />
              Uni-Bot
            </div>

            <div className="flex">
              <button id="download-btn" className="btn btn-onlyicon">
                <img
                  src="/download-white.svg"
                  alt="_"
                  style={{width: '20px', height: '20px'}}
                />
              </button>
            </div>
          </header>

          {/* <!-- main stuff --> */}
          <main>
            {/* <!-- Welcome Compnent --> */}
            <div id="welcome-component" className='h1' style={{display: isWelcomeScrOn? '' : 'none'}}>
              <h2>Welcome To <span>Uni-Bot</span></h2>
              <p>Ask questions related to The University Of Haripur</p>

              <div id="welcome-input-area" className="in-middle primary-input-area">
                <input
                  id="welcome-input-field"
                  type="text"
                  placeholder="What's in your mind!"
                />
                <img
                  id="welcome-input-submit-btn"
                  src="/up-arrow.svg"
                  alt="T"
                />
              </div>

              <div id="built-quries">
                <span className="built-quiries" onClick={()=> setIsWelcomeScrOn(false)}>
                  <img src="/education.svg" alt="_" />
                  Faculty
                </span>
                <span className="built-quiries" onClick={()=> setIsWelcomeScrOn(false)}>
                  <img src="/job-search.svg" alt="_" />
                  Jobs Related
                </span>
                <span className="built-quiries" onClick={()=> setIsWelcomeScrOn(false)}>
                  <img src="/direction.svg" alt="_" />
                  Registration
                </span>
                <span className="built-quiries" onClick={()=> setIsWelcomeScrOn(false)}>
                  <img src="/book.svg" alt="_" />
                  Library Services
                </span>
              </div>
            </div>

            <div id="answer-area" style={{display: isWelcomeScrOn? 'none' : ''}}></div>

            <div id="main-input-area" className={clsx("primary-input-area in-bottom", (!isPopupOpen || isWelcomeScrOn) && 'hide')}>
              <input
                id="input-field"
                type="text"
                placeholder="What's in your mind!"
              />
              <img
                id="main-input-submit-btn"
                src="/up-arrow.svg"
                alt="T"
              />
            </div>

            <div id="hidder"></div>
          </main>
        </div>
      </div>
      </>
  );
}
