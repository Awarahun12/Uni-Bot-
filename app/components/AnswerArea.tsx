import { ChatRequestOptions, CreateMessage, Message } from 'ai'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import '../../styles/loader.css'

type Props = {
  chatState: {
    messages: Message[],
    input: string,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  },
  isWelcomeScrOn: boolean,
  showLoader: boolean
}

function AnswerArea({chatState, isWelcomeScrOn, showLoader}: Props) {
  const {messages} = chatState

  return (
    <div id="answer-area" className='px-2' style={{display: isWelcomeScrOn? 'none' : ''}}>
      {messages.map(message => (
        <div key={message.id} className={clsx(message.role === 'user' && 'user-message', message.role !== 'user' && 'bot-message-box')}>
          {message.role === 'user' ? (
            message.content
          ) : (
            <>
              <img src="/logo.png" alt="Bot"/>
              <div className='bot-message'>{message.content}</div>
            </>
          )}
        </div>
      ))}
      {
        showLoader &&
          <div className="bot-message-box">
            <img src="/logo.png" alt="Bot"/>
            <div className='bot-message relative h-32'>
            <div className="banter-loader">
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
          </div>
            </div>
          </div>
      }
    </div>
  )
}

export default AnswerArea