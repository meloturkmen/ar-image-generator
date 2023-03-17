import React, { useEffect, useState } from 'react'
import 'regenerator-runtime';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useStore from '../store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faTrash } from '@fortawesome/free-solid-svg-icons'
import QRCode from './QRCode';

const appId = '01403d73-5ac1-47b5-a2aa-2059ec480d13';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

type Props = {
    sceneRef: React.MutableRefObject<THREE.Group | null>;
}

const EXAMPLE_COMMANDS = [
    'An oil painting by Matisse of a humanoid robot playing chess',
    'A photo of a teddy bear on a skateboard in Times Square',
    'A comic book cover of a superhero wearing headphones',
];

const Chat = ({ sceneRef }: Props) => {
    const [message, setMessage] = useState<string>('');


    const sendMessage = useStore(state => state.sendMessage)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        finalTranscript,
    } = useSpeechRecognition();


    const toggleListen = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    const handleSubmit = (data?: string | undefined | null) => {

        sendMessage(data || message);
        resetTranscript();
    }

    const handleChange = (e: any) => {
        const value = e.target.value;
        setMessage(value);
    }

    useEffect(() => {
        if (finalTranscript !== '') {
            setMessage(finalTranscript);
        }

    }, [finalTranscript]);




    if (typeof window !== 'undefined' && !browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div className='flex flex-col flex-1 justify-between  lg:w-[clamp(20rem,40%,30rem)] lg:flex-initial'>

            <QRCode sceneRef={sceneRef} />

            <ul className=' flex items-center w-full  py-5  gap-2 flex flex-col hidden lg:flex  '>
                <span className='text-lg mb-2 w-full'>Example Commands:</span>

                {EXAMPLE_COMMANDS.map((command, index) => (
                    <li
                        key={index}
                        onClick={(e) => handleSubmit(command)}
                        className='bg-blue-400 text-yellow-100 p-2 rounded-lg cursor-pointer w-full hover:bg-blue-700'
                    >
                        {command}
                    </li>
                ))}
            </ul>


            <div className='flex items-center relative flex-col flex-1 max-h-[400px]'>
                <span className='text-lg mb-2 w-full '>Say something to create:</span>
                <textarea
                    placeholder='Say something or type a message...'
                    onChange={handleChange}
                    value={message}
                    id='speech-input'
                    className='w-full rounded-lg border-gray-400 border-2 px-4 py-2 mb-4 h-full disabled:bg-white'
                ></textarea>
                <button
                    className='absolute top-11 right-2  w-8 h-8 bg-red-600 p-2 rounded-md flex items-center justify-center'
                    onClick={resetTranscript}
                >
                    <FontAwesomeIcon icon={faTrash} color='#ffffff' />
                </button>
                <div className='gap-2 flex flex-col w-full '>

                    <button
                        className='w-full  h-10 lg:h-12 bg-cyan-600 rounded-md flex items-center justify-center gap-4 relative'
                        onClick={toggleListen}
                    >
                        {/* <div className={`${listening ? "scale-down-center" : ""} rounded-full bg-cyan-500 w-8 h-8 flex shadow-md  items-center justify-center absolute right-2 top-1`}>
        <FontAwesomeIcon icon={listening ? faMicrophone : faMicrophoneSlash} color='#ffffff' />
    </div> */}
                        <span className='text-white text-lg'>{
                            listening ? 'Stop Listening' : 'Start Listening'
                        }</span>

                    </button>


                    <button
                        className='w-full  h-10 lg:h-12 bg-teal-600 rounded-md flex items-center justify-center'
                        onClick={() => handleSubmit()}
                    >
                        <span className='text-white text-lg'>Create Visual</span>
                    </button>


                </div>
            </div>

        </div>
    )
}

export default Chat