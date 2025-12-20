'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const beamVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const beamFragmentShader = `
uniform float uTime;
varying vec2 vUv;

float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    float n = noise(vec2(vUv.x * 20.0, vUv.y * 5.0 - uTime * 0.5));
    float alpha = smoothstep(0.0, 0.5, vUv.y) * smoothstep(1.0, 0.2, vUv.y);
    float sideFade = smoothstep(0.0, 0.4, vUv.x) * smoothstep(1.0, 0.6, vUv.x);
    vec3 color = mix(vec3(1.0, 0.8, 0.4), vec3(1.0, 1.0, 0.9), n);
    gl_FragColor = vec4(color, alpha * sideFade * (0.3 + n * 0.4));
}
`;

const GodRays = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

    useFrame((state) => {
        if (meshRef.current) {
            uniforms.uTime.value = state.clock.getElapsedTime();
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group>
            <mesh ref={meshRef} position={[0, 0, -2]} rotation={[Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[2, 12, 30, 32, 1, true]} />
                <shaderMaterial 
                    vertexShader={beamVertexShader}
                    fragmentShader={beamFragmentShader}
                    uniforms={uniforms}
                    transparent
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
};

const Particles = () => {
    const count = 500;
    const meshRef = useRef<THREE.InstancedMesh>(null);
    
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 20;
            const z = (Math.random() - 0.5) * 10 - 2;
            const speed = Math.random() * 0.02;
            temp.push({ x, y, z, speed, t: Math.random() * 100 });
        }
        return temp;
    }, []);

    const dummy = new THREE.Object3D();

    useFrame(() => {
        if (!meshRef.current) return;
        particles.forEach((p, i) => {
            p.t += p.speed;
            dummy.position.set(
                p.x + Math.sin(p.t) * 0.5,
                p.y + Math.cos(p.t * 0.8) * 0.5,
                p.z
            );
            const scale = 1.0 + Math.sin(p.t * 2) * 0.3;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
};

const DivineSource = () => (
    <mesh position={[0, 0, -5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color={[10, 8, 6]} toneMapped={false} />
    </mesh>
);

export const Cosmos3D = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: '#050200' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: false }}>
        <color attach="background" args={['#050200']} />
        
        <DivineSource />
        <GodRays />
        <Particles />

        {/* CORRECCIÓN: enableNormalPass={false} */}
        <EffectComposer enableNormalPass={false}>
            <>
                <Bloom luminanceThreshold={0.8} mipmapBlur intensity={2.5} radius={0.8} />
                <Vignette eskil={false} offset={0.2} darkness={0.6} />
            </>
        </EffectComposer>
      </Canvas>
    </div>
  );
};