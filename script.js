const IMAGES = {
  batman: [
    { src: "https://i.pinimg.com/1200x/3c/2a/e7/3c2ae7d209bcf3bf88f7d4fbbf7b35e0.jpg" },
    { src: "https://i.pinimg.com/originals/62/d6/57/62d657c342b6c9511d35264c03c08552.gif" },
    { src: "https://i.pinimg.com/736x/9a/56/c1/9a56c1c432294adc59a8b56ae0a8c6b0.jpg" },
  ],
  robin: [
    { src: "https://i.pinimg.com/736x/38/7c/3f/387c3f394cff488366cc7726f8a39073.jpg" },
    { src: "https://i.pinimg.com/736x/71/27/be/7127befaa714046c89720fcc13879db6.jpg" },
    { src: "https://i.pinimg.com/736x/2d/d2/5e/2dd25e49a5c34486284a8a60353bafe3.jpg" },
  ],
  nightwing: [
    { src: "https://i.pinimg.com/originals/d5/91/9a/d5919ad8a3db3d1a517be034fc721634.gif" },
    { src: "https://i.pinimg.com/1200x/58/32/f7/5832f790013f153a3a4e41003d0350bb.jpg" },
    { src: "https://i.pinimg.com/736x/18/73/b6/1873b6e9ddc80436a0882d57a6850b6a.jpg" },
  ],
  batgirl: [
    { src: "https://i.pinimg.com/736x/eb/bf/e0/ebbfe0c6c1a12844d01d3de5c1aaafee.jpg" },
    { src: "https://i.pinimg.com/736x/02/60/0f/02600f793723827bcff42928d3064a31.jpg" },
    { src: "https://i.pinimg.com/736x/ec/36/71/ec367162f43f58773f431415b48921fe.jpg" },
  ],
  "batman-beyond": [
    { src: "https://i.pinimg.com/736x/91/a1/aa/91a1aa5e773f068014a9dc2cfb2d59f2.jpg" },
    { src: "https://i.pinimg.com/1200x/87/1a/a2/871aa281382a5a45282855d53d3df2cb.jpg" },
    { src: "https://i.pinimg.com/1200x/79/04/1d/79041d685212724227b40347211d501b.jpg" },
  ],
  batwoman: [
    { src: "https://i.pinimg.com/1200x/0b/e3/1c/0be31c75b38966784be1e4f1ca0e89cf.jpg" },
    { src: "https://i.pinimg.com/1200x/41/31/43/413143aaf85d6b0a95e744d862aa6752.jpg" },
    { src: "https://i.pinimg.com/736x/06/b7/c9/06b7c9a794f513eb8f6d9b2f98369cf7.jpg" },
  ],
  "batgirl-cass-cain": [
    { src: "https://i.pinimg.com/1200x/89/49/0a/89490aa205228f08c6b19a577ea71ff3.jpg" },
    { src: "https://i.pinimg.com/736x/0b/a8/a5/0ba8a5a04214a6abc9baaade032588f3.jpg" },
    { src: "https://i.pinimg.com/736x/32/fe/b3/32feb33559286f039675886e8cafb306.jpg" },
  ],
  "red-hood": [
    { src: "https://i.pinimg.com/736x/41/cc/e9/41cce9dfc75ac251fc8d21ecbe268774.jpg" },
    { src: "https://i.pinimg.com/736x/a0/35/31/a03531f859bd0340b448380d86c819df.jpg" },
    { src: "https://i.pinimg.com/736x/4e/1c/f3/4e1cf3b65b9625fd8ce3aa155f36a8d6.jpg" },
  ],
  spoiler: [
    { src: "https://i.pinimg.com/736x/ae/4a/06/ae4a065ebfbd1c5802dedef56fa5fedc.jpg" },
    { src: "https://i.pinimg.com/1200x/76/ef/23/76ef235b50e0d961f88140f099a37a9d.jpg" },
    { src: "https://i.pinimg.com/1200x/28/44/dc/2844dc13d1070c9897abfd5ce23328c1.jpg" },
  ],
  catwoman: [
    { src: "https://i.pinimg.com/736x/d1/36/bb/d136bbc778757fded4a027b515dc4362.jpg" },
    { src: "https://i.pinimg.com/736x/72/b0/ab/72b0abf0ecede2d341ac5884208df565.jpg" },
    { src: "https://i.pinimg.com/1200x/46/8f/f0/468ff0998a8b18ea3960bb59c2bd853f.jpg" },
  ],
};

function normalizeMember(member) {
  const value = (member || "").trim().toLowerCase().replace(/^#/, "");
  if (!value) return "batman";
  if (IMAGES[value]) return value;
  return "batman";
}

function renderGalleriesOnce() {
  document.querySelectorAll(".gallery[data-member]").forEach((gallery) => {
    const member = gallery.getAttribute("data-member");
    const items = IMAGES[member] || [];
    gallery.innerHTML = items
      .map(
        (item) => `
          <figure>
            <img src="${item.src}" alt="" loading="lazy" />
          </figure>
        `
      )
      .join("");
  });
}

function setActiveTab(member) {
  const safe = normalizeMember(member);

  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    const controls = tab.getAttribute("aria-controls");
    const isActive = controls === `panel-${safe}`;
    tab.setAttribute("aria-selected", isActive ? "true" : "false");
    tab.tabIndex = isActive ? 0 : -1;
  });

  document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
    const isActive = panel.id === `panel-${safe}`;
    panel.setAttribute("aria-hidden", isActive ? "false" : "true");
  });
}

function scrollToPanel(member) {
  const safe = normalizeMember(member);
  const panel = document.getElementById(`panel-${safe}`);
  if (!panel) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  panel.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

function setupTabClicks() {
  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener("click", () => {
      const controls = tab.getAttribute("aria-controls") || "";
      const member = controls.replace(/^panel-/, "");
      setActiveTab(member);
      requestAnimationFrame(() => scrollToPanel(member));
      history.replaceState(null, "", `#${normalizeMember(member)}`);
    });
  });
}

function setupTabKeyboard() {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  if (tabs.length === 0) return;

  function activateByIndex(index) {
    const clamped = ((index % tabs.length) + tabs.length) % tabs.length;
    const controls = tabs[clamped].getAttribute("aria-controls") || "";
    const member = controls.replace(/^panel-/, "");
    setActiveTab(member);
    tabs[clamped].focus();
    requestAnimationFrame(() => scrollToPanel(member));
    history.replaceState(null, "", `#${normalizeMember(member)}`);
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("keydown", (event) => {
      if (
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight" &&
        event.key !== "Home" &&
        event.key !== "End"
      ) {
        return;
      }

      event.preventDefault();
      if (event.key === "Home") activateByIndex(0);
      else if (event.key === "End") activateByIndex(tabs.length - 1);
      else if (event.key === "ArrowLeft") activateByIndex(i - 1);
      else if (event.key === "ArrowRight") activateByIndex(i + 1);
    });
  });
}

function setupHashNavigation() {
  window.addEventListener("hashchange", () => {
    setActiveTab(location.hash);
    requestAnimationFrame(() => scrollToPanel(location.hash));
  });
}

function setupMobileNav() {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".menuToggle");
  const scrim = document.querySelector(".scrim");
  if (!nav || !toggle || !scrim) return;

  function openNav() {
    document.body.classList.add("navOpen");
    scrim.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    document.body.classList.remove("navOpen");
    scrim.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    if (document.body.classList.contains("navOpen")) closeNav();
    else openNav();
  });

  scrim.addEventListener("click", closeNav);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  nav.querySelectorAll('[role="tab"]').forEach((tab) => {
    tab.addEventListener("click", () => {
      closeNav();
    });
  });

  window.addEventListener("hashchange", closeNav);
}

renderGalleriesOnce();
setupTabClicks();
setupTabKeyboard();
setupHashNavigation();
setActiveTab(location.hash);
setupMobileNav();

