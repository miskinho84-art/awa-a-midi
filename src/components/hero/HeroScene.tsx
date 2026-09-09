/**
 * SCÈNE 3D DU HERO (Three.js via React Three Fiber) — ordinateur uniquement
 */
import { Suspense, useEffect, useMemo, useRef, type MutableRefObject, type ReactNode } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useInView } from "framer-motion";
import * as THREE from "three";

type PointerRef = MutableRefObject<{ x: number; y: number }>;
type Vec3 = [number, number, number];

export interface HeroSceneProps {
  onReady?: () => void;
  className?: string;
}

export default function HeroScene({ onReady, className }: HeroSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.05 });
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        flat
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 5.2, 8.2], fov: 34, near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
        style={{ pointerEvents: "none", background: "transparent" }}
      >
        <hemisphereLight args={["#fff7ec", "#d9c3a3", 1.5]} />
        <directionalLight position={[3, 6, 4]} intensity={2.2} color="#fff3e2" />
        <directionalLight position={[-5, 3, -3]} intensity={0.9} color="#ffb98f" />
        <Suspense fallback={null}>
          <Rig pointer={pointer}>
            <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.7}>
              <Plate />
            </Float>
            <Ingredients />
          </Rig>
          <Ready onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Ready({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

interface FloatProps {
  children: ReactNode;
  speed?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
  range?: number;
  phase?: number;
}

function Float({
  children,
  speed = 1,
  floatIntensity = 1,
  rotationIntensity = 1,
  range = 0.12,
  phase = 0,
}: FloatProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = phase + state.clock.elapsedTime * speed;
    g.position.y = Math.sin(t) * range * floatIntensity;
    g.rotation.x = Math.cos(t * 0.5) * 0.12 * rotationIntensity;
    g.rotation.y = Math.sin(t * 0.4) * 0.12 * rotationIntensity;
    g.rotation.z = Math.sin(t * 0.3) * 0.08 * rotationIntensity;
  });
  return <group ref={ref}>{children}</group>;
}

function Rig({ children, pointer }: { children: ReactNode; pointer: PointerRef }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += (pointer.current.x * 0.25 - g.rotation.y) * 0.04;
    g.rotation.x += (-pointer.current.y * 0.12 - g.rotation.x) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

function Plate() {
  const raw = useLoader(
    THREE.TextureLoader,
    "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
  );
  const texture = useMemo(() => {
    raw.colorSpace = THREE.SRGBColorSpace;
    raw.anisotropy = 4;
    raw.needsUpdate = true;
    return raw;
  }, [raw]);

  const spin = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.1;
  });

  return (
    <group rotation={[0.5, 0, 0]}>
      <group ref={spin}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[1.7, 1.5, 0.16, 72]} />
          <meshStandardMaterial color="#fbf5ec" roughness={0.28} metalness={0.02} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[1.78, 1.7, 0.04, 72]} />
          <meshStandardMaterial color="#ffffff" roughness={0.22} />
        </mesh>
        <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.64, 72]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

const leafShape = (() => {
  const s = new THREE.Shape();
  s.moveTo(0, -0.55);
  s.bezierCurveTo(0.5, -0.3, 0.5, 0.3, 0, 0.55);
  s.bezierCurveTo(-0.5, 0.3, -0.5, -0.3, 0, -0.55);
  return s;
})();

function Tomato({ position, scale = 1 }: { position: Vec3; scale?: number }) {
  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={1.2} phase={position[0]}>
      <group position={position} scale={scale}>
        <mesh>
          <sphereGeometry args={[0.3, 24, 24]} />
          <meshStandardMaterial color="#e0402c" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.29, 0]}>
          <coneGeometry args={[0.08, 0.14, 8]} />
          <meshStandardMaterial color="#3e8e4b" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function Lime({ position, rotation }: { position: Vec3; rotation: Vec3 }) {
  return (
    <Float speed={1.6} rotationIntensity={1} floatIntensity={1} phase={2}>
      <mesh position={position} rotation={rotation}>
        <cylinderGeometry args={[0.34, 0.34, 0.07, 32]} />
        <meshStandardMaterial attach="material-0" color="#5aa03c" roughness={0.5} />
        <meshStandardMaterial attach="material-1" color="#d7ee86" roughness={0.6} />
        <meshStandardMaterial attach="material-2" color="#d7ee86" roughness={0.6} />
      </mesh>
    </Float>
  );
}

function Chili({ position, rotation }: { position: Vec3; rotation: Vec3 }) {
  return (
    <Float speed={1.8} rotationIntensity={0.9} floatIntensity={1.1} phase={4}>
      <group position={position} rotation={rotation}>
        <mesh>
          <capsuleGeometry args={[0.075, 0.55, 4, 12]} />
          <meshStandardMaterial color="#d7301f" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.37, 0]}>
          <coneGeometry args={[0.05, 0.16, 8]} />
          <meshStandardMaterial color="#3e8e4b" roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function Leaf({ position, rotation, scale = 1 }: { position: Vec3; rotation: Vec3; scale?: number }) {
  return (
    <Float speed={1.2} rotationIntensity={1.2} floatIntensity={1.3} phase={position[0] * 2}>
      <mesh position={position} rotation={rotation} scale={scale}>
        <shapeGeometry args={[leafShape, 12]} />
        <meshStandardMaterial color="#2f7a47" side={THREE.DoubleSide} roughness={0.55} />
      </mesh>
    </Float>
  );
}

const spiceColors = ["#e4572e", "#f2a65a", "#c9441f", "#8a5a41", "#e9b44c"];

function Spices({ count }: { count: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + (i % 3) * 0.4;
        const radius = 2.15 + ((i * 7) % 5) * 0.18;
        return {
          position: [Math.cos(angle) * radius, -0.7 + ((i * 13) % 7) * 0.32, Math.sin(angle) * radius * 0.7] as Vec3,
          size: 0.035 + ((i * 5) % 4) * 0.014,
          color: spiceColors[i % spiceColors.length],
          speed: 1 + (i % 4) * 0.35,
        };
      }),
    [count],
  );
  return (
    <>
      {items.map((s, i) => (
        <Float key={i} speed={s.speed} floatIntensity={1.4} rotationIntensity={0} phase={i * 1.7}>
          <mesh position={s.position}>
            <sphereGeometry args={[s.size, 10, 10]} />
            <meshStandardMaterial color={s.color} roughness={0.7} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Ingredients() {
  return (
    <group>
      <Tomato position={[-2.2, 0.5, 0.5]} scale={0.95} />
      <Tomato position={[2.15, 1.15, -0.7]} scale={0.7} />
      <Lime position={[2.05, -0.35, 1.1]} rotation={[0.6, 0.2, 0.4]} />
      <Chili position={[-1.8, 1.35, -0.9]} rotation={[0.3, 0.5, -0.9]} />
      <Leaf position={[-2.5, -0.6, 0.3]} rotation={[0.2, 0.4, 0.6]} scale={0.9} />
      <Leaf position={[2.4, 0.45, 0.9]} rotation={[-0.3, -0.5, -1.2]} scale={0.7} />
      <Leaf position={[0.5, 1.7, -1.9]} rotation={[0.5, 0.3, 0.3]} scale={0.6} />
      <Spices count={16} />
    </group>
  );
}
