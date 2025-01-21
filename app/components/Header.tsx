import React from 'react'

function Header() {
  return (
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
  )
}

export default Header