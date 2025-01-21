import { ChatRequestOptions, CreateMessage, Message,  } from 'ai';
import { useChat } from 'ai/react';
import React, { createContext, ReactNode, useState } from 'react';

type ChatContextType = {
  messages: Message[],
  input: string,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions) => void,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  append: (message: Message | CreateMessage, chatRequestOptions?: ChatRequestOptions) => Promise<string | null | undefined>
}

export const ChatStateContext = createContext<ChatContextType | undefined>(undefined);

export const ChatStateProvider = ({ children }: { children: ReactNode }) => {
    const {
        messages,
        input,
        handleSubmit,
        handleInputChange,
        setInput,
        append
      } = useChat({
        api: process.env.NEXT_PUBLIC_CHAT_API,
        headers: {
          "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
        },
      });

    return (
        <ChatStateContext.Provider value={{ messages, input, handleInputChange, handleSubmit, setInput, append }}>
                {children}
        </ChatStateContext.Provider>
    );
};