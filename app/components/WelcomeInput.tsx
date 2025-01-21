import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { useChat } from 'ai/react';
import React, { ChangeEventHandler, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

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
}

function WelcomeInput({chatState ,setQuery, setShowLoader, formRef}: Props) {
  const {handleInputChange, handleSubmit, input} = chatState

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
      <form ref={formRef} onSubmit={customeHandleSubmit} id="welcome-input-area" className="in-middle primary-input-area">
          <input
            value={input}
            onChange={handleInputChange}
            id="welcome-input-field"
            type="text"
            placeholder="What's in your mind!"
          />
          <img
            id="welcome-input-submit-btn"
            src="/up-arrow.svg"
            alt="T"
            onClick={handleClick}
          />
      </form>
  )
}

export default WelcomeInput