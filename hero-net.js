(function () {
  "use strict";

  var stage, canvas, ctx, caption;
  var dpr = 1;
  var w = 0;
  var h = 0;
  var hubs = [];
  var satellites = [];
  var dust = [];
  var links = [];
  var satLinks = [];
  var pulses = [];
  var labels = [
    { title: "POS", hint: "POS · 1C" },
    { title: "API / bot", hint: "Telegram · FastAPI" },
    { title: "Docker", hint: "Compose · VPS" },
    { title: "Admin", hint: "React · ERP" },
    { title: "Monitor", hint: "Prometheus · Grafana" },
  ];
  var active = 0;
  var lastActive = -1;
  var reduced = false;
  var canHover = false;
  var narrow = false;
  var pointer = { x: 0, y: 0, on: false };
  var raf = 0;
  var visible = true;
  var t0 = 0;
  var accent = "#e2b13c";
  var ink = "#f7f8f8";
  var bg = "#010102";

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function refreshTheme() {
    accent = cssVar("--accent", "#e2b13c");
    ink = cssVar("--ink", "#f7f8f8");
    bg = cssVar("--bg", "#010102");
  }

  function layoutHubs() {
    var layout = narrow
      ? [
          { id: 0, nx: 0.16, ny: 0.58, r: 11 },
          { id: 1, nx: 0.36, ny: 0.42, r: 10 },
          { id: 2, nx: 0.54, ny: 0.66, r: 13 },
          { id: 3, nx: 0.74, ny: 0.44, r: 10 },
          { id: 4, nx: 0.9, ny: 0.62, r: 10 },
        ]
      : [
          { id: 0, nx: 0.46, ny: 0.4, r: 13 },
          { id: 1, nx: 0.58, ny: 0.22, r: 12 },
          { id: 2, nx: 0.7, ny: 0.48, r: 16 },
          { id: 3, nx: 0.82, ny: 0.26, r: 12 },
          { id: 4, nx: 0.93, ny: 0.52, r: 12 },
        ];

    hubs = layout;
    hubs.forEach(function (n) {
      n.x = n.nx * w;
      n.y = n.ny * h;
      n.ox = n.x;
      n.oy = n.y;
      n.phase = Math.random() * Math.PI * 2;
    });

    links = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [0, 2],
      [2, 4],
      [1, 3],
    ];

    // unlabeled satellite nodes around the constellation
    satellites = [];
    satLinks = [];
    var satCount = narrow ? 14 : 26;
    for (var i = 0; i < satCount; i++) {
      var anchor = hubs[i % hubs.length];
      var ang = (i / satCount) * Math.PI * 2 + (i % 3) * 0.4;
      var dist = (narrow ? 42 : 55) + (i % 5) * 14;
      var sx = anchor.ox + Math.cos(ang) * dist;
      var sy = anchor.oy + Math.sin(ang) * dist * 0.72;
      if (!narrow && sx < w * 0.4) sx = w * 0.4 + Math.random() * 40;
      satellites.push({
        x: sx,
        y: sy,
        ox: sx,
        oy: sy,
        r: 2.2 + (i % 3) * 0.7,
        phase: Math.random() * Math.PI * 2,
        hub: i % hubs.length,
      });
      satLinks.push(i);
    }
  }

  function spawnDust() {
    var count = Math.min(120, Math.max(55, Math.floor((w * h) / 5500)));
    dust = [];
    var minX = narrow ? 0.08 : 0.38;
    for (var i = 0; i < count; i++) {
      dust.push({
        x: (minX + Math.random() * (1 - minX)) * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 0.8 + Math.random() * 1.9,
        phase: Math.random() * Math.PI * 2,
        bright: Math.random(),
      });
    }
  }

  function spawnPulses() {
    pulses = [];
    for (var i = 0; i < links.length; i++) {
      pulses.push({
        a: links[i][0],
        b: links[i][1],
        t: (i * 0.13) % 1,
        speed: 0.14 + (i % 4) * 0.03,
        hub: true,
      });
    }
    // extra packets on some satellite spokes
    for (var s = 0; s < satellites.length; s += 2) {
      pulses.push({
        sat: s,
        t: Math.random(),
        speed: 0.1 + (s % 3) * 0.025,
        hub: false,
      });
    }
  }

  function resize() {
    if (!stage || !canvas) return;
    var rect = stage.getBoundingClientRect();
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
    narrow = window.matchMedia("(max-width: 900px)").matches;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    layoutHubs();
    spawnDust();
    spawnPulses();
  }

  function syncCaption() {
    if (!caption) return;
    var f = labels[active] || labels[0];
    caption.innerHTML =
      "<strong>" + f.title + "</strong><span>" + f.hint + "</span>";
  }

  function pickActive(t) {
    active = Math.floor(t / 2.1) % labels.length;
    if (active !== lastActive) {
      lastActive = active;
      syncCaption();
    }
  }

  function drawLink(a, b, alpha, width) {
    var mx = (a.x + b.x) / 2;
    var my = (a.y + b.y) / 2 + Math.sin((a.x + b.x) * 0.01) * 10;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(mx, my, b.x, b.y);
    ctx.strokeStyle = accent;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = width || 1.1;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function pointOnLink(a, b, t) {
    var mx = (a.x + b.x) / 2;
    var my = (a.y + b.y) / 2 + Math.sin((a.x + b.x) * 0.01) * 10;
    var u = 1 - t;
    return {
      x: u * u * a.x + 2 * u * t * mx + t * t * b.x,
      y: u * u * a.y + 2 * u * t * my + t * t * b.y,
    };
  }

  function drawHub(n, i, t) {
    var lab = labels[i] || labels[0];
    var isOn = i === active;
    var pulse = 1 + Math.sin(t * 2.2 + n.phase) * 0.04;
    var r = n.r * pulse * (isOn ? 1.1 : 1);

    if (isOn) {
      var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.6);
      g.addColorStop(0, accent);
      g.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 3.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isOn ? accent : bg;
    ctx.globalAlpha = isOn ? 0.95 : 0.55;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = isOn ? 2 : 1.15;
    ctx.strokeStyle = accent;
    ctx.globalAlpha = isOn ? 1 : 0.55;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2.6, 0, Math.PI * 2);
    ctx.fillStyle = isOn ? ink : accent;
    ctx.fill();

    ctx.font = "500 12px Sora, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = isOn ? accent : ink;
    ctx.globalAlpha = isOn ? 0.95 : 0.7;
    ctx.fillText(lab.title, n.x, n.y + r + 8);
    ctx.globalAlpha = 1;
  }

  function frame(ts) {
    if (!ctx || !visible) {
      raf = 0;
      return;
    }
    if (!t0) t0 = ts;
    var t = (ts - t0) / 1000;
    refreshTheme();
    pickActive(reduced ? 0 : t);

    ctx.clearRect(0, 0, w, h);

    var vg = ctx.createRadialGradient(
      w * (narrow ? 0.55 : 0.74),
      h * 0.45,
      10,
      w * (narrow ? 0.55 : 0.74),
      h * 0.45,
      Math.max(w, h) * 0.52
    );
    vg.addColorStop(0, accent);
    vg.addColorStop(1, "transparent");
    ctx.globalAlpha = 0.045;
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    var connectDist = Math.min(118, w * 0.2);
    var minX = narrow ? 0 : w * 0.36;
    for (var i = 0; i < dust.length; i++) {
      var p = dust[i];
      if (!reduced) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < minX || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        p.x = Math.max(minX, Math.min(w, p.x));
        if (canHover && pointer.on) {
          var dx = pointer.x - p.x;
          var dy = pointer.y - p.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 150 * 150 && d2 > 1) {
            p.vx += dx * 0.000028;
            p.vy += dy * 0.000028;
          }
        }
        var sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.38) {
          p.vx *= 0.9;
          p.vy *= 0.9;
        }
      }
      // neighbor links — denser mesh
      for (var j = i + 1; j < dust.length; j++) {
        var q = dust[j];
        var ddx = p.x - q.x;
        var ddy = p.y - q.y;
        var dd = Math.hypot(ddx, ddy);
        if (dd < connectDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - dd / connectDist) * (0.08 + p.bright * 0.06);
          ctx.lineWidth = 0.9;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.18 + Math.sin(t * 1.4 + p.phase) * 0.08 + p.bright * 0.08;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // satellite spokes + nodes
    for (var si = 0; si < satellites.length; si++) {
      var sat = satellites[si];
      var hub = hubs[sat.hub];
      if (!reduced) {
        sat.x = sat.ox + Math.sin(t * 0.8 + sat.phase) * 4;
        sat.y = sat.oy + Math.cos(t * 0.65 + sat.phase) * 3;
      }
      ctx.beginPath();
      ctx.moveTo(hub.x, hub.y);
      ctx.lineTo(sat.x, sat.y);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = sat.hub === active ? 0.22 : 0.08;
      ctx.lineWidth = 0.9;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(sat.x, sat.y, sat.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = sat.hub === active ? 0.55 : 0.28;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    for (var li = 0; li < links.length; li++) {
      var pair = links[li];
      var a = hubs[pair[0]];
      var b = hubs[pair[1]];
      var hot = pair[0] === active || pair[1] === active;
      drawLink(a, b, hot ? 0.5 : 0.16, hot ? 1.25 : 1);
    }

    if (!reduced) {
      for (var pi = 0; pi < pulses.length; pi++) {
        var pul = pulses[pi];
        pul.t += pul.speed * 0.016;
        if (pul.t > 1) pul.t -= 1;
        var pt;
        if (pul.hub) {
          pt = pointOnLink(hubs[pul.a], hubs[pul.b], pul.t);
        } else {
          var sN = satellites[pul.sat];
          var hN = hubs[sN.hub];
          pt = {
            x: hN.x + (sN.x - hN.x) * pul.t,
            y: hN.y + (sN.y - hN.y) * pul.t,
          };
        }
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pul.hub ? 2.3 : 1.6, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = pul.hub ? 8 : 5;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (var hi = 0; hi < hubs.length; hi++) {
      var hubN = hubs[hi];
      if (!reduced) {
        hubN.x = hubN.ox + Math.sin(t * 0.7 + hubN.phase) * 3.2;
        hubN.y = hubN.oy + Math.cos(t * 0.55 + hubN.phase) * 2.2;
      } else {
        hubN.x = hubN.ox;
        hubN.y = hubN.oy;
      }
      drawHub(hubN, hi, t);
    }

    raf = requestAnimationFrame(frame);
  }

  function ensureLoop() {
    if (raf || !visible) return;
    raf = requestAnimationFrame(frame);
  }

  function onPointer(e) {
    if (!canHover) return;
    var rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.on = true;
  }

  function start() {
    stage = document.getElementById("hero-stage");
    canvas = document.getElementById("hero-net");
    caption = document.getElementById("hero-face-caption");
    if (!stage || !canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;

    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    refreshTheme();
    resize();
    syncCaption();

    window.addEventListener("resize", resize);
    if (canHover) {
      var hero = stage.closest(".hero") || stage;
      hero.addEventListener("pointermove", onPointer);
      hero.addEventListener("pointerleave", function () {
        pointer.on = false;
      });
    }

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          visible = entries[0] && entries[0].isIntersecting;
          if (visible) ensureLoop();
          else if (raf) {
            cancelAnimationFrame(raf);
            raf = 0;
          }
        },
        { threshold: 0.05 }
      );
      io.observe(stage);
    }

    ensureLoop();
  }

  window.GooruContour = {
    setLabels: function (payload) {
      if (!payload || !payload.nodes || payload.nodes.length < 5) return;
      labels = payload.nodes.slice(0, 5).map(function (n) {
        return { title: n.label, hint: n.hint };
      });
      syncCaption();
    },
    restart: function () {
      resize();
      ensureLoop();
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
