(() => {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);

  // image or labelled placeholder slot
  window.media = (src, label = "Image", alt = "") =>
    src ? `<img src="${src}" alt="${alt}" loading="lazy" decoding="async">` : `<div class="ph mono">${label}</div>`;

  // reveal on scroll
  window.reveal = () => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))), { threshold: .12 });
    document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
  };

  const nav = $("#nav");
  if (nav) nav.innerHTML = `<div class="wrap"><div class="brand">
      <a class="logo" href="index.html" aria-label="${S.name}, home"><svg class="cur" viewBox="0 0 16 22" aria-hidden="true"><path d="M1.5 1.5v15.2l4-3.6 3 7 2.6-1.2-3-6.8h5.4z" fill="currentColor" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg><span class="l1">${S.name.split(" ")[0].toLowerCase()}</span><span class="l2"><span>${S.name.split(" ").slice(1).join(" ").toLowerCase()}</span><i class="fr" aria-hidden="true"><b></b><b></b><b></b><b></b></i></span></a>
      <a class="meet" href="index.html#about" tabindex="-1"><img src="${S.photo}" alt="" width="34" height="34"><span>${S.meetNote}<small>${S.meetSub}</small></span></a>
    </div>
    <ul><li><a href="index.html#work">Work</a></li><li><a href="index.html#about">About</a></li>
    <li class="rs"><a class="btn" href="${S.resume}" target="_blank" rel="noopener">Resume</a><span class="stk-cap" aria-hidden="true"><span class="stk">${S.experience.map((x, k) => '<i style="--k:' + k + '">' + x.where[0] + '</i>').join("")}</span><span>${S.resumeNote}</span></span></li>
    <li><a class="btn solid" href="index.html#contact">Contact</a></li></ul></div>`;

  const f = $("#footer");
  if (f) f.innerHTML = `<div class="wrap" id="contact"><div class="panel">
    <p class="mono avail">${S.available ? "Open to product design roles." : "Not available right now"}</p>
    <h2 class="cta-h"><span class="l1">Let\u2019s <span class="cyc">${S.cycle.map((w, i) => '<span class="cw' + (i ? '' : ' is') + '">' + w + '</span>').join("")}</span></span><span class="l2">something incredible together.</span></h2>
    <div class="cols">
      <div><span class="mono">Email</span><a class="big" href="${S.mailHref}">${S.email}</a></div>
      <div><span class="mono">Call</span><a class="big" href="${S.phoneHref}">${S.phone}</a></div>
      <div><span class="mono">Elsewhere</span><div class="soc">${S.links.map((l) => `<a class="si" href="${l.href}" aria-label="${l.label}" data-tip="${l.label}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${(window.ICONS || {})[l.icon] || ""}"/></svg></a>`).join("")}</div></div>
    </div></div>
    <p class="mono copy">\u00a9 ${new Date().getFullYear()} ${S.name}</p></div>`;
})();
