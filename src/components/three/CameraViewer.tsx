'use client'

import {Suspense, useEffect} from 'react'
import {Canvas} from '@react-three/fiber'
import {Environment, OrbitControls, useGLTF} from '@react-three/drei'

function CameraModel() {
  const {scene} = useGLTF('/models/camera/scene.gltf')

  useEffect(() => {
    scene.traverse((child: any) => {
      if (!child.isMesh) return

      const mats = Array.isArray(child.material) ? child.material : [child.material]
      mats.forEach((m: any) => {
        if (!m) return
        m.transparent = false
        m.alphaTest = 0
        m.depthWrite = true
        m.depthTest = true
        if (m.roughness !== undefined) m.roughness = Math.max(0.25, m.roughness)
        if (m.metalness !== undefined) m.metalness = Math.min(0.95, m.metalness + 0.05)
        if (!m.emissive) m.emissive = {r: 0, g: 0, b: 0}
        m.emissiveIntensity = 0
      })
    })
  }, [scene])

  return <primitive object={scene} position={[0, 0.06, 0]} rotation={[0.04, -0.42, 0]} scale={9.2} />
}

useGLTF.preload('/models/camera/scene.gltf')

export function CameraViewer() {
  return (
    <div className="h-[420px] w-full md:h-[520px]" aria-label="Modele 3D de camera">
      <Canvas camera={{position: [0, 0.5, 6], fov: 20}} dpr={[1, 2]} gl={{alpha: true, antialias: true}}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 4, 5]} intensity={3} />
        <directionalLight position={[-3, 1.5, -2]} intensity={1.2} color="#ffd58a" />
        <spotLight position={[0, 3.8, 5]} intensity={5.2} angle={0.35} penumbra={0.3} />
        <Suspense fallback={null}>
          <CameraModel />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.32}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.85}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  )
}
