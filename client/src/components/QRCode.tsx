import React from 'react'
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { v4 as uuid } from "uuid";
import useStore from '../store';
import { exportUSDZasFile, exportGLTFasFile } from '../helpers/arExportHelper';


type Props = {

    sceneRef: React.MutableRefObject<THREE.Group | null>;
}

const QRCode = ({ sceneRef }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [sceneID, setSceneID] = useState<string | null>(null);
    const uploadFile = useStore(state => state.uploadFile);
    const [url, setURL] = useState<string | null>(null);


    const handleGenerateQR = async () => {
        setIsLoading(true);
        const unique_id = uuid();
        const small_id = unique_id.slice(0, 8) as string;
        console.log("generating QR code");

        setSceneID(small_id);


        const [usdz, gltf] = await Promise.all([
            exportUSDZasFile(sceneRef.current),
            exportGLTFasFile(sceneRef.current)
        ]);

        console.log("uploading files");
        console.log(usdz, gltf);


        uploadFile(usdz, small_id);
        uploadFile(gltf, small_id)


        setTimeout(() => {
            console.log("uploaded files");
            setURL(`https://1de1-88-242-138-175.eu.ngrok.io/arviewer?sceneID=${small_id}`)
            setIsLoading(false);

        }, 15000)
    }


    return (
        <div className='hidden p-5 items-center justify-between flex-col  gap-3 bg-white  rounded-md lg:flex w-full'>
            <span className='text-2xl font-bold'>View in your Space</span>
            {

                isLoading ? <div className='w-[250px] h-[250px] flex items-center justify-center p-5 flex-col  border-blue-500 '>


                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div> :
                    <QRCodeCanvas
                        id="qrCode"
                        value={url || "https://1de1-88-242-138-175.eu.ngrok.io"}
                        size={window.innerWidth < 768 ? 150 : 250}
                        bgColor={"#ffffff"}
                        level={"H"}
                    />

            }

            <button onClick={handleGenerateQR} className='bg-blue-400 px-5 py-2 w-[250px] text-white rounded-md'>Generate QR Code</button>
            {
                isLoading && <span className='w-full text-sm text-gray-500 text-center mt-2'>*This will take a few seconds,please wait...</span>
            }
        </div >
    )
}

export default QRCode