import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const CanvasContainer = () => {

    return (
        <Canvas
            camera={{ position: [2, 0, 12.25], fov: 15 }}
            style={{
                backgroundColor: '#111a21',
                width: '100vw',
                height: '100vh',
            }}
        >
            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4} />

            <OrbitControls />
        </Canvas>
    )
}

export default CanvasContainer
