document.getElementById('year').textContent = new Date().getFullYear();

function toggleMenu() {
  document.getElementById("menu").classList.toggle("show");
}

function openModal() {
  document.getElementById("aboutModal").style.display = "flex";
  document.getElementById("menu").classList.remove("show");
}

function closeModal() {
  document.getElementById("aboutModal").style.display = "none";
}

// 🔹 Smooth parallax feel (disabled inside About modal)
document.addEventListener("mousemove", (e) => {
  const modal = document.getElementById("aboutModal");
  if (modal.style.display === "flex") return;

  let moveX = (e.clientX / window.innerWidth - 0.5) * 5;
  let moveY = (e.clientY / window.innerHeight - 0.5) * 5;
  document.body.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// 🔹 Auto detect file size
(async function(){
  const link = document.getElementById('downloadLink').href;
  try {
    const resp = await fetch(link, { method:'HEAD' });
    const size = resp.headers.get('content-length');
    if (size) {
      const mb = (parseInt(size, 10) / (1024*1024)).toFixed(2);
      document.getElementById('filesize').textContent = `File size: ${mb} MB`;
    }
  } catch (e) {
    document.getElementById('filesize').textContent = "File size: (unavailable)";
  }
})();

// 🔹 Falling Leaves Generator
function createLeaf() {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");

  // Random X position
  leaf.style.left = Math.random() * 100 + "vw";

  // Random size
  const size = Math.random() * 20 + 20;
  leaf.style.width = size + "px";
  leaf.style.height = size + "px";

  // Random duration & delay
  const duration = Math.random() * 5 + 5;
  leaf.style.animationDuration = duration + "s";
  leaf.style.animationDelay = Math.random() * 5 + "s";

  // Random leaf type
  const leafTypes = ["Images/GreenLeaf.png", "Images/BrownLeaf.png"];
  const chosen = leafTypes[Math.floor(Math.random() * leafTypes.length)];
  leaf.style.backgroundImage = `url('${chosen}')`;

  document.body.appendChild(leaf);

  // Remove after animation
  setTimeout(() => leaf.remove(), (duration + 5) * 1000);
}

setInterval(createLeaf, 800);
