/* =========================================
   RMS TITANIC - ULTIMATE MYSTERY ENGINE
   30 EASTER EGGS
========================================= */

const eggNames = [
  "TITANIC",
  "Der Eisberg",
  "Kapitänsgeheimnis",
  "Geistermodus",
  "SOS Nachricht",
  "Passagier 404",
  "Konami Master",
  "Geheimes Archiv",
  "Der Kapitän",
  "Die letzte Reise",
  "Doppelklick",
  "Entwicklerarchiv",
  "Der Atlantik",
  "Zeitreisender",
  "Doppelte Zeitreise",
  "Ocean Mode",
  "Geheime Fakten",
  "14. April",
  "Letzter Besucher",
  "Tiefsee Expedition",
  "Quizmeister",
  "Verborgene Zahl",
  "Geheime Nacht",
  "Das Jahr 1912",
  "Die geheime Tür",
  "Unsichtbarer Code",
  "Der letzte Passagier",
  "Die goldene Stunde",
  "Das verlorene Logbuch",
  "TITANIC MASTER"
];

let discovered = new Set(
  JSON.parse(localStorage.getItem("titanicEggs") || "[]")
);

let keyBuffer = "";
let iceClicks = 0;
let logoClicks = 0;
let captainClicks = 0;
let titleClicks = 0;
let dateClicks = 0;
let footerClicks = 0;
let timelineClicks = 0;
let cardClicks = 0;
let archiveClicks = 0;
let quizDone = false;
let toastTimer;


/* =========================================
   EASTER EGG UNLOCK SYSTEM
========================================= */

function unlockEgg(id) {
  if (discovered.has(id)) {
    showToast("🔍 Dieses Geheimnis kennst du bereits!");
    return;
  }

  discovered.add(id);

  localStorage.setItem(
    "titanicEggs",
    JSON.stringify([...discovered])
  );

  updateCollection();

  showToast(
    "🔓 GEHEIMNIS ENTDECKT: " + eggNames[id - 1]
  );

  console.log(
    "%c SECRET FOUND: " + eggNames[id - 1],
    "color:#d7b875;font-size:16px"
  );

  if (discovered.size === 29 && !discovered.has(30)) {
    unlockEgg(30);
  }
}


/* =========================================
   COLLECTION / PROGRESS
========================================= */

function updateCollection() {
  const count = discovered.size;

  document.getElementById("eggCount").textContent = count;
  document.getElementById("hudCount").textContent = count;
  document.getElementById("progressText").textContent =
    count + " / 30";

  document.getElementById("progressBar").style.width =
    (count / 30 * 100) + "%";

  const grid = document.getElementById("collectionGrid");

  grid.innerHTML = "";

  eggNames.forEach((name, index) => {
    const found = discovered.has(index + 1);

    const item = document.createElement("div");
    item.className = "egg-item" + (found ? " found" : "");

    item.innerHTML = `
      <span>${found ? "🔓" : "🔒"}</span>
      ${found ? name : "Geheimnis #" + (index + 1)}
    `;

    grid.appendChild(item);
  });
}


/* =========================================
   NOTIFICATION SYSTEM
========================================= */

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}


/* =========================================
   MODALS
========================================= */

function openArchive() {
  document.getElementById("archiveModal").style.display =
    "flex";

  unlockEgg(25);
}

function openMorse() {
  document.getElementById("morseModal").style.display =
    "flex";
}

function openPassenger() {
  document.getElementById("passengerModal").style.display =
    "flex";

  unlockEgg(6);
}

function closeModals() {
  document.querySelectorAll(".modal").forEach(modal => {
    modal.style.display = "none";
  });
}

document.querySelectorAll(".modal").forEach(modal => {
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModals();
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModals();
});


/* =========================================
   1 - TITANIC
========================================= */

function activateTitanic() {
  unlockEgg(1);

  document.getElementById("mainTitle").textContent = "1912";
}


/* =========================================
   2 - ICEBERG
========================================= */

document.getElementById("floatingIce").addEventListener(
  "click",
  () => {
    iceClicks++;

    if (iceClicks === 5) {
      unlockEgg(2);
    }

    if (iceClicks === 10) {
      showToast("🧊 Der Eisberg hat noch ein Geheimnis...");
      unlockEgg(22);
    }
  }
);


/* =========================================
   3 - KAPITÄNSGEHEIMNIS
========================================= */

document.getElementById("logo").addEventListener(
  "click",
  () => {
    logoClicks++;

    if (logoClicks === 5) {
      unlockEgg(3);
      showToast("⚓ Willkommen an Bord, Kapitän!");
    }
  }
);


/* =========================================
   4 - GHOST MODE
========================================= */

document.getElementById("mainTitle").addEventListener(
  "click",
  () => {
    titleClicks++;

    if (titleClicks === 7) {
      document.body.classList.add("ghost-mode");

      unlockEgg(4);

      setTimeout(() => {
        document.body.classList.remove("ghost-mode");
      }, 5000);
    }
  }
);


/* =========================================
   5 - SOS MORSE CODE
========================================= */

function checkMorse() {
  const answer = document
    .getElementById("morseAnswer")
    .value.trim().toUpperCase();

  if (answer === "SOS") {
    unlockEgg(5);

    document.getElementById("morseResult").textContent =
      "✓ RICHTIG! SOS wurde entschlüsselt.";
  } else {
    document.getElementById("morseResult").textContent =
      "✗ Falsche Antwort. Versuche es noch einmal.";
  }
}


/* =========================================
   6 - PASSENGER 404
========================================= */

// Wird durch openPassenger() freigeschaltet.


/* =========================================
   7 - KONAMI CODE
========================================= */

const konamiCode = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a"
];

let konamiIndex = 0;


/* =========================================
   8 - ARCHIVE PASSWORD
========================================= */

function checkPassword() {
  const password = document
    .getElementById("archivePassword")
    .value.trim().toUpperCase();

  const result = document.getElementById("passwordResult");

  if (password === "ATLANTIS") {
    result.textContent = "✓ ZUGANG GEWÄHRT!";
    unlockEgg(8);
    unlockEgg(26);

    setTimeout(() => {
      closeModals();
      showToast("📜 Das geheime Archiv wurde geöffnet!");
    }, 1000);
  } else {
    result.textContent = "✗ ZUGANG VERWEIGERT.";
  }
}


/* =========================================
   9 - CAPTAIN
========================================= */

document.querySelector(".nav-secret").addEventListener(
  "click",
  () => {
    captainClicks++;

    document.getElementById("archiveModal").style.display =
      "flex";

    if (captainClicks >= 3) {
      unlockEgg(9);
      captainClicks = 0;
    }
  }
);


/* =========================================
   10 - SINKING MODE
========================================= */

document.querySelectorAll(".timeline-item").forEach(item => {
  item.addEventListener("click", () => {
    timelineClicks++;

    if (timelineClicks >= 5) {
      document.body.classList.add("sinking-mode");
      unlockEgg(10);

      setTimeout(() => {
        document.body.classList.remove("sinking-mode");
      }, 5000);

      timelineClicks = 0;
    }
  });
});


/* =========================================
   11 - DOUBLE CLICK FOOTER
========================================= */

document.querySelector("footer").addEventListener(
  "dblclick",
  () => {
    unlockEgg(11);
    showToast("🌊 Das Meer vergisst nichts.");
  }
);


/* =========================================
   12 - SECRET PASSENGER FILE
========================================= */

// Im Passagierfenster über den Button freischaltbar.


/* =========================================
   13 - ATLANTIC
========================================= */


/* =========================================
   14 - TIME TRAVELER
========================================= */

document.querySelectorAll(".timeline-item").forEach(item => {
  item.addEventListener("dblclick", () => {
    unlockEgg(14);
  });
});


/* =========================================
   15 - DOUBLE HERO CLICK
========================================= */

document.querySelector(".hero").addEventListener(
  "dblclick",
  () => {
    unlockEgg(15);
  }
);


/* =========================================
   16 - OCEAN MODE
========================================= */


/* =========================================
   17 - SECRET FACTS
========================================= */

document.querySelectorAll(".stat-card").forEach(card => {
  card.addEventListener("dblclick", () => {
    cardClicks++;

    if (cardClicks >= 2) {
      unlockEgg(17);
      cardClicks = 0;
    }
  });
});


/* =========================================
   18 - APRIL 14
========================================= */

document.querySelector(".hero-bottom").addEventListener(
  "click",
  () => {
    dateClicks++;

    if (dateClicks >= 7) {
      unlockEgg(18);
      dateClicks = 0;
    }
  }
);


/* =========================================
   19 - END OF THE WEBSITE
========================================= */

let reachedEnd = false;

window.addEventListener("scroll", () => {
  if (
    !reachedEnd &&
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 30
  ) {
    reachedEnd = true;
    unlockEgg(19);
  }
});


/* =========================================
   20 - UNDERWATER EXPEDITION
========================================= */

function activateDive() {
  unlockEgg(20);

  const result = document.getElementById("diveResult");

  result.innerHTML = `
    <h3 style="color:#d7b875;margin-top:30px">
      EXPEDITION GESTARTET
    </h3>
    <p style="margin-top:15px;color:#9aa8b8">
      Position: 41°43′N 49°56′W<br>
      Tiefe: ca. 3.800 Meter<br>
      Status: Historische Expedition
    </p>
  `;
}


/* =========================================
   21 - QUIZ MASTER
========================================= */

function answerQuiz(choice) {
  const result = document.getElementById("quizResult");

  if (choice === 0) {
    result.textContent = "✓ Richtig! Du kennst die Titanic!";
    if (!quizDone) {
      unlockEgg(21);
      quizDone = true;
    }
  } else {
    result.textContent = "✗ Nicht ganz. Versuch es noch einmal.";
  }
}


/* =========================================
   22 - HIDDEN NUMBER
========================================= */

// Wird durch den zehnten Eisberg-Klick freigeschaltet.


/* =========================================
   23 - NIGHT CODE
========================================= */


/* =========================================
   24 - 1912
========================================= */

document.getElementById("footerSecret").addEventListener(
  "click",
  () => {
    footerClicks++;

    if (footerClicks >= 3) {
      unlockEgg(24);
      footerClicks = 0;
    }
  }
);


/* =========================================
   25 - SECRET DOOR
========================================= */

// Wird beim Öffnen des Archivs freigeschaltet.


/* =========================================
   27 - LAST PASSENGER
========================================= */

document.getElementById("passengerModal").addEventListener(
  "dblclick",
  () => {
    unlockEgg(27);
  }
);


/* =========================================
   28 - GOLDEN HOUR
========================================= */

document.querySelector(".quote-card").addEventListener(
  "dblclick",
  () => {
    unlockEgg(28);
    showToast("✨ Ein besonderer Moment in der Geschichte.");
  }
);


/* =========================================
   29 - LOST LOGBOOK
========================================= */

document.getElementById("mysteryCard").addEventListener(
  "dblclick",
  () => {
    unlockEgg(29);
    showToast("📖 Du hast das verlorene Logbuch gefunden.");
  }
);


/* =========================================
   GLOBAL SECRET KEYWORDS
========================================= */

document.addEventListener("keydown", e => {

  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;

    if (konamiIndex === konamiCode.length) {
      unlockEgg(7);
      showToast("🎮 KONAMI MASTER!");
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }

  if (e.key.length !== 1) return;

  keyBuffer += e.key.toUpperCase();
  keyBuffer = keyBuffer.slice(-10);

  if (keyBuffer.endsWith("TITANIC")) {
    activateTitanic();
  }

  if (keyBuffer.endsWith("ATLANTIC")) {
    unlockEgg(13);
    showToast("🌊 ATLANTIC MODE AKTIVIERT");
  }

  if (keyBuffer.endsWith("OCEAN")) {
    unlockEgg(16);
    document.body.style.background = "#001b35";
    showToast("🌊 OCEAN MODE");
  }

  if (keyBuffer.endsWith("NIGHT")) {
    unlockEgg(23);
    document.body.classList.add("ghost-mode");

    setTimeout(() => {
      document.body.classList.remove("ghost-mode");
    }, 5000);
  }

  if (keyBuffer.endsWith("1912")) {
    unlockEgg(24);
  }

  if (keyBuffer.endsWith("LOGBOOK")) {
    unlockEgg(29);
  }
});


/* =========================================
   CONSOLE SECRET
========================================= */

window.reveal1912 = function() {
  unlockEgg(12);
  showToast("🗃 ENTWICKLERARCHIV ENTDECKT");
};

console.log(
  "%c RMS TITANIC - SECRET TERMINAL ",
  "background:#091725;color:#d7b875;font-size:22px;padding:15px"
);

console.log("Ein geheimes Archiv wartet.");
console.log("Tipp: reveal1912()");


/* =========================================
   SECRET MASTER INIT
========================================= */

updateCollection();

console.log("Titanic Mystery Engine gestartet.");
console.log("Gefundene Geheimnisse:", discovered.size);