import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

class HeartCurve extends THREE.Curve {
  getPoint(t, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2;
    const x = 16 * Math.sin(angle) ** 3;
    const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);
    return target.set(x * 0.0018, (y + 6) * 0.0018, 0);
  }
}
const heartCurve = new HeartCurve();

function makeShellTextures() {
  const size = 256;
  const canvases = [document.createElement("canvas"), document.createElement("canvas")];
  canvases.forEach((canvas) => { canvas.width = size; canvas.height = size; });
  const contexts = canvases.map((canvas) => canvas.getContext("2d"));
  if (contexts.some((context) => !context)) return null;

  const [colorPixels, bumpPixels] = contexts.map((context) => context.createImageData(size, size));
  for (let i = 0; i < colorPixels.data.length; i += 4) {
    const shade = 217 + Math.floor(Math.random() * 22);
    const bump = 118 + Math.floor(Math.random() * 20);
    colorPixels.data[i] = colorPixels.data[i + 1] = colorPixels.data[i + 2] = shade;
    bumpPixels.data[i] = bumpPixels.data[i + 1] = bumpPixels.data[i + 2] = bump;
    colorPixels.data[i + 3] = bumpPixels.data[i + 3] = 255;
  }
  contexts[0].putImageData(colorPixels, 0, 0);
  contexts[1].putImageData(bumpPixels, 0, 0);
  const [colorMap, bumpMap] = canvases.map((canvas) => new THREE.CanvasTexture(canvas));
  [colorMap, bumpMap].forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 3);
  });
  return { colorMap, bumpMap };
}

function GlassCapsule() {
  const uniforms = useMemo(() => ({
    color: { value: new THREE.Color("#54e8d1") },
    power: { value: 3.8 },
    intensity: { value: 0.72 },
  }), []);
  return (
    <mesh>
      <sphereGeometry args={[0.3, 48, 40, 0, Math.PI * 2, 0, Math.PI]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`varying vec3 vNormal; varying vec3 vViewPosition; void main(){ vec4 mvPosition=modelViewMatrix*vec4(position,1.0); vViewPosition=-mvPosition.xyz; vNormal=normalize(normalMatrix*normal); gl_Position=projectionMatrix*mvPosition; }`}
        fragmentShader={`uniform vec3 color; uniform float power; uniform float intensity; varying vec3 vNormal; varying vec3 vViewPosition; void main(){ vec3 normal=normalize(vNormal); vec3 viewDir=normalize(vViewPosition); float fresnel=pow(1.0-max(dot(viewDir,normal),0.0),power); gl_FragColor=vec4(color,fresnel*intensity); }`}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function Eye({ position, rotation, loved }) {
  const eye = useRef(null);
  const [topPath, bottomPath] = useMemo(() => {
    const w = 0.025, h = 0.035, r = 0.02, gap = 0.005;
    const top = new THREE.CurvePath();
    top.add(new THREE.LineCurve3(new THREE.Vector3(-w, gap, 0), new THREE.Vector3(-w, h - r, 0)));
    top.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, h - r, 0), new THREE.Vector3(-w, h, 0), new THREE.Vector3(-w + r, h, 0)));
    top.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, h, 0), new THREE.Vector3(w - r, h, 0)));
    top.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(w - r, h, 0), new THREE.Vector3(w, h, 0), new THREE.Vector3(w, h - r, 0)));
    top.add(new THREE.LineCurve3(new THREE.Vector3(w, h - r, 0), new THREE.Vector3(w, gap, 0)));
    const bottom = new THREE.CurvePath();
    bottom.add(new THREE.LineCurve3(new THREE.Vector3(-w, -gap, 0), new THREE.Vector3(-w, -(h - r), 0)));
    bottom.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(-w, -(h - r), 0), new THREE.Vector3(-w, -h, 0), new THREE.Vector3(-w + r, -h, 0)));
    bottom.add(new THREE.LineCurve3(new THREE.Vector3(-w + r, -h, 0), new THREE.Vector3(w - r, -h, 0)));
    bottom.add(new THREE.QuadraticBezierCurve3(new THREE.Vector3(w - r, -h, 0), new THREE.Vector3(w, -h, 0), new THREE.Vector3(w, -(h - r), 0)));
    bottom.add(new THREE.LineCurve3(new THREE.Vector3(w, -(h - r), 0), new THREE.Vector3(w, -gap, 0)));
    return [top, bottom];
  }, []);
  useFrame(({ clock }) => {
    if (!eye.current) return;
    const t = clock.getElapsedTime() % 3;
    const blink = t < 0.18 ? Math.max(0.06, 1 - Math.sin((t / 0.18) * Math.PI)) : 1;
    eye.current.scale.y = loved ? 1 : blink;
  });
  return (
    <group position={position} rotation={rotation} ref={eye}>
      {loved ? (
        <mesh>
          <tubeGeometry args={[heartCurve, 64, 0.0035, 8, true]} />
          <meshBasicMaterial color="#ff5575" toneMapped={false} />
        </mesh>
      ) : (
        <group>
          <mesh><tubeGeometry args={[topPath, 20, 0.0035, 8, false]} /><meshBasicMaterial color="#263eae" /></mesh>
          <mesh><tubeGeometry args={[bottomPath, 20, 0.0035, 8, false]} /><meshBasicMaterial color="#263eae" /></mesh>
        </group>
      )}
    </group>
  );
}

function Ear({ side }) {
  return (
    <group position={[side * 0.285, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 0.035, 32]} />
        <meshStandardMaterial color="#f5f2ec" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[side * 0.022, 0, 0]}>
        <torusGeometry args={[0.032, 0.006, 12, 32]} />
        <meshStandardMaterial color="#a6a39d" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[side * 0.023, 0, 0]}>
        <cylinderGeometry args={[0.027, 0.027, 0.009, 32]} />
        <meshStandardMaterial color="#d2d0ca" roughness={0.8} />
      </mesh>
      <group position={[side * 0.015, 0.035, 0]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.006, 0.008, 0.02, 16]} />
          <meshStandardMaterial color="#999999" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.035, 0]}>
          <cylinderGeometry args={[0.003, 0.003, 0.08, 8]} />
          <meshStandardMaterial color="#c7c4bd" metalness={0.4} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.078, 0]}>
          <sphereGeometry args={[0.008, 12, 12]} />
          <meshBasicMaterial color="#3154e8" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Robot() {
  const body = useRef(null);
  const head = useRef(null);
  const [loved, setLoved] = useState(false);
  const [shellTextures, setShellTextures] = useState(null);
  const { viewport } = useThree();
  const shell = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#c9c7c1",
    map: shellTextures?.colorMap,
    bumpMap: shellTextures?.bumpMap,
    bumpScale: 0.002,
    roughness: 0.72,
    metalness: 0.08,
  }), [shellTextures]);

  useEffect(() => {
    const textures = makeShellTextures();
    if (textures) setShellTextures(textures);
    return () => {
      textures?.colorMap.dispose();
      textures?.bumpMap.dispose();
    };
  }, []);

  useEffect(() => {
    if (!loved) return;
    const timer = window.setTimeout(() => setLoved(false), 1800);
    return () => window.clearTimeout(timer);
  }, [loved]);

  useFrame((state, delta) => {
    if (!body.current || !head.current) return;
    const dt = Math.min(delta, 0.1);
    const x = state.pointer.x;
    const y = state.pointer.y;
    const targetX = x * Math.min(0.24, viewport.width * 0.08);
    body.current.position.x = THREE.MathUtils.damp(body.current.position.x, targetX, 1.3, dt);
    body.current.rotation.y = THREE.MathUtils.damp(body.current.rotation.y, -x * 0.4, 2.3, dt);
    body.current.rotation.x = THREE.MathUtils.damp(body.current.rotation.x, -y * 0.12, 2.3, dt);
    head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, x * 0.58, 3, dt);
    head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -y * 0.2, 3, dt);
  });

  return (
    <group ref={body} position={[0, -0.22, 0]} onClick={(event) => { event.stopPropagation(); setLoved(true); }}>
      <mesh castShadow receiveShadow material={shell}>
        <sphereGeometry args={[0.43, 48, 40, 0, Math.PI * 2, Math.PI * 0.15, Math.PI * 0.85]} />
      </mesh>
      <mesh position={[0, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow material={shell}>
        <torusGeometry args={[0.22, 0.014, 16, 48]} />
      </mesh>
      <mesh position={[0, 0.35, 0]} castShadow material={shell}>
        <latheGeometry args={[[
          new THREE.Vector2(0.24, 0), new THREE.Vector2(0.25, 0.015),
          new THREE.Vector2(0.22, 0.045), new THREE.Vector2(0.22, 0.09),
          new THREE.Vector2(0.25, 0.12), new THREE.Vector2(0.24, 0.14),
        ], 48]} />
      </mesh>
      <group ref={head} position={[0, 0.61, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.29, 48, 40]} />
          <meshStandardMaterial color="#17191d" roughness={0.9} />
        </mesh>
        <GlassCapsule />
        <group position={[0, -0.025, 0.282]}>
          <Eye position={[-0.055, 0, 0]} rotation={[0, -0.2, 0]} loved={loved} />
          <Eye position={[0.055, 0, 0]} rotation={[0, 0.2, 0]} loved={loved} />
        </group>
        <Ear side={-1} /><Ear side={1} />
      </group>
    </group>
  );
}

export default function RobotModel() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Canvas
        frameloop={inView ? "always" : "never"}
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.28, 3.1], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        aria-label="A small interactive robot that follows the pointer and blinks"
      >
        <ambientLight intensity={1.25} color="#fffaf0" />
        <directionalLight position={[-2, 4, 4]} intensity={2.1} color="#ffffff" castShadow shadow-mapSize={[512, 512]} />
        <pointLight position={[2, 1.8, 1.5]} intensity={10} distance={4} color="#95dff0" />
        <Environment preset="studio" />
        <Robot />
        <ContactShadows position={[0, -0.66, 0]} opacity={0.26} scale={1.8} blur={2.5} far={2} />
      </Canvas>
    </div>
  );
}
