import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <>
    <Canvas camera={{ position: [0, 0, 10], fov: 20 }}>
      <ScrollControls pages={4} infinite>
        <App />
      </ScrollControls>
    </Canvas>
  </>
)
