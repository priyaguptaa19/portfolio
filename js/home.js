(() => {
  const S = window.SITE, H = S.hero;
  const $ = (s) => document.querySelector(s);
  const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  // hero: headline rises in, a hand-drawn ring draws round one word, the portrait settles,
  // then the notes appear one at a time. The mouse moves each layer a little, by depth.
  let i = 0;
  const wd = (t) => t.split(" ").map((w) => `<span class="w"><span style="--i:${i++}">${w}</span></span>`).join(" ");
  const hl = H.headline;
  const notes = S.notes.map((n, k) => `<div class="hnote" data-depth="${n.depth}" style="left:${n.x}%;top:${n.y}%;--rot:${n.rot}deg;--sp:${(-n.depth * 46).toFixed(0)}px;--d:${(1.6 + k * .22).toFixed(2)}s"><div class="pop"><div class="bob" style="--b:${6 + k * 1.3}s"><span>${n.t}</span></div></div></div>`).join("");
  $("#hero").innerHTML = `<div class="wrap">
    <p class="kicker fade">${H.tag}</p>
    <h1>${wd(hl.l1)} <br>${wd(hl.before)} <span class="ring"><span class="w"><span style="--i:${i++}">${hl.circle}</span></span><svg class="ring-svg" viewBox="0 0 220 110" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" vector-effect="non-scaling-stroke" d="M112 8C160 4 212 22 210 56C208 92 150 104 104 102C52 100 8 84 10 52C12 22 62 8 118 12"/></svg><i class="sel-fr" aria-hidden="true"><b></b><b></b><b></b><b></b></i><span class="cur2" aria-hidden="true"><svg viewBox="0 0 16 22" width="16" height="22"><path d="M1.5 1.5v15.2l4-3.6 3 7 2.6-1.2-3-6.8h5.4z" fill="currentColor" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg><span>${S.first}</span></span></span> ${wd(hl.after)}</h1>
    <p class="sub fade" style="--d:.75s">${H.sub}</p>
    <p class="now fade" style="--d:.95s"><span class="tag"><i></i><span class="l">Currently at </span><b>${S.experience[0].where}</b></span></p>
    <div class="stage">
      <div class="fig-clip"><img class="figure" src="${S.photo}" alt="Portrait of ${S.name}" onerror="this.closest('.stage').classList.add('no-photo')"></div>
      <span class="fig-note" aria-hidden="true">${S.portraitNote}</span>
      ${notes}
    </div></div>`;

  // small screens: the portrait and notes sit below the fold, so hold their entrance until they are seen
  const stage = $(".stage");
  if (stage && matchMedia("(max-width: 860px)").matches && !reduced()) {
    stage.classList.add("wait");
    new IntersectionObserver(([e], io) => { if (e.isIntersecting) { stage.classList.remove("wait"); io.disconnect(); } }, { threshold: .2 }).observe(stage);
  }

  // pointer parallax: figure and notes drift opposite ways, each note by its own depth
  const hero = $("#hero");
  new IntersectionObserver(([e]) => hero.classList.toggle("off", !e.isIntersecting)).observe(hero);
  if (!reduced() && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const layers = [...hero.querySelectorAll(".hnote")].map((el) => ({ el, d: +el.dataset.depth, x: 0, y: 0 }));
    const fig = hero.querySelector(".figure"), f = { x: 0, y: 0 };
    let nx = 0, ny = 0, raf = 0, last = 0;
    const tick = () => {
      const now = performance.now(), dt = Math.min(48, last ? now - last : 16.7); last = now;
      const k = 1 - Math.pow(1 - .07, dt / 16.7);
      let moving = false;
      for (const l of layers) {
        const tx = nx * l.d * 16, ty = ny * l.d * 11;
        l.x += (tx - l.x) * k; l.y += (ty - l.y) * k;
        l.el.style.transform = "translate3d(" + l.x.toFixed(2) + "px," + l.y.toFixed(2) + "px,0)";
        if (Math.abs(tx - l.x) + Math.abs(ty - l.y) > .05) moving = true;
      }
      f.x += (-nx * 5 - f.x) * k; f.y += (-ny * 3 - f.y) * k;
      fig.style.setProperty("--fx", f.x.toFixed(2) + "px"); fig.style.setProperty("--fy", f.y.toFixed(2) + "px");
      raf = moving ? requestAnimationFrame(tick) : (last = 0);
    };
    hero.addEventListener("pointermove", (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      nx = (e.clientX - r.left) / r.width * 2 - 1; ny = (e.clientY - r.top) / r.height * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    });
    hero.addEventListener("pointerleave", () => { nx = ny = 0; if (!raf) raf = requestAnimationFrame(tick); });
  }

  // nav: highlight the section in view. Recomputed from positions each time a section crosses the
  // reading line, so it behaves the same scrolling down or back up.
  const secs = [["work", "work"], ["about", "about"], ["exp", "about"]].map(([id, nav]) => [document.getElementById(id), nav]).filter(([el]) => el);
  const links = [...document.querySelectorAll("nav ul a")];
  const markNav = () => {
    const line = innerHeight * .4; let cur = "";
    for (const [el, nav] of secs) { const r = el.getBoundingClientRect(); if (r.top <= line && r.bottom > line) cur = nav; }
    links.forEach((x) => { const on = !!cur && x.getAttribute("href").endsWith("#" + cur); x.toggleAttribute("aria-current", on); if (on) x.setAttribute("aria-current", "true"); });
  };
  const navIO = new IntersectionObserver(markNav, { rootMargin: "-40% 0px -59% 0px" });
  secs.forEach(([el]) => navIO.observe(el));
  addEventListener("resize", markNav);
  markNav();
  // work grid: large covers. Hover shows the result, click opens the case study. Grows with the project count.
  const deck = $("#deck");
  $("#work-title").textContent = S.work.title;
  $("#work-hint").textContent = S.work.hint;
  const list = S.projects.filter((p) => S.showSamples || !p.sample);
  deck.classList.toggle("one", list.length === 1);
  deck.classList.toggle("two", list.length === 2);
  deck.innerHTML = list.map((p, k) => `
    <a class="pcard${k === 0 && list.length !== 2 ? " feat" : ""} rv" data-cl="Open project" href="${p.href || "case.html?p=" + p.slug}" style="transition-delay:${Math.min(k, 3) * 70}ms" aria-label="${p.title}: ${p.metric} ${p.metricShort}. Read the case study.">
      <div class="pc-img" style="view-transition-name:cover-${p.slug}">${window.media(p.cover, "Cover image")}
        <div class="more" aria-hidden="true"><span class="mono">${p.type}</span><div class="big">${p.metric}</div><p class="lbl">${p.metricLabel}</p><p class="role">${p.role}, ${p.time}</p><span class="rd">Read case study &rarr;</span></div>
      </div>
      <div class="pc-meta"><span class="mono num">#${String(k + 1).padStart(3, "0")}</span>
        <div><h3>${p.title}</h3><p>${p.blurb}</p></div>
        <span class="chip2"><b>${p.metric}</b> ${p.metricShort}</span></div>
    </a>`).join("");

  // about
  const seg = (a) => a.map((s) => { const w = s.t.split(" ").map((x) => `<span class="wd">${x}</span>`).join(" "); return s.tone === "hl" ? `<span class="hl">${w}</span>` : w; }).join("");
  $("#about").innerHTML = `<div class="wrap"><h2>About</h2><div class="about">
      <div class="photo"><img src="${S.photoAbout}" alt="${S.name}" loading="lazy" onerror="this.parentNode.classList.add('no-photo')"><span class="ph-label mono">Add your portrait at assets/priya.webp</span></div>
      <div class="about-text">${S.about.map((p) => `<p>${seg(p)}</p>`).join("")}</div></div>
    <div class="toolkit"><span class="mono">Toolkit</span><ul>${S.tools.map((x) => `<li class="tool" style="--c:${x.hex}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${(window.ICONS || {})[x.icon] || ""}"/></svg><span>${x.n}</span></li>`).join("")}</ul></div></div></div>`;

  // browsers without scroll-driven animation: light the about words as they scroll into view
  if (!reduced() && !(window.CSS && CSS.supports && CSS.supports("animation-timeline", "view()"))) {
    const words = [...document.querySelectorAll(".about-text .wd")];
    document.querySelector(".about-text").classList.add("lit-js");
    const wio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("on"); wio.unobserve(e.target); } }), { rootMargin: "0px 0px -12% 0px" });
    words.forEach((w, i) => { w.style.transitionDelay = (i % 14) * 25 + "ms"; wio.observe(w); });
  }

  // experience
  $("#exp").innerHTML = `<div class="wrap"><h2>Experience</h2>
    <ul class="xp">${S.experience.map((x) => `<li><h3>${x.where}</h3><p class="res">${x.result}</p><div class="xmeta"><b>${x.role}</b><span class="mono">${x.when}</span></div></li>`).join("")}</ul></div>`;

  // work cards replay each time they scroll into view, down or up
  const cardIO = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)), { threshold: .12 });
  document.querySelectorAll(".pcard").forEach((el) => cardIO.observe(el));

  window.reveal();
})();
