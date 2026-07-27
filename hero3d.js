(function () {
  "use strict";

  var stage, canvas, caption, renderer, scene, camera, cube, group, ring, particles;
  var satellites = [];
  var raf = 0;
  var reduced = false;
  var pointer = { x: 0, y: 0 };
  var faceIndex = 0;
  var lastFace = -1;
  var clockStart = 0;
  var envMap = null;

  var faces = [
    { title: "POS", hint: "POS · 1C" },
    { title: "API / bot", hint: "Telegram · FastAPI" },
    { title: "Docker", hint: "Compose · VPS" },
    { title: "Admin", hint: "React · ERP" },
    { title: "Monitor", hint: "Prometheus · Grafana" },
    { title: "gooru", hint: "Full production contour" },
  ];

  function css(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function color(hex, fallback) {
    try {
      return new THREE.Color(hex || fallback);
    } catch (e) {
      return new THREE.Color(fallback);
    }
  }

  function isDark() {
    return (document.documentElement.getAttribute("data-theme") || "dark") !== "light";
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

  function makeFaceTexture(title, hint, accentHex, dark) {
    var size = 1024;
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    var ctx = c.getContext("2d");

    var g = ctx.createLinearGradient(0, 0, size, size);
    if (dark) {
      g.addColorStop(0, "#222833");
      g.addColorStop(0.5, "#141820");
      g.addColorStop(1, "#0c0f14");
    } else {
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.55, "#eef1f4");
      g.addColorStop(1, "#d8dde3");
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);

    ctx.globalAlpha = dark ? 0.1 : 0.14;
    ctx.strokeStyle = dark ? "#fff" : "#000";
    for (var i = 0; i < size; i += 2) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i + 1);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    var vig = ctx.createRadialGradient(size / 2, size / 2, 80, size / 2, size / 2, size * 0.7);
    vig.addColorStop(0, "rgba(0,0,0,0)");
    vig.addColorStop(1, dark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.14)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, size, size);

    var pad = 72;
    ctx.fillStyle = dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.55)";
    roundRect(ctx, pad, pad, size - pad * 2, size - pad * 2, 44);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = accentHex;
    ctx.stroke();

    ctx.fillStyle = accentHex;
    roundRect(ctx, size / 2 - 60, 128, 120, 12, 6);
    ctx.fill();

    ctx.shadowColor = accentHex;
    ctx.shadowBlur = dark ? 32 : 10;
    ctx.fillStyle = accentHex;
    ctx.font = "700 90px Sora, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, size / 2, size / 2 - 8);
    ctx.shadowBlur = 0;

    ctx.fillStyle = dark ? "rgba(235,240,245,0.8)" : "rgba(25,30,36,0.72)";
    ctx.font = "600 34px Sora, sans-serif";
    ctx.fillText(hint, size / 2, size / 2 + 82);

    ctx.globalAlpha = 0.4;
    ctx.font = "600 22px Sora, sans-serif";
    ctx.fillText("PRODUCTION NODE", size / 2, size - 118);
    ctx.globalAlpha = 1;

    var tex = new THREE.CanvasTexture(c);
    if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }

  function makeEnvMap() {
    var dark = isDark();
    var faces6 = [];
    for (var f = 0; f < 6; f++) {
      var c = document.createElement("canvas");
      c.width = 256;
      c.height = 256;
      var ctx = c.getContext("2d");
      var g = ctx.createLinearGradient(0, 0, 256, 256);
      if (dark) {
        g.addColorStop(0, "#2a3140");
        g.addColorStop(0.5, "#12161d");
        g.addColorStop(1, css("--accent", "#e2b13c"));
      } else {
        g.addColorStop(0, "#ffffff");
        g.addColorStop(0.55, "#cfd6dd");
        g.addColorStop(1, css("--accent", "#0f6e6a"));
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 256, 256);
      faces6.push(c);
    }
    var map = new THREE.CubeTexture(faces6);
    map.needsUpdate = true;
    return map;
  }

  function buildMaterials() {
    var accent = css("--accent", "#e2b13c");
    var dark = isDark();
    var order = [1, 3, 4, 5, 0, 2];
    return order.map(function (idx) {
      var f = faces[idx];
      return new THREE.MeshPhysicalMaterial({
        map: makeFaceTexture(f.title, f.hint, accent, dark),
        metalness: dark ? 0.88 : 0.4,
        roughness: dark ? 0.18 : 0.26,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMap: envMap,
        envMapIntensity: dark ? 1.4 : 1.0,
      });
    });
  }

  function disposeMats(mats) {
    (Array.isArray(mats) ? mats : [mats]).forEach(function (m) {
      if (m && m.map) m.map.dispose();
      if (m) m.dispose();
    });
  }

  function rebuildMaterials() {
    if (!cube) return;
    var old = cube.material;
    cube.material = buildMaterials();
    disposeMats(old);
    var accent = color(css("--accent", "#e2b13c"), "#e2b13c");
    if (ring && ring.material) ring.material.color.copy(accent);
    satellites.forEach(function (s) {
      if (!s.material) return;
      s.material.color.copy(accent);
      if (s.material.emissive) s.material.emissive.copy(accent);
    });
    if (particles && particles.material) particles.material.color.copy(accent);
  }

  function syncCaption() {
    if (!caption) return;
    var f = faces[faceIndex] || faces[0];
    caption.innerHTML = "<strong>" + f.title + "</strong><span>" + f.hint + "</span>";
  }

  function pickFace(t) {
    faceIndex = Math.floor(t / 1.75) % faces.length;
    if (faceIndex !== lastFace) {
      lastFace = faceIndex;
      syncCaption();
    }
  }

  function onResize() {
    if (!stage || !renderer || !camera) return;
    var rect = stage.getBoundingClientRect();
    var w = Math.max(280, Math.floor(rect.width));
    var h = Math.max(280, Math.floor(rect.height));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function buildScene() {
    var accent = color(css("--accent", "#e2b13c"), "#e2b13c");
    var dark = isDark();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.5, 5.35);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (THREE.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace;
    if (THREE.ACESFilmicToneMapping) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = dark ? 1.2 : 1.05;
    }
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    envMap = makeEnvMap();
    scene.environment = envMap;

    scene.add(new THREE.AmbientLight(0xffffff, dark ? 0.28 : 0.5));
    var key = new THREE.DirectionalLight(0xffffff, dark ? 1.7 : 1.3);
    key.position.set(4, 6, 3.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    var rim = new THREE.SpotLight(accent, dark ? 2.0 : 1.2, 16, Math.PI / 5, 0.35, 1);
    rim.position.set(-3.2, 3, -2.2);
    scene.add(rim);

    var fill = new THREE.PointLight(accent, dark ? 0.8 : 0.4, 12);
    fill.position.set(2, -1, 2.8);
    scene.add(fill);

    group = new THREE.Group();
    scene.add(group);

    cube = new THREE.Mesh(new THREE.BoxGeometry(1.65, 1.65, 1.65), buildMaterials());
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.rotation.set(0.4, -0.6, 0.1);
    group.add(cube);

    var shell = new THREE.Mesh(
      new THREE.BoxGeometry(1.74, 1.74, 1.74),
      new THREE.MeshPhysicalMaterial({
        color: accent,
        metalness: 1,
        roughness: 0.12,
        transparent: true,
        opacity: 0.16,
        side: THREE.BackSide,
        clearcoat: 1,
      })
    );
    cube.add(shell);

    var floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.5, 64),
      new THREE.ShadowMaterial({ opacity: dark ? 0.5 : 0.22 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.32;
    floor.receiveShadow = true;
    group.add(floor);

    var disc = new THREE.Mesh(
      new THREE.CircleGeometry(2.05, 64),
      new THREE.MeshPhysicalMaterial({
        color: dark ? 0x0b0d10 : 0xf2f4f6,
        metalness: 0.95,
        roughness: 0.12,
        transparent: true,
        opacity: dark ? 0.4 : 0.55,
        envMap: envMap,
        envMapIntensity: 1.2,
      })
    );
    disc.rotation.x = -Math.PI / 2;
    disc.position.y = -1.31;
    group.add(disc);

    ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.014, 16, 140),
      new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.42 })
    );
    ring.rotation.x = Math.PI / 2.35;
    group.add(ring);

    satellites = [];
    for (var i = 0; i < 5; i++) {
      var sat = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.18, 0.18),
        new THREE.MeshPhysicalMaterial({
          color: accent,
          emissive: accent,
          emissiveIntensity: 0.3,
          metalness: 0.95,
          roughness: 0.18,
          clearcoat: 1,
          envMap: envMap,
        })
      );
      sat.castShadow = true;
      sat.userData.angle = (i / 5) * Math.PI * 2;
      sat.userData.radius = 2.1 + (i % 2) * 0.2;
      sat.userData.speed = 0.3 + i * 0.05;
      satellites.push(sat);
      group.add(sat);
    }

    var count = reduced ? 50 : 180;
    var pos = new Float32Array(count * 3);
    for (var p = 0; p < count; p++) {
      pos[p * 3] = (Math.random() - 0.5) * 8;
      pos[p * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[p * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    var pgeo = new THREE.BufferGeometry();
    pgeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    particles = new THREE.Points(
      pgeo,
      new THREE.PointsMaterial({
        color: accent,
        size: 0.03,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    syncCaption();
    onResize();
  }

  function animate(ts) {
    if (!renderer || !scene || !camera) return;
    if (!clockStart) clockStart = ts;
    var t = (ts - clockStart) / 1000;

    if (!reduced && cube) {
      cube.rotation.y += 0.004;
      cube.rotation.x += 0.001;

      camera.position.x += (pointer.x * 0.65 - camera.position.x) * 0.05;
      camera.position.y += (0.5 + pointer.y * 0.35 - camera.position.y) * 0.05;
      camera.lookAt(0, -0.1, 0);

      ring.rotation.z = t * 0.22;
      ring.rotation.x = Math.PI / 2.35 + Math.sin(t * 0.35) * 0.05;

      satellites.forEach(function (sat) {
        sat.userData.angle += sat.userData.speed * 0.01;
        sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
        sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
        sat.position.y = Math.sin(sat.userData.angle * 1.7 + t) * 0.4;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      if (particles) particles.rotation.y = t * 0.04;
      group.position.y = Math.sin(t * 0.9) * 0.05;
      pickFace(t);
    } else {
      pickFace(0);
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }

  function onPointer(e) {
    var rect = stage.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
    pointer.y = Math.max(-1, Math.min(1, -(((e.clientY - rect.top) / rect.height) * 2 - 1)));
  }

  function start() {
    stage = document.getElementById("hero-stage");
    canvas = document.getElementById("hero-canvas");
    caption = document.getElementById("hero-face-caption");
    if (!stage || !canvas) return;

    if (typeof THREE === "undefined") {
      if (caption) caption.innerHTML = "<strong>3D</strong><span>Three.js failed to load</span>";
      return;
    }

    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    try {
      buildScene();
    } catch (err) {
      console.error(err);
      if (caption) caption.innerHTML = "<strong>3D</strong><span>render error</span>";
      return;
    }

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);
    stage.addEventListener("pointermove", onPointer);
    stage.addEventListener("pointerleave", function () {
      pointer.x = 0;
      pointer.y = 0;
    });

    new MutationObserver(function () {
      rebuildMaterials();
      if (renderer && THREE.ACESFilmicToneMapping) {
        renderer.toneMappingExposure = isDark() ? 1.2 : 1.05;
      }
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }

  window.GooruContour = {
    setLabels: function (payload) {
      if (!payload || !payload.nodes || payload.nodes.length < 5) return;
      faces = payload.nodes.slice(0, 5).map(function (n) {
        return { title: n.label, hint: n.hint };
      });
      faces.push({ title: "gooru", hint: "Full production contour" });
      rebuildMaterials();
      syncCaption();
    },
    restart: function () {
      rebuildMaterials();
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
