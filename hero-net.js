(function () {
  "use strict";

  var stage, canvas, ctx, caption;
  var dpr = 1;
  var w = 0;
  var h = 0;
  var hubs = [];
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
  var accent = "#5eead4";
  var muted = "#94a3b8";
  var ink = "#e2e8f0";

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function refreshTheme() {
    accent = cssVar("--accent", "#5eead4");
    muted = cssVar("--muted", "#94a3b8");
    ink = cssVar("--text", "#e2e8f0");
  }

  function layoutHubs() {
    hubs = [
      { id: 0, nx: 0.14, ny: 0.42, r: 15 },
      { id: 1, nx: 0.34, ny: 0.22, r: 14 },
      { id: 2, nx: 0.52, ny: 0.46, r: 18 },
      { id: 3, nx: 0.72, ny: 0.24, r: 14 },
      { id: 4, nx: 0.86, ny: 0.48, r: 14 },
    ];
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
    ];
  }

  function spawnDust() {
    var count = Math.min(42, Math.max(22, Math.floor((w * h) / 9000)));
    dust = [];
    for (var i = 0; i < count; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1.2 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function spawnPulses() {
    pulses = links.map(function (pair, i) {
      return {
        a: pair[0],
        b: pair[1],
        t: (i * 0.17) % 1,
        speed: 0.18 + (i % 3) * 0.04,
      };
    });
  }

  function resize() {
    if (!stage || !canvas) return;
    var rect = stage.getBoundingClientRect();
    w = Math.max(1, Math.floor(rect.width));
    h = Math.max(1, Math.floor(rect.height));
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

  function drawLink(a, b, alpha) {
    var mx = (a.x + b.x) / 2;
    var my = (a.y + b.y) / 2 + Math.sin((a.x + b.x) * 0.01) * 10;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(mx, my, b.x, b.y);
    ctx.strokeStyle = accent;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1.15;
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
    var r = n.r * pulse * (isOn ? 1.12 : 1);

    if (isOn) {
      var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.2);
      g.addColorStop(0, accent);
      g.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 3.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fillStyle = isOn ? accent : "rgba(15, 23, 42, 0.55)";
    ctx.fill();
    ctx.lineWidth = isOn ? 2 : 1.2;
    ctx.strokeStyle = accent;
    ctx.globalAlpha = isOn ? 1 : 0.7;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = isOn ? ink : accent;
    ctx.fill();

    ctx.font = "600 12px Sora, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = isOn ? accent : ink;
    ctx.globalAlpha = isOn ? 1 : 0.88;
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

    // soft vignette core
    var vg = ctx.createRadialGradient(w * 0.52, h * 0.46, 20, w * 0.52, h * 0.46, Math.max(w, h) * 0.55);
    vg.addColorStop(0, "rgba(94, 234, 212, 0.06)");
    vg.addColorStop(1, "transparent");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);

    // dust + neighbor links
    var connectDist = Math.min(110, w * 0.22);
    for (var i = 0; i < dust.length; i++) {
      var p = dust[i];
      if (!reduced) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        if (canHover && pointer.on) {
          var dx = pointer.x - p.x;
          var dy = pointer.y - p.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 140 * 140 && d2 > 1) {
            p.vx += dx * 0.000035;
            p.vy += dy * 0.000035;
          }
        }
        var sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.35) {
          p.vx *= 0.92;
          p.vy *= 0.92;
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
          ctx.globalAlpha = (1 - dd / connectDist) * 0.12;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.28 + Math.sin(t + p.phase) * 0.08;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // main contour edges
    for (var li = 0; li < links.length; li++) {
      var pair = links[li];
      var a = hubs[pair[0]];
      var b = hubs[pair[1]];
      var hot = pair[0] === active || pair[1] === active;
      drawLink(a, b, hot ? 0.55 : 0.22);
    }

    // packets
    if (!reduced) {
      for (var pi = 0; pi < pulses.length; pi++) {
        var pul = pulses[pi];
        pul.t += pul.speed * 0.016;
        if (pul.t > 1) pul.t -= 1;
        var pa = hubs[pul.a];
        var pb = hubs[pul.b];
        var pt = pointOnLink(pa, pb, pul.t);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // hubs drift slightly
    for (var hi = 0; hi < hubs.length; hi++) {
      var hub = hubs[hi];
      if (!reduced) {
        hub.x = hub.ox + Math.sin(t * 0.7 + hub.phase) * 3.5;
        hub.y = hub.oy + Math.cos(t * 0.55 + hub.phase) * 2.5;
      } else {
        hub.x = hub.ox;
        hub.y = hub.oy;
      }
      drawHub(hub, hi, t);
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
