import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getDeviceType } from '../helpers/deviceDetector'
type Props = {}

const SCENE_BASE_URL = "https://holonext.blob.core.windows.net/holonext-public-container/openai"

const ARViewer = (props: Props) => {
    const linkRef = useRef<HTMLAnchorElement>(null)
    const [deviceType, setDeviceType] = useState<string | null>(getDeviceType())
    const urlSearchParams = new URLSearchParams(window.location.search)
    const sceneID = urlSearchParams.get('sceneID')

    useEffect(() => {
        if (sceneID && linkRef.current) {
            linkRef.current.click()
        }
    }, [])


    const intentLink = useMemo(() => {
        return `intent://arvr.google.com/scene-viewer/1.0?file=
            ${SCENE_BASE_URL}/${sceneID}/scene.gltf
       &mode=ar_preferred&title=$"title"Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
    }, [])



    return (
        <div>
            AR Viewer Page
            <a
                ref={linkRef}
                id='link'
                href={deviceType === 'IOS' ? `${SCENE_BASE_URL}/${sceneID}/scene.usdz` : intentLink}
                rel={deviceType === 'IOS' ? 'ar' : ''}


            >
                <img id='button' width='100' src='' style={{ display: 'none' }} alt="ar-icon" />
            </a>
        </div>
    )
}

export default ARViewer