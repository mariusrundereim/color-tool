const hexInput = document.querySelector("#hexInput");
const inputColor = document.querySelector("#inputColor");
const alteredColor = document.querySelector("#alteredColor");
const alteredColorText = document.querySelector("#alteredColorText");

const slider = document.querySelector("#slider");
const sliderNumber = document.querySelector("#sliderText");

const lightenText = document.querySelector("#lightenText");
const darkenText = document.querySelector("#darkenText");
const toggleBtn = document.querySelector("#toggleBtn");

toggleBtn.addEventListener("click", () => {
  if (toggleBtn.classList.contains("toggled")) {
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else {
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
  reset();
});

// HEX Input
hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace("#", "");
  inputColor.style.backgroundColor = "#" + strippedHex;
  reset();
});

// HEX Valid
const isValidHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
};

// console.log(isValidHex("#000000")); // true
// console.log(isValidHex("#0000000")); // false
// console.log(isValidHex("#59A076")); // true

// Convert HEX to RGB

const convertHexToRGB = (hex) => {
  if (!isValidHex(hex)) return null;
  let strippedHex = hex.replace("#", "");

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);

  return { r, g, b };
};

convertHexToRGB("123");
console.log(convertHexToRGB("59A076"));

// Convert RGB to HEX

const convertRGBtoHex = (r, g, b) => {
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);

  /*
  const firstPair = r.toString(16);
  const secondPair = g.toString(16);
  const thirdPair = b.toString(16);
  */
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
};

// console.log(convertRGBtoHex(0, 100, 0)); // #006400

const alterColor = (hex, percentage) => {
  const { r, g, b } = convertHexToRGB(hex);
  const amount = Math.floor((percentage / 100) * 255);

  const newR = increaseValues(r, amount);
  const newG = increaseValues(g, amount);
  const newB = increaseValues(b, amount);

  console.log(newR, newG, newB);

  return convertRGBtoHex(newR, newG, newB);
};

// Increase within 0 to 255
const increaseValues = (hex, amount) => {
  const newHex = hex + amount;
  if (newHex > 255) return 255;
  if (newHex < 0) return 0;
  return newHex;
};

console.log(alterColor("FFFFFF", 10));

// Slider
slider.addEventListener("input", () => {
  if (!isValidHex(hexInput.value)) return;
  sliderNumber.textContent = `${slider.value} %`;

  // calculate the appropiate value for the color alteration

  /*
  const valueAddition = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;
  */

  let valueAddition;
  if (toggleBtn.classList.contains("toggled")) {
    valueAddition = -slider.value;
  } else {
    valueAddition = slider.value;
  }

  // get altered hex value
  const alteredHex = alterColor(hexInput.value, valueAddition);
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

// Reset

const reset = () => {
  slider.value = 0;
  sliderNumber.innerText = `0%`;
  alteredColor.style.backgroundColor = hexInput.value;
  alteredColorText.innerText = `Altered Color ${hexInput.value}`;
};
