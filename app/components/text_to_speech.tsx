"use client";
import { useState, useEffect } from 'react';

interface TextToSpeechProps {
    initialText?: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ initialText = '' }) => {
    const [text, setText] = useState<string>(initialText);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false)

    useEffect(() => {
        setText(initialText);
    }, [initialText]);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            if (utterance) {
                window.speechSynthesis.cancel(); // Cancel any ongoing speech
                setIsSpeaking(false)
            }
            const newUtterance = new SpeechSynthesisUtterance(text);
            setUtterance(newUtterance);
            setIsSpeaking(true)
            window.speechSynthesis.speak(newUtterance);
        } else {
            console.error('Sorry, your browser does not support speech synthesis.');
        }
    };

    const handleStop = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false)
        }
    };

    return (
        <div className='self-end -mb-2'>
            { !isSpeaking ?
            (<button className="w-8 h-8 rounded-full focus:outline-none" onClick={handleSpeak}><svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="size-6 mx-auto m-auto text-white ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                    </svg>
            </button>) :
            (<button className="w-8 h-8 rounded-full focus:outline-none" onClick={handleStop}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="black" className="size-6 mx-auto m-auto text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
                    </svg>
            </button>)
            }
        </div>
    );
};

export default TextToSpeech;
