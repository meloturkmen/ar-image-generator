
import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { TextureLoader } from 'three/src/loaders/TextureLoader'


type GLTFResult = GLTF & {
    nodes: {
        Object_2: THREE.Mesh;
        Object_3: THREE.Mesh;
        Plane: THREE.Mesh;
    };
    materials: {
        Back: THREE.MeshStandardMaterial;
        Frame: THREE.MeshPhysicalMaterial;
    };
};

type Props = JSX.IntrinsicElements["group"] & {
    imageUrl: string;
    innerRef: React.MutableRefObject<THREE.Group | null>;
};

export default function Model(props: Props) {
    const { nodes, materials } = useGLTF("/models/scene.glb") as GLTFResult;
    const texture = useLoader(TextureLoader, props.imageUrl);

    if (texture) {
        texture.encoding = THREE.sRGBEncoding;
    }

    const clonedTexture = useMemo(() => {
        const clonedTexture = texture.clone();
        clonedTexture.encoding = THREE.sRGBEncoding;
        clonedTexture.wrapS = THREE.RepeatWrapping;
        clonedTexture.repeat.x = -1;
        return clonedTexture;
    }, [texture])


    return (
        <group {...props} dispose={null} ref={props.innerRef}  >
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_2.geometry}
                    material={materials.Back}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_3.geometry}
                    material={materials.Frame}
                />
            </group>
            <directionalLight
                intensity={1}
                color="#fcfcfc"
                position={[5, 10, 7.5]}
            />

            <mesh
                name="original-plane"
                castShadow
                receiveShadow
                geometry={nodes.Plane.geometry}
                scale={[1.75, 2.16, 1]}
            >
                <meshStandardMaterial
                    map={texture}
                    color="#ffffff"
                />
            </mesh>

            <mesh
                name="fake-plane"
                visible={false}
                castShadow
                receiveShadow
                geometry={nodes.Plane.geometry}
                rotation={[-Math.PI, -Math.PI, 0]}
                scale={[1.75, 2.16, 1]}
                position={[0, 0, 0.01]}
            >
                <meshStandardMaterial
                    map={clonedTexture}
                    color="#ffffff"
                />
            </mesh>
        </group>
    );
}

useGLTF.preload("/models/scene.glb");
