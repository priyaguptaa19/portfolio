(() => {
  const S = window.SITE, host = document.getElementById("exp");
  if (!host) return;
  const eras = S.experience.slice().reverse();
  const N = eras.length;
  const wrap = host.querySelector(".wrap");
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tints = ["var(--c-coral)", "var(--c-mint)", "var(--c-butter)", "var(--c-periwinkle)"];
  const years = [...eras.map((e) => e.when.split(" - ")[0]), "Now"];

  wrap.querySelector(".xp").insertAdjacentHTML("beforebegin", `<div class="tl" id="tl">
    <div class="tl-board">
      <div class="tl-blobs" aria-hidden="true"></div>
      <svg class="tl-svg" aria-hidden="true"><path class="tl-line"/>${eras.map(() => '<circle class="tl-dot" r="4"/>').join("")}</svg>
      <ol class="tl-years" aria-hidden="true">${years.map((y) => `<li>${y}</li>`).join("")}</ol>
      ${eras.map((e, i) => `<button type="button" class="tl-zone" data-i="${i}" aria-label="${e.when}: ${e.role}, ${e.where}. ${e.result}"></button>`).join("")}
      <div class="tl-head" aria-hidden="true"><h3></h3><p class="tl-role mono"></p><p class="tl-cap"></p></div>
      <div class="tl-knob" aria-hidden="true"><span>&lsaquo;&rsaquo;</span></div>
      <span class="tl-hint" aria-hidden="true">drag me</span>
    </div></div>`);

  const board = host.querySelector(".tl-board"), line = board.querySelector(".tl-line"), svg = board.querySelector(".tl-svg");
  const dots = [...board.querySelectorAll(".tl-dot")], yrs = [...board.querySelectorAll(".tl-years li")];
  const zones = [...board.querySelectorAll(".tl-zone")], head = board.querySelector(".tl-head"), knob = board.querySelector(".tl-knob");
  const hint = board.querySelector(".tl-hint"), blobs = board.querySelector(".tl-blobs");
  let ease = .14, hw = 0, last = 0, W = 0, H = 0, base = 0, amp = 0, sig = 100, x = 0, tx = 0, act = -1, dragging = false, raf = 0, used = false, started = false;
  const mid = (i) => (i + .5) / N * W;
  const yAt = (px) => base - amp * Math.exp(-(((px - x) / sig) ** 2));

  const draw = () => {
    let d = "M0 " + base;
    for (let p = 0; p <= W; p += 4) d += "L" + p + " " + yAt(p).toFixed(1);
    line.setAttribute("d", d);
    dots.forEach((c, i) => { const cx = mid(i); c.setAttribute("cx", cx); c.setAttribute("cy", yAt(cx).toFixed(1)); c.style.opacity = act === i ? 0 : 1; });
    const ky = yAt(x);
    knob.style.transform = `translate3d(${x.toFixed(1)}px,${ky.toFixed(1)}px,0) translate(-50%,-50%)`;
    const hx = Math.min(W - hw / 2 - 8, Math.max(hw / 2 + 8, x));
    head.style.transform = `translate3d(${hx.toFixed(1)}px,${(ky - 34).toFixed(1)}px,0) translate(-50%,-100%)`;
    hint.style.transform = `translate3d(${x.toFixed(1)}px,${(ky + 40).toFixed(1)}px,0) translate(-50%,0)`;
  };
  const tick = () => {
    const now = performance.now(), dt = Math.min(48, last ? now - last : 16.7); last = now;
    const k = reduced() || dragging ? 1 : 1 - Math.pow(1 - ease, dt / 16.7);
    x += (tx - x) * k;
    draw();
    raf = Math.abs(tx - x) > .3 ? requestAnimationFrame(tick) : (x = tx, last = 0, ease = .14, draw(), 0);
  };
  const go = () => { if (!raf) raf = requestAnimationFrame(tick); };

  const setEra = (i) => {
    if (i === act) return;
    act = i; const e = eras[i];
    head.querySelector("h3").textContent = e.where;
    head.querySelector(".tl-role").textContent = e.role + ", " + e.when;
    head.querySelector(".tl-cap").textContent = e.result;
    head.classList.remove("swap"); hw = head.offsetWidth; head.classList.add("swap");
    zones.forEach((z, k) => z.toggleAttribute("aria-current", k === i));
    const side = mid(i) > W * .5 ? -1 : 1;
    blobs.innerHTML = (e.stats || []).map(([a, b], k) => {
      const bx = Math.min(W - 70, Math.max(70, mid(i) + side * (k ? 250 : 175) * (k ? -1 : 1))), by = k ? H * .56 : H * .3;
      return `<span class="tl-blob" style="left:${bx.toFixed(0)}px;top:${by.toFixed(0)}px;--rot:${k ? 7 : -8}deg;--bg:${tints[(i + k) % 4]};--dl:${k * 90}ms"><b>${a}</b><i>${b}</i></span>`;
    }).join("");
    draw();
  };
  const nearest = (px) => Math.max(0, Math.min(N - 1, Math.floor(px / W * N)));
  const to = (i) => { used = true; board.classList.add("used"); tx = mid(i); setEra(i); go(); };

  const measure = () => {
    const r = board.getBoundingClientRect(); W = r.width; H = r.height;
    base = H - 56; amp = Math.min(150, H * .34); sig = Math.max(70, Math.min(130, W * .07));
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    yrs.forEach((li, i) => { li.style.left = i / N * W + "px"; li.style.top = base + 18 + "px"; });
    zones.forEach((z, i) => { z.style.left = i / N * W + "px"; z.style.width = W / N + "px"; });
    if (act >= 0) { x = tx = mid(act); const a = act; act = -1; setEra(a); } else { x = tx = mid(0); draw(); }
  };
  new ResizeObserver(() => { if (board.offsetParent) measure(); }).observe(board);

  zones.forEach((z, i) => {
    z.addEventListener("click", () => to(i));
    z.addEventListener("focus", () => to(i));
    z.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && !dragging) to(i); });
  });
  knob.addEventListener("pointerdown", (e) => { dragging = true; used = true; board.classList.add("used", "drag"); knob.setPointerCapture(e.pointerId); e.preventDefault(); });
  knob.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const r = board.getBoundingClientRect(); tx = Math.max(0, Math.min(W, e.clientX - r.left)); setEra(nearest(tx)); go();
  });
  const drop = () => { if (!dragging) return; dragging = false; board.classList.remove("drag"); to(act); };
  knob.addEventListener("pointerup", drop); knob.addEventListener("pointercancel", drop);

  // first view: start at the first job, then glide to the current one
  measure(); setEra(0);
  let timer = 0;
  if (!reduced()) svg.classList.add("pre");
  new IntersectionObserver(([en]) => {
    if (en.intersectionRatio >= .5) {
      if (started) return; started = true;
      svg.classList.remove("pre");
      timer = setTimeout(() => { if (!used) { ease = .045; tx = mid(N - 1); setEra(N - 1); go(); } }, reduced() ? 0 : 1000);
    } else if (en.intersectionRatio === 0 && started) {
      started = false; used = false; clearTimeout(timer);
      if (!reduced()) svg.classList.add("pre");
      ease = .14; tx = x = mid(0); act = -1; setEra(0); board.classList.remove("used"); go();
    }
  }, { threshold: [0, .5] }).observe(board);
})();

// phone version: the same idea turned on its side. The line runs down, the bump bulges right.
(() => {
  const S = window.SITE, host = document.getElementById("exp");
  if (!host || !host.querySelector(".xp")) return;
  const eras = S.experience.slice().reverse(), N = eras.length;
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const years = [...eras.map((e) => e.when.split(" - ")[0]), "Now"];
  host.querySelector(".xp").insertAdjacentHTML("beforebegin", `<div class="tlv">
    <div class="tl-board v">
      <svg class="tl-svg" aria-hidden="true"><path class="tl-line"/>${eras.map(() => '<circle class="tl-dot" r="4"/>').join("")}</svg>
      <ol class="tl-years" aria-hidden="true">${years.map((y) => `<li>${y}</li>`).join("")}</ol>
      ${eras.map((e, i) => `<button type="button" class="tl-zone" data-i="${i}" aria-label="${e.when}: ${e.role}, ${e.where}. ${e.result}"></button>`).join("")}
      <div class="tl-head" aria-hidden="true"><h3></h3><p class="tl-role mono"></p><p class="tl-cap"></p></div>
      <div class="tl-knob" aria-hidden="true"><span>&#8597;</span></div>
    </div></div>`);
  const board = host.querySelector(".tlv .tl-board"), line = board.querySelector(".tl-line"), svg = board.querySelector(".tl-svg");
  const dots = [...board.querySelectorAll(".tl-dot")], yrs = [...board.querySelectorAll(".tl-years li")];
  const zones = [...board.querySelectorAll(".tl-zone")], head = board.querySelector(".tl-head"), knob = board.querySelector(".tl-knob");
  const X0 = 76, AMP = 30, SIG = 64;
  let easeV = .16, hh = 0, lastv = 0, W = 0, H = 0, y = 0, ty = 0, act = -1, dragging = false, raf = 0, used = false, started = false;
  const mid = (i) => (i + .5) / N * H;
  const xAt = (py) => X0 + AMP * Math.exp(-(((py - y) / SIG) ** 2));

  const draw = () => {
    let d = "M" + X0 + " 0";
    for (let p = 0; p <= H; p += 4) d += "L" + xAt(p).toFixed(1) + " " + p;
    line.setAttribute("d", d);
    dots.forEach((c, i) => { const cy = mid(i); c.setAttribute("cx", xAt(cy).toFixed(1)); c.setAttribute("cy", cy); c.style.opacity = act === i ? 0 : 1; });
    const kx = xAt(y);
    knob.style.transform = `translate3d(${kx.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-50%)`;
    const hx = kx + 34, hy = Math.min(H - hh, Math.max(0, y - hh / 2));
    head.style.width = Math.max(120, W - hx - 4) + "px";
    head.style.transform = `translate3d(${hx.toFixed(1)}px,${hy.toFixed(1)}px,0)`;
  };
  const tick = () => {
    const now = performance.now(), dt = Math.min(48, lastv ? now - lastv : 16.7); lastv = now;
    y += (ty - y) * (reduced() || dragging ? 1 : 1 - Math.pow(1 - easeV, dt / 16.7)); draw();
    raf = Math.abs(ty - y) > .3 ? requestAnimationFrame(tick) : (y = ty, lastv = 0, easeV = .16, draw(), 0);
  };
  const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
  const setEra = (i) => {
    if (i === act) return;
    act = i; const e = eras[i];
    head.querySelector("h3").textContent = e.where;
    head.querySelector(".tl-role").textContent = e.role + ", " + e.when;
    head.querySelector(".tl-cap").textContent = e.result;
    head.classList.remove("swap"); head.style.width = Math.max(120, W - 160) + "px"; hh = head.offsetHeight; head.classList.add("swap");
    zones.forEach((z, k) => z.toggleAttribute("aria-current", k === i));
    draw();
  };
  const to = (i) => { used = true; board.classList.add("used"); ty = mid(i); setEra(i); go(); };
  const measure = () => {
    const r = board.getBoundingClientRect(); W = r.width; H = r.height;
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    yrs.forEach((li, i) => { li.style.top = i / N * H + "px"; });
    zones.forEach((z, i) => { z.style.top = i / N * H + "px"; z.style.height = H / N + "px"; });
    if (act >= 0) { y = ty = mid(act); const a = act; act = -1; setEra(a); } else { y = ty = mid(0); setEra(0); }
  };
  new ResizeObserver(() => { if (board.offsetParent) measure(); }).observe(board);
  zones.forEach((z, i) => { z.addEventListener("click", () => to(i)); z.addEventListener("focus", () => to(i)); });
  knob.addEventListener("pointerdown", (e) => { dragging = true; used = true; board.classList.add("used", "drag"); knob.setPointerCapture(e.pointerId); e.preventDefault(); });
  knob.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const r = board.getBoundingClientRect(); ty = Math.max(0, Math.min(H, e.clientY - r.top));
    setEra(Math.max(0, Math.min(N - 1, Math.floor(ty / H * N)))); go();
  });
  const drop = () => { if (!dragging) return; dragging = false; board.classList.remove("drag"); to(act); };
  knob.addEventListener("pointerup", drop); knob.addEventListener("pointercancel", drop);
  let timer = 0;
  if (!reduced()) svg.classList.add("pre");
  new IntersectionObserver(([en]) => {
    if (en.intersectionRatio >= .4) {
      if (started) return; started = true;
      svg.classList.remove("pre");
      timer = setTimeout(() => { if (!used) { easeV = .045; ty = mid(N - 1); setEra(N - 1); go(); } }, reduced() ? 0 : 1000);
    } else if (en.intersectionRatio === 0 && started) {
      started = false; used = false; clearTimeout(timer);
      if (!reduced()) svg.classList.add("pre");
      easeV = .16; ty = y = mid(0); act = -1; setEra(0); board.classList.remove("used"); go();
    }
  }, { threshold: [0, .4] }).observe(board);
})();
