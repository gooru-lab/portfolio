(function () {
  var canvas, ctx, wrap;
  var dpr = 1;
  var w = 0;
  var h = 0;
  var t0 = 0;
  var raf = 0;
  var reduced = false;
  var pointer = { x: -1, y: -1 };
  var hover = -1;
  var nodes = [];
  var labels = [
    { label: "POS", hint: "POS · 1C" },
    { label: "API / bot", hint: "Telegram · FastAPI" },
    { label: "Docker", hint: "Compose · VPS" },
    { label: "Admin", hint: "React · ERP" },
    { label: "Monitor", hint: "Prometheus · Grafana" },
  ];
  var particles = [];

  function cssVar(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  function accent() {
    return cssVar("--accent", "#e2b13c");
  }

  function layout() {
    if (!canvas || !wrap) return;
    var rect = wrap.getBoundingClientRect();
    w = Math.max(320, Math.floor(rect.width));
    h = Math.max(300, Math.floor(rect.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var mobile = w < 720;
    var padX = mobile ? 24 : Math.max(40, w * 0.28);
    var padY = mobile ? 48 : 64;
    var usableW = w - padX - (mobile ? 24 : 36);
    var usableH = h - padY * 2;
    var count = labels.length;
    nodes = [];
    for (var i = 0; i < count; i++) {
      var u = count === 1 ? 0.5 : i / (count - 1);
      var x = padX + usableW * u;
      var y = padY + usableH * (0.38 + Math.sin(u * Math.PI) * 0.22 + (i % 2) * 0.05);
      var z = 0.6 + Math.sin(u * Math.PI) * 0.4;
      nodes.push({
        x: x,
        y: y,
        z: z,
        r: (mobile ? 11 : 13) + z * 5,
        label: labels[i].label,
        hint: labels[i].hint,
        // stagger ~1.6s across nodes (within 1.5–2s)
        appearAt: 0.12 + i * 0.38,
      });
    }

    particles = [];
    for (var p = 0; p < nodes.length - 1; p++) {
      for (var k = 0; k < 5; k++) {
        particles.push({
          edge: p,
          t: (k / 5 + Math.random() * 0.15) % 1,
          speed: 0.18 + Math.random() * 0.12,
          size: 2 + Math.random() * 2.2,
        });
      }
    }
  }

  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function nodeAlpha(now, node) {
    if (reduced) return 1;
    var a = (now - node.appearAt) / 0.45;
    if (a <= 0) return 0;
    if (a >= 1) return 1;
    return easeOutCubic(a);
  }

  function drawGrid() {
    ctx.save();
    ctx.strokeStyle = "rgba(127,140,155,0.11)";
    ctx.lineWidth = 1;
    var step = 36;
    var skew = 0.42;
    for (var x = -h; x < w + h; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h * skew, h);
      ctx.stroke();
    }
    for (var y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y + 10);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawEdge(a, b, alpha) {
    if (alpha <= 0) return;
    var ac = accent();
    var mx = (a.x + b.x) / 2;
    var my = (a.y + b.y) / 2 - 32;
    ctx.save();
    ctx.globalAlpha = alpha * 0.75;
    ctx.strokeStyle = ac;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(mx, my, b.x, b.y);
    ctx.stroke();
    ctx.globalAlpha = alpha * 0.18;
    ctx.lineWidth = 8;
    ctx.stroke();
    ctx.restore();
  }

  function edgePoint(a, b, t) {
    var mx = (a.x + b.x) / 2;
    var my = (a.y + b.y) / 2 - 32;
    var u = 1 - t;
    return {
      x: u * u * a.x + 2 * u * t * mx + t * t * b.x,
      y: u * u * a.y + 2 * u * t * my + t * t * b.y,
    };
  }

  function roundRect(x, y, rw, rh, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + rw, y, x + rw, y + rh, r);
    ctx.arcTo(x + rw, y + rh, x, y + rh, r);
    ctx.arcTo(x, y + rh, x, y, r);
    ctx.arcTo(x, y, x + rw, y, r);
    ctx.closePath();
  }

  function drawNode(node, alpha, isHover, now) {
    if (alpha <= 0) return;
    var ac = accent();
    var ink = cssVar("--ink", "#f3f4f6");
    var elev = cssVar("--bg-elev", "#181c23");
    var muted = cssVar("--muted", "#9ca3af");
    var pulse = reduced ? 0 : Math.sin(now * 2.4 + node.x * 0.01) * 0.5 + 0.5;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(node.x, node.y);

    ctx.beginPath();
    ctx.ellipse(0, node.r + 8, node.r * 1.45, node.r * 0.38, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fill();

    var glowR = node.r * (2.4 + pulse * 0.35);
    var g = ctx.createRadialGradient(0, 0, 2, 0, 0, glowR);
    g.addColorStop(0, ac);
    g.addColorStop(0.4, ac);
    g.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(0, 0, glowR, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.globalAlpha = alpha * (isHover ? 0.62 : 0.34);
    ctx.fill();

    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(0, 0, node.r, 0, Math.PI * 2);
    ctx.fillStyle = elev;
    ctx.fill();
    ctx.lineWidth = isHover ? 2.8 : 2;
    ctx.strokeStyle = ac;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, 3.6, 0, Math.PI * 2);
    ctx.fillStyle = ac;
    ctx.fill();

    ctx.font = "600 12px Sora, sans-serif";
    ctx.fillStyle = ink;
    ctx.textAlign = "center";
    ctx.fillText(node.label, 0, node.r + 24);

    if (isHover) {
      var hint = node.hint || "";
      ctx.font = "600 11px Sora, sans-serif";
      var tw = ctx.measureText(hint).width;
      var bw = tw + 20;
      var bh = 28;
      var by = -node.r - 40;
      ctx.fillStyle = elev;
      ctx.strokeStyle = ac;
      ctx.lineWidth = 1.4;
      roundRect(-bw / 2, by, bw, bh, 7);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = muted;
      ctx.fillText(hint, 0, by + 18);
    }

    ctx.restore();
  }

  function hitTest(x, y) {
    for (var i = nodes.length - 1; i >= 0; i--) {
      var n = nodes[i];
      var dx = x - n.x;
      var dy = y - n.y;
      if (dx * dx + dy * dy <= (n.r + 18) * (n.r + 18)) return i;
    }
    return -1;
  }

  function frame(ts) {
    if (!ctx) return;
    if (!t0) t0 = ts;
    var now = reduced ? 10 : (ts - t0) / 1000;

    ctx.clearRect(0, 0, w, h);
    drawGrid();

    for (var i = 0; i < nodes.length - 1; i++) {
      var a = nodes[i];
      var b = nodes[i + 1];
      drawEdge(a, b, Math.min(nodeAlpha(now, a), nodeAlpha(now, b)));
    }

    if (!reduced) {
      var ac = accent();
      for (var p = 0; p < particles.length; p++) {
        var part = particles[p];
        var na = nodes[part.edge];
        var nb = nodes[part.edge + 1];
        if (Math.min(nodeAlpha(now, na), nodeAlpha(now, nb)) < 0.8) continue;
        part.t = (part.t + part.speed * 0.016) % 1;
        var pt = edgePoint(na, nb, part.t);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, part.size, 0, Math.PI * 2);
        ctx.fillStyle = ac;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, part.size * 2.4, 0, Math.PI * 2);
        ctx.globalAlpha = 0.18;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    hover = hitTest(pointer.x, pointer.y);
    for (var n = 0; n < nodes.length; n++) {
      drawNode(nodes[n], nodeAlpha(now, nodes[n]), hover === n, now);
    }

    canvas.style.cursor = hover >= 0 ? "pointer" : "default";
    raf = requestAnimationFrame(frame);
  }

  function onMove(e) {
    var rect = canvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
  }

  function onLeave() {
    pointer.x = -1;
    pointer.y = -1;
    hover = -1;
  }

  function syncLabelsFromI18n() {
    if (!window.GooruI18n || typeof window.GooruI18n.t !== "function") return;
    labels = [
      { label: window.GooruI18n.t("nodePos"), hint: window.GooruI18n.t("nodeHintPos") },
      { label: window.GooruI18n.t("nodeApi"), hint: window.GooruI18n.t("nodeHintApi") },
      { label: window.GooruI18n.t("nodeDocker"), hint: window.GooruI18n.t("nodeHintDocker") },
      { label: window.GooruI18n.t("nodeAdmin"), hint: window.GooruI18n.t("nodeHintAdmin") },
      { label: window.GooruI18n.t("nodeMon"), hint: window.GooruI18n.t("nodeHintMon") },
    ];
  }

  function start() {
    wrap = document.getElementById("contour-stage");
    canvas = document.getElementById("contour-canvas");
    if (!wrap || !canvas) return;
    ctx = canvas.getContext("2d");
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    syncLabelsFromI18n();
    layout();
    if (raf) cancelAnimationFrame(raf);
    t0 = 0;
    raf = requestAnimationFrame(frame);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", layout);
  }

  window.GooruContour = {
    setLabels: function (payload) {
      if (payload && payload.nodes && payload.nodes.length) {
        labels = payload.nodes;
        layout();
      }
    },
    restart: function () {
      t0 = 0;
      layout();
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
