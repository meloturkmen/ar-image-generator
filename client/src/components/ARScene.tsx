import React, { useEffect, useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei'
import useStore from '../store';
import ImageFrame from "../models/ImageFrame"
import ARButton from './ARButton';
import LoadingScreen from './LoadingScreen';
type Props = {
    sceneRef: React.MutableRefObject<THREE.Group | null>;
}

const ARScene = ({ sceneRef }: Props) => {
    const image: string | null = useStore(state => state.image);
    const getImageFromAPI = useStore(state => state.getImageFromAPI);


    const [imageBase64, setImageBase64] = useState<string | null>(null)




    const handleImage = async () => {
        const result = await getImageFromAPI(image);
        setImageBase64(result)
    }



    useEffect(() => {
        handleImage();
    }, [image])

    return (
        <div className='relative w-full flex-[3]  h-max-[50%] bg-white rounded-md  shadow-sm flex h-1/2 lg:h-full lg:w-0 lg:flex-1 '>
            <Canvas resize={{ debounce: 0 }} >

                <Suspense fallback={<Html>
                    loading...
                </Html>}>
                    <ImageFrame imageUrl={imageBase64 || 'placeholder-2.avif'} innerRef={sceneRef} />
                </Suspense>

                <OrbitControls />
            </Canvas>
            <ARButton scene={sceneRef} />
        </div>
    )
}

export default ARScene