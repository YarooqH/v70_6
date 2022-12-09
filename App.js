import React, { Suspense, useEffect, useRef, useState } from 'react'
import {View, Text, Button} from 'react-native';
import { useFrame, Canvas, useLoader, useThree, extend } from '@react-three/fiber/native'
import { useGLTF, Environment, useAnimations, useTexture } from '@react-three/drei/native'

import iphoneModelPath from './assets/iphone.glb'
import stacy from './assets/stacy.glb';
import stacyTex from './assets/stacy.jpg';
// import {Ipgone} from './Iphone.js';
// import * as THREE from 'three';
import useControls from 'r3f-native-orbitcontrols'

// import { MeshBasicMaterial } from 'three';
// extend ({OrbitControls})

function StacyModel({url, url1}, props) {
  const { nodes, animations } = useGLTF(url)
  const texture = useTexture(url1)
  const { ref, actions, names } = useAnimations(animations)

  const [hovered, setHovered] = useState(false)
  const [index, setIndex] = useState(3)

  useFrame((state, delta) =>{
    actions[names[index]].play();
  })  
  return (
    <group onClick={(event) => setIndex((index + 1) % names.length)} ref={ref} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} position={[0,-4,0]} scale={0.04}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.stacy.geometry}
          skeleton={nodes.stacy.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}>
          <meshStandardMaterial map={texture} map-flipY={false} skinning />
        </skinnedMesh>
      </group>
    </group>
  )
}
// useGLTF.preload(iphoneModelPath)

export default function App() {
  const[OrbitControls, events] = useControls();
  return (
    <View style={{flex: 1}} {...events}>
    {/* <OrbitControlsView
          style={{ flex: 1 }}
          camera={camera}
          // enableZoom={true}
          // zoom={true}
        >  */}
    <Canvas gl={{ physicallyCorrectLights: true }} camera={{ position: [0, 0, 16], fov: 50 }} 
    // onCreated={(state) => {
    //   const _gl = state.gl.getContext()
    //   const pixelStorei = _gl.pixelStorei.bind(_gl)
    //   _gl.pixelStorei = function(...args) {
    //     const [parameter] = args
    //     switch(parameter) {
    //       case _gl.UNPACK_FLIP_Y_WEBGL:
    //         return pixelStorei(...args)
    //     }
    //   }
    // }}
    >
      <color attach="background" args={[0x000000]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Suspense>
        <Environment preset="park" />
        {/* <OriginalKick url={kickPath} /> */}
        {/* <Models url={iphoneModelPath} /> */}
        {/* <Models url={iphoneModelPath} /> */}
        {/* <Models url={walking} /> */}
        {/* <Ipgone url={iphoneModelPath} /> */}
        <StacyModel url={stacy} url1={stacyTex} />
        {/* <Walk url={walkig} /> */}
        {/* <JustKick url={myModel}/> */}
        </Suspense>
      <OrbitControls />
    
      </Canvas>
    {/* </OrbitControlsView> */}
    </View>
    
  )
}
