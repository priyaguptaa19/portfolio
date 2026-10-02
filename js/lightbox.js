// Full-size image viewer for case studies. Native <dialog>: Escape, focus trap and focus return come from the browser.
(() => {
  const figs = [...document.querySelectorAll(".sfig")];
  if (!figs.length || !window.HTMLDialogElement) return;

  const dlg = document.createElement("dialog");
  dlg.className = "lb";
  dlg.innerHTML = `<div class="lb-bar"><p class="lb-cap" id="lb-cap"></p>
      <a class="lb-new" target="_blank" rel="noopener">Open in new tab</a>
      <button class="lb-x" type="button" aria-label="Close image" autofocus>Close</button></div>
    <div class="lb-body"><img alt=""></div>`;
  document.body.append(dlg);
  const img = dlg.querySelector("img"), cap = dlg.querySelector(".lb-cap"), nt = dlg.querySelector(".lb-new"), body = dlg.querySelector(".lb-body");

  const open = (src, alt, caption, from) => {
    img.src = src; img.alt = alt || "";
    cap.textContent = caption || alt || "";
    nt.href = src;
    dlg.setAttribute("aria-label", alt || "Image");
    // grow from the clicked frame
    const r = from.getBoundingClientRect();
    dlg.style.setProperty("--ox", ((r.left + r.width / 2) / innerWidth * 100).toFixed(1) + "%");
    dlg.style.setProperty("--oy", ((r.top + r.height / 2) / innerHeight * 100).toFixed(1) + "%");
    dlg.showModal();
    body.scrollTop = 0;
  };
  dlg.querySelector(".lb-x").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); }); // click on the scrim
  dlg.addEventListener("close", () => { img.removeAttribute("src"); });

  figs.forEach((fig) => {
    const im = fig.querySelector("img"); if (!im) return;
    const frame = fig.querySelector(".panbox") || im;
    const caption = (fig.querySelector("figcaption") || {}).textContent;
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "zoom"; btn.dataset.cl = "View image";
    btn.setAttribute("aria-label", "View full size: " + (im.alt || "image"));
    btn.innerHTML = '<span aria-hidden="true">View full size</span>';
    btn.addEventListener("click", () => open(im.currentSrc || im.src, im.alt, caption, frame));
    // the button overlays the image frame
    const host = document.createElement("div"); host.className = "zoomhost";
    frame.parentNode.insertBefore(host, frame); host.append(frame, btn);
  });
})();
