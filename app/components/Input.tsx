import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { useChat } from 'ai/react';
import clsx from 'clsx'
import { ChangeEventHandler, Dispatch, SetStateAction, useRef, useState } from 'react'

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
}

function Input({chatState ,isPopupOpen, isWelcomeScrOn, setQuery, setShowLoader}: Props) {
  const {handleSubmit, handleInputChange, input} = chatState
  const formRef = useRef<HTMLFormElement>(null)
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
    <form ref={formRef} onSubmit={customeHandleSubmit} id="main-input-area" className={clsx("primary-input-area in-bottom", (!isPopupOpen || isWelcomeScrOn) && 'hide')}>
        <input
          value={input}
          onChange={handleInputChange}
          id="input-field"
          type="text"
          placeholder="What's in your mind!"
        />
        <img
          id="main-input-submit-btn"
          src="/up-arrow.svg"
          alt="T"
          onClick={handleClick}
        />
      </form>
  )
}

export default Input