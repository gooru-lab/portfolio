import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const state = {
  stage: null,
  canvas: null,
  caption: null,
  renderer: null,
  composer: null,
  scene: null,
  camera: null,
  cube: null,
  group: null,
  floor: null,
  satellites: [],
  particles: null,
  ring: null,
  envMap: null,
  raf: 0,
  reduced: false,
  pointer: { x: 0, y: 0 },
  faceIndex: 0,
  lastFace: -1,
  clockStart: 0,
  faces: [
    { title: "POS", hint: "POS · 1C" },
    { title: "API / bot", hint: "Telegram · FastAPI" },
    { title: "Docker", hint: "Compose · VPS" },
    { title: "Admin", hint: "React · ERP" },
    { title: "Monitor", hint: "Prometheus · Grafana" },
    { title: "gooru", hint: "Full production contour" },
  ],
};

function css(name, fallback) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function parseHex(hex, fallback) {
  try {
    return new THREE.Color(hex || fallback);
  } catch {
    return new THREE.Color(fallback);
  }
}

function isDarkTheme() {
  return (document.documentElement.getAttribute("data-theme") || "dark") !== "light";
}

function makeFaceTexture(title, hint, accentHex, dark) {
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d");

  // brushed metal base
  const base = ctx.createLinearGradient(0, 0, size, size);
  if (dark) {
    base.addColorStop(0, "#1a1f28");
    base.addColorStop(0.45, "#12161d");
    base.addColorStop(1, "#0d1015");
  } else {
    base.addColorStop(0, "#f4f6f8");
    base.addColorStop(0.5, "#e8ecef");
    base.addColorStop(1, "#d9dee4");
  }
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, size, size);

  // brushed lines
  ctx.globalAlpha = dark ? 0.08 : 0.12;
  ctx.strokeStyle = dark ? "#ffffff" : "#000000";
  ctx.lineWidth = 1;
  for (let i = 0; i < size; i += 3) {
    ctx.beginPath();
    ctx.moveTo(0, i + (Math.random() * 2 - 1));
    ctx.lineTo(size, i + (Math.random() * 2 - 1));
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // soft vignette
  const vig = ctx.createRadialGradient(size / 2, size / 2, size * 0.2, size / 2, size / 2, size * 0.72);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, dark ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.12)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, size, size);

  // inset panel
  const pad = 70;
  ctx.fillStyle = dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.45)";
  roundRect(ctx, pad, pad, size - pad * 2, size - pad * 2, 48);
  ctx.fill();
  ctx.strokeStyle = accentHex;
  ctx.lineWidth = 5;
  ctx.stroke();

  // inner glow edge
  ctx.strokeStyle = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  ctx.lineWidth = 2;
  roundRect(ctx, pad + 14, pad + 14, size - (pad + 14) * 2, size - (pad + 14) * 2, 36);
  ctx.stroke();

  // accent chip
  ctx.fillStyle = accentHex;
  roundRect(ctx, size / 2 - 54, 120, 108, 10, 6);
  ctx.fill();

  // title
  ctx.fillStyle = accentHex;
  ctx.font = "700 92px Sora, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = accentHex;
  ctx.shadowBlur = dark ? 28 : 8;
  ctx.fillText(title, size / 2, size / 2 - 10);
  ctx.shadowBlur = 0;

  // hint
  ctx.fillStyle = dark ? "rgba(230,235,240,0.78)" : "rgba(30,35,40,0.72)";
  ctx.font = "600 36px Sora, sans-serif";
  ctx.fillText(hint, size / 2, size / 2 + 78);

  // micro label
  ctx.globalAlpha = 0.45;
  ctx.font = "600 22px Sora, sans-serif";
  ctx.fillText("PRODUCTION NODE", size / 2, size - 120);
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function buildMaterials() {
  const accent = css("--accent", "#e2b13c");
  const dark = isDarkTheme();
  // Box / RoundedBox material order: +x -x +y -y +z -z
  const order = [1, 3, 4, 5, 0, 2];
  return order.map((idx) => {
    const f = state.faces[idx];
    return new THREE.MeshPhysicalMaterial({
      map: makeFaceTexture(f.title, f.hint, accent, dark),
      metalness: dark ? 0.85 : 0.35,
      roughness: dark ? 0.22 : 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: dark ? 1.35 : 0.9,
      reflectivity: 1,
    });
  });
}

function disposeMaterials(mats) {
  const list = Array.isArray(mats) ? mats : [mats];
  list.forEach((m) => {
    if (m?.map) m.map.dispose();
    m?.dispose?.();
  });
}

function rebuildMaterials() {
  if (!state.cube) return;
  const old = state.cube.material;
  state.cube.material = buildMaterials();
  disposeMaterials(old);
  const accent = parseHex(css("--accent", "#e2b13c"), "#e2b13c");
  if (state.ring?.material) state.ring.material.color.copy(accent);
  state.satellites.forEach((s) => {
    if (s.material) {
      s.material.color.copy(accent);
      if ("emissive" in s.material) s.material.emissive.copy(accent);
    }
  });
  if (state.particles?.material) state.particles.material.color.copy(accent);
}

function syncCaption() {
  if (!state.caption) return;
  const f = state.faces[state.faceIndex] || state.faces[0];
  state.caption.innerHTML = `<strong>${f.title}</strong><span>${f.hint}</span>`;
}

function pickFaceFromTime(t) {
  state.faceIndex = Math.floor(t / 1.75) % state.faces.length;
  if (state.faceIndex !== state.lastFace) {
    state.lastFace = state.faceIndex;
    syncCaption();
  }
}

function buildScene() {
  const { canvas, stage } = state;
  const accent = parseHex(css("--accent", "#e2b13c"), "#e2b13c");
  const dark = isDarkTheme();

  state.scene = new THREE.Scene();
  state.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  state.camera.position.set(0, 0.55, 5.4);

  state.renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  state.renderer.outputColorSpace = THREE.SRGBColorSpace;
  state.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  state.renderer.toneMappingExposure = dark ? 1.15 : 1.05;
  state.renderer.shadowMap.enabled = true;
  state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const pmrem = new THREE.PMREMGenerator(state.renderer);
  state.envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  state.scene.environment = state.envMap;

  // lights
  state.scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.25 : 0.45));
  const key = new THREE.DirectionalLight(0xffffff, dark ? 1.6 : 1.25);
  key.position.set(4.2, 6.2, 3.4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 20;
  key.shadow.radius = 4;
  state.scene.add(key);

  const rim = new THREE.SpotLight(accent, dark ? 2.2 : 1.4, 18, Math.PI / 5, 0.4, 1);
  rim.position.set(-3.5, 3.2, -2.5);
  rim.castShadow = true;
  state.scene.add(rim);

  const fill = new THREE.PointLight(accent, dark ? 0.85 : 0.45, 14);
  fill.position.set(2.2, -1.2, 3);
  state.scene.add(fill);

  state.group = new THREE.Group();
  state.scene.add(state.group);

  const geo = new RoundedBoxGeometry(1.7, 1.7, 1.7, 6, 0.14);
  state.cube = new THREE.Mesh(geo, buildMaterials());
  state.cube.castShadow = true;
  state.cube.receiveShadow = true;
  state.cube.rotation.set(0.42, -0.62, 0.1);
  state.group.add(state.cube);

  // thin chrome frame
  const frame = new THREE.Mesh(
    new RoundedBoxGeometry(1.78, 1.78, 1.78, 4, 0.12),
    new THREE.MeshPhysicalMaterial({
      color: accent,
      metalness: 1,
      roughness: 0.15,
      transparent: true,
      opacity: 0.18,
      clearcoat: 1,
      side: THREE.BackSide,
    })
  );
  state.cube.add(frame);

  // ground shadow catcher
  state.floor = new THREE.Mesh(
    new THREE.CircleGeometry(2.6, 64),
    new THREE.ShadowMaterial({ opacity: dark ? 0.45 : 0.22 })
  );
  state.floor.rotation.x = -Math.PI / 2;
  state.floor.position.y = -1.35;
  state.floor.receiveShadow = true;
  state.group.add(state.floor);

  // reflective disc
  const disc = new THREE.Mesh(
    new THREE.CircleGeometry(2.1, 64),
    new THREE.MeshPhysicalMaterial({
      color: dark ? 0x0b0d10 : 0xf0f2f4,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: dark ? 0.35 : 0.5,
      envMapIntensity: 1.2,
    })
  );
  disc.rotation.x = -Math.PI / 2;
  disc.position.y = -1.34;
  state.group.add(disc);

  // orbit ring
  state.ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.25, 0.012, 16, 160),
    new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.4 })
  );
  state.ring.rotation.x = Math.PI / 2.35;
  state.group.add(state.ring);

  // satellites
  state.satellites = [];
  for (let i = 0; i < 5; i++) {
    const sat = new THREE.Mesh(
      new RoundedBoxGeometry(0.2, 0.2, 0.2, 2, 0.04),
      new THREE.MeshPhysicalMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.35,
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 1,
      })
    );
    sat.castShadow = true;
    sat.userData.angle = (i / 5) * Math.PI * 2;
    sat.userData.radius = 2.15 + (i % 2) * 0.22;
    sat.userData.speed = 0.32 + i * 0.05;
    state.satellites.push(sat);
    state.group.add(sat);
  }

  // dust particles
  const count = state.reduced ? 60 : 220;
  const positions = new Float32Array(count * 3);
  for (let p = 0; p < count; p++) {
    positions[p * 3] = (Math.random() - 0.5) * 8;
    positions[p * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[p * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  state.particles = new THREE.Points(
    pgeo,
    new THREE.PointsMaterial({
      color: accent,
      size: 0.028,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  state.scene.add(state.particles);

  // bloom composer
  const size = new THREE.Vector2(stage.clientWidth || 500, stage.clientHeight || 500);
  state.composer = new EffectComposer(state.renderer);
  state.composer.addPass(new RenderPass(state.scene, state.camera));
  const bloom = new UnrealBloomPass(size, dark ? 0.45 : 0.28, 0.7, 0.85);
  state.composer.addPass(bloom);

  syncCaption();
  onResize();
}

function onResize() {
  if (!state.stage || !state.renderer || !state.camera) return;
  const rect = state.stage.getBoundingClientRect();
  const w = Math.max(280, Math.floor(rect.width));
  const h = Math.max(280, Math.floor(rect.height));
  state.renderer.setSize(w, h, false);
  state.composer?.setSize(w, h);
  state.camera.aspect = w / h;
  state.camera.updateProjectionMatrix();
}

function animate(ts) {
  if (!state.composer) return;
  if (!state.clockStart) state.clockStart = ts;
  const t = (ts - state.clockStart) / 1000;

  if (!state.reduced && state.cube) {
    state.cube.rotation.y += 0.0038;
    state.cube.rotation.x += 0.0009;

    state.camera.position.x += (state.pointer.x * 0.7 - state.camera.position.x) * 0.045;
    state.camera.position.y += (0.55 + state.pointer.y * 0.4 - state.camera.position.y) * 0.045;
    state.camera.lookAt(0, -0.1, 0);

    if (state.ring) {
      state.ring.rotation.z = t * 0.22;
      state.ring.rotation.x = Math.PI / 2.35 + Math.sin(t * 0.35) * 0.06;
    }

    state.satellites.forEach((sat) => {
      sat.userData.angle += sat.userData.speed * 0.01;
      sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
      sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
      sat.position.y = Math.sin(sat.userData.angle * 1.8 + t) * 0.42;
      sat.rotation.x += 0.025;
      sat.rotation.y += 0.03;
    });

    if (state.particles) {
      state.particles.rotation.y = t * 0.04;
    }

    // subtle float
    state.group.position.y = Math.sin(t * 0.9) * 0.06;
    pickFaceFromTime(t);
  } else {
    pickFaceFromTime(0);
  }

  state.composer.render();
  state.raf = requestAnimationFrame(animate);
}

function onPointer(e) {
  const rect = state.stage.getBoundingClientRect();
  const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  state.pointer.x = Math.max(-1, Math.min(1, nx));
  state.pointer.y = Math.max(-1, Math.min(1, -ny));
}

function start() {
  state.stage = document.getElementById("hero-stage");
  state.canvas = document.getElementById("hero-canvas");
  state.caption = document.getElementById("hero-face-caption");
  if (!state.stage || !state.canvas) return;

  state.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  buildScene();
  if (state.raf) cancelAnimationFrame(state.raf);
  state.raf = requestAnimationFrame(animate);

  window.addEventListener("resize", onResize);
  state.stage.addEventListener("pointermove", onPointer);
  state.stage.addEventListener("pointerleave", () => {
    state.pointer.x = 0;
    state.pointer.y = 0;
  });

  new MutationObserver(() => {
    const dark = isDarkTheme();
    if (state.renderer) state.renderer.toneMappingExposure = dark ? 1.15 : 1.05;
    rebuildMaterials();
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
}

window.GooruContour = {
  setLabels(payload) {
    if (!payload?.nodes || payload.nodes.length < 5) return;
    state.faces = [
      ...payload.nodes.slice(0, 5).map((n) => ({ title: n.label, hint: n.hint })),
      { title: "gooru", hint: "Full production contour" },
    ];
    rebuildMaterials();
    syncCaption();
  },
  restart() {
    rebuildMaterials();
  },
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
