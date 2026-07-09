/* ================================================================
   QUIÉREME — shared site logic
   One file, loaded on every page. Each render function checks that
   its target element exists before running, so this file works
   safely whether we're on index.html, collections.html, or about.html.
   ================================================================ */

// ---- 1. PRODUCT DATA ----
// bottleColor / capColor come straight from each fragrance's bottle description.
const products = [
  { id:1, name:"Ciegamente", meaning:"Blindly", collection:"night", bottleColor:"#1a1a1a", capColor:"#C2A687", image:"assets/products/ciegamente.jpg",
    concept:"The scent of beautiful obsession — a love so intense it ignores all warnings.",
    journey:{ first:"Warm rum and bitter, marzipan-like almond.", wear:"Dark roasted coffee wrapped in smoky tobacco leaf.", linger:"Bourbon vanilla and dark leather that lasts for days." } },
  { id:2, name:"Terciopelo", meaning:"Velvet", collection:"night", bottleColor:"#4B2E63", capColor:"#2D1E2F", image:"assets/products/terciopelo.jpg",
    concept:"Royal, plush, and heavy — like wrapping yourself in a midnight-purple velvet cloak.",
    journey:{ first:"Metallic saffron and tart blackcurrant.", wear:"Midnight orchid and a deep, velvety red rose.", linger:"Precious oud and cashmere musk." } },
  { id:3, name:"Nocturna", meaning:"Nocturnal", collection:"night", bottleColor:"#6b6b70", capColor:"#2D1E2F", image:"assets/products/nocturna.jpg",
    concept:"The energy of a historic European city after midnight — dark, sharp, sophisticated.",
    journey:{ first:"Smoked plum and cracked black pepper.", wear:"Cold, meditative church incense against warm plum.", linger:"Earthy patchouli and salty ambergris." } },
  { id:4, name:"Veneno Dulce", meaning:"Sweet Poison", collection:"night", bottleColor:"#7a1f2b", capColor:"#2D1E2F", image:"assets/products/veneno-dulce.jpg",
    concept:"Hypnotic and dangerous — sweet, with a dark undercurrent.",
    journey:{ first:"Wild dark berries and bright pink pepper.", wear:"85% dark chocolate and night-blooming jasmine.", linger:"Warm amber, sweet resins, animalic musk." } },

  { id:5, name:"Oro Blanco", meaning:"White Gold", collection:"floral", bottleColor:"#f2ede0", capColor:"#C2A687", image:"assets/products/oro-blanco.jpg",
    concept:"Clean luxury and quiet grace — crisp white linen and sunlit marble.",
    journey:{ first:"Premium white tea and crisp bergamot.", wear:"A regal bouquet of royal peony and night jasmine.", linger:"Smooth, expensive Indian sandalwood." } },
  { id:6, name:"Sigilo", meaning:"Silence", collection:"floral", bottleColor:"#e8e4e0", capColor:"#ffffff", image:"assets/products/sigilo.jpg",
    concept:"A subtle, expensive whisper that forces people to lean in closer.",
    journey:{ first:"Bright, sparkling cold-air aldehydes.", wear:"Powdery pale iris and white cotton flower.", linger:"Clean white musk and soft cashmere wood." } },
  { id:7, name:"Amante", meaning:"Lover", collection:"floral", bottleColor:"#b5495f", capColor:"#2D1E2F", image:"assets/products/amante.jpg",
    concept:"Unapologetic, classical romance — a modern take on the red rose.",
    journey:{ first:"Velvety crimson roses with a green stem freshness.", wear:"Narcotic French tuberose drizzled with warm honey.", linger:"Structural cedarwood and deep amber." } },

  { id:8, name:"Petricor", meaning:"Petrichor", collection:"earthy", bottleColor:"#d7d9d2", capColor:"#8a8a80", image:"assets/products/petricor.jpg",
    concept:"The raw smell of a summer thunderstorm hitting dry earth.",
    journey:{ first:"Damp geosmin and crushed ivy leaves.", wear:"Wet violet leaves and rain-soaked roses.", linger:"Rich oakmoss, vetiver, and cold mineral musk." } },
  { id:9, name:"Al Alba", meaning:"At Dawn", collection:"earthy", bottleColor:"#e8a06a", capColor:"#3a3a3a", image:"assets/products/al-alba.jpg",
    concept:"The exact transition from night to morning — crisp and golden.",
    journey:{ first:"Blood orange and spicy grated ginger.", wear:"Mediterranean orange blossom and neroli.", linger:"Glowing white amber and clean driftwood." } },
  { id:10, name:"Rocío", meaning:"Dew", collection:"earthy", bottleColor:"#a9d9c8", capColor:"#ffffff", image:"assets/products/rocio.jpg",
    concept:"Crisp morning air and the freshness of a new day.",
    journey:{ first:"Sour green apple and crushed bergamot mint.", wear:"Watery morning dew and wet lotus flower.", linger:"Crisp grass and light white cedarwood." } },

  { id:11, name:"Descalzo", meaning:"Barefoot", collection:"cozy", bottleColor:"#f0b8c0", capColor:"#f0b8c0", image:"assets/products/descalzo.jpg",
    concept:"Carefree summer days and sun-warmed skin.",
    journey:{ first:"Ripe mandarin and velvety peach nectar.", wear:"Sun-baked white freesia petals.", linger:"Spun sugar and warm blonde woods." } },
  { id:12, name:"Reliquia", meaning:"Relic", collection:"cozy", bottleColor:"#8a5a2b", capColor:"#4a3220", image:"assets/products/reliquia.jpg",
    concept:"Nostalgia, leather-bound journals, old historic libraries.",
    journey:{ first:"Sweet cinnamon bark and dried dark figs.", wear:"Aged oakwood, cedar, and old paper pages.", linger:"Golden amber and smooth labdanum resin." } },
  { id:13, name:"Hechizo", meaning:"Spell", collection:"cozy", bottleColor:"#b5793a", capColor:"#8a6a3a", image:"assets/products/hechizo.jpg",
    concept:"A comforting, sophisticated gourmand that wraps around you like a hug.",
    journey:{ first:"Marshmallow cream and toasted tonka bean.", wear:"Madagascar vanilla cut with a pinch of sea salt.", linger:"Velvety benzoin resin and warm musk." } },
  { id:14, name:"Suspiro", meaning:"Sigh", collection:"cozy", bottleColor:"#f5f0ec", capColor:"#f5f0ec", image:"assets/products/suspiro.jpg",
    concept:"Pure peace and quiet afternoons spent doing nothing.",
    journey:{ first:"Warm milk accord and delicate rice powder.", wear:"Soft white cotton flowers and pale heliotrope.", linger:"Creamy white musk that blends with your skin." } },
];

const collections = [
  { key:"night",  name:"The Night Collection",   blurb:"Heavy, alluring, unapologetically intense.", moodA:"#6E5A75", moodB:"#2D1E2F" },
  { key:"floral", name:"Luxury Floral",           blurb:"Sophisticated, elegant, high-fashion.",       moodA:"#E2A39F", moodB:"#EAE6DF" },
  { key:"earthy", name:"Atmospheric & Earthy",    blurb:"Hyper-realistic, poetic, wet nature.",        moodA:"#CBE3DB", moodB:"#EAE6DF" },
  { key:"cozy",   name:"Cozy & Nostalgic",        blurb:"Textural, comforting, warm, intimate.",       moodA:"#E2A39F", moodB:"#9F8EA9" },
];

// Placeholder testimonials — swap for real customer reviews later
const reviews = [
  { scent:"Ciegamente", quote:"It made a room go quiet when I walked in.", name:"M." },
  { scent:"Sigilo", quote:"People keep asking what I'm wearing. I never tell them.", name:"R." },
  { scent:"Petricor", quote:"Smells like the five minutes right before it rains.", name:"A." },
  { scent:"Hechizo", quote:"My best friend said it smells like being hugged.", name:"S." },
  { scent:"Amante", quote:"I wore it on a first date. There was a second.", name:"L." },
  { scent:"Terciopelo", quote:"Heavy in the best way — like a coat you never want to take off.", name:"N." },
];

// ---- 2. CART (persisted across pages with localStorage) ----
// Because this is now a real multi-page site (not a single scrolling page),
// the cart needs to survive navigating from index.html to collections.html.
// localStorage is the simple, standard way to do that.
function getCart(){
  const stored = localStorage.getItem('quiereme-cart');
  return stored ? JSON.parse(stored) : [];
}
function saveCart(cart){ localStorage.setItem('quiereme-cart', JSON.stringify(cart)); }

function updateCartUI(){
  const cart = getCart();
  const countEl = document.getElementById('cart-count');
  if(countEl) countEl.textContent = cart.length;

  const list = document.getElementById('cart-items');
  if(!list) return; // cart drawer isn't on every page's DOM until it's added

  if(cart.length === 0){
    list.innerHTML = `<div class="cart-empty">Your bag is empty — add a scent to begin.</div>`;
    return;
  }
  list.innerHTML = cart.map((item, index) => `
    <div class="cart-item"><span>${item.name} — ${item.type}</span><button data-index="${index}">Remove</button></div>
  `).join("");
  list.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = getCart(); c.splice(btn.dataset.index, 1); saveCart(c); updateCartUI();
    });
  });
}

function addToCart(name, type){
  const cart = getCart();
  cart.push({ name, type });
  saveCart(cart);
  updateCartUI();
  openCart();
}

function openCart(){ document.getElementById('cart-drawer')?.classList.add('open'); }
function closeCart(){ document.getElementById('cart-drawer')?.classList.remove('open'); }

// ---- 3. AMBIENT BUBBLE LAYER ----
function renderEther(){
  const ether = document.getElementById('ether');
  if(!ether) return;
  const drifts = ['driftA','driftB','driftC'];
  for(let i = 0; i < 10; i++){
    const dot = document.createElement('div');
    const size = 30 + Math.random() * 70;
    dot.className = 'dew' + (size > 70 ? ' large' : '');
    dot.style.width = size + 'px';
    dot.style.height = size + 'px';
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.top = Math.random() * 100 + 'vh';
    dot.style.animation = `${drifts[i % 3]} ${10 + Math.random() * 8}s ease-in-out infinite`;
    ether.appendChild(dot);
  }
}

// ---- 4. SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('in-view'); });
}, { threshold: 0.15 });
function observeReveals(){ document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el)); }

// ---- 5. HERO MOUSE PARALLAX (index.html) ----
function initHeroParallax(){
  const hero = document.getElementById('hero');
  const wrap = document.getElementById('hero-parallax');
  if(!hero || !wrap) return;
  hero.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    wrap.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// ---- 6. "ELIGE TU ELIXIR" STACK (index.html) ----
// Clicking a card bursts it into four colored squares (one per fragrance in
// that collection), then navigates to collections.html filtered to that set.
function renderCardStack(){
  const stack = document.getElementById('card-stack');
  if(!stack) return;

  collections.forEach((c, index) => {
    const card = document.createElement('div');
    card.className = 'elixir-card';
    card.tabIndex = 0;
    card.style.zIndex = collections.length - index;
    card.style.transform = `rotate(${(index - 1.5) * 5}deg) translateY(${index * 6}px)`;
    card.innerHTML = `<div class="card-brand">Quiéreme</div><h3>${c.name}</h3><p>${c.blurb}</p>`;

    card.addEventListener('click', () => burstAndGo(card, c.key));
    card.addEventListener('keypress', (e) => { if(e.key === 'Enter') burstAndGo(card, c.key); });

    stack.appendChild(card);
  });
}

function burstAndGo(card, collectionKey){
  card.classList.add('bursting');

  // spawn 4 squares, colored from the actual bottles in that collection
  const matches = products.filter(p => p.collection === collectionKey).slice(0, 4);
  const stack = document.getElementById('card-stack');
  matches.forEach((p, i) => {
    const sq = document.createElement('div');
    sq.className = 'burst-square';
    sq.style.background = p.bottleColor;
    const angle = (i / matches.length) * 360;
    const flyX = Math.cos(angle * Math.PI / 180) * 160;
    const flyY = Math.sin(angle * Math.PI / 180) * 160;
    sq.style.setProperty('--fly', `translate(${flyX}px, ${flyY}px)`);
    sq.style.animation = `burstOut 0.7s ease forwards`;
    stack.appendChild(sq);
  });

  // give the animation time to play, then move to the filtered collections page
  setTimeout(() => {
    window.location.href = `collections.html?collection=${collectionKey}`;
  }, 650);
}

// ---- 7. PRODUCT GRID (collections.html) ----
let activeCollection = "all";

function renderGrid(filter){
  const grid = document.getElementById('product-grid');
  if(!grid) return;
  grid.innerHTML = "";

  const visible = filter === "all" ? products : products.filter(p => p.collection === filter);

  visible.forEach((p, index) => {
    const card = document.createElement('div');
    card.className = p.image ? "card has-image" : "card";
    card.tabIndex = 0;
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.animation = `riseIn 0.7s cubic-bezier(.16,1,.3,1) ${index * 0.08}s forwards`;
    if(p.image) card.style.backgroundImage = `linear-gradient(180deg, rgba(20,14,20,0.15), rgba(20,14,20,0.85)), url('${p.image}')`;

    card.innerHTML = `
      ${p.image ? '' : `<div class="bottle" style="--bottle-color:${p.bottleColor}; --cap-color:${p.capColor};"></div>`}
      <div class="card-name">${p.name}</div>
      <div class="card-sub">${p.meaning}</div>
      <div class="card-concept">${p.concept}</div>
      <div class="card-actions">
        <button class="add-to-bag" data-id="${p.id}">Add to Bag</button>
        <button class="add-sample" data-id="${p.id}">Add Sample</button>
      </div>
      <div class="journey">
        <h4>${p.name}</h4>
        <p><strong>First Spray</strong>${p.journey.first}</p>
        <p><strong>The Wear</strong>${p.journey.wear}</p>
        <p><strong>The Linger</strong>${p.journey.linger}</p>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.add-to-bag').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = products.find(p => p.id == btn.dataset.id);
      addToCart(product.name, "Full Bottle");
    });
  });
  grid.querySelectorAll('.add-sample').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const product = products.find(p => p.id == btn.dataset.id);
      addToCart(product.name, "Sample");
    });
  });
}

function initFilters(){
  const buttons = document.querySelectorAll('.filter-btn');
  if(buttons.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCollection = btn.dataset.collection;
      renderGrid(activeCollection);
    });
  });

  // if we arrived from the index.html stack burst, auto-select that collection
  const params = new URLSearchParams(window.location.search);
  const preset = params.get('collection');
  if(preset){
    activeCollection = preset;
    const match = [...buttons].find(b => b.dataset.collection === preset);
    if(match){ buttons.forEach(b => b.classList.remove('active')); match.classList.add('active'); }
  }
  renderGrid(activeCollection);
}

// ---- 8. SCENT CONSTELLATION (collections.html) ----
function renderSphereField(){
  const field = document.getElementById('sphere-field');
  if(!field) return;
  field.innerHTML = reviews.map(r => `
    <div class="sphere" tabindex="0">
      <div class="sphere-card"><p>"${r.quote}"</p><div class="sig">${r.name}</div></div>
      <div class="sphere-name">${r.scent}</div>
    </div>
  `).join('');
}

// ---- 9. DISCOVERY SET BUILDER (collections.html) ----
let discoverySelection = [];
function renderDiscoveryChips(){
  const container = document.getElementById('discovery-chips');
  if(!container) return;
  container.innerHTML = products.map(p => `<div class="chip" data-id="${p.id}">${p.name}</div>`).join("");
  container.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const id = Number(chip.dataset.id);
      if(discoverySelection.includes(id)){
        discoverySelection = discoverySelection.filter(x => x !== id);
        chip.classList.remove('selected');
      } else if(discoverySelection.length < 5){
        discoverySelection.push(id);
        chip.classList.add('selected');
      }
      document.getElementById('discovery-count').textContent = discoverySelection.length;
    });
  });

  document.getElementById('add-discovery-set')?.addEventListener('click', () => {
    if(discoverySelection.length < 3){ alert("Pick at least 3 samples for your Discovery Set."); return; }
    discoverySelection.forEach(id => {
      const product = products.find(p => p.id === id);
      addToCart(product.name, "Discovery Sample");
    });
  });
}

// ---- 10. SCENT FINDER QUIZ (collections.html) ----
const quizQuestions = [
  { question:"What is your current mood?", options:[
    { label:"Intense and magnetic", value:"night" }, { label:"Elegant and composed", value:"floral" },
    { label:"Grounded and natural", value:"earthy" }, { label:"Soft and comforted", value:"cozy" } ]},
  { question:"Where are you heading?", options:[
    { label:"A late dinner", value:"night" }, { label:"A formal event", value:"floral" },
    { label:"A walk outside", value:"earthy" }, { label:"Staying in", value:"cozy" } ]},
  { question:"Pick a texture", options:[
    { label:"Velvet", value:"night" }, { label:"Silk", value:"floral" },
    { label:"Concrete", value:"earthy" }, { label:"Linen", value:"cozy" } ]},
];
let quizStep = 0, quizAnswers = [];
function openQuiz(){ quizStep = 0; quizAnswers = []; document.getElementById('quiz-modal')?.classList.add('open'); renderQuizStep(); }
function closeQuiz(){ document.getElementById('quiz-modal')?.classList.remove('open'); }
function renderQuizStep(){
  const body = document.getElementById('quiz-body');
  if(!body) return;
  if(quizStep < quizQuestions.length){
    const q = quizQuestions[quizStep];
    body.innerHTML = `<h3>${q.question}</h3><div class="quiz-options">${q.options.map(o => `<button data-value="${o.value}">${o.label}</button>`).join("")}</div>`;
    body.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => { quizAnswers.push(btn.dataset.value); quizStep++; renderQuizStep(); });
    });
  } else {
    const tally = {};
    quizAnswers.forEach(a => tally[a] = (tally[a] || 0) + 1);
    const topCollection = Object.keys(tally).sort((a,b) => tally[b] - tally[a])[0];
    const match = products.find(p => p.collection === topCollection);
    body.innerHTML = `
      <div class="quiz-result">
        <p style="font-size:0.7rem; letter-spacing:0.1em; text-transform:uppercase; color:var(--wisteria);">Your match is</p>
        <h4>${match.name}</h4>
        <p>${match.concept}</p>
        <button style="margin-top:22px; background:none; border:none; border-bottom:1px solid var(--ink); padding-bottom:5px; font-size:0.68rem; letter-spacing:0.2em; text-transform:uppercase; cursor:pointer;" class="quiz-add">Add to Bag</button>
      </div>`;
    body.querySelector('.quiz-add').addEventListener('click', () => {
      addToCart(match.name, "Full Bottle");
      closeQuiz();
    });
  }
}

// ---- 11. PAGE INITIALIZATION ----
// Every page includes this file, so we only wire up what's actually present.
document.addEventListener('DOMContentLoaded', () => {
  renderEther();
  observeReveals();
  updateCartUI();

  document.getElementById('cart-toggle')?.addEventListener('click', openCart);
  document.getElementById('close-cart')?.addEventListener('click', closeCart);

  initHeroParallax();
  renderCardStack();

  initFilters();          // renders the grid too, on collections.html
  renderSphereField();
  renderDiscoveryChips();

  document.getElementById('open-quiz')?.addEventListener('click', openQuiz);
  document.getElementById('close-quiz')?.addEventListener('click', closeQuiz);
});