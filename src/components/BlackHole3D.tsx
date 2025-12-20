'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- SHADERS ---

const vertexShader = `
varying vec2 vUv;
varying vec3 vPos;
void main() {
  vUv = uv;
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShaderDisk = `
uniform float uTime;
varying vec2 vUv;

// Simplex Noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1; i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv - 0.5;
  float r = length(uv) * 2.0;
  float angle = atan(uv.y, uv.x);

  float noiseVal = snoise(vec2(r * 8.0 - uTime * 1.5, angle * 4.0 + uTime * 0.5));
  float noiseVal2 = snoise(vec2(r * 15.0 + uTime, angle * 10.0));
  
  vec3 colorCore = vec3(1.0, 0.9, 0.7); 
  vec3 colorMid = vec3(1.0, 0.3, 0.05); 
  vec3 colorEdge = vec3(0.5, 0.0, 0.0); 
  
  vec3 color = mix(colorCore, colorMid, r * 1.2);
  color = mix(color, colorEdge, r * r * 2.0);
  
  float intensity = 1.0 + noiseVal * 0.5 + noiseVal2 * 0.2;
  float alpha = smoothstep(0.3, 0.45, r) * smoothstep(1.0, 0.8, r);
  
  gl_FragColor = vec4(color * intensity * 4.0, alpha); 
}
`;

const AccretionDisk = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.uTime.value = state.clock.getElapsedTime();
      meshRef.current.rotation.z -= 0.002;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2.3, 0, 0]}>
      <ringGeometry args={[3.0, 8.0, 256, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShaderDisk}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
};

const GravitationalLens = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

    useFrame((state) => {
        if (meshRef.current) {
            uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -1]}> 
            <ringGeometry args={[3.1, 7.5, 128]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShaderDisk}
                uniforms={uniforms}
                transparent
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </mesh>
    );
};

const EventHorizon = () => (
    <mesh>
        <sphereGeometry args={[2.95, 64, 64]} />
        <meshBasicMaterial color="#000000" />
    </mesh>
);

const PhotonRing = () => (
    <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[2.96, 3.05, 128]} />
        <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </mesh>
);

export const BlackHole3D = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: -1, background: 'black' }}>
      <Canvas camera={{ position: [0, 0, 16], fov: 35 }} gl={{ antialias: false }}>
        <color attach="background" args={['#000000']} />
        
        <Stars radius={200} depth={50} count={6000} factor={4} saturation={0} fade speed={0.2} />

        <group position={[0, 0, 0]}>
            <AccretionDisk />
            <EventHorizon />
            <PhotonRing />
            <GravitationalLens />
        </group>

        {/* CORRECCIÓN: enableNormalPass={false} en lugar de disableNormalPass */}
        <EffectComposer enableNormalPass={false}>
            <>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} radius={0.6} />
                <Noise opacity={0.05} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </>
        </EffectComposer>
      </Canvas>
    </div>
  );
};