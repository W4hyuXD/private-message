/* ===== TYPEWRITER JUDUL ===== */
const texts = ["Halo Wawa 👋", "Happy Birthday 🎉"];
const loopText = document.getElementById("loopText");

let tIndex = 0;
let cIndex = 0;
let deleting = false;

function typeLoop() {
  const current = texts[tIndex];

  if (!deleting && cIndex <= current.length) {
    loopText.textContent = current.slice(0, cIndex++);
    setTimeout(typeLoop, 150);
  } else if (deleting && cIndex > 0) {
    loopText.textContent = current.slice(0, cIndex--);
    setTimeout(typeLoop, 80);
  } else {
    deleting = !deleting;
    if (!deleting) tIndex = (tIndex + 1) % texts.length;
    setTimeout(typeLoop, 1200);
  }
}
typeLoop();

/* ===== STARS ===== */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

const stars = Array.from({ length: 140 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5,
  s: Math.random() * 0.3 + 0.2
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  stars.forEach(star => {
    star.y += star.s;
    if (star.y > canvas.height) star.y = 0;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* ===== FLOATING HEARTS ===== */
const hearts = document.getElementById("hearts");
setInterval(() => {
  const heart = document.createElement("span");
  heart.textContent = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 10 + 10 + "px";
  heart.style.animationDuration = Math.random() * 6 + 6 + "s";
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}, 1200);

/* ===== POPUP & TYPING ===== */
const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeLetter");
const popup = document.getElementById("popup");
const envelope = document.getElementById("envelope");
const typedMessage = document.getElementById("typedMessage");

const paragraphs = [
  "Selamat ulang tahun yaaa",

  "Semoga di umur yang sekarang,\nkamu selalu diberi kesehatan,\nketenangan, dan hal-hal baik\nyang datang tepat pada waktunya.",

  "Semoga langkahmu ke depan\nlebih ringan,\nurusanmu dimudahkan,\ndan apa yang kamu usahakan\npelan-pelan bisa tercapai.",

  "Aku cuma pengen bilang,\ntetap jadi dirimu sendiri.\nSemoga hari ini dan seterusnya\nkamu lebih sering merasa bahagia. 🤍",

  "Maaf yaa belum bisa ngasi apa-apa,\ncuman bisa ngucapin kayak gini 😇"
];

function typeParagraphs(paras) {
  typedMessage.innerHTML = "";
  let pIndex = 0;

  function typeNext() {
    if (pIndex >= paras.length) return;

    const p = document.createElement("p");
    typedMessage.appendChild(p);

    let charIndex = 0;
    const text = paras[pIndex];

    const interval = setInterval(() => {
      p.textContent += text[charIndex];
      charIndex++;
      typedMessage.scrollTop = typedMessage.scrollHeight;

      if (charIndex >= text.length) {
        clearInterval(interval);
        pIndex++;
        setTimeout(typeNext, 600);
      }
    }, 30);
  }

  typeNext();
}

openBtn.onclick = () => {
  popup.classList.add("show");
  setTimeout(() => {
    envelope.classList.add("open");
    typeParagraphs(paragraphs);
  }, 250);
};

closeBtn.onclick = () => {
  popup.classList.remove("show");
  envelope.classList.remove("open");
  typedMessage.innerHTML = "";
};