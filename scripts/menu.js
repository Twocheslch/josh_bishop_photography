document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("site-nav");
  if (!btn || !nav) return;

  function setOpen(open){
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  btn.addEventListener("click", () => {
    const open = !nav.classList.contains("is-open");
    setOpen(open);
  });

  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(e.target) || btn.contains(e.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });
});
