import React, { useEffect, useState } from 'react'
import { getDeviceType } from '../helpers/deviceDetector';
import { exportGLTF, exportUSDZ } from '../helpers/arExportHelper';

type Props = {
    scene: any
}

const ARButton = (props: Props) => {
    // const [isAROpenedFromUrl, setIsAROpenedFromUrl] = useState<boolean>(false);
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const isAROpen = urlSearchParams.get('arOpen') === 'true';

    async function viewInAR() {
        const model = props.scene.current;
        const type = getDeviceType();
        console.log(type);

        console.log(model)

        type === 'IOS' && exportUSDZ(model);
        type === 'ANDROID' && exportGLTF(model);
        type === 'DESKTOP' && console.log('ARCore and ARKit doesnt supported by desktop browsers');

    }



    return (
        <>

            <button className='absolute top-4 right-5 flex  items-center justify-center gap-2 px-4 py-1 bg-teal-200 rounded-md  lg:hidden' onClick={viewInAR}>
                <img src='https://cdn.iconscout.com/icon/premium/png-512-thumb/augmented-reality-2974517-2489169.png?f=avif&w=256' width={25} height={25}></img>
                <span>View in AR</span>
            </button>

            <a
                id='link'
                rel="ar"
                href='https://holonext.blob.core.windows.net/holonext-public-container/openai/3d1c8b5a/scene.usdz'
              
            >
                <img id='button' width='100' src='' style={{ display: 'none' }} alt="ar-icon" />
            </a>

        </>

    )
}

export default ARButton