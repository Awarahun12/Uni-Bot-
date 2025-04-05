import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { useChat } from 'ai/react';
import clsx from 'clsx'
import { AudioWaveform, AudioWaveformIcon, Fullscreen, Mic, Voicemail, Waves } from 'lucide-react';
import { ChangeEventHandler, Dispatch, SetStateAction, useRef, useState } from 'react'
import SpeechToText from './SpeechToText';

type Props = {
  chatState: {
    messages: Message[],
    input: string,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  },
  isPopupOpen: boolean,
  isWelcomeScrOn: boolean,
  setQuery: Dispatch<SetStateAction<string>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>
  fullView: boolean
}

function Input({chatState ,isPopupOpen, isWelcomeScrOn, setQuery, setShowLoader, fullView}: Props) {
  const {setInput, handleSubmit, handleInputChange, input} = chatState
  const formRef = useRef<HTMLFormElement>(null)
  
  const handleClick = () => {
    if(formRef.current)
      formRef.current.requestSubmit()
  }

  const customeHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setShowLoader(true)
    setQuery(input)
    handleSubmit(e)
  }
  return (
    <form ref={formRef} onSubmit={customeHandleSubmit} id="main-input-area" className={clsx("p-[10px] bg-white rounded-[40px] z-50 border-2 border-[#0077cc] fixed bottom-[70px] flex items-center w-[350px]", (!isPopupOpen || isWelcomeScrOn) && 'hide', fullView && 'w-[40%]')} style={{display: (!isPopupOpen || isWelcomeScrOn) ? 'none': ''}} >
        <input
          value={input}
          onChange={handleInputChange}
          id="input-field"
          type="text"
          placeholder="What's in your mind!"
        />
        <img
          id="main-input-submit-btn"
          className={clsx('w-5 h-5 absolute right-16 top-5 cursor-pointer', fullView && 'right-[13%]')}
          src="/up-arrow.svg"
          alt="T"
          onClick={handleClick}
        />
        <SpeechToText setInput={setInput}  />
      </form>
  )
}

export default Input