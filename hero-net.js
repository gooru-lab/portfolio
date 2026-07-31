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
  var narrow = false;
  var pointer = { x: 0, y: 0, on: false };
  var raf = 0;
  var visible = true;
  var t0 = 0;
  var accent = "#e2b13c";
  var muted = "#9ca3af";
  var ink = "#f3f4f6";
  var bg = "#0b0d10";

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function refreshTheme() {
    accent = cssVar("--accent", "#e2b13c");
    muted = cssVar("--muted", "#9ca3af");
    ink = cssVar("--ink", "#f3f4f6");
    bg = cssVar("--bg", "#0b0d10");
  }

  function layoutHubs() {
    // Keep constellation on the right so copy stays readable.
    var layout = narrow
      ? [
          { id: 0, nx: 0.18, ny: 0.62, r: 12 },
          { id: 1, nx: 0.38, ny: 0.48, r: 11 },
          { id: 2, nx: 0.55, ny: 0.68, r: 14 },
          { id: 3, nx: 0.74, ny: 0.5, r: 11 },
          { id: 4, nx: 0.9, ny: 0.66, r: 11 },
        ]
      : [
          { id: 0, nx: 0.48, ny: 0.42, r: 14 },
          { id: 1, nx: 0.6, ny: 0.24, r: 13 },
          { id: 2, nx: 0.72, ny: 0.48, r: 17 },
          { id: 3, nx: 0.84, ny: 0.28, r: 13 },
          { id: 4, nx: 0.93, ny: 0.52, r: 13 },
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
    ];
  }

  function spawnDust() {
    var count = Math.min(36, Math.max(18, Math.floor((w * h) / 14000)));
    dust = [];
    for (var i = 0; i < count; i++) {
      var bias = narrow ? 0.15 + Math.random() * 0.8 : 0.42 + Math.random() * 0.55;
      dust.push({
        x: bias * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1.1 + Math.random() * 1.6,
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
        speed: 0.16 + (i % 3) * 0.035,
      };
    });
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

  function drawLink(a, b, alpha) {
    var mx = (a.x + b.x) / 2;
    var my = (a.y + b.y) / 2 + Math.sin((a.x + b.x) * 0.01) * 10;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(mx, my, b.x, b.y);
    ctx.strokeStyle = accent;
    ctx.globalAlpha = alpha;
    ctx.lineWidth = 1.1;
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
      var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 3.4);
      g.addColorStop(0, accent);
      g.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 3.4, 0, Math.PI * 2);
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
    ctx.arc(n.x, n.y, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = isOn ? ink : accent;
    ctx.fill();

    ctx.font = "600 12px Sora, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = isOn ? accent : ink;
    ctx.globalAlpha = isOn ? 0.95 : 0.72;
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
      w * (narrow ? 0.55 : 0.72),
      h * 0.45,
      20,
      w * (narrow ? 0.55 : 0.72),
      h * 0.45,
      Math.max(w, h) * 0.5
    );
    vg.addColorStop(0, accent);
    vg.addColorStop(1, "transparent");
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    var connectDist = Math.min(100, w * 0.18);
    var minX = narrow ? 0 : w * 0.38;
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
          if (d2 < 130 * 130 && d2 > 1) {
            p.vx += dx * 0.00003;
            p.vy += dy * 0.00003;
          }
        }
        var sp = Math.hypot(p.vx, p.vy);
        if (sp > 0.32) {
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
          ctx.globalAlpha = (1 - dd / connectDist) * 0.1;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.22 + Math.sin(t + p.phase) * 0.07;
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    for (var li = 0; li < links.length; li++) {
      var pair = links[li];
      var a = hubs[pair[0]];
      var b = hubs[pair[1]];
      var hot = pair[0] === active || pair[1] === active;
      drawLink(a, b, hot ? 0.48 : 0.18);
    }

    if (!reduced) {
      for (var pi = 0; pi < pulses.length; pi++) {
        var pul = pulses[pi];
        pul.t += pul.speed * 0.016;
        if (pul.t > 1) pul.t -= 1;
        var pa = hubs[pul.a];
        var pb = hubs[pul.b];
        var pt = pointOnLink(pa, pb, pul.t);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (var hi = 0; hi < hubs.length; hi++) {
      var hub = hubs[hi];
      if (!reduced) {
        hub.x = hub.ox + Math.sin(t * 0.7 + hub.phase) * 3.2;
        hub.y = hub.oy + Math.cos(t * 0.55 + hub.phase) * 2.2;
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
      // Pointer on the whole hero — stage has pointer-events none, canvas catches right side.
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
