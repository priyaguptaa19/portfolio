(() => {
  const S = window.SITE, $ = (s) => document.querySelector(s);
  const slug = new URLSearchParams(location.search).get("p");
  let k = S.projects.findIndex((p) => p.slug === slug); if (k < 0) k = 0;
  const p = S.projects[k], nx = S.projects[(k + 1) % S.projects.length];
  document.title = `${p.title} - ${S.name}`;

  const hl = (s) => String(s).replace(/\[\[(.+?)\]\]/g, '<span class="hl">$1</span>');
  // next link skips unfinished placeholders; after the last finished project it points back to all work
  const realNext = S.projects.slice(k + 1).concat(S.projects.slice(0, k)).find((x) => !x.sample);
  // closing block: thanks, a way to reach out, then the next finished case study (or back to all work)
  const nextCard = realNext
    ? `<a class="nextcard" href="${realNext.href || "case.html?p=" + realNext.slug}"><div><span class="mono">Next case study &rarr;</span><b>${realNext.title}</b><p>${realNext.blurb}</p></div><div class="nc-img">${window.media(realNext.cardCover || realNext.cover, "Cover image")}</div></a>`
    : `<a class="nextcard solo" href="index.html#work"><div><span class="mono">More case studies on the way</span><b>Back to all work &rarr;</b></div></a>`;
  const nextLink = `<section class="closer"><div class="wrap">
    <p class="thanks">thanks for reading</p>
    ${nextCard}</div></section>`;
  const dimOf = (src) => (window.__dims || {})[src] || [0, 0];
  const plainFig = (b, base) => { const d = dimOf(b.src); return `<figure class="sfig${b.wide ? " wide" : ""}${b.narrow ? " narrow" : ""}"><img src="${base}${b.src}" alt="${b.alt || ""}" loading="lazy" decoding="async"${d[0] ? ` width="${d[0]}" height="${d[1]}"` : ""}>${b.cap ? `<figcaption class="snote">${b.cap}</figcaption>` : ""}</figure>`; };
  const panFig = (b, base) => { const d = dimOf(b.src), r = d[0] / d[1], ar = b.ar || 1.6, arm = b.arm || 0.8; return `<figure class="sfig pan rv"><div class="panbox" style="--ar:${ar};--arm:${arm}"><img src="${base}${b.src}" alt="${b.alt || ""}" loading="lazy" decoding="async" width="${d[0]}" height="${d[1]}" style="--pan-d:${(-Math.max(0, 1 - r / ar) * 100).toFixed(1)}%;--pan-m:${(-Math.max(0, 1 - r / arm) * 100).toFixed(1)}%"></div>${b.cap ? `<figcaption class="snote">${b.cap}</figcaption>` : ""}</figure>`; };
  const renderBlock = (b, base) => {
    switch (b.t) {
      case "p": return `<p class="sp">${hl(b.text)}</p>`;
      case "lead": return `<p class="slead">${hl(b.text)}</p>`;
      case "h3": return `<h3 class="sh3">${hl(b.text)}</h3>`;
      case "note": return `<p class="snote${b.tone === "red" ? " red" : ""}${b.ink ? " ink" : ""}">${hl(b.text)}</p>`;
      case "eyebrow": return `<div class="seyebrow"><span>${b.text}</span><em class="snote">${b.note}</em></div>`;
      case "img": return b.pan ? panFig(b, base) : plainFig(b, base);
      case "gallery": return `<div class="sgal">${b.items.map((x) => plainFig(x, base)).join("")}</div>`;
      case "duo2": return `<div class="sduo even">${plainFig(b.left, base)}${plainFig(b.right, base)}</div>`;
      case "duo": return `<div class="sduo">${b.left.pan ? panFig(b.left, base) : plainFig(b.left, base)}${plainFig(b.right, base)}</div>`;
      case "flow": return `<div class="sflow">${b.chips.map(([t, s], i) => `${i ? '<span class="arr" aria-hidden="true">&rarr;</span>' : ""}<div class="chip"><b>${t}</b><span>${s}</span></div>`).join("")}</div>`;
      case "big": return `<p class="sbig">${b.lines.map((l) => `<span>${hl(l)}</span>`).join("")}</p>`;
      case "versus": return `<div class="sversus">${b.rows.map(([n, t, a, bad]) => `<div class="vr"><span class="vn">${n}</span><s>${t}</s><p>${a}<br><b class="neg">But</b> <b>${bad}</b></p></div>`).join("")}</div>`;
      case "keepcut": return `<div class="skeep"><div><span class="k yes">Possibilities I could keep</span>${b.keep.map((x) => `<p>${x}</p>`).join("")}</div><span class="arr" aria-hidden="true">&rarr;</span><div><span class="k no">Possibilities I could cut</span>${b.cut.map((x) => `<p><s>${x}</s></p>`).join("")}</div></div>`;
      case "pair": return `<div class="spair">${[b.a, b.b].map((x, i) => `${i && b.arrow ? '<span class="arr" aria-hidden="true">&rarr;</span>' : ""}<div class="pc"><span class="k${x.tone === "red" ? " no" : ""}">${x.k}</span><b>${x.h}</b><p>${x.p}</p>${x.q ? `<p class="snote${x.tone === "red" ? " red" : ""}">${x.q}</p>` : ""}</div>`).join("")}</div>`;
      case "model": return `<div class="smodel"><div class="root"><span class="k">${b.root[0]}</span><b>${b.root[1].toUpperCase()}</b><p>${b.root[2]}</p></div><span class="arr" aria-hidden="true">&rarr;</span><div class="kids">${b.items.map(([t, s]) => `<div><b>${t}</b><p>${s}</p></div>`).join("")}</div></div>`;
      case "cards": return `<div class="scards c${b.cols}${b.dark ? " dk" : ""}${b.stat ? " stat" : ""}">${b.items.map(([k, h, p]) => `<div>${k ? `<span class="k">${k}</span>` : ""}<b>${h}</b><p>${p}</p></div>`).join("")}</div>`;
      case "steps": return `<div class="ssteps">${b.items.map(([n, t, p]) => `<div><span class="mono">${n}</span><b>${t}</b><p>${p}</p></div>`).join("")}</div>`;
      case "instead": return `<div class="sinstead">${b.rows.map(([a, z]) => `<div><span class="mono">Instead of</span><p>${a}</p><em class="snote">${z}</em></div>`).join("")}</div>`;
      case "state": return `<div class="sstate"><b>${b.left}</b><em class="snote">${b.right} &rarr;</em></div>`;
      default: return "";
    }
  };
  const renderStory = (p, st) => { window.__dims = st.dims || {}; return `
  <section class="cs-hero"><div class="wrap">
    <a class="link mono" href="index.html#work">&larr; All work</a>
    <h1>${p.title}</h1>
    <p class="lede">${p.blurb}</p>
    <div class="cs-cover" style="view-transition-name:cover-${p.slug}">${window.media(p.cover, "Cover image", p.coverAlt || "")}</div>
    <div class="cs-meta">${[["Role", p.role], ["Timeline", p.time], [p.collabLabel || "Collaboration", p.collab], ["Focus", p.focus]].map(([a, b]) => `<div><span class="mono">${a}</span><b>${b}</b></div>`).join("")}</div>
  </div></section>
  <section><div class="wrap overview">
    <h2 class="sr">The short version</h2>
    <div class="out rv"><span class="mono">The short version</span>${hl(st.summary.outcome)}</div>
    <div class="pair rv"><div><span class="mono">The problem</span><p>${st.summary.problem}</p></div><div><span class="mono">What I did</span><p>${st.summary.approach}</p></div></div>
  </div></section>
  <div class="toc" role="navigation" aria-label="In this story"><div class="wrap"><span class="mono">In this story</span><ol>${st.sections.filter((s) => s.n).map((s) => `<li><a href="#${s.id}"><span class="mono">${s.n}</span>${s.label}</a></li>`).join("")}</ol></div></div>
  ${st.sections.map((s) => `<section class="ss${s.dark ? " dark" : ""}${st.wide ? " wide" : ""}" id="${s.id}"><div class="wrap"><div class="ss-in">
    <aside class="sa">${s.n ? `<span class="mono">${s.n}</span>` : ""}<b>${s.label}</b>${s.note ? `<em class="snote">${s.note}</em>` : ""}</aside>
    <div class="sb">${s.h ? `<h2>${hl(s.h)}</h2>` : ""}${s.lede ? `<p class="slede">${hl(s.lede)}</p>` : ""}${(s.blocks || []).map((b) => renderBlock(b, st.base)).join("")}</div>
  </div></div></section>`).join("")}
  ${nextLink}`; };

  if (p.story && window.STORIES && window.STORIES[p.story]) {
    $("#cs").innerHTML = renderStory(p, window.STORIES[p.story]);
    const desc = p.blurb + " " + window.STORIES[p.story].summary.outcome.replace(/\[\[|\]\]/g, "");
    document.head.insertAdjacentHTML("beforeend", `<meta name="description" content="${desc}"><meta property="og:title" content="${p.title} - ${S.name}"><meta property="og:description" content="${desc}">`);
    document.body.insertAdjacentHTML("afterbegin", '<div class="cs-progress" aria-hidden="true"></div>');
    [".cs-hero h1", ".cs-hero .lede", ".cs-cover", ".cs-meta"].forEach((sel, i) => { const el = $(sel); if (el) { el.classList.add("fade"); el.style.setProperty("--d", (0.05 + i * 0.09) + "s"); } });
    document.querySelectorAll(".sfig, .sbig").forEach((el) => el.classList.add("rv"));
    window.reveal();
    return;
  }

  $("#cs").innerHTML = `
  <section class="cs-hero"><div class="wrap">
    <a class="link mono" href="index.html#work">&larr; All work</a>
    <h1>${p.title}</h1>
    <p class="lede">${p.blurb}</p>
    <div class="cs-cover" style="view-transition-name:cover-${p.slug}">${window.media(p.cover, "Cover image")}</div>
    <div class="cs-meta">${[["Role", p.role], ["Timeline", p.time], ["Team", p.team], ["Tools", p.tools]].map(([a, b]) => `<div><span class="mono">${a}</span><b>${b}</b></div>`).join("")}</div>
  </div></section>
  <section><div class="wrap overview">
    <div class="out rv"><span class="mono">Outcome${p.sample ? ", sample figures" : ""}</span>${p.outcome}</div>
    <div class="pair rv"><div><span class="mono">Problem</span><p>${p.problem}</p></div><div><span class="mono">Solution</span><p>${p.solution}</p></div></div>
  </div></section>
  <section style="padding-top:0"><div class="wrap"><h2>Process</h2>
    <div class="steps">${p.process.map((s, i) => `<div class="step"><span class="n">0${i + 1}</span><div><h3>${s.h}</h3><p>${s.p}</p></div><div class="img">${window.media(s.img, "Process image")}</div></div>`).join("")}</div></div></section>
  <section style="padding-top:0"><div class="wrap"><h2>Impact</h2>
    <div class="impact">${p.impact.map(([a, b]) => `<div><b>${a}</b>${b}</div>`).join("")}</div></div></section>
  <a class="next" href="case.html?p=${nx.slug}"><div class="wrap"><span class="mono">Next project</span><h2>${nx.title} &rarr;</h2></div></a>`;
  [".cs-hero h1", ".cs-hero .lede", ".cs-cover", ".cs-meta"].forEach((sel, i) => { const el = $(sel); if (el) { el.classList.add("fade"); el.style.setProperty("--d", (0.05 + i * 0.09) + "s"); } });
  window.reveal();
})();
