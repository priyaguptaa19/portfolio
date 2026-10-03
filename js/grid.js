// Hero grid: hidden until the pointer is near. Nodes are pulled toward the pointer with a slight swirl,
// so the mesh twists around it, then springs back. The canvas only runs while something is visible.
(() => {
  const hero = document.querySelector("#hero");
  if (!hero) return;
  // Reduced motion: still reveal the grid under the mouse, but keep it still (no pull, no twist).
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cv = document.createElement("canvas");
  cv.className = "grid-cv";
  cv.setAttribute("aria-hidden", "true");
  hero.prepend(cv);
  const ctx = cv.getContext("2d");

  const GAP = 44, REACH = 165, PULL = calm ? 0 : .34, SWIRL = calm ? 0 : .17;
  let W = 0, H = 0, cols = 0, rows = 0, pts = [], raf = 0, color = "44,68,255";
  const ptr = { x: -9999, y: -9999, on: false };
  let vis = 0; // overall visibility, eases in and out with hover

  const hexToRgb = (h) => {
    h = h.trim().replace("#", "");
    if (h.length === 3) h = [...h].map((c) => c + c).join("");
    const n = parseInt(h, 16);
    return [n >> 16, (n >> 8) & 255, n & 255].join(",");
  };

  const build = () => {
    const r = hero.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / GAP) + 2; rows = Math.ceil(H / GAP) + 2;
    const ox = (W - (cols - 1) * GAP) / 2, oy = (H - (rows - 1) * GAP) / 2;
    pts = [];
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) pts.push({ x: ox + i * GAP, y: oy + j * GAP, dx: 0, dy: 0, vx: 0, vy: 0 });
  };

  const alphaAt = (x, y) => {
    const d = Math.hypot(x - ptr.x, y - ptr.y);
    return d > REACH * 1.25 ? 0 : Math.pow(1 - d / (REACH * 1.25), 1.4) * vis;
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    const at = (i, j) => pts[j * cols + i];
    const seg = (a, b) => {
      const ax = a.x + a.dx, ay = a.y + a.dy, bx = b.x + b.dx, by = b.y + b.dy;
      const al = alphaAt((ax + bx) / 2, (ay + by) / 2) * .38;
      if (al < .015) return;
      ctx.strokeStyle = "rgba(" + color + "," + al + ")";
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
    };
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      if (i < cols - 1) seg(at(i, j), at(i + 1, j));
      if (j < rows - 1) seg(at(i, j), at(i, j + 1));
    }
    for (const p of pts) {
      const x = p.x + p.dx, y = p.y + p.dy, al = alphaAt(x, y);
      if (al < .03) continue;
      ctx.fillStyle = "rgba(" + color + "," + Math.min(1, al * .8) + ")";
      ctx.beginPath(); ctx.arc(x, y, 1 + al * .7, 0, 6.283); ctx.fill();
    }
  };

  const step = () => {
    vis += ((ptr.on ? 1 : 0) - vis) * (ptr.on ? .14 : .08);
    let energy = 0;
    for (const p of pts) {
      let tx = 0, ty = 0;
      if (ptr.on) {
        const ax = ptr.x - p.x, ay = ptr.y - p.y, d = Math.hypot(ax, ay);
        if (d < REACH) {
          const f = Math.pow(1 - d / REACH, 2);
          tx = (ax * PULL - ay * SWIRL) * f;
          ty = (ay * PULL + ax * SWIRL) * f;
        }
      }
      p.vx = (p.vx + (tx - p.dx) * .14) * .76;
      p.vy = (p.vy + (ty - p.dy) * .14) * .76;
      p.dx += p.vx; p.dy += p.vy;
      energy += Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.dx) + Math.abs(p.dy);
    }
    draw();
    if (ptr.on || vis > .01 || energy > 1) raf = requestAnimationFrame(step);
    else { raf = 0; ctx.clearRect(0, 0, W, H); }
  };

  const wake = () => { if (!raf) raf = requestAnimationFrame(step); };

  const track = (e) => {
    const r = hero.getBoundingClientRect();
    ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top;
    if (!ptr.on) color = hexToRgb(getComputedStyle(document.documentElement).getPropertyValue("--accent") || "#2c44ff");
    ptr.on = true; wake();
  };
  hero.addEventListener("pointermove", track);
  hero.addEventListener("pointerdown", track);
  hero.addEventListener("pointerleave", () => { ptr.on = false; wake(); });
  // a finger lifts away, so let the grid fade a moment later
  const lift = (e) => { if (e.pointerType === "touch") setTimeout(() => { ptr.on = false; wake(); }, 450); };
  hero.addEventListener("pointerup", lift);
  hero.addEventListener("pointercancel", lift);

  build();
  new ResizeObserver(build).observe(hero);
})();
