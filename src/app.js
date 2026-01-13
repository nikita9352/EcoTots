// EcoTots – App logic
const DATA_URL = 'data/products.json';
const PICKUP_ADDRESS = 'Reliaable Acacia, Bangalore';
const PICKUP_MAPS = 'https://maps.app.goo.gl/g7dsYFs32bgio1bz7';
const WHATSAPP_NUMBER_INTL = '919621146688'; // no plus sign per wa.me format
const UPI_VPA = '9621146688@upi';
const UPI_PN = 'Nikita%20Agrawal';

function formatINR(amount) {
  try { return new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0}).format(amount); }
  catch(e){ return '₹' + amount; }
}

function makeUPILink(title, amount) {
  const note = encodeURIComponent(`EcoTots – ${title}`);
  return `upi://pay?pa=${UPI_VPA}&pn=${UPI_PN}&cu=INR&am=${encodeURIComponent(amount)}&tn=${note}`;
}

function waLinkEncoded(text) {
  return `https://wa.me/${WHATSAPP_NUMBER_INTL}?text=${encodeURIComponent(text)}`;
}

function buildOrderMessage(p) {
  const featuresPreview = (p.features || []).slice(0,2).join(', ');
  return [
    'Hello EcoTots! 👋',
    `I’d like to order: ${p.title}`,
    `Condition: ${p.condition}`,
    `Price: ₹${p.price}`,
    `Online link: ${p.online_link}`,
    `Pickup location: ${PICKUP_ADDRESS}`,
    `Maps: ${PICKUP_MAPS}`,
    `Key features: ${featuresPreview}`,
    'Please confirm availability and UPI payment details (9621146688@upi).'
  ].join('
');
}

function buildGeneralMessage() { return 'Hello EcoTots! I have a general question about your products.'; }
function buildSimilarAsk(title) { return `Hi EcoTots, I’m looking for something similar to: ${title}. Any recommendations?`; }

function createCard(p) {
  const card = document.createElement('article'); card.className = 'card';
  const media = document.createElement('div'); media.className = 'media';
  const dots = document.createElement('div'); dots.className = 'dots';
  (p.images||[]).forEach((src, idx) => {
    const img = document.createElement('img'); img.src = src; img.alt = p.title; if(idx===0) img.classList.add('active'); media.appendChild(img);
    const dot = document.createElement('span'); dot.className = 'dot' + (idx===0 ? ' active' : ''); dots.appendChild(dot);
  });
  if (p.status === 'sold') { const sold = document.createElement('div'); sold.className='sold-overlay'; sold.textContent='SOLD'; media.appendChild(sold); }
  media.appendChild(dots); card.appendChild(media);

  const content = document.createElement('div'); content.className='content';
  const title = document.createElement('h3'); title.textContent = p.title; content.appendChild(title);
  const desc = document.createElement('p'); desc.textContent = p.description; content.appendChild(desc);

  const badges = document.createElement('div'); badges.className='features';
  const cond = document.createElement('span'); cond.className='badge ' + (p.condition==='used'?'used':''); cond.textContent=(p.condition||'').toUpperCase(); badges.appendChild(cond);
  if (p.status === 'sold') { const bSold = document.createElement('span'); bSold.className='badge sold'; bSold.textContent='SOLD'; badges.appendChild(bSold); }
  (p.features||[]).slice(0,3).forEach(ft => { const s=document.createElement('span'); s.className='badge'; s.textContent=ft; badges.appendChild(s); });
  content.appendChild(badges);

  const price = document.createElement('div'); price.className='price'; price.textContent = formatINR(p.price); content.appendChild(price);

  const links = document.createElement('div'); links.className='links';
  const more = document.createElement('a'); more.href=p.online_link; more.target='_blank'; more.rel='noopener'; more.textContent='Online link'; links.appendChild(more);
  const pickup = document.createElement('a'); pickup.href=PICKUP_MAPS; pickup.target='_blank'; pickup.rel='noopener'; pickup.textContent='Pickup map'; links.appendChild(pickup);
  content.appendChild(links);

  const actions = document.createElement('div'); actions.className='actions';
  const upiBtn = document.createElement('a'); upiBtn.className='btn green'; upiBtn.textContent='Pay via UPI'; upiBtn.href=makeUPILink(p.title, p.price);
  const waBtn = document.createElement('a'); waBtn.className='btn whatsapp'; waBtn.textContent='Order on WhatsApp'; waBtn.href=waLinkEncoded(buildOrderMessage(p));

  if (p.status === 'sold') {
    upiBtn.classList.add('disabled'); upiBtn.removeAttribute('href');
    waBtn.classList.add('disabled'); waBtn.removeAttribute('href');
    const askSimilar = document.createElement('a'); askSimilar.className='btn'; askSimilar.textContent='Ask for similar products'; askSimilar.href=waLinkEncoded(buildSimilarAsk(p.title)); actions.appendChild(askSimilar);
  } else {
    actions.appendChild(upiBtn); actions.appendChild(waBtn);
  }

  content.appendChild(actions); card.appendChild(content);

  let current=0; media.addEventListener('click', ()=>{
    const imgs = Array.from(media.querySelectorAll('img')); if(!imgs.length) return;
    imgs[current].classList.remove('active'); dots.children[current].classList.remove('active');
    current = (current+1)%imgs.length; imgs[current].classList.add('active'); dots.children[current].classList.add('active');
  });

  return card;
}

async function loadProducts(){ const res = await fetch(DATA_URL); return await res.json(); }
function filterAndRender(list){ const q=(document.querySelector('#q').value||'').toLowerCase(); const grid=document.querySelector('#grid'); grid.innerHTML=''; list.filter(p=>{ const hay=[p.title,p.description,...(p.tags||[]),...(p.features||[])].join(' ').toLowerCase(); return hay.includes(q); }).forEach(p=> grid.appendChild(createCard(p))); }

(async function init(){ const list = await loadProducts(); const input=document.querySelector('#q'); input.addEventListener('input', ()=>filterAndRender(list)); filterAndRender(list); })();
