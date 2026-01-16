/* ================= MATRIX BACKGROUND ================= */

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const chars = "アァカサタナハマヤャラワン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

let matrixColor = "#00ff9c";

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = matrixColor;
  ctx.font = fontSize + "px monospace";

  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  });
}

setInterval(drawMatrix, 33);

/* ================= MATRIX COLOR MODES ================= */

document.querySelectorAll(".matrix-modes button").forEach(btn => {
  btn.addEventListener("click", () => {
    const c = btn.dataset.color;
    matrixColor =
      c === "green" ? "#00ff9c" :
      c === "red"   ? "#ff003c" :
                      "#00b3ff";
    document.body.style.color = matrixColor;
  });
});

/* ================= ASCII TRANSLATOR ================= */

const mode = document.getElementById("mode");
const input = document.getElementById("input");
const output = document.getElementById("output");
const btn = document.getElementById("translateBtn");

btn.addEventListener("click", translate);

function translate() {
  if (mode.value === "textToAscii") {
    output.value = [...input.value]
      .map(c => c.charCodeAt(0))
      .join(" ");
  } else {
    const codes = input.value.trim().split(" ");
    let text = "";

    for (let c of codes) {
      const n = parseInt(c);
      if (isNaN(n) || n < 0 || n > 127) {
        output.value = "Invalid ASCII code";
        return;
      }
      text += String.fromCharCode(n);
    }

    output.value = text;
  }
}
