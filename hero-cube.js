(function () {
  "use strict";

  var stage, scene, cube, caption;
  var faces = [
    { title: "POS", hint: "POS · 1C" },
    { title: "API / bot", hint: "Telegram · FastAPI" },
    { title: "Docker", hint: "Compose · VPS" },
    { title: "Admin", hint: "React · ERP" },
    { title: "Monitor", hint: "Prometheus · Grafana" },
    { title: "gooru", hint: "Full production contour" },
  ];
  var faceEls = [];
  var faceIndex = 0;
  var lastFace = -1;
  var reduced = false;
  var pointer = { x: 0, y: 0 };
  var rot = { x: -18, y: 28 };
  var raf = 0;
  var t0 = 0;

  function syncFaces() {
    faceEls.forEach(function (el, i) {
      var f = faces[i] || faces[0];
      el.querySelector(".cube-face-title").textContent = f.title;
      el.querySelector(".cube-face-hint").textContent = f.hint;
    });
  }

  function syncCaption() {
    if (!caption) return;
    var f = faces[faceIndex] || faces[0];
    caption.innerHTML = "<strong>" + f.title + "</strong><span>" + f.hint + "</span>";
  }

  function pickFace(t) {
    faceIndex = Math.floor(t / 1.8) % faces.length;
    if (faceIndex !== lastFace) {
      lastFace = faceIndex;
      syncCaption();
      faceEls.forEach(function (el, i) {
        el.classList.toggle("is-active", i === faceIndex);
      });
    }
  }

  function frame(ts) {
    if (!cube) return;
    if (!t0) t0 = ts;
    var t = (ts - t0) / 1000;

    if (!reduced) {
      rot.y += 0.35;
      rot.x = -18 + Math.sin(t * 0.7) * 4 + pointer.y * 8;
      var y = rot.y + pointer.x * 14;
      cube.style.transform =
        "rotateX(" + rot.x.toFixed(2) + "deg) rotateY(" + y.toFixed(2) + "deg)";
      if (scene) {
        scene.style.setProperty("--orb", (t * 28).toFixed(1) + "deg");
      }
      pickFace(t);
    } else {
      pickFace(0);
    }

    raf = requestAnimationFrame(frame);
  }

  function onPointer(e) {
    var rect = stage.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
    pointer.y = Math.max(-1, Math.min(1, -(((e.clientY - rect.top) / rect.height) * 2 - 1)));
  }

  function start() {
    stage = document.getElementById("hero-stage");
    scene = document.getElementById("cube-scene");
    cube = document.getElementById("hero-cube");
    caption = document.getElementById("hero-face-caption");
    if (!stage || !cube) return;

    faceEls = Array.prototype.slice.call(cube.querySelectorAll(".cube-face"));
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    syncFaces();
    syncCaption();

    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);

    stage.addEventListener("pointermove", onPointer);
    stage.addEventListener("pointerleave", function () {
      pointer.x = 0;
      pointer.y = 0;
    });
  }

  window.GooruContour = {
    setLabels: function (payload) {
      if (!payload || !payload.nodes || payload.nodes.length < 5) return;
      faces = payload.nodes.slice(0, 5).map(function (n) {
        return { title: n.label, hint: n.hint };
      });
      faces.push({ title: "gooru", hint: "Full production contour" });
      syncFaces();
      syncCaption();
    },
    restart: function () {
      syncFaces();
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
