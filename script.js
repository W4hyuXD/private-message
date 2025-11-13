const btnWish = document.getElementById("btnWish");
const popup = document.getElementById("popup");
const btnClose = document.getElementById("btnClose");
const envelope = document.querySelector(".envelope");
const typedText = document.getElementById("typedText");

// tulis ucapanmu panjang di sini
const message = `Semoga hari ini jadi awal yang indah buat kamu.
Banyak hal baik datang, banyak tawa baru tercipta.
Kamu pantas bahagia, hari ini dan seterusnya. 🌷

Tulisan ini mungkin sederhana, tapi aku cuma pengen kamu tahu kalau kamu itu berharga.
Terima kasih udah jadi seseorang yang bisa bikin suasana jadi lebih hangat.`;

btnWish.addEventListener("click", () => {
  popup.classList.add("show");
  setTimeout(() => {
    envelope.classList.add("open");
    setTimeout(() => {
      typeWriter();
      startConfetti();
    }, 700);
  }, 500);
});

btnClose.addEventListener("click", () => {
  envelope.classList.remove("open");
  popup.classList.remove("show");
  typedText.textContent = "";
  stopConfetti();
});

// efek ngetik
function typeWriter() {
  let i = 0;
  typedText.textContent = "";
  const speed = 40;
  function typing() {
    if (i < message.length) {
      typedText.textContent += message.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// bintang
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

for (let i = 0; i < 100; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5,
    d: Math.random() * 0.5,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  for (let s of stars) {
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
  }
  ctx.fill();
  moveStars();
}

function moveStars() {
  for (let s of stars) {
    s.y += s.d;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  }
}

function loop() {
  drawStars();
  requestAnimationFrame(loop);
}
loop();

// confetti
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];
let confettiActive = false;

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeConfetti();
window.addEventListener("resize", resizeConfetti);

function startConfetti() {
  confettiActive = true;
  confettiPieces = Array.from({ length: 100 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height - confettiCanvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 0.5 + 0.5,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
  }));
  animateConfetti();
}

function stopConfetti() {
  confettiActive = false;
}

function animateConfetti() {
  if (!confettiActive) return;
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach((p) => {
    confettiCtx.beginPath();
    confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fill();
    p.y += p.d * 3;
    if (p.y > confettiCanvas.height) p.y = -10;
  });
  requestAnimationFrame(animateConfetti);
}