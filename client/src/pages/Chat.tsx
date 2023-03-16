import React, { useRef, useState } from 'react'
import ARScene from '../components/ARScene';
import VoiceChat from '../components/VoiceChat';
import LoadingScreen from '../components/LoadingScreen';

type Props = {}

const Chat = (props: Props) => {

    const sceneRef = useRef<THREE.Group | null>(null)

    return (
        <div className='h-full p-4 flex flex-col justify-center gap-4 lg:flex-row'>
            <LoadingScreen />
            <ARScene sceneRef={sceneRef} />
            <VoiceChat sceneRef={sceneRef} />
        </div>
    )
}

export default Chat