// Site pointer (mouse only): a small circle that inverts against whatever is behind it (mix-blend-mode: difference).
// Over key elements it gives way to a label saying what a click does. Touch and the full-size image viewer keep the system cursor.
(() => {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  // two top-level elements: the circle must blend with the page, so it cannot sit inside the label's stacking context
  const dot = document.createElement("div"), lab = document.createElement("div");
  dot.className = "pt-d"; lab.className = "pt-l";
  dot.setAttribute("aria-hidden", "true"); lab.setAttribute("aria-hidden", "true");
  document.body.append(dot, lab);
  document.documentElement.classList.add("has-cl");

  // contexts: [selector, label]. data-cl on any element also works.
  const AUTO = [['a[href^="mailto:"]', "Say hi"], ['a[href$=".pdf"]', "Open resume"], ['a[href^="tel:"]', "Call"]];
  const labelFor = (t) => {
    const d = t.closest("[data-cl]"); if (d) return d.dataset.cl;
    for (const [sel, txt] of AUTO) if (t.closest(sel)) return txt;
    return "";
  };
  let shown = false, text = "", act = false;
  const hide = () => { if (shown) { shown = false; dot.classList.remove("on"); lab.classList.remove("on"); } };
  document.addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return hide();
    if (document.querySelector("dialog[open]")) return hide();
    const t = e.target, l = t.closest ? labelFor(t) : "", a = !!(t.closest && t.closest("a, button, [role=button], summary"));
    if (l !== text) { text = l; lab.textContent = l; lab.classList.toggle("on", !!l && shown); dot.classList.toggle("off", !!l); }
    if (a !== act) { act = a; dot.classList.toggle("act", a); }
    const x = e.clientX + "px", y = e.clientY + "px";
    dot.style.setProperty("--x", x); dot.style.setProperty("--y", y);
    lab.style.setProperty("--x", x); lab.style.setProperty("--y", y);
    if (!shown) { shown = true; dot.classList.add("on"); if (text) lab.classList.add("on"); }
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", hide);
  addEventListener("blur", hide);
})();
