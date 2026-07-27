(function () {
  "use strict";

  var stage = null;
  var canvas = null;
  var caption = null;
  var renderer = null;
  var scene = null;
  var camera = null;
  var cube = null;
  var satellites = [];
  var particles = null;
  var ring = null;
  var raf = 0;
  var reduced = false;
  var pointer = { x: 0, y: 0 };
  var targetTilt = { x: 0.2, y: -0.35 };
  var faceIndex = 0;
  var lastFace = -1;
  var clockStart = 0;

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

  function hexToThree(hex, fallback) {
    try {
      return new THREE.Color(hex || fallback);
    } catch (e) {
      return new THREE.Color(fallback);
    }
  }

  function makeFaceTexture(title, hint, accentHex, bgHex, inkHex) {
    var size = 512;
    var c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    var ctx = c.getContext("2d");

    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, size, size);

    // subtle grid
    ctx.strokeStyle = accentHex + "33";
    ctx.lineWidth = 2;
    for (var i = 0; i <= 8; i++) {
      var p = (i / 8) * size;
      ctx.beginPath();
      ctx.moveTo(p, 0);
      ctx.lineTo(p, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, p);
      ctx.lineTo(size, p);
      ctx.stroke();
    }

    // border frame
    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 14;
    ctx.strokeRect(28, 28, size - 56, size - 56);

    // corner ticks
    ctx.lineWidth = 6;
    var tick = 42;
    [
      [28, 28],
      [size - 28, 28],
      [28, size - 28],
      [size - 28, size - 28],
    ].forEach(function (pt) {
      ctx.beginPath();
      ctx.moveTo(pt[0], pt[1]);
      ctx.lineTo(pt[0] + (pt[0] < size / 2 ? tick : -tick), pt[1]);
      ctx.moveTo(pt[0], pt[1]);
      ctx.lineTo(pt[0], pt[1] + (pt[1] < size / 2 ? tick : -tick));
      ctx.stroke();
    });

    ctx.fillStyle = accentHex;
    ctx.font = "700 54px Sora, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(title, size / 2, size / 2 - 18);

    ctx.fillStyle = inkHex;
    ctx.globalAlpha = 0.72;
    ctx.font = "600 28px Sora, sans-serif";
    ctx.fillText(hint, size / 2, size / 2 + 48);
    ctx.globalAlpha = 1;

    var tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  }

  function buildCubeMaterials() {
    var accent = css("--accent", "#e2b13c");
    var bg = css("--bg-elev", "#181c23");
    var ink = css("--ink", "#f3f4f6");
    // BoxGeometry material order: +x -x +y -y +z -z
    var order = [1, 3, 4, 5, 0, 2]; // map to faces array
    return order.map(function (idx) {
      var f = faces[idx];
      return new THREE.MeshStandardMaterial({
        map: makeFaceTexture(f.title, f.hint, accent, bg, ink),
        roughness: 0.35,
        metalness: 0.45,
      });
    });
  }

  function disposeObject(obj) {
    if (!obj) return;
    obj.traverse(function (child) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        var mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach(function (m) {
          if (m.map) m.map.dispose();
          m.dispose();
        });
      }
    });
  }

  function rebuildMaterials() {
    if (!cube) return;
    var old = cube.material;
    cube.material = buildCubeMaterials();
    if (Array.isArray(old)) old.forEach(function (m) { if (m.map) m.map.dispose(); m.dispose(); });
  }

  function syncCaption() {
    if (!caption) return;
    var f = faces[faceIndex] || faces[0];
    caption.innerHTML =
      '<strong>' + f.title + "</strong><span>" + f.hint + "</span>";
  }

  function pickFaceFromTime(t) {
    // cycle captions through production contour every ~1.7s
    faceIndex = Math.floor(t / 1.7) % faces.length;
    if (faceIndex !== lastFace) {
      lastFace = faceIndex;
      syncCaption();
    }
  }

  function buildScene() {
    if (typeof THREE === "undefined") return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.35, 5.2);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    var accent = hexToThree(css("--accent", "#e2b13c"), "#e2b13c");
    var ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);
    var key = new THREE.DirectionalLight(accent, 1.35);
    key.position.set(3.5, 4.2, 2.8);
    scene.add(key);
    var fill = new THREE.DirectionalLight(0xffffff, 0.35);
    fill.position.set(-3, -1, 2);
    scene.add(fill);
    var rim = new THREE.PointLight(accent, 1.1, 12);
    rim.position.set(-2.2, 1.5, -2);
    scene.add(rim);

    cube = new THREE.Mesh(new THREE.BoxGeometry(1.55, 1.55, 1.55), buildCubeMaterials());
    cube.rotation.set(0.35, -0.55, 0.12);
    scene.add(cube);

    // glass wireframe shell
    var shell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(1.72, 1.72, 1.72)),
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.45 })
    );
    cube.add(shell);

    // orbit ring
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.15, 0.015, 12, 120),
      new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.35 })
    );
    ring.rotation.x = Math.PI / 2.4;
    scene.add(ring);

    // satellite cubes
    satellites = [];
    for (var i = 0; i < 4; i++) {
      var sat = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.22, 0.22),
        new THREE.MeshStandardMaterial({
          color: accent,
          emissive: accent,
          emissiveIntensity: 0.25,
          metalness: 0.6,
          roughness: 0.3,
          wireframe: i % 2 === 1,
        })
      );
      sat.userData.angle = (i / 4) * Math.PI * 2;
      sat.userData.radius = 2.05 + (i % 2) * 0.25;
      sat.userData.speed = 0.35 + i * 0.08;
      satellites.push(sat);
      scene.add(sat);
    }

    // floating particles
    var count = reduced ? 40 : 140;
    var positions = new Float32Array(count * 3);
    for (var p = 0; p < count; p++) {
      positions[p * 3] = (Math.random() - 0.5) * 7;
      positions[p * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[p * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: accent,
        size: 0.035,
        transparent: true,
        opacity: 0.75,
        sizeAttenuation: true,
      })
    );
    scene.add(particles);

    syncCaption();
    onResize();
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

  function animate(ts) {
    if (!renderer || !scene || !camera) return;
    if (!clockStart) clockStart = ts;
    var t = (ts - clockStart) / 1000;

    if (!reduced && cube) {
      cube.rotation.y += 0.0045;
      cube.rotation.x += 0.0012;
      cube.rotation.x += (targetTilt.x - cube.rotation.x * 0) * 0.002;
      cube.rotation.y += targetTilt.y * 0.0008;
      // gentle mouse follow on group tilt via camera look
      camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.04;
      camera.position.y += (0.35 + pointer.y * 0.35 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      ring.rotation.z = t * 0.25;
      ring.rotation.x = Math.PI / 2.4 + Math.sin(t * 0.4) * 0.08;

      satellites.forEach(function (sat) {
        sat.userData.angle += sat.userData.speed * 0.01;
        sat.position.x = Math.cos(sat.userData.angle) * sat.userData.radius;
        sat.position.z = Math.sin(sat.userData.angle) * sat.userData.radius;
        sat.position.y = Math.sin(sat.userData.angle * 2 + t) * 0.35;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      if (particles) {
        particles.rotation.y = t * 0.05;
        particles.rotation.x = Math.sin(t * 0.2) * 0.08;
      }

      pickFaceFromTime(t);
    } else {
      pickFaceFromTime(0);
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }

  function onPointer(e) {
    if (!stage) return;
    var rect = stage.getBoundingClientRect();
    var nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    var ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    pointer.x = Math.max(-1, Math.min(1, nx));
    pointer.y = Math.max(-1, Math.min(1, -ny));
    targetTilt.x = pointer.y * 0.25;
    targetTilt.y = pointer.x * 0.45;
  }

  function start() {
    stage = document.getElementById("hero-stage");
    canvas = document.getElementById("hero-canvas");
    caption = document.getElementById("hero-face-caption");
    if (!stage || !canvas) return;
    if (typeof THREE === "undefined") {
      stage.classList.add("is-fallback");
      return;
    }

    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    buildScene();
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(animate);

    window.addEventListener("resize", onResize);
    stage.addEventListener("pointermove", onPointer);
    stage.addEventListener("pointerleave", function () {
      pointer.x = 0;
      pointer.y = 0;
    });

    var mo = new MutationObserver(function () {
      rebuildMaterials();
      if (ring && ring.material) ring.material.color = hexToThree(css("--accent", "#e2b13c"), "#e2b13c");
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  window.GooruContour = {
    setLabels: function (payload) {
      if (!payload || !payload.nodes || payload.nodes.length < 5) return;
      faces = [
        payload.nodes[0],
        payload.nodes[1],
        payload.nodes[2],
        payload.nodes[3],
        payload.nodes[4],
        { title: "gooru", hint: payload.nodes[0].hint ? "Full production contour" : "gooru" },
      ].map(function (n) {
        return { title: n.label || n.title, hint: n.hint };
      });
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
