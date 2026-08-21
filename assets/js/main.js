// Smart Dynamic Header & Footer Loader
async function loadIncludes() {
  const isSubPage = window.location.pathname.includes("/pages/");
  const basePath = isSubPage ? "../includes/" : "includes/";

  // 1. Load Header
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    try {
      const response = await fetch(basePath + "header.html");
      if (response.ok) {
        let html = await response.text();
        if (isSubPage) {
          html = html
            .replaceAll('href="index.html"', 'href="../index.html"')
            .replaceAll('href="pages/', 'href="')
            .replaceAll('src="assets/', 'src="../assets/');
        }
        headerPlaceholder.innerHTML = html;

        // Set Active Link Status automatically
        setActiveNavLink();

        // Re-bind Mobile Toggle Menu
        const menuToggle = document.querySelector(".menu-toggle");
        const navMenu = document.querySelector(".nav-menu");
        if (menuToggle && navMenu) {
          menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
          });
        }
      }
    } catch (err) {
      console.error("Header Load Error:", err);
    }
  }

  // 2. Load Footer
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    try {
      const response = await fetch(basePath + "footer.html");
      if (response.ok) {
        let html = await response.text();
        if (isSubPage) {
          html = html
            .replaceAll('href="index.html"', 'href="../index.html"')
            .replaceAll('href="pages/', 'href="')
            .replaceAll('src="assets/', 'src="../assets/');
        }
        footerPlaceholder.innerHTML = html;

        // Fetch Visitors Count right after footer HTML is rendered
        fetchVisitorCount();
      }
    } catch (err) {
      console.error("Footer Load Error:", err);
    }
  }
}

// Fetch Live Total Visitors Count
function fetchVisitorCount() {
  const visitorElement = document.getElementById("visitor-count");
  if (!visitorElement) return;

  fetch("https://api.counterapi.dev/v1/softsolutionkhi/visits/up")
    .then((response) => response.json())
    .then((data) => {
      if (data && data.count) {
        visitorElement.innerText = data.count.toLocaleString();
      } else {
        visitorElement.innerText = "100";
      }
    })
    .catch(() => {
      // اگر API بلاک ہو تو فال بیک ویلیو شو ہوگی
      visitorElement.innerText = "150";
    });
}

// Highlight Current Active Page Link
function setActiveNavLink() {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", loadIncludes);

/* ==========================================================================
   FlyScout Mobile App Screenshot Slider
   ========================================================================== */

const flyscoutScreenshots = [
  "../assets/images/flyscout_1.png",
  "../assets/images/flyscout_2.png",
  "../assets/images/flyscout_3.png",
  "../assets/images/flyscout_4.png",
  "../assets/images/flyscout_5.png",
  "../assets/images/flyscout_6.png",
  "../assets/images/flyscout_7.png",
  "../assets/images/flyscout_8.png",
  "../assets/images/flyscout_9.png",
];

let flyscoutCurrent = 0;

function changeFlyScoutScreenshot(direction) {
  flyscoutCurrent += direction;

  if (flyscoutCurrent < 0) {
    flyscoutCurrent = flyscoutScreenshots.length - 1;
  }

  if (flyscoutCurrent >= flyscoutScreenshots.length) {
    flyscoutCurrent = 0;
  }

  const image = document.getElementById("flyscoutScreenshot");

  if (!image) return;

  image.src = flyscoutScreenshots[flyscoutCurrent];

  updateFlyScoutDots();
}

function goToFlyScoutScreenshot(index) {
  flyscoutCurrent = index;

  const image = document.getElementById("flyscoutScreenshot");

  if (!image) return;

  image.src = flyscoutScreenshots[flyscoutCurrent];

  updateFlyScoutDots();
}

function updateFlyScoutDots() {
  const dotsContainer = document.getElementById("flyscoutDots");

  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";

  flyscoutScreenshots.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.className =
      "phone-slider-dot" + (index === flyscoutCurrent ? " active" : "");

    dot.onclick = () => goToFlyScoutScreenshot(index);

    dotsContainer.appendChild(dot);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateFlyScoutDots();
});

/* ==========================================================================
   Halal Life Mobile App Screenshot Slider
   ========================================================================== */

const halalLifeScreenshots = [
  "../assets/images/halal_life_1.jpeg",
  "../assets/images/halal_life_2.jpeg",
  "../assets/images/halal_life_3.jpeg",
  "../assets/images/halal_life_4.jpeg",
  "../assets/images/halal_life_5.jpeg",
  "../assets/images/halal_life_6.jpeg",
  "../assets/images/halal_life_7.jpeg",
  "../assets/images/halal_life_8.jpeg",
  "../assets/images/halal_life_9.jpeg",
];

let halalLifeCurrent = 0;

function changeHalalLifeScreenshot(direction) {
  halalLifeCurrent += direction;

  if (halalLifeCurrent < 0) {
    halalLifeCurrent = halalLifeScreenshots.length - 1;
  }

  if (halalLifeCurrent >= halalLifeScreenshots.length) {
    halalLifeCurrent = 0;
  }

  const image = document.getElementById("halalLifeScreenshot");

  if (!image) return;

  image.src = halalLifeScreenshots[halalLifeCurrent];

  updateHalalLifeDots();
}

function goToHalalLifeScreenshot(index) {
  halalLifeCurrent = index;

  const image = document.getElementById("halalLifeScreenshot");

  if (!image) return;

  image.src = halalLifeScreenshots[halalLifeCurrent];

  updateHalalLifeDots();
}

function updateHalalLifeDots() {
  const dotsContainer = document.getElementById("halalLifeDots");

  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";

  halalLifeScreenshots.forEach((_, index) => {
    const dot = document.createElement("span");

    dot.className =
      "phone-slider-dot" + (index === halalLifeCurrent ? " active" : "");

    dot.onclick = () => goToHalalLifeScreenshot(index);

    dotsContainer.appendChild(dot);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateHalalLifeDots();
});
