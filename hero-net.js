(function () {
  "use strict";

  var stage, canvas, ctx, caption;
  var dpr = 1;
  var w = 0;
  var h = 0;
  var pad = 28;
  var hubs = [];
  var satellites = [];
  var dust = [];
  var links = [];
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
  var pointer = { x: 0, y: 0, on: false };
  var raf = 0;
  var visible = true;
  var t0 = 0;
  var accent = "#e2b13c";
  var ink = "#f7f8f8";
  var bg = "#0f1011";

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function refreshTheme() {
    accent = cssVar("--accent", "#e2b13c");
    ink = cssVar("--ink", "#f7f8f8");
    bg = cssVar("--bg-elev", cssVar("--bg", "#0f1011"));
  }

  function clamp(v, a, b) {
    return Math.max(a, Math.min(b, v));
  }

  function layoutHubs() {
    var iw = Math.max(1, w - pad * 2);
    var ih = Math.max(1, h - pad * 2);
    var layout = [
      { id: 0, nx: 0.14, ny: 0.42, r: 12 },
      { id: 1, nx: 0.36, ny: 0.22, r: 11 },
      { id: 2, nx: 0.52, ny: 0.5, r: 15 },
      { id: 3, nx: 0.72, ny: 0.24, r: 11 },
      { id: 4, nx: 0.88, ny: 0.48, r: 11 },
    ];

    hubs = layout;
    hubs.forEach(function (n) {
      n.x = pad + n.nx * iw;
      n.y = pad + n.ny * ih;
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

    satellites = [];
    var satCount = Math.min(22, Math.max(12, Math.floor((w * h) / 14000)));
    for (var i = 0; i < satCount; i++) {
      var anchor = hubs[i % hubs.length];
      var ang = (i / satCount) * Math.PI * 2 + (i % 3) * 0.35;
      var dist = 28 + (i % 5) * 10;
      var sx = clamp(anchor.ox + Math.cos(ang) * dist, pad + 8, w - pad - 8);
      var sy = clamp(anchor.oy + Math.sin(ang) * dist * 0.75, pad + 8, h - pad - 8);
      satellites.push({
        x: sx,
        y: sy,
        ox: sx,
        oy: sy,
        r: 2 + (i % 3) * 0.6,
        phase: Math.random() * Math.PI * 2,
        hub: i % hubs.length,
      });
    }
  }

  function spawnDust() {
    var count = Math.min(70, Math.max(36, Math.floor((w * h) / 7000)));
    dust = [];
    for (var i = 0; i < count; i++) {
      dust.push({
        x: pad + Math.random() * (w - pad * 2),
        y: pad + Math.random() * (h - pad * 2),
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 0.9 + Math.random() * 1.6,
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
    pad = Math.max(22, Math.min(36, Math.floor(Math.min(w, h) * 0.08)));
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
    var my = (a.y + b.y) / 2 + Math.sin((a.x + b.x) * 0.01) * 8;
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
    var my = (a.y + b.y) / 2 + Math.sin((a.x + b.x) * 0.01) * 8;
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
    var r = n.r * pulse * (isOn ? 1.08 : 1);

    if (isOn) {
      var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.2);
      g.addColorStop(0, accent);
      g.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isOn ? accent : bg;
    ctx.globalAlpha = isOn ? 0.95 : 0.65;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.lineWidth = isOn ? 2 : 1.15;
    ctx.strokeStyle = accent;
    ctx.globalAlpha = isOn ? 1 : 0.6;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = isOn ? ink : accent;
    ctx.fill();

    ctx.font = "500 11px Sora, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = isOn ? accent : ink;
    ctx.globalAlpha = isOn ? 0.95 : 0.75;
    ctx.fillText(lab.title, n.x, n.y + r + 7);
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

    var vg = ctx.createRadialGradient(w * 0.5, h * 0.48, 12, w * 0.5, h * 0.48, Math.max(w, h) * 0.48);
    vg.addColorStop(0, accent);
    vg.addColorStop(1, "transparent");
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    var connectDist = Math.min(96, Math.min(w, h) * 0.22);
    var minX = pad;
    var maxX = w - pad;
    var minY = pad;
    var maxY = h - pad;

    for (var i = 0; i < dust.length; i++) {
      var p = dust[i];
      if (!reduced) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < minX || p.x > maxX) p.vx *= -1;
        if (p.y < minY || p.y > maxY) p.vy *= -1;
        p.x = clamp(p.x, minX, maxX);
        p.y = clamp(p.y, minY, maxY);
        if (canHover && pointer.on) {
          var dx = pointer.x - p.x;
          var dy = pointer.y - p.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120 && d2 > 1) {
            p.vx += dx * 0.00003;
            p.vy += dy * 0.00003;
          }
        }
        var sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.32) {
          p.vx *= 0.9;
          p.vy *= 0.9;
        }
      }
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
          ctx.globalAlpha = (1 - dd / connectDist) * (0.1 + p.bright * 0.06);
          ctx.lineWidth = 0.9;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.22 + Math.sin(t * 1.4 + p.phase) * 0.08 + p.bright * 0.06;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    for (var si = 0; si < satellites.length; si++) {
      var sat = satellites[si];
      var hub = hubs[sat.hub];
      if (!reduced) {
        sat.x = clamp(sat.ox + Math.sin(t * 0.8 + sat.phase) * 3, minX, maxX);
        sat.y = clamp(sat.oy + Math.cos(t * 0.65 + sat.phase) * 2.5, minY, maxY);
      }
      ctx.beginPath();
      ctx.moveTo(hub.x, hub.y);
      ctx.lineTo(sat.x, sat.y);
      ctx.strokeStyle = accent;
      ctx.globalAlpha = sat.hub === active ? 0.25 : 0.1;
      ctx.lineWidth = 0.9;
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.beginPath();
      ctx.arc(sat.x, sat.y, sat.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = sat.hub === active ? 0.55 : 0.3;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    for (var li = 0; li < links.length; li++) {
      var pair = links[li];
      var a = hubs[pair[0]];
      var b = hubs[pair[1]];
      var hot = pair[0] === active || pair[1] === active;
      drawLink(a, b, hot ? 0.5 : 0.18, hot ? 1.25 : 1);
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
        ctx.arc(pt.x, pt.y, pul.hub ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = pul.hub ? 7 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (var hi = 0; hi < hubs.length; hi++) {
      var hubN = hubs[hi];
      if (!reduced) {
        hubN.x = clamp(hubN.ox + Math.sin(t * 0.7 + hubN.phase) * 2.5, minX + 12, maxX - 12);
        hubN.y = clamp(hubN.oy + Math.cos(t * 0.55 + hubN.phase) * 2, minY + 12, maxY - 12);
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
      canvas.addEventListener("pointermove", onPointer);
      canvas.addEventListener("pointerleave", function () {
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
