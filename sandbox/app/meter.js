/**
 * @param {string} selector
 * @constructor
 */

// Object in charge of displaying the tuning meter and updating it (that is to say, display the note
// that is being played and how close it is to the correct note)

const Meter = function (selector) {
  this.$root = document.querySelector(selector);
  this.$pointer = this.$root.querySelector(".meter-pointer");
  this.init();
};

Meter.prototype.init = function () {
  for (var i = 0; i <= 10; i += 1) {
    const $scale = document.createElement("div");
    $scale.className = "meter-scale";
    $scale.style.transform = "rotate(" + (i * 9 - 45) + "deg)";
    if (i % 5 === 0) {
      $scale.classList.add("meter-scale-strong");
    }
    this.$root.appendChild($scale);
  }
};

/**
 * @param {number} deg
 */
Meter.prototype.update = function (deg) {
  this.$pointer.style.transform = "rotate(" + deg + "deg)";
};
