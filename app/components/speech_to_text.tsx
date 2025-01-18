"use client"
import React, { useState, useEffect } from 'react';
import { createModel, KaldiRecognizer, Model } from "vosk-browser";
// import model from '../../public/models/vosk-model-small-en-us-0.15'
import './Waveform.css';

const SpeechToText: React.FC<{ onTranscript: (text: string) => void, transcript: string }> = ({ onTranscript, transcript }) => {
    const [isListening, setIsListening] = useState(false);
    // const [transcript, setTranscript] = useState('');

    // const liss = () => {
    //     let recognition : any
    //     if (!window || typeof window === 'undefined'){
    //         console.log('window is not defined')
    //         return
    //     }

    //     recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();

    //     if(!recognition){
    //         console.log("erorroro")
    //     }

    //     recognition.continuous = true;
    //     recognition.interimResults = true;
    //     recognition.lang = 'en-US';

    //     recognition.onresult = (event: any) => {
    //         console.log('something happened')
    //         let finalTranscript = '';
    //         let interimTranscript = '';
    //         for (let i = event.resultIndex; i < event.results.length; i++) {
    //             const transcriptPart = event.results[i][0].transcript;
    //             if (event.results[i].isFinal) {
    //                 finalTranscript += transcriptPart;
    //             } else {
    //                 interimTranscript += transcriptPart;
    //             }
    //         }
    //         setTranscript(prev => prev + finalTranscript);
    //         onTranscript(transcript + finalTranscript + interimTranscript);
    //     };
    // }

    useEffect(() => {
        let loadedModel: any;
        const loadModel = async () => {
            console.log('...Loading')
            loadedModel?.model.terminate();
        
            const model = await createModel('http://localhost:3000/models/vosk-model-small-en-us-0.15.zip');
        
            console.log('modle loaded ...')
            const recognizer = new model.KaldiRecognizer(48000);
            recognizer.setWords(true);
            recognizer.on("result", (message: any) => {
              const result: any = message.result;
              console.log(result)
            });
        
            recognizer.on("partialresult", (message: any) => {
              console.log(message.result.partial);
            });
          };
        loadModel();
    }, [isListening, onTranscript, transcript]);

    return (
        <div>
            <button className='border border-blue-300 text-white bg-blue-800 my-4 rounded px-5 py-4 flex items-center' onClick={() => setIsListening(prev => !prev)}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            {isListening && (
                <div className="waveform">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            )}
            <div>
                <h2>Transcript : </h2>
                <p className='text-blue-800'>{transcript}</p>
            </div>
        </div>
    );
};

export default SpeechToText;
