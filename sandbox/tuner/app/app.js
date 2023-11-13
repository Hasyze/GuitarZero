
let mistake = 0;


const Application = function () {
  this.tracks = new Tracks(".tracks")
  console.log("tracks", this.tracks);
  this.initA4();
  this.tuner = new Tuner(this.a4);
  this.notes = new Notes(".notes", this.tuner);
  this.meter = new Meter(".meter");
  this.frequencyBars = new FrequencyBars(".frequency-bars");
  this.noteHistory = []; // Ajout de l'historique des notes détectées
  this.index = 0; // Index de la note à vérifier
  this.update({
    name: "A",
    frequency: this.a4,
    octave: 4,
    value: 69,
    cents: 0,
  });
};

Application.prototype.initA4 = function () {
  this.$a4 = document.querySelector(".a4 span");
  this.a4 = parseInt(localStorage.getItem("a4")) || 440;
  this.$a4.innerHTML = this.a4;
 // this.noteverif = ["A","G"]; // Liste des notes à vérifier
  this.noteverif = this.tracks.tracks[0].chords; // Liste des notes à vérifier
  console.log("notes à vérifier", this.noteverif);
  
};

Application.prototype.start = function () {
  const self = this;

  this.tuner.onNoteDetected = function (note) {
    if (self.notes.isAutoMode) {
      if (self.lastNote === note.name) {
        self.update(note);
      } else {
        self.lastNote = note.name;
      }
    }
  };

  swal.fire("Welcome to online tuner!").then(function () {
    self.tuner.init();
    self.frequencyData = new Uint8Array(self.tuner.analyser.frequencyBinCount);
  });
// Add this inside the Application.prototype.start function
const trackSelector = document.getElementById("trackSelector");

trackSelector.addEventListener("change", function () {
  const selectedTrackIndex = parseInt(trackSelector.value);
  self.noteverif = self.tracks.tracks[selectedTrackIndex].chords;
  console.log("Selected notes to verify:", self.noteverif);

  // Reset the index and update the displayed notes
  self.index = 0;
  self.updateNoteVerif();
});

  this.$a4.addEventListener("click", function () {
    swal
      .fire({ input: "number", inputValue: self.a4 })
      .then(function ({ value: a4 }) {
        if (!parseInt(a4) || a4 === self.a4) {
          return;
        }
        self.a4 = a4;
        self.$a4.innerHTML = a4;
        self.tuner.middleA = a4;
        self.notes.createNotes();
        self.update({
          name: "A",
          frequency: self.a4,
          octave: 4,
          value: 69,
          cents: 0,
        });
        localStorage.setItem("a4", a4);
      });
  });

  this.updateFrequencyBars();

  document.querySelector(".auto input").addEventListener("change", () => {
    this.notes.toggleAutoMode();
  });

  const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", function () {
  self.index = 0; // Réinitialise l'index de la note à vérifier
  console.log("réinitialisation de index", self.index);
});

};

Application.prototype.updateFrequencyBars = function () {
  if (this.tuner.analyser) {
    this.tuner.analyser.getByteFrequencyData(this.frequencyData);
    this.frequencyBars.update(this.frequencyData);
  }
  requestAnimationFrame(this.updateFrequencyBars.bind(this));
};

Application.prototype.updateNoteHistory = function () {
  const $noteHistoryList = document.querySelector(".note-history-list");
if ($noteHistoryList) {
  $noteHistoryList.innerHTML = ""; // Efface l'affichage actuel
  // Maintenant, vous pouvez ajouter de nouveaux éléments
} else {
  console.error("Element note-history-list not found.");
}

let index = this.index; // Utilisez this.index pour accéder à l'index


  // Parcourez l'historique des notes et affichez-les
  this.noteHistory.forEach((note) => {
    const $noteItem = document.createElement("div");
    $noteItem.className = "note-item";
    $noteItem.innerHTML = `<span>${note.name}</span> - ${note.frequency} Hz`;
    if (this.noteverif[index] === note.name) {
      // Si la note correspond à celle dans noteverif, affichez-la en vert
      $noteItem.classList.add("active");
      index++; // Passe à la prochaine note dans noteverif
      console.log("index", index);

    }
    else {
      index = 0;
      console.log("index", index);
    }
    $noteHistoryList.appendChild($noteItem);
  });
  this.index = index; // Met à jour l'index de la note à vérifier
  
};
Application.prototype.eteindreLED = function () {
  fetch('http://localhost:3000/api/led/off');
}

Application.prototype.updateNoteVerif = function () {
  const $notesVerifyList = document.querySelector(".note-verify-list");
if ($notesVerifyList) {
  $notesVerifyList.innerHTML = ""; // Efface l'affichage actuel
  // Maintenant, vous pouvez ajouter de nouveaux éléments
} else {
  console.error("Element note-history-list not found.");
}

let index = this.index; // Utilisez this.index pour accéder à l'index
let allNotesActive = true; // Flag to check if all notes are active


  // Parcourez l'historique des notes et affichez-les
  this.noteverif.forEach((note) => {
    const $noteItem = document.createElement("div");
    $noteItem.className = "note-item";
    $noteItem.innerHTML = `<span>${note}</span> `;
    if (this.noteverif[index] === note) {
      // Si la note correspond à celle dans noteverif, affichez-la en vert
      $noteItem.classList.add("active");
      console.log("index", index);
      $notesVerifyList.appendChild($noteItem);
    }
    else {
      console.log("index", index);
      $notesVerifyList.appendChild($noteItem);
      // Envoyer la valeur de la variable via le port série
      mistake = 1;
      fetch('http://localhost:3000/api/led/on');
      setTimeout(this.eteindreLED, 1000);
      allNotesActive = false;
      

    }
    mistake = 0;
  });
  
};

Application.prototype.update = function (note) {
  this.notes.update(note);
  this.meter.update((note.cents / 50) * 45);
// Ajouter la note actuelle à l'historique
this.noteHistory.push({
  name: note.name,
  frequency: note.frequency,
  octave: note.octave,
  value: note.value,
  cents: note.cents,
});

// Mettre à jour l'affichage de l'historique
this.updateNoteVerif();
this.updateNoteHistory();
};

const app = new Application();
app.start();