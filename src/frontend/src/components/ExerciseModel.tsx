import { AnimationType } from "@/types";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { type CSSProperties, useMemo, useRef } from "react";
import * as THREE from "three";

// ─── Animation helpers ────────────────────────────────────────────────────────
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─── Skeleton mesh refs ───────────────────────────────────────────────────────
interface FigureRefs {
  torso: React.RefObject<THREE.Mesh | null>;
  head: React.RefObject<THREE.Mesh | null>;
  upperArmL: React.RefObject<THREE.Mesh | null>;
  upperArmR: React.RefObject<THREE.Mesh | null>;
  foreArmL: React.RefObject<THREE.Mesh | null>;
  foreArmR: React.RefObject<THREE.Mesh | null>;
  upperLegL: React.RefObject<THREE.Mesh | null>;
  upperLegR: React.RefObject<THREE.Mesh | null>;
  lowerLegL: React.RefObject<THREE.Mesh | null>;
  lowerLegR: React.RefObject<THREE.Mesh | null>;
  root: React.RefObject<THREE.Group | null>;
}

// ─── Colour palette (matches design tokens) ──────────────────────────────────
const BODY_COLOR = new THREE.Color(0x9d7af0); // primary violet
const LIMB_COLOR = new THREE.Color(0xc4a6f7);
const JOINT_COLOR = new THREE.Color(0xe97833); // secondary orange accent

// ─── Shared materials (created once) ─────────────────────────────────────────
const bodyMat = new THREE.MeshStandardMaterial({
  color: BODY_COLOR,
  roughness: 0.4,
  metalness: 0.1,
});
const limbMat = new THREE.MeshStandardMaterial({
  color: LIMB_COLOR,
  roughness: 0.5,
  metalness: 0.05,
});
const jointMat = new THREE.MeshStandardMaterial({
  color: JOINT_COLOR,
  roughness: 0.3,
  metalness: 0.2,
  emissive: JOINT_COLOR,
  emissiveIntensity: 0.15,
});

// ─── Geometry constants ───────────────────────────────────────────────────────
const HEAD_GEO = new THREE.SphereGeometry(0.18, 16, 16);
const TORSO_GEO = new THREE.CapsuleGeometry(0.14, 0.44, 8, 16);
const UPPER_ARM_GEO = new THREE.CapsuleGeometry(0.055, 0.3, 6, 12);
const FORE_ARM_GEO = new THREE.CapsuleGeometry(0.045, 0.26, 6, 12);
const UPPER_LEG_GEO = new THREE.CapsuleGeometry(0.07, 0.34, 6, 12);
const LOWER_LEG_GEO = new THREE.CapsuleGeometry(0.055, 0.32, 6, 12);
const JOINT_GEO = new THREE.SphereGeometry(0.07, 8, 8);

// ─── Human figure component ───────────────────────────────────────────────────
function HumanFigure({ animationType }: { animationType: AnimationType }) {
  const root = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Mesh>(null);
  const head = useRef<THREE.Mesh>(null);
  const upperArmL = useRef<THREE.Mesh>(null);
  const upperArmR = useRef<THREE.Mesh>(null);
  const foreArmL = useRef<THREE.Mesh>(null);
  const foreArmR = useRef<THREE.Mesh>(null);
  const upperLegL = useRef<THREE.Mesh>(null);
  const upperLegR = useRef<THREE.Mesh>(null);
  const lowerLegL = useRef<THREE.Mesh>(null);
  const lowerLegR = useRef<THREE.Mesh>(null);

  const refs: FigureRefs = {
    torso,
    head,
    upperArmL,
    upperArmR,
    foreArmL,
    foreArmR,
    upperLegL,
    upperLegR,
    lowerLegL,
    lowerLegR,
    root,
  };

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    applyAnimation(refs, animationType, t);
  });

  return (
    <group ref={root} position={[0, 0, 0]}>
      {/* Head */}
      <mesh
        ref={head}
        geometry={HEAD_GEO}
        material={bodyMat}
        position={[0, 1.22, 0]}
      />

      {/* Neck joint */}
      <mesh geometry={JOINT_GEO} material={jointMat} position={[0, 1.04, 0]} />

      {/* Torso */}
      <mesh
        ref={torso}
        geometry={TORSO_GEO}
        material={bodyMat}
        position={[0, 0.7, 0]}
      />

      {/* Shoulder joints */}
      <mesh
        geometry={JOINT_GEO}
        material={jointMat}
        position={[-0.22, 0.92, 0]}
      />
      <mesh
        geometry={JOINT_GEO}
        material={jointMat}
        position={[0.22, 0.92, 0]}
      />

      {/* Left arm */}
      <mesh
        ref={upperArmL}
        geometry={UPPER_ARM_GEO}
        material={limbMat}
        position={[-0.28, 0.72, 0]}
        rotation={[0, 0, 0.3]}
      />
      <mesh
        ref={foreArmL}
        geometry={FORE_ARM_GEO}
        material={limbMat}
        position={[-0.38, 0.42, 0]}
        rotation={[0, 0, 0.2]}
      />

      {/* Right arm */}
      <mesh
        ref={upperArmR}
        geometry={UPPER_ARM_GEO}
        material={limbMat}
        position={[0.28, 0.72, 0]}
        rotation={[0, 0, -0.3]}
      />
      <mesh
        ref={foreArmR}
        geometry={FORE_ARM_GEO}
        material={limbMat}
        position={[0.38, 0.42, 0]}
        rotation={[0, 0, -0.2]}
      />

      {/* Hip joints */}
      <mesh
        geometry={JOINT_GEO}
        material={jointMat}
        position={[-0.12, 0.46, 0]}
      />
      <mesh
        geometry={JOINT_GEO}
        material={jointMat}
        position={[0.12, 0.46, 0]}
      />

      {/* Left leg */}
      <mesh
        ref={upperLegL}
        geometry={UPPER_LEG_GEO}
        material={limbMat}
        position={[-0.13, 0.12, 0]}
      />
      <mesh
        ref={lowerLegL}
        geometry={LOWER_LEG_GEO}
        material={limbMat}
        position={[-0.13, -0.26, 0]}
      />

      {/* Right leg */}
      <mesh
        ref={upperLegR}
        geometry={UPPER_LEG_GEO}
        material={limbMat}
        position={[0.13, 0.12, 0]}
      />
      <mesh
        ref={lowerLegR}
        geometry={LOWER_LEG_GEO}
        material={limbMat}
        position={[0.13, -0.26, 0]}
      />

      {/* Knee joints */}
      <mesh
        geometry={JOINT_GEO}
        material={jointMat}
        position={[-0.13, -0.08, 0]}
      />
      <mesh
        geometry={JOINT_GEO}
        material={jointMat}
        position={[0.13, -0.08, 0]}
      />

      {/* Foot joints */}
      <mesh
        geometry={JOINT_GEO}
        material={jointMat}
        position={[-0.13, -0.44, 0]}
      />
      <mesh
        geometry={JOINT_GEO}
        material={jointMat}
        position={[0.13, -0.44, 0]}
      />
    </group>
  );
}

// ─── Animation logic ──────────────────────────────────────────────────────────
function applyAnimation(refs: FigureRefs, type: AnimationType, t: number) {
  const {
    root,
    head,
    torso,
    upperArmL,
    upperArmR,
    foreArmL,
    foreArmR,
    upperLegL,
    upperLegR,
    lowerLegL,
    lowerLegR,
  } = refs;

  // Reset each frame
  const meshes = [
    head,
    torso,
    upperArmL,
    upperArmR,
    foreArmL,
    foreArmR,
    upperLegL,
    upperLegR,
    lowerLegL,
    lowerLegR,
  ];
  for (const m of meshes) {
    if (m.current) {
      m.current.rotation.set(0, 0, 0);
    }
  }
  if (root.current) {
    root.current.position.set(0, 0, 0);
    root.current.rotation.set(0, 0, 0);
  }

  const cycle = (t * 0.9) % (Math.PI * 2);
  const s = Math.sin(cycle);
  const ease = easeInOut((Math.sin(cycle) + 1) / 2);

  switch (type) {
    case AnimationType.pushUp: {
      // Figure is horizontal, pushes up and down
      if (root.current) root.current.rotation.x = -Math.PI / 2 + 0.1;
      const lift = ease * 0.35;
      if (root.current) root.current.position.y = lift - 0.5;
      if (upperArmL.current) upperArmL.current.rotation.x = -0.4 + ease * 0.6;
      if (upperArmR.current) upperArmR.current.rotation.x = -0.4 + ease * 0.6;
      if (foreArmL.current) foreArmL.current.rotation.x = ease * 0.8;
      if (foreArmR.current) foreArmR.current.rotation.x = ease * 0.8;
      break;
    }
    case AnimationType.pullUp: {
      // Arms overhead, body bobs up
      const pullEase = ease;
      if (root.current) root.current.position.y = pullEase * 0.4;
      if (upperArmL.current)
        upperArmL.current.rotation.z = Math.PI / 2 + 0.3 - pullEase * 0.4;
      if (upperArmR.current)
        upperArmR.current.rotation.z = -(Math.PI / 2 + 0.3 - pullEase * 0.4);
      if (upperArmL.current) upperArmL.current.rotation.x = -0.3;
      if (upperArmR.current) upperArmR.current.rotation.x = -0.3;
      if (foreArmL.current) foreArmL.current.rotation.z = 0.5 - pullEase * 0.5;
      if (foreArmR.current)
        foreArmR.current.rotation.z = -(0.5 - pullEase * 0.5);
      if (lowerLegL.current) lowerLegL.current.rotation.x = 0.4;
      if (lowerLegR.current) lowerLegR.current.rotation.x = 0.4;
      break;
    }
    case AnimationType.squat: {
      const squatDepth = ease;
      if (root.current) root.current.position.y = -squatDepth * 0.5;
      if (upperLegL.current) upperLegL.current.rotation.x = squatDepth * 1.0;
      if (upperLegR.current) upperLegR.current.rotation.x = squatDepth * 1.0;
      if (lowerLegL.current) lowerLegL.current.rotation.x = -squatDepth * 1.2;
      if (lowerLegR.current) lowerLegR.current.rotation.x = -squatDepth * 1.2;
      if (torso.current) torso.current.rotation.x = squatDepth * 0.2;
      if (upperArmL.current)
        upperArmL.current.rotation.z = 0.3 + squatDepth * 0.3;
      if (upperArmR.current)
        upperArmR.current.rotation.z = -(0.3 + squatDepth * 0.3);
      break;
    }
    case AnimationType.plank: {
      // Horizontal hold, subtle breathing
      if (root.current) root.current.rotation.x = -Math.PI / 2 + 0.05;
      if (root.current)
        root.current.position.y = -0.3 + Math.sin(t * 0.6) * 0.01;
      if (upperArmL.current) upperArmL.current.rotation.x = 0.3;
      if (upperArmR.current) upperArmR.current.rotation.x = 0.3;
      break;
    }
    case AnimationType.lunge: {
      const lungePhase = ease;
      if (upperLegL.current) upperLegL.current.rotation.x = -lungePhase * 0.9;
      if (lowerLegL.current) lowerLegL.current.rotation.x = lungePhase * 1.0;
      if (upperLegR.current) upperLegR.current.rotation.x = lungePhase * 0.7;
      if (lowerLegR.current) lowerLegR.current.rotation.x = -lungePhase * 0.4;
      if (root.current) root.current.position.y = -lungePhase * 0.2;
      if (upperArmL.current)
        upperArmL.current.rotation.z = 0.3 + lungePhase * 0.3;
      if (upperArmR.current)
        upperArmR.current.rotation.z = -(0.3 - lungePhase * 0.3);
      break;
    }
    case AnimationType.dip: {
      const dipEase = ease;
      if (root.current) root.current.position.y = -dipEase * 0.4;
      if (upperArmL.current) upperArmL.current.rotation.z = Math.PI / 3;
      if (upperArmR.current) upperArmR.current.rotation.z = -Math.PI / 3;
      if (foreArmL.current) foreArmL.current.rotation.x = dipEase * 1.0;
      if (foreArmR.current) foreArmR.current.rotation.x = dipEase * 1.0;
      if (lowerLegL.current) lowerLegL.current.rotation.x = 0.3;
      if (lowerLegR.current) lowerLegR.current.rotation.x = 0.3;
      break;
    }
    case AnimationType.crunch: {
      const crunchEase = ease;
      if (root.current) root.current.rotation.x = -Math.PI / 2 + 0.2;
      if (torso.current) torso.current.rotation.x = -crunchEase * 0.8;
      if (upperLegL.current) upperLegL.current.rotation.x = crunchEase * 1.0;
      if (upperLegR.current) upperLegR.current.rotation.x = crunchEase * 1.0;
      if (lowerLegL.current) lowerLegL.current.rotation.x = crunchEase * 0.6;
      if (lowerLegR.current) lowerLegR.current.rotation.x = crunchEase * 0.6;
      if (upperArmL.current) upperArmL.current.rotation.z = Math.PI / 4;
      if (upperArmR.current) upperArmR.current.rotation.z = -Math.PI / 4;
      break;
    }
    case AnimationType.jumpingJack: {
      const jackAmp = ease;
      if (upperArmL.current) upperArmL.current.rotation.z = 0.3 + jackAmp * 1.2;
      if (upperArmR.current)
        upperArmR.current.rotation.z = -(0.3 + jackAmp * 1.2);
      if (upperLegL.current) upperLegL.current.rotation.z = jackAmp * 0.7;
      if (upperLegR.current) upperLegR.current.rotation.z = -jackAmp * 0.7;
      if (root.current) root.current.position.y = jackAmp * 0.12;
      break;
    }
    case AnimationType.burpee: {
      // 4-phase: stand → squat → plank → jump
      const phase = (t * 0.4) % 4;
      if (phase < 1) {
        // stand
      } else if (phase < 2) {
        const p = phase - 1;
        if (root.current) root.current.position.y = -p * 0.5;
        if (upperLegL.current) upperLegL.current.rotation.x = p * 1.0;
        if (upperLegR.current) upperLegR.current.rotation.x = p * 1.0;
      } else if (phase < 3) {
        if (root.current) {
          root.current.rotation.x = (-(phase - 2) * Math.PI) / 2;
          root.current.position.y = -0.5;
        }
      } else {
        const p = phase - 3;
        if (root.current) root.current.position.y = p * 0.5;
        if (upperArmL.current) upperArmL.current.rotation.z = 0.3 + p * 0.8;
        if (upperArmR.current) upperArmR.current.rotation.z = -(0.3 + p * 0.8);
      }
      break;
    }
    case AnimationType.mountainClimber: {
      if (root.current) root.current.rotation.x = -Math.PI / 2 + 0.15;
      if (root.current) root.current.position.y = -0.4;
      const alternate = s > 0;
      if (upperLegL.current)
        upperLegL.current.rotation.x = alternate ? -0.8 : 0.2;
      if (upperLegR.current)
        upperLegR.current.rotation.x = alternate ? 0.2 : -0.8;
      if (lowerLegL.current) lowerLegL.current.rotation.x = alternate ? 0.6 : 0;
      if (lowerLegR.current) lowerLegR.current.rotation.x = alternate ? 0 : 0.6;
      if (upperArmL.current) upperArmL.current.rotation.x = 0.4;
      if (upperArmR.current) upperArmR.current.rotation.x = 0.4;
      break;
    }
    default: {
      // generic: arm swing walk
      if (upperArmL.current) upperArmL.current.rotation.x = s * 0.5;
      if (upperArmR.current) upperArmR.current.rotation.x = -s * 0.5;
      if (upperLegL.current) upperLegL.current.rotation.x = -s * 0.4;
      if (upperLegR.current) upperLegR.current.rotation.x = s * 0.4;
      if (root.current) root.current.position.y = Math.abs(s) * 0.04;
    }
  }
}

// ─── Grid floor ───────────────────────────────────────────────────────────────
function GridFloor() {
  return (
    <gridHelper args={[6, 20, "#3a2a6a", "#1e1340"]} position={[0, -0.55, 0]} />
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({ animationType }: { animationType: AnimationType }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 4]} intensity={1.2} castShadow />
      <directionalLight
        position={[-4, 2, -2]}
        intensity={0.3}
        color={new THREE.Color(0x9d7af0)}
      />
      <pointLight
        position={[0, 3, 3]}
        intensity={0.6}
        color={new THREE.Color(0xe97833)}
        distance={8}
      />
      <GridFloor />
      <HumanFigure animationType={animationType} />
    </>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
interface ExerciseModelProps {
  animationType: AnimationType;
  className?: string;
  style?: CSSProperties;
}

export default function ExerciseModel({
  animationType,
  className = "",
  style,
}: ExerciseModelProps) {
  const cameraPos = useMemo<[number, number, number]>(() => {
    const flat = [
      AnimationType.pushUp,
      AnimationType.plank,
      AnimationType.crunch,
      AnimationType.mountainClimber,
    ];
    return flat.includes(animationType) ? [2.5, 1.2, 2.5] : [0, 0.6, 3.2];
  }, [animationType]);

  return (
    <div
      className={`w-full rounded-xl overflow-hidden border border-border ${className}`}
      style={{ background: "oklch(0.1 0 0)", ...style }}
    >
      <Canvas
        camera={{ position: cameraPos, fov: 50 }}
        shadows
        gl={{ antialias: true }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <Scene animationType={animationType} />
        <OrbitControls
          enablePan={false}
          minDistance={1.5}
          maxDistance={6}
          target={[0, 0.4, 0]}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
