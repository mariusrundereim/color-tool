const hexInput = document.querySelector("#hexInput");
const inputColor = document.querySelector("#inputColor");

// HEX Input
hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace("#", "");
  inputColor.style.backgroundColor = "#" + strippedHex;
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
