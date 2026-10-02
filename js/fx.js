// Small premium touches: footer verb cycle, magnetic primary buttons.
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  // footer: the verb swaps with a soft blur, only while the footer is on screen
  const cyc = document.querySelector(".cyc");
  if (cyc && !reduced) {
    const words = [...cyc.children];
    let i = 0, timer = 0;
    const step = () => {
      const cur = words[i]; i = (i + 1) % words.length; const next = words[i];
      cur.classList.remove("is", "in"); cur.classList.add("out");
      next.classList.remove("out"); next.classList.add("in");
      setTimeout(() => cur.classList.remove("out"), 700);
    };
    new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(step, 2600);
    }, { threshold: .3 }).observe(cyc);
  }

  // magnetic primary buttons: lean a few pixels toward the pointer
  if (fine && !reduced) document.querySelectorAll(".btn.solid").forEach((el) => {
    el.classList.add("mag");
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.translate = ((e.clientX - r.left - r.width / 2) * .22).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * .3).toFixed(1) + "px";
    });
    el.addEventListener("pointerleave", () => { el.style.translate = ""; });
  });
})();
