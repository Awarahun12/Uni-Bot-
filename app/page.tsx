"use client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import WelcomeScr from "./components/WelcomeScr";
import AnswerArea from "./components/AnswerArea";
import Input from "./components/Input";
import Header from "./components/Header";
import { useChat } from "ai/react";
import { motion } from "framer-motion";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [fullView, setFullView] = useState(false);
  const [isWelcomeScrOn, setIsWelcomeScrOn] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const [query, setQuery] = useState("");
  const chatState = useChat({
    api: process.env.NEXT_PUBLIC_CHAT_API,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
  });

  const { messages } = chatState;

  useEffect(() => {
    if (!query || query === "") return;

    if (isWelcomeScrOn) setIsWelcomeScrOn(false);
  }, [query]);

  useEffect(() => {
    if (showLoader && messages[messages.length - 1]?.role !== "user")
      setShowLoader(false);

    console.log(messages);
  }, [messages]);

  return (
    <>
     {!fullView && <button
        id="open-chatbot-popup-btn"
        onClick={() => setIsPopupOpen((pre) => !pre)}
        style={{ rotate: isPopupOpen ? "-360deg" : "0deg" }}
      >
        <img src="/chatbot-icon.svg" alt="C" />
      </button>}
      {isPopupOpen && (
        <motion.div
          id="main-container"
          className={`h-[1000px] overflow-y-scroll ${!fullView ? 'fixed bottom-[92px] right-[82px] rounded-l-[20px] rounded-tr-[20px] border-2 border-[#0077cc]' : 'absolute top-0 left-0'}`}
          initial={{ opacity: 0, y: 50, width: 0, height: 0 }}
          animate={{
            opacity: 1,
            y: 0,
            width: fullView ? "100%" : 380,
            height: fullView ? "90vh" : "80%",
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div style={{ position: "relative" }}>
            <Header fullView={fullView} setFullView={setFullView} />

            <main>
              <WelcomeScr
                chatState={chatState}
                isWelcomeScrOn={isWelcomeScrOn}
                setQuery={setQuery}
                setShowLoader={setShowLoader}
                fullView={fullView}
              />
              <AnswerArea
                chatState={chatState}
                isWelcomeScrOn={isWelcomeScrOn}
                showLoader={showLoader}
              />
              <Input
                chatState={chatState}
                isPopupOpen={isPopupOpen}
                isWelcomeScrOn={isWelcomeScrOn}
                setQuery={setQuery}
                setShowLoader={setShowLoader}
                fullView={fullView}
              />
              
            <div className={clsx("h-[100px] w-[320px] bg-[#f0f4f8] z-10 sticky bottom-0 right-0 rounded-bl-[20px] shadow-[10px_10px_10px_var(#f0f4f8)] border-red-600",fullView? 'w-[1000px] hide': 'hide')}></div>
            </main>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
