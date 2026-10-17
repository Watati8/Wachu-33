const intro = document.getElementById("intro");
const mainExperience = document.getElementById("mainExperience");

const enterButton = document.getElementById("enterButton");

const musicButton = document.getElementById("musicButton");
const openingAudio = document.getElementById("openingAudio");
const letterAudio = document.getElementById("letterAudio");

const evidenceButton = document.getElementById("evidenceButton");
const evidenceList = document.getElementById("evidenceList");

const memoryModal = document.getElementById("memoryModal");
const modalClose = document.getElementById("modalClose");
const modalEyebrow = document.getElementById("modalEyebrow");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const letterButton = document.getElementById("letterButton");
const letterContent = document.getElementById("letterContent");

const creditsButton = document.getElementById("creditsButton");
const postCredits = document.getElementById("postCredits");

const revealButton = document.getElementById("revealButton");
const postCreditsMessage = document.getElementById("postCreditsMessage");

const backToTop = document.getElementById("backToTop");


/* MEMORY CARD CONTENT */

const memories = {

  jackets: {
    eyebrow: "EXHIBIT A / THOUGHTFULNESS",
    title: "The jacket situation",
    text:
      "There was a time when I was always cold. " +
      "Your solution was apparently to give me enough jackets " +
      "to survive several different climates.\n\n" +
      "Seven jackets, Machu. Seven.\n\n" +
      "And I still wear them.\n\n" +
      "I hope you know that every time I reach for one, " +
      "I remember that you were thoughtful enough to notice " +
      "something I needed and do something about it."
  },

  bazinga: {
    eyebrow: "EXHIBIT B / POP CULTURE",
    title: "The Bazinga incident",
    text:
      "You remembered that I loved The Big Bang Theory, " +
      "so you got me a Sheldon T-shirt.\n\n" +
      "Bazinga.\n\n" +
      "And then there was the Friends hoodie.\n\n" +
      "You paid attention to the things that made me happy. " +
      "That is a small thing only if you don't understand " +
      "how much it means to be remembered."
  },

  friendship: {
    eyebrow: "EXHIBIT C / SHOWING UP",
    title: "When it mattered",
    text:
      "There have been seasons of my life when things felt " +
      "impossibly heavy.\n\n" +
      "When my mum was sick and I was trying to navigate " +
      "everything that came with that, you were there.\n\n" +
      "You listened. You let me talk. You offered advice " +
      "when I needed perspective.\n\n" +
      "I don't know if I've properly told you what that meant " +
      "to me, but I remember. And I am grateful."
  },

  movies: {
    eyebrow: "EXHIBIT D / CINEMA",
    title: "Two editors. No footage.",
    text:
      "We both edit videos. We watch movies together. " +
      "We understand storytelling, pacing, sound and the " +
      "importance of getting the right shot.\n\n" +
      "And yet, after seven years of friendship, we have " +
      "almost no photographs together.\n\n" +
      "This is not a production problem. It is a failure " +
      "of pre-production.\n\n" +
      "We need to do better."
  }

};


/* ENTER THE EXPERIENCE */

enterButton.addEventListener("click", () => {

  intro.classList.add("hidden");
  mainExperience.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

});


/* VOICE-OVER */

musicButton.addEventListener("click", async () => {

  if (!openingAudio.getAttribute("src") &&
      !openingAudio.querySelector("source")?.getAttribute("src")) {

    musicButton.textContent = "Add your opening.mp3 recording first";
    return;
  }

  if (openingAudio.paused) {

    // Stop the letter recording if it is playing.
    letterAudio.pause();

    try {

      await openingAudio.play();

      musicButton.textContent = "Ⅱ Pause the director's commentary";
      musicButton.setAttribute("aria-pressed", "true");

    } catch (error) {

      musicButton.textContent = "Audio could not play. Try again.";

    }

  } else {

    openingAudio.pause();

    musicButton.textContent = "▶ Play the director's commentary";
    musicButton.setAttribute("aria-pressed", "false");

  }

});


openingAudio.addEventListener("ended", () => {

  musicButton.textContent = "▶ Play the director's commentary";
  musicButton.setAttribute("aria-pressed", "false");

});


openingAudio.addEventListener("error", () => {

  musicButton.textContent = "Add your opening.mp3 recording first";

});


/* PAUSE OPENING AUDIO WHEN LETTER AUDIO PLAYS */

letterAudio.addEventListener("play", () => {

  openingAudio.pause();

  musicButton.textContent = "▶ Play the director's commentary";
  musicButton.setAttribute("aria-pressed", "false");

});


/* EVIDENCE BUTTON */

evidenceButton.addEventListener("click", () => {

  const isHidden = evidenceList.classList.contains("hidden");

  evidenceList.classList.toggle("hidden");

  evidenceButton.textContent = isHidden
    ? "Close the evidence"
    : "Examine the evidence";

});


/* OPEN MEMORY CARDS */

document.querySelectorAll(".memory-card").forEach((card) => {

  card.addEventListener("click", () => {

    const key = card.dataset.card;
    const memory = memories[key];

    if (!memory) return;

    modalEyebrow.textContent = memory.eyebrow;
    modalTitle.textContent = memory.title;
    modalText.textContent = memory.text;

    memoryModal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    modalClose.focus();

  });

});


/* CLOSE MEMORY MODAL */

function closeModal() {

  memoryModal.classList.add("hidden");
  document.body.style.overflow = "";

}


modalClose.addEventListener("click", closeModal);


memoryModal.addEventListener("click", (event) => {

  if (event.target === memoryModal) {
    closeModal();
  }

});


document.addEventListener("keydown", (event) => {

  if (event.key === "Escape") {
    closeModal();
  }

});


/* OPEN LETTER */

letterButton.addEventListener("click", () => {

  letterContent.classList.toggle("hidden");

  const isOpen = !letterContent.classList.contains("hidden");

  letterButton.textContent = isOpen
    ? "Close your letter"
    : "Open your letter ↗";

  if (isOpen) {

    letterContent.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  } else {

    letterAudio.pause();

  }

});


/* STOP AUDIO WHEN LEAVING THE LETTER */

letterContent.addEventListener("transitionend", () => {

  if (letterContent.classList.contains("hidden")) {
    letterAudio.pause();
  }

});


/* OPEN POST-CREDITS */

creditsButton.addEventListener("click", () => {

  postCredits.classList.remove("hidden");

  postCredits.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});


/* REVEAL POST-CREDITS MESSAGE */

revealButton.addEventListener("click", () => {

  postCreditsMessage.classList.remove("hidden");

  revealButton.classList.add("hidden");

});


/* RETURN TO THE BEGINNING */

backToTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});
