// Constants for conversion factors
const LENGTH_FACTOR = 3.281;
const VOLUME_FACTOR = 0.264;
const MASS_FACTOR = 2.204;

// DOM elements
const btn = document.getElementById("btn");
const inputElement = document.getElementById("input");
const lengthEl = document.getElementById("length-el");
const volumeEl = document.getElementById("volume-el");
const massEl = document.getElementById("mass-el");

// Input filter function, done 100% by chat GPT I have no idea how any of these work
function setInputFilter(inputElement, filterFunction, message) {
  const messageElement = document.createElement("div");
  messageElement.style.cssText = `
    display: none;
    background-color: rgba(255, 0, 0, 0.3);
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    text-shadow: 0.5px 0.5px #000;
  `;
  messageElement.innerHTML = `<i class="fa fa-exclamation-circle"></i>${message}`;

  inputElement.parentNode.insertBefore(messageElement, inputElement.nextSibling);

  inputElement.addEventListener("input", function (event) {
    const oldValue = event.target.value;
    if (filterFunction(oldValue)) {
      messageElement.style.display = "none";
    } else {
      event.target.value = oldValue.slice(0, -1);
      messageElement.style.display = "block";
    }
  });
}

setInputFilter(inputElement, function(value) {
  return /^\d*\.?\d*$/.test(value);
}, "&#10071 Only numbers and '.' are allowed");


// Conversion function
function conversion(input) {
  return {
    feet: input / LENGTH_FACTOR,
    meter: input * LENGTH_FACTOR,
    liter: input / VOLUME_FACTOR,
    gallon: input * VOLUME_FACTOR,
    kilogram: input * MASS_FACTOR,
    pound: input / MASS_FACTOR
  };
}

// Event listener for the button click
btn.addEventListener("click", function () {
  const input = parseFloat(inputElement.value);

  if (isNaN(input) || input === '') {
    alert('Please enter a valid number');
    return;
  }

  const results = conversion(input);
  
  lengthEl.textContent = `${input} meters = ${results.feet.toFixed(3)} feet\n ||| ${input} feet = ${results.meter.toFixed(3)} meters`;
  volumeEl.textContent = `${input} liters = ${results.gallon.toFixed(3)} gallons\n ||| ${input} gallons = ${results.liter.toFixed(3)} liters`;
  massEl.textContent = `${input} kilograms = ${results.pound.toFixed(3)} pounds\n ||| ${input} pounds = ${results.kilogram.toFixed(3)} kilograms`;
});
