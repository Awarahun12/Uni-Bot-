import { ChatRequestOptions, CreateMessage, Message } from 'ai'
import React, { useEffect, useState } from 'react'
import clsx from 'clsx';
import '../../styles/loader.css'
import Markdown from './Markdown';
import TextToSpeech from './text_to_speech';

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
    <div id="answer-area" className='px-2 pb-12' style={{display: isWelcomeScrOn? 'none' : ''}}>
      {messages.map(message => (
        <div key={message.id} className={clsx(message.role === 'user' && 'user-message', message.role !== 'user' && 'bot-message-box relative')}>
          {message.role === 'user' ? (
            message.content
          ) : (
            <>
              <div className='flex items-center justify-between'>
              <img src="/logo.png" alt="Bot" className='h-[30px] w-[30px]'/>
              <TextToSpeech initialText={message.content} />
              </div>
              <div className='bot-message'><Markdown content={message.content} /></div>
            </>
          )}
        </div>
      ))}
      {
        showLoader &&
          <div className="bot-message-box">
            <img src="/logo.png" alt="Bot" style={{height: '30px', width: '30px'}} />
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