import {
  RenderTexture,
  OrbitControls,
  PerspectiveCamera,
  Text,
  Image,
  Environment,
  useScroll
} from "@react-three/drei"
import { useRef, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { easing } from "maath"
import './app.css'
import './util.js'

function App() {
  const ref = useRef()

  useFrame((state, delta) => {
    const speed = Math.PI * 0.05
    ref.current.rotation.x += speed * delta
    ref.current.rotation.y += speed * delta
    ref.current.rotation.z += speed * delta
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 5, 0]} intensity={2} color={new THREE.Color(0x66ffff)} />

      {/* 旋轉立方體 */}
      <mesh ref={ref} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial>
          <RenderTexture attach="map">
            <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 5]} />
            <color attach="background" args={["white"]} />
            <ambientLight intensity={1} />
            <Text fontSize={0.75} color="salmon">
              Hello World!
            </Text>
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>

      {/* 輪播圖片 */}
      <Rig rotation={[0, 0, 0.15]}>
        <Carousel />
      </Rig>

      <Environment preset="dawn" background blur={0.5} />
    </>
  )
}

function Rig(props) {
  const ref = useRef()
  const scroll = useScroll()
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2)
    state.events.update()
    easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 15], 0.3, delta)
    state.camera.lookAt(0, 0, 0)
  })
  return <group ref={ref} {...props} />
}

function Carousel({ radius = 4 }) {
  const images = useMemo(() => {
    const modules = import.meta.glob('/src/assets/*.jpg', { eager: true })
    return Object.values(modules).map((mod) => mod.default)
  }, [])

  const count = images.length

  return images.map((url, i) => (
    <Card
      key={i}
      url={url}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ))
}

function Card({ url, ...props }) {
  const ref = useRef()
  const [hovered, hover] = useState(false)
  const pointerOver = (e) => (e.stopPropagation(), hover(true))
  const pointerOut = () => hover(false)

  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta)
    easing.damp(ref.current.material, "radius", hovered ? 0.25 : 0.1, 0.2, delta)
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta)
  })

  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.12, 1.2, 1.2, 60, 60]} />
    </Image>
  )
}

export default App
