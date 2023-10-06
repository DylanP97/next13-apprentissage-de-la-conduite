import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"

const Planet = () => {

    const ref = useRef<Mesh>(null)

    useFrame((state, delta) => {
        if(!ref.current) {
            return
        }
        ref.current.rotation.x += 0.01;
        ref.current.rotation.y += 0.01;
    })

  return (
    <mesh ref={ref} position={[0, 0, 7]} >
        <sphereGeometry/>
        <meshBasicMaterial color="yellow" />
    </mesh>
  )
}

export default Planet