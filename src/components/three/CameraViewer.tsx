'use client'

import {Suspense, useEffect} from 'react'
import {Canvas} from '@react-three/fiber'
import {Html, OrbitControls, useGLTF} from '@react-three/drei'
import type {Material, Mesh, Object3D} from 'three'

function isMesh(object: Object3D): object is Mesh {
  return (object as Mesh).isMesh === true
}

function CameraModel() {
  const {scene} = useGLTF('/models/camera/scene.gltf')

  useEffect(() => {
    scene.traverse((child) => {
      if (!isMesh(child)) return

      const materials = Array.isArray(child.material) ? child.material : [child.material]

      materials.forEach((material: Material) => {
        material.transparent = false
        material.alphaTest = 0
        material.depthWrite = true
        material.depthTest = true

        if ('roughness' in material && typeof material.roughness === 'number') {
          material.roughness = Math.max(0.25, material.roughness)
        }

        if ('metalness' in material && typeof material.metalness === 'number') {
          material.metalness = Math.min(0.95, material.metalness + 0.05)
        }

        if ('emissiveIntensity' in material) {
          material.emissiveIntensity = 0
        }

        material.needsUpdate = true
      })
    })
  }, [scene])

  return <primitive object={scene} position={[0, 0.06, 0]} rotation={[0.04, -0.42, 0]} scale={9.2} />
}

function CameraLoader() {
  return (
    <Html center>
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-mh-yellow" />
    </Html>
  )
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
        <Suspense fallback={<CameraLoader />}>
          <CameraModel />
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
