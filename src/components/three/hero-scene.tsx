"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/** Shared, viewport-normalized cursor position (-1..1 on each axis). */
type MouseRef = React.MutableRefObject<{ x: number; y: number }>;

interface Colors {
  accent: string;
  secondary: string;
}

const lerp = THREE.MathUtils.lerp;

/**
 * Central wireframe core that follows the cursor — it rotates toward it and
 * drifts its position to track it, easing smoothly for a fluid feel.
 */
function Core({ mouse, colors }: { mouse: MouseRef; colors: Colors }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const { x, y } = mouse.current;
    if (group.current) {
      group.current.rotation.x = lerp(group.current.rotation.x, y * 0.4, 0.06);
      group.current.rotation.y = lerp(
        group.current.rotation.y,
        x * 0.7 + state.clock.elapsedTime * 0.1,
        0.06,
      );
      group.current.position.x = lerp(group.current.position.x, x * 1.5, 0.06);
      group.current.position.y = lerp(group.current.position.y, y * 1.0, 0.06);
    }
    if (inner.current) {
      inner.current.rotation.x -= delta * 0.3;
      inner.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshBasicMaterial color={colors.accent} wireframe transparent opacity={0.35} />
      </mesh>
      {/* Solid inner core */}
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color={colors.secondary}
          emissive={colors.accent}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.2}
          flatShading
        />
      </mesh>
    </group>
  );
}

/** Three orbiting luminous rings that lean gently toward the cursor. */
function Rings({ mouse, colors }: { mouse: MouseRef; colors: Colors }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    const { x, y } = mouse.current;
    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x = lerp(group.current.rotation.x, y * 0.25, 0.04);
    group.current.position.x = lerp(group.current.position.x, x * 0.7, 0.05);
    group.current.position.y = lerp(group.current.position.y, y * 0.5, 0.05);
  });
  const configs: { rotation: [number, number, number]; radius: number; color: string }[] = [
    { rotation: [Math.PI / 2.2, 0, 0], radius: 2.6, color: colors.accent },
    { rotation: [Math.PI / 1.6, Math.PI / 4, 0], radius: 3.1, color: colors.secondary },
    { rotation: [Math.PI / 3, -Math.PI / 5, 0], radius: 3.5, color: colors.accent },
  ];
  return (
    <group ref={group}>
      {configs.map((c, i) => (
        <mesh key={i} rotation={c.rotation}>
          <torusGeometry args={[c.radius, 0.008, 16, 120]} />
          <meshBasicMaterial color={c.color} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

/** Drifting particle field with a subtle opposite parallax for depth. */
function Particles({ mouse, color, count = 900 }: { mouse: MouseRef; color: string; count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { x, y } = mouse.current;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x = lerp(
      ref.current.rotation.x,
      Math.sin(state.clock.elapsedTime * 0.1) * 0.1 + y * 0.1,
      0.03,
    );
    ref.current.position.x = lerp(ref.current.position.x, x * -0.5, 0.03);
    ref.current.position.y = lerp(ref.current.position.y, y * -0.35, 0.03);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function SceneContents({ mouse, colors }: { mouse: MouseRef; colors: Colors }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={2.2} color={colors.accent} />
      <pointLight position={[-5, -3, 2]} intensity={1.8} color={colors.secondary} />
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.7}>
        <Core mouse={mouse} colors={colors} />
      </Float>
      <Rings mouse={mouse} colors={colors} />
      <Particles mouse={mouse} color={colors.accent} />
    </>
  );
}

/**
 * Interactive futuristic hero scene. Colors are driven by the active accent
 * palette (passed as props) so the sphere re-tints with the rest of the app.
 * The 3D layer sits under a `pointer-events-none` overlay, so we track the
 * cursor with a global listener and feed it to the scene — the sphere follows
 * the cursor across the whole hero. Kept lightweight (clamped DPR, no
 * post-processing) to preserve high FPS.
 */
export default function HeroScene({
  accent = "#3d7bff",
  secondary = "#a855f7",
}: {
  accent?: string;
  secondary?: string;
}) {
  const mouse = useRef({ x: 0, y: 0 });
  const colors = useMemo<Colors>(() => ({ accent, secondary }), [accent, secondary]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <SceneContents mouse={mouse} colors={colors} />
    </Canvas>
  );
}
