const MEDIA = {
  //   List of all photos included in the scroller 
    realestate: [
    "images/re-subpage/re-kitchen-island.webp",
    "images/re-subpage/re-kitchen-long.webp",
    "images/re-subpage/re-kitchen.webp",
    "images/re-subpage/re-living-room-chairs.webp",
    "images/re-subpage/re-stairs.webp",
    "images/re-subpage/re-bathroom_.webp",
    "images/re-subpage/re-hallway-godrays.webp",
    "images/re-subpage/re-master-bedroom-fan.webp",
    "images/re-subpage/re-stove.webp",
  ],
//   List of all photos included in the scroller 
  clients: [
    "images/company-subpage/comp-big-red.webp",
    "images/company-subpage/comp-filling-gas.webp",
    "images/company-subpage/comp-load-er-up.webp",
    "images/company-subpage/comp-plumbers-crack.webp",
    "images/company-subpage/comp-touching-engine.webp"
  ],
  //   List of all videos included in the scroller 
  video: [
    "4sCtvaL4vBQ",
    
  ]
};

let activeKey = null;
let activeType = "image";
let activeIndex = 0;

function qs(id){ return document.getElementById(id); }

function openModal(key, type){
  activeKey = key;
  activeType = type;
  activeIndex = 0;

  const overlay = qs("mediaModal");
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");

  render();
}

function closeModal(){
  const overlay = qs("mediaModal");
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");

  qs("modalVideo").src = "";
}

function clampIndex(i, len){
  if (len <= 0) return 0;
  if (i < 0) return len - 1;
  if (i >= len) return 0;
  return i;
}

function render(){
  const list = MEDIA[activeKey] || [];
  const len = list.length;

  activeIndex = clampIndex(activeIndex, len);

  const title = qs("modalTitle");
  const counter = qs("modalCounter");
  const img = qs("modalImg");
  const wrap = qs("modalVideoWrap");
  const iframe = qs("modalVideo");

  title.textContent =
    activeKey === "realestate" ? "Real Estate" :
    activeKey === "clients" ? "Client Photos" :
    activeKey === "video" ? "Videos" : "Gallery";

  counter.textContent = len ? `${activeIndex + 1} / ${len}` : "0 / 0";

  if (activeType === "video"){
    img.hidden = true;
    wrap.hidden = false;

    const id = list[activeIndex] || "";
    iframe.src = id ? `https://www.youtube.com/embed/${id}` : "";
  } else {
    wrap.hidden = true;
    img.hidden = false;

    img.src = list[activeIndex] || "";
    img.alt = title.textContent + " image";
  }
}

function prev(){
  const list = MEDIA[activeKey] || [];
  activeIndex = clampIndex(activeIndex - 1, list.length);
  render();
}

function next(){
  const list = MEDIA[activeKey] || [];
  activeIndex = clampIndex(activeIndex + 1, list.length);
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = qs("mediaModal");
  const modalWindow = qs("modalWindow");

  document.querySelectorAll("[data-browser][data-type]").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(card.dataset.browser, card.dataset.type);
    });
  });

  qs("modalPrev").addEventListener("click", prev);
  qs("modalNext").addEventListener("click", next);
  qs("modalClose").addEventListener("click", closeModal);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  modalWindow.addEventListener("click", (e) => e.stopPropagation());
});
