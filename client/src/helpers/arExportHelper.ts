import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { USDZExporter } from 'three/examples/jsm/exporters/USDZExporter';



export const exportUSDZ = async (scene: any) => {
    const exporter = new USDZExporter();

    const fakePLane = scene.getObjectByName('fake-plane');
    if (fakePLane) {
        fakePLane.visible = true;
    }

    console.log('scene', fakePLane);

    // Parse the input and generate the USDZ file
    const data = await exporter.parse(scene);

    // Create a blob and return the URL
    const blob = new Blob([data], { type: 'application/octet-stream' });

    const link: HTMLLinkElement = document.getElementById('link') as HTMLLinkElement;
    console.log('link', link);

    if (link) {
        link.href = URL.createObjectURL(blob);
        link.setAttribute('rel', 'ar');
        link.setAttribute('download', 'scene.usdz');
        link.click();
        fakePLane.visible = false;
    }


}

export const exportGLTF = async (scene: any) => {
    const gltfExporter = new GLTFExporter();
    const options = {
        trs: false,
        onlyVisible: true,
        trunteDrawRange: true,
        binary: false,
        forcePowerOfTwoTextures: false,
        maxTextureSize: 2048 || Infinity
    };
    return new Promise((resolve, reject) => {
        gltfExporter.parse(
            scene,
            function (result: any) {

                const link = document.getElementById('link') as HTMLLinkElement;
                let blob = null;

                if (result instanceof ArrayBuffer) {
                    blob = new Blob([result], { type: 'application/octet-stream' });

                } else {
                    const text = JSON.stringify(result, null, 2);
                    blob = new Blob([text], { type: 'text/plain' });
                }

                const intentLink =
                    `intent://arvr.google.com/scene-viewer/1.0?file=
        ${URL.createObjectURL(blob)}
       &mode=ar_preferred&title=$"title"Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;

                link.href = intentLink;
                link.click();
            },
            function (error) {
                console.log('An error happened during parsing', error);
            },
            options
        );
    })
};


export const exportUSDZasFile = async (scene: any) => {
    const exporter = new USDZExporter();

    const fakePLane = scene.getObjectByName('fake-plane');
    if (fakePLane) {
        fakePLane.visible = true;
    }

    console.log('scene', fakePLane);

    // Parse the input and generate the USDZ file
    const data = await exporter.parse(scene);

    // Create a blob and return the URL
    const blob = new Blob([data]);
    const file = new File([blob], "scene.usdz", { type: "application/octet-stream" });
    fakePLane.visible = false;
    return file;
}


export const exportGLTFasFile = async (scene: any): Promise<File> => {


    const gltfExporter = new GLTFExporter();
    const options = {
        trs: false,
        onlyVisible: true,
        trunteDrawRange: true,
        binary: false,
        forcePowerOfTwoTextures: false,
        maxTextureSize: 2048 || Infinity
    };
    return new Promise((resolve, reject) => {
        gltfExporter.parse(
            scene,
            function (result: any) {

                if (result instanceof ArrayBuffer) {
                    const blob = new Blob([result], { type: 'application/octet-stream' });
                    const file = new File([blob], "scene.glb", { type: "application/octet-stream" });
                    resolve(file);
                } else {
                    const text = JSON.stringify(result, null, 2);
                    const blob = new Blob([text], { type: 'text/plain' });
                    const file = new File([blob], "scene.gltf", { type: "text/plain" });
                    resolve(file);
                }

            },
            function (error) {
                console.log('An error happened during parsing', error);
            },
            options
        );
    })

}