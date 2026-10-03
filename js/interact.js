// Case-study interactive: the before/after slider (.scmp).
(() => {
  // ---------- before / after slider
  document.querySelectorAll(".scmp").forEach((fig) => {
    const box = fig.querySelector(".scmp-box"), h = fig.querySelector(".scmp-h");
    const set = (p) => { p = Math.max(0, Math.min(100, p)); fig.style.setProperty("--p", p + "%"); h.setAttribute("aria-valuenow", Math.round(p)); };
    let drag = false;
    const at = (e) => { const r = box.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
    box.addEventListener("pointerdown", (e) => { drag = true; fig.classList.add("drag", "used"); box.setPointerCapture(e.pointerId); at(e); });
    box.addEventListener("pointermove", (e) => { if (drag) at(e); });
    const end = () => { drag = false; fig.classList.remove("drag"); };
    box.addEventListener("pointerup", end); box.addEventListener("pointercancel", end);
    h.addEventListener("keydown", (e) => {
      const v = +h.getAttribute("aria-valuenow"), step = e.shiftKey ? 20 : 5;
      const to = e.key === "ArrowRight" ? v + step : e.key === "ArrowLeft" ? v - step : e.key === "Home" ? 0 : e.key === "End" ? 100 : null;
      if (to === null) return; e.preventDefault(); fig.classList.add("used"); set(to);
    });
    // first view: the handle sweeps in from the edge so it is clear it moves
    set(94);
    new IntersectionObserver(([en], io) => {
      if (!en.isIntersecting) return; io.disconnect();
      setTimeout(() => { if (!fig.classList.contains("used")) set(50); }, 250);
    }, { threshold: .5 }).observe(box);
  });
})();
