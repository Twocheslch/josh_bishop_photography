
const ROTATOR_IMAGES = {
  realestate: [
    "images/re-subpage/re-kitchen-island.webp",
    "images/re-subpage/re-kitchen-long.webp",
    "images/re-subpage/re-kitchen.webp",
    "images/re-subpage/re-living-room-chairs.webp",
    "images/re-subpage/re-stairs.webp"
  ],
  clients: [
    "images/company-subpage/comp-big-red.webp",
    "images/company-subpage/comp-filling-gas.webp",
    "images/company-subpage/comp-load-er-up.webp",
    "images/company-subpage/comp-plumbers-crack.webp",
    "images/company-subpage/comp-touching-engine.webp"
  ]
};

function pickRandomIndex(len, excluded = new Set()) {
  if (len <= 1) return 0;
  if (excluded.size >= len) excluded.clear();

  let idx;
  do {
    idx = Math.floor(Math.random() * len);
  } while (excluded.has(idx));
  return idx;
}

function setupTileRotator(tile, images, intervalMs = 5000) {
  const current = tile.querySelector(".slide.current");
  const next = tile.querySelector(".slide.next");
  if (!current || !next || !images || images.length < 2) return;

  // First image is intentional: use whatever is already in the HTML.
  let currentIndex = images.indexOf(current.getAttribute("src"));
  if (currentIndex === -1) {
    currentIndex = 0;
    current.src = images[0];
  }

  let prevIndex = -1;
  let animating = false;

  // Preload images
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Prime next randomly (not current)
  let nextIndex = pickRandomIndex(images.length, new Set([currentIndex]));
  next.src = images[nextIndex];

  function advance() {
    if (animating) return;
    animating = true;

    tile.classList.add("is-animating");

    const onDone = () => {
      prevIndex = currentIndex;
      currentIndex = nextIndex;
      current.src = images[currentIndex];

      tile.classList.remove("is-animating");

      // Random next, avoid current and previous to reduce repeats
      const excluded = new Set([currentIndex, prevIndex]);
      nextIndex = pickRandomIndex(images.length, excluded);
      next.src = images[nextIndex];

      animating = false;
    };

    next.addEventListener("transitionend", onDone, { once: true });
  }

  setInterval(advance, intervalMs);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tile--rotate[data-rotate]").forEach((tile) => {
    const key = tile.getAttribute("data-rotate");
    setupTileRotator(tile, ROTATOR_IMAGES[key], 5000);
  });
});
