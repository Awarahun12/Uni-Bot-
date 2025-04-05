"use client";
import { AudioWaveformIcon, CircleEllipsis, Loader, Loader2, Mic, ShieldEllipsis, ShieldEllipsisIcon } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import './Waveform.css'
import { AssemblyAI } from 'assemblyai'
import { ChatRequestOptions, CreateMessage, Message } from 'ai';


type Props = {
    setInput: React.Dispatch<React.SetStateAction<string>>
}

function SpeechToText({ setInput }: Props) {
    const [isSpeaking, setIsSpeaking] = useState(false)
    const audioRecorderRef = useRef<MediaRecorder | null>(null); 
    const [audioChunks, setAudioChunks] = useState<BlobPart[]>([])
    const [audioUrl, setAudioUrl] = useState('')
    const [transforming, setTransforming] = useState(false)

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio: true})
        const ar = new MediaRecorder(stream)
        audioRecorderRef.current = ar

        if(!audioRecorderRef.current){
            console.log('no audio recorder')
            return
        }

        audioRecorderRef.current.addEventListener("dataavailable", (event: any) => {
			console.log(`event data is: ${event.data} & ${event.type}`);
			setAudioChunks((prevChunks) => [...prevChunks, event.data]);
		});
        
        audioRecorderRef.current.start(1000);
        setIsSpeaking(true)
    }

    const stopRecording = async() => {
        if(!audioRecorderRef.current) return;
        audioRecorderRef.current.stop();
        // convert the audio chunks to a single blob
        const audioBlob = new Blob(audioChunks, {type: 'audio/wav'})
        // reset the listener and states
        audioRecorderRef.current.removeEventListener("dataavailable", (event) => {
			console.log(`event data is: ${event.data} & ${event.type}`);
			setAudioChunks((prevChunks) => [...prevChunks, event.data]);
		});
        setIsSpeaking(false)
        
        //upload audio to assemblyai
        setTransforming(true)
        let uploadUrl = ''
        try {
        const uploadResponse = await fetch(`https://api.assemblyai.com/v2/upload`, {
            method: 'POST',
            headers: {
              'authorization': `a5295aebecf04f7994de2c17befddc23`, 
              'Content-Type': 'application/json'
            },
            body: audioBlob, 
          });   

          const responseData = await uploadResponse.json();
          uploadUrl = responseData.upload_url;
        } catch (error) {
            console.log('error uploading audio: ', error);
        }

        // transcribe the audio file
        const client = new AssemblyAI({
            apiKey: `a5295aebecf04f7994de2c17befddc23` 
          })
          
          const params = {
            audio: uploadUrl
          }
          
          const run = async () => {
            const transcript = await client.transcripts.transcribe(params)
          
            if (transcript.status === 'error') {
              console.error(`Transcription failed: ${transcript.error}`)
              process.exit(1)
            }

            setTransforming(false)
            if(transcript.text)
            setInput(transcript.text)
            setAudioChunks([])
          }
          
          run()
    }
    return (
        <>
            {isSpeaking && <div className="waveform absolute -top-9 right-2">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>}
            {transforming && <div className="waveform absolute -top-9 right-2">Transforming..</div>}
            {audioUrl && (
                <div>
                <audio controls src={audioUrl}></audio>
                </div>
            )}
            <span className='bg-gray-400 p-2 rounded-full cursor-pointer'>
                { !isSpeaking ?
                    <Mic width={15} height={15} onClick={startRecording} /> : 
                    <AudioWaveformIcon width={15} height={15} onClick={stopRecording} />
                }
            </span>
        </>
    );
};

export default SpeechToText;