// 🔹 Set year
document.getElementById('year').textContent = new Date().getFullYear();

// 🔹 Show menu & logo after preloader
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("sideMenu").classList.remove("hidden");
    document.getElementById("teamFooter").classList.remove("hidden");
  }, 3100);
});

// 🔹 Open modal
function openModal(id) {
  document.getElementById("homeSection").style.display = "none";
  document.getElementById("teamFooter").style.display = "none";
  document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
  document.getElementById(id).style.display = "flex";

  document.querySelectorAll(".side-menu a").forEach(a => a.classList.remove("active"));
  if (id === "aboutUsModal") document.querySelector(".side-menu a:nth-child(2)").classList.add("active");
  else if (id === "aboutGameModal") document.querySelector(".side-menu a:nth-child(3)").classList.add("active");
  else if (id === "creditModal") document.querySelector(".side-menu a:nth-child(4)").classList.add("active");
}

// 🔹 Go home
function goHome() {
  document.querySelectorAll(".modal").forEach(m => m.style.display = "none");
  document.getElementById("homeSection").style.display = "block";
  document.getElementById("teamFooter").style.display = "block";

  document.querySelectorAll(".side-menu a").forEach(a => a.classList.remove("active"));
  document.querySelector(".side-menu a:first-child").classList.add("active");
}

// 🔹 Parallax effect
document.addEventListener("mousemove", (e) => {
  const wrap = document.getElementById("bgWrap");
  const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
  wrap.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// 🔹 Falling leaves
function createLeaf() {
  const leaf = document.createElement("div");
  leaf.classList.add("leaf");
  leaf.style.left = Math.random() * 100 + "vw";
  const size = Math.random() * 20 + 20;
  leaf.style.width = size + "px";
  leaf.style.height = size + "px";
  const duration = Math.random() * 5 + 5;
  leaf.style.animationDuration = duration + "s";
  leaf.style.animationDelay = Math.random() * 5 + "s";
  const leafTypes = ["Images/GreenLeaf.png", "Images/BrownLeaf.png"];
  leaf.style.backgroundImage = `url('${leafTypes[Math.floor(Math.random() * leafTypes.length)]}')`;
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), (duration + 5) * 1000);
}
setInterval(createLeaf, 800);
