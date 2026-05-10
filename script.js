const heartsContainer = document.querySelector(".falling-hearts");
const heroPhoto = document.getElementById("heroPhoto");
const photoFallback = document.getElementById("photoFallback");
const openLetterButton = document.getElementById("openLetter");
const closeLetterButton = document.getElementById("closeLetterButton");
const closeLetterBackdrop = document.getElementById("closeLetterBackdrop");
const letterModal = document.getElementById("letterModal");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

const fallingItems = [
  "\u{1F497}",
  "\u{1F496}",
  "\u{1F495}",
  "\u{1F49E}",
  "\u{1F338}",
  "\u{1F490}",
  "\u{1FAF6}",
];

let musicStarted = false;

async function startMusic() {
  if (musicStarted) {
    return;
  }

  backgroundMusic.volume = 0.42;

  try {
    await backgroundMusic.play();
    musicStarted = true;
    musicToggle.textContent = "Muzigi Kapat";
    musicToggle.setAttribute("aria-pressed", "true");
  } catch (error) {}
}

startMusic();

["pointerdown", "touchstart", "keydown"].forEach((eventName) => {
  window.addEventListener(eventName, startMusic, { once: true });
});

function createHeartPiece() {
  const piece = document.createElement("span");
  piece.className = "heart-piece";
  piece.textContent = fallingItems[Math.floor(Math.random() * fallingItems.length)];
  piece.style.left = `${Math.random() * 100}%`;
  piece.style.setProperty("--size", `${(Math.random() * 1.3 + 1).toFixed(2)}rem`);
  piece.style.setProperty("--duration", `${(Math.random() * 6 + 8).toFixed(2)}s`);
  piece.style.setProperty("--drift", `${Math.round((Math.random() - 0.5) * 120)}px`);
  heartsContainer.appendChild(piece);

  piece.addEventListener("animationend", () => {
    piece.remove();
  });
}

for (let index = 0; index < 18; index += 1) {
  setTimeout(createHeartPiece, index * 280);
}

setInterval(createHeartPiece, 900);

function showLetterModal() {
  letterModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function hideLetterModal() {
  letterModal.hidden = true;
  document.body.style.overflow = "";
}

openLetterButton.addEventListener("click", showLetterModal);
closeLetterButton.addEventListener("click", hideLetterModal);
closeLetterBackdrop.addEventListener("click", hideLetterModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !letterModal.hidden) {
    hideLetterModal();
  }
});

heroPhoto.addEventListener("error", () => {
  heroPhoto.hidden = true;
  photoFallback.hidden = false;
});

heroPhoto.addEventListener("load", () => {
  heroPhoto.hidden = false;
  photoFallback.hidden = true;
});

musicToggle.addEventListener("click", async () => {
  if (backgroundMusic.paused) {
    backgroundMusic.volume = 0.42;

    try {
      await backgroundMusic.play();
      musicStarted = true;
      musicToggle.textContent = "Muzigi Kapat";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch (error) {
      musicToggle.textContent = "Muzigi Ac";
      musicToggle.setAttribute("aria-pressed", "false");
    }

    return;
  }

  backgroundMusic.pause();
  musicStarted = false;
  musicToggle.textContent = "Muzigi Ac";
  musicToggle.setAttribute("aria-pressed", "false");
});
