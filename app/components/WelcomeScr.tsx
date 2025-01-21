import React, { ChangeEventHandler, Dispatch, FormEvent, SetStateAction, useRef } from 'react'
import WelcomeInput from './WelcomeInput'
import { ChatRequestOptions, CreateMessage, Message } from 'ai'

type Props = {
  chatState: {
    messages: Message[],
    input: string,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
  },
  setQuery: Dispatch<SetStateAction<string>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  isWelcomeScrOn: boolean
}

function WelcomeScr({chatState, setQuery, setShowLoader, isWelcomeScrOn}: Props) {
  const {input, append, setInput} = chatState
  const formRef = useRef<HTMLFormElement>(null)

  const handleClick = (e: any) => {
    setQuery(e.target.innerText)

    append({
      id: String(Math.random()),
      content: e.target.innerText,
      role: 'user'
    })
    
    if(formRef.current)
      formRef.current.requestSubmit()

    console.log(input)
  }
  return (
    <div id="welcome-component" className='h1' style={{display: isWelcomeScrOn? '' : 'none'}}>
      <h2>Welcome To <span>Uni-Bot</span></h2>
      <p>Ask questions related to The University Of Haripur</p>

      <WelcomeInput setQuery={setQuery} setShowLoader={setShowLoader} formRef={formRef} chatState={chatState} />

      <div id="built-quries">
        <span className="built-quiries" onClick={handleClick}>
          <img src="/education.svg" alt="_" />
          Faculty
        </span>
        <span className="built-quiries" onClick={handleClick}>
          <img src="/job-search.svg" alt="_" />
          Jobs Related
        </span>
        <span className="built-quiries" onClick={handleClick}>
          <img src="/direction.svg" alt="_" />
          Registration
        </span>
        <span className="built-quiries" onClick={handleClick}>
          <img src="/book.svg" alt="_" />
          Library Services
        </span>
      </div>
    </div>
  )
}

export default WelcomeScr