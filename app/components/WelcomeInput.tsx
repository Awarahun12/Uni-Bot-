import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { useChat } from 'ai/react';
import { Mic } from 'lucide-react';
import React, { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import SpeechToText from './SpeechToText';
import clsx from 'clsx';

type Props = {
  chatState: {
    messages: Message[],
    input: string,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  },
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  formRef: React.RefObject<HTMLFormElement>,
  setQuery: Dispatch<SetStateAction<string>>,
  fullView: boolean
}

function WelcomeInput({chatState ,setQuery, setShowLoader, formRef, fullView}: Props) {
  const {setInput ,handleInputChange, handleSubmit, input} = chatState

  const customeHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowLoader(true)
    setQuery(input)
    handleSubmit(e)
  }

  const handleClick = () => {
    if(formRef.current)
      formRef.current.requestSubmit()
  }
  
  return (
    // .primary-input-area {
    //   padding-block: 10px;
    //   width: inherit;
    //   max-width: 360px;
    //   border: 2px solid var(--primary-color);
    //   /* background-color: var(--background-color); */
    //   background-color: white;
    //   padding-inline: 10px;
    //   border-radius: 40px;
    
    //   z-index: 100;
    // }
      <form ref={formRef} onSubmit={customeHandleSubmit} id="welcome-input-area" className={clsx("relative py-[10px] border-2 border-[#0077cc] bg-[#f0f4f8] px-[10px] rounded-[40px] z-50 flex items-center w-full")}>
          <input
            value={input}
            onChange={handleInputChange}
            id="welcome-input-field"
            type="text"
            placeholder="What's in your mind!"
          />
          <img
            className={clsx("w-[20px] h-[20px] absolute right-[60px] top-[20px] cursor-pointer", fullView && 'right-[65px]')}
            src="/up-arrow.svg"
            alt="T"
            onClick={handleClick}
          />
          <SpeechToText setInput={setInput} />
      </form>
  )
}

export default WelcomeInput