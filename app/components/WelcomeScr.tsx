import React, { ChangeEventHandler, Dispatch, FormEvent, SetStateAction, useRef } from 'react'
import WelcomeInput from './WelcomeInput'
import { ChatRequestOptions, CreateMessage, Message } from 'ai'
import clsx from 'clsx'

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
  isWelcomeScrOn: boolean,
  fullView: boolean
}

function WelcomeScr({chatState, setQuery, setShowLoader, isWelcomeScrOn, fullView}: Props) {
  const {input, append, setInput} = chatState
  const formRef = useRef<HTMLFormElement>(null)

  const handleClick = (e: any) => {
    setQuery(e.target.innerText)

    append({
      id: String(Math.random()),
      content: e.target.innerText,
      role: 'user'
    })
    
    setQuery(e.target.innerText)
    setShowLoader(true)
  }
  

// #welcome-component {
//   /* border: 2px solid red; */
//   margin-block-start: 35%;
//   /* width: 100%; */
//   padding-inline: 10px;
//   /* border: 2px solid red; */
//   /* margin-block-start: 25vh; */
//   text-align: center;
//   font-size: 1.5rem;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   align-items: center;
//   justify-content: center;
// }
  return (
    <div id='welcome-component' className={clsx('h1 px-[10px] text-center flex flex-col gap-[10px] items-center justify-center', !fullView ? "mt-[35%]" : "mt-[10%]")}style={{display: isWelcomeScrOn? '' : 'none'}}>
      <h2 className={clsx('text-[3rem]', !fullView && 'text-[26px]')}>Welcome To <span>Uni-Bot</span></h2>
      <p className='text-sm px-4'>Ask questions related to The University Of Haripur</p>

      <WelcomeInput setQuery={setQuery} setShowLoader={setShowLoader} formRef={formRef} chatState={chatState} fullView={fullView} />

      <div id="built-quries" className={clsx('flex flex-wrap justify-center gap-5 w-[clamp(300px,55%,550px)] px-5', fullView && 'w-fit')}>
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