import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Environment } from '@react-three/drei'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <Canvas camera={{ position: [0, 0, 10], fov: 15 }}>
    <ScrollControls pages={4} infinite>
        <App />
    </ScrollControls>
    <Environment preset="dawn" background blur={0.5} />
  </Canvas>
)
