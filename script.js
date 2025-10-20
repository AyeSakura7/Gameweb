// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

const TRANS_MS = 500;
const ORDER = ['homeSection', 'aboutUsModal', 'aboutGameModal', 'creditModal'];

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('sideMenu').classList.remove('hidden');
    document.getElementById('teamFooter').classList.remove('hidden');
    initMusic(); // Initialize background music after preloader
  }, 3100);
});

// 🎵 Background music setup with autoplay workaround
function initMusic() {
  const footer = document.getElementById('teamFooter');
  const audio = new Audio('Mp3/LobbyBgMusic.mp3');
  audio.loop = true;
  audio.volume = 0.6;

  // Allow playback after any user interaction (autoplay policy)
  const tryPlay = () => {
    audio.play().catch(() => {});
    document.removeEventListener('click', tryPlay);
  };
  document.addEventListener('click', tryPlay);

  // Make mute/unmute button beside the logo
  const btn = document.createElement('button');
  btn.className = 'mute-btn';
  const icon = document.createElement('img');
  icon.src = 'Images/play.png'; // Speaker icon (add it to Images folder)
  btn.appendChild(icon);
  footer.appendChild(btn);

  let muted = false;
  btn.addEventListener('click', () => {
    muted = !muted;
    audio.muted = muted;
    icon.src = muted ? 'Images/pause.png' : 'Images/play.png'; // Toggle icon
  });
}

// UI Transition Helpers
function getCurrentVisible() {
  const home = document.getElementById('homeSection');
  const modals = document.querySelectorAll('.modal');
  for (const m of modals) {
    if (getComputedStyle(m).display !== 'none') return m;
  }
  if (getComputedStyle(home).display !== 'none') return home;
  return null;
}

function clearAnimClasses(el) {
  if (!el) return;
  el.classList.remove('zoom-forward-enter','zoom-forward-exit','zoom-back-enter','zoom-back-exit');
}

function directionalTransition(outEl, inEl) {
  if (!inEl || outEl === inEl) return;

  const outId = outEl ? outEl.id : 'homeSection';
  const inId = inEl.id;
  const outIndex = ORDER.indexOf(outId);
  const inIndex = ORDER.indexOf(inId);
  const direction = (inIndex > outIndex) ? 'forward' : 'backward';
  const teamFooter = document.getElementById('teamFooter');

  clearAnimClasses(outEl);
  clearAnimClasses(inEl);

  if (direction === 'backward') {
    if (outEl) outEl.classList.add('zoom-back-exit');
    setTimeout(() => {
      if (outEl) {
        outEl.style.display = 'none';
        outEl.classList.remove('zoom-back-exit');
      }
      inEl.style.display = inEl.classList.contains('modal') ? 'flex' : 'block';
      void inEl.offsetWidth;
      inEl.classList.add('zoom-back-enter');
      setTimeout(() => {
        inEl.classList.remove('zoom-back-enter');
        teamFooter.style.display = inEl.id === 'homeSection' ? 'flex' : 'none';
      }, TRANS_MS);
    }, TRANS_MS);
  } else {
    inEl.style.display = inEl.classList.contains('modal') ? 'flex' : 'block';
    void inEl.offsetWidth;
    inEl.classList.add('zoom-forward-enter');
    if (outEl) {
      outEl.classList.add('zoom-forward-exit');
      setTimeout(() => {
        outEl.style.display = 'none';
        outEl.classList.remove('zoom-forward-exit');
      }, TRANS_MS);
    }
    setTimeout(() => {
      inEl.classList.remove('zoom-forward-enter');
      teamFooter.style.display = inEl.id === 'homeSection' ? 'flex' : 'none';
    }, TRANS_MS);
  }
}

// Navigation
function openModal(id) {
  const newModal = document.getElementById(id);
  const currentVisible = getCurrentVisible();
  directionalTransition(currentVisible, newModal);
  document.querySelectorAll('.side-menu a').forEach(a => a.classList.remove('active'));
  document.querySelector(`.side-menu a[onclick*="${id}"]`).classList.add('active');
}

function goHome() {
  const homeSection = document.getElementById('homeSection');
  const currentVisible = getCurrentVisible();
  directionalTransition(currentVisible, homeSection);
  document.querySelectorAll('.side-menu a').forEach(a => a.classList.remove('active'));
  document.querySelector('.side-menu a:first-child').classList.add('active');
}

// Parallax effect
document.addEventListener('mousemove', (e) => {
  const wrap = document.getElementById('bgWrap');
  const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
  wrap.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Falling leaves animation
function createLeaf() {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');
  leaf.style.left = Math.random() * 100 + 'vw';
  const size = Math.random() * 20 + 20;
  leaf.style.width = size + 'px';
  leaf.style.height = size + 'px';
  const duration = Math.random() * 5 + 5;
  leaf.style.animationDuration = duration + 's';
  leaf.style.animationDelay = Math.random() * 5 + 's';
  const leafTypes = ['Images/GreenLeaf.png', 'Images/BrownLeaf.png'];
  leaf.style.backgroundImage = `url('${leafTypes[Math.floor(Math.random() * leafTypes.length)]}')`;
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), (duration + 5) * 1000);
}
setInterval(createLeaf, 800);
