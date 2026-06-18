let lang = 'zh';
let sortMode = 'score'; // 'score' or 'time'
const picks = new Set();
const YOUR_EMAIL = 'ken91021615@gmail.com';
const YOUR_WHATSAPP = ''; // set to E.164 number without + e.g. "33612345678", or leave '' to hide
let fromFriendMode = false;

function sortSpots(spots) {
  const copy = spots.slice();
  if (sortMode === 'time') {
    copy.sort((a, b) => (a.travelMin ?? 9999) - (b.travelMin ?? 9999));
  } else {
    copy.sort((a, b) => (b.score ?? -1) - (a.score ?? -1));
  }
  return copy;
}

const t = (obj) => (obj && obj[lang]) || (obj && obj.zh) || '';

const IMG_CACHE_VERSION = 3;
const imageCache = (() => {
  try {
    const v = parseInt(localStorage.getItem('sg-imgs-v') || '0', 10);
    if (v !== IMG_CACHE_VERSION) {
      localStorage.removeItem('sg-imgs');
      localStorage.setItem('sg-imgs-v', String(IMG_CACHE_VERSION));
      return {};
    }
    return JSON.parse(localStorage.getItem('sg-imgs') || '{}');
  } catch (e) { return {}; }
})();

function saveImageCache() {
  try { localStorage.setItem('sg-imgs', JSON.stringify(imageCache)); } catch (e) {}
}

async function fetchWikiImage(title) {
  if (!title) return null;
  if (imageCache[title] !== undefined) return imageCache[title];
  try {
    const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title.replace(/ /g, '_'));
    const res = await fetch(url);
    if (!res.ok) { imageCache[title] = null; saveImageCache(); return null; }
    const data = await res.json();
    const src = (data.thumbnail && data.thumbnail.source) || (data.originalimage && data.originalimage.source) || null;
    imageCache[title] = src;
    saveImageCache();
    return src;
  } catch (e) {
    imageCache[title] = null;
    saveImageCache();
    return null;
  }
}

function renderCard(spot, isOvernight) {
  const selected = picks.has(spot.id);
  const card = document.createElement('article');
  card.className = 'card' + (selected ? ' selected' : '');
  card.dataset.id = spot.id;

  const rows = [];
  if (spot.duration) rows.push(`<div class="row"><strong>⏱</strong><span>${t(spot.duration)}</span></div>`);
  if (spot.travel)   rows.push(`<div class="row"><strong>🚆</strong><span>${t(spot.travel)}</span></div>`);
  if (spot.transit)  rows.push(`<div class="row"><strong>🚌</strong><span>${t(spot.transit)}</span></div>`);
  if (spot.stay)     rows.push(`<div class="row"><strong>🛏</strong><span>${t(UI.stay)}: ${t(spot.stay)}</span></div>`);
  if (spot.cost)     rows.push(`<div class="row"><strong>💶</strong><span>${t(spot.cost)}</span></div>`);
  if (spot.tip)      rows.push(`<div class="row"><strong>💡</strong><span>${t(spot.tip)}</span></div>`);
  if (spot.timeToMain) rows.push(`<div class="row"><strong>🚶</strong><span>${t(UI.toMain)}: ${t(spot.timeToMain)}</span></div>`);

  const scoreBadge = (typeof spot.score === 'number')
    ? `<span class="score-badge">⭐ ${spot.score.toFixed(1)}</span>` : '';

  let hotelsHtml = '';
  if (spot.booking) {
    const q = encodeURIComponent(spot.booking.query);
    const cur = spot.booking.currency || 'EUR';
    const maxP = spot.booking.budgetMax || 250;
    const nflt = encodeURIComponent(`review_score=80;price=${cur}-min-${maxP}-1`);
    const bk = `https://www.booking.com/searchresults.html?ss=${q}&checkin=2026-08-10&checkout=2026-08-11&group_adults=2&group_children=0&no_rooms=1&selected_currency=${cur}&nflt=${nflt}`;
    const ag = `https://www.agoda.com/search?textToSearch=${q}&checkIn=2026-08-10&checkOut=2026-08-11&adults=2&rooms=1&priceCur=${cur}&priceTo=${maxP}`;
    hotelsHtml = `<div class="hotels">
      <h4>🛏 ${t(UI.staysHead)}</h4>
      <div class="hotel-links">
        <a href="${bk}" target="_blank" rel="noopener noreferrer">${t(UI.staysBk)}</a>
        <a href="${ag}" target="_blank" rel="noopener noreferrer">${t(UI.staysAg)}</a>
      </div>`;
    if (spot.hotels && spot.hotels.length) {
      hotelsHtml += `<p class="hotel-sugg-label">${t(UI.staysSugg)}</p>` +
        spot.hotels.map(h => `<div class="hotel"><b>${h.name}</b><br><small>${t(h.note)}</small></div>`).join('');
    }
    hotelsHtml += `</div>`;
  }

  const directImage = spot.image || null;
  const cached = directImage || (spot.wiki ? imageCache[spot.wiki] : null);
  const hasImage = typeof cached === 'string';
  const stillLoading = !directImage && spot.wiki && imageCache[spot.wiki] === undefined;
  const imgHtml = `<div class="card-img${stillLoading ? ' loading' : ''}${hasImage ? '' : ' empty'}"${hasImage ? ` style="background-image:url('${cached}')"` : ''}></div>`;

  card.innerHTML = `
    ${imgHtml}
    <div class="card-body">
      <h3>${t(spot.name)}${scoreBadge}</h3>
      <p class="desc">${t(spot.desc)}</p>
      ${spot.personalNote ? `<p class="personal-note">${t(spot.personalNote)}</p>` : ''}
      ${rows.join('')}
      ${hotelsHtml}
      <button class="select-btn">${selected ? t(UI.selected) : t(UI.select)}</button>
    </div>
  `;

  if (stillLoading) {
    fetchWikiImage(spot.wiki).then(src => {
      const el = card.querySelector('.card-img');
      if (!el) return;
      el.classList.remove('loading');
      if (src) {
        el.style.backgroundImage = `url('${src}')`;
        el.classList.remove('empty');
      }
    });
  }

  card.querySelector('.select-btn').addEventListener('click', () => {
    if (picks.has(spot.id)) picks.delete(spot.id);
    else picks.add(spot.id);
    saveState();
    renderAll();
  });

  return card;
}

function allSpotsForPicks() {
  const groups = (typeof DAY_GROUPS !== 'undefined') ? DAY_GROUPS : [];
  return [...DAY_SPOTS, ...groups, ...OVERNIGHT_SPOTS];
}

function renderPicks() {
  const list = document.getElementById('picks-list');
  const empty = document.getElementById('picks-empty');
  const sendBox = document.getElementById('send-box');
  const banner = document.getElementById('from-friend-banner');
  list.innerHTML = '';
  const all = allSpotsForPicks();
  const chosen = all.filter(s => picks.has(s.id));

  banner.classList.toggle('hidden', !fromFriendMode);
  if (fromFriendMode) banner.textContent = t(UI.fromFriendBanner);

  if (chosen.length === 0) {
    empty.classList.remove('hidden');
    sendBox.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  sendBox.classList.toggle('hidden', fromFriendMode);
  const groups = (typeof DAY_GROUPS !== 'undefined') ? DAY_GROUPS : [];
  chosen.forEach(spot => {
    const div = document.createElement('div');
    div.className = 'pick-item';
    const isDay = DAY_SPOTS.find(d => d.id === spot.id) || groups.find(g => g.id === spot.id);
    const type = isDay
      ? (lang === 'zh' ? '當天來回' : 'Day trip')
      : (lang === 'zh' ? '過夜' : 'Overnight');
    const imgSrc = spot.image || (spot.wiki ? imageCache[spot.wiki] : null);
    const imgHtml = imgSrc
      ? `<div class="pick-img" style="background-image:url('${imgSrc}')"></div>`
      : `<div class="pick-img empty"></div>`;
    div.innerHTML = `
      ${imgHtml}
      <div class="pick-text">
        <h4>${t(spot.name)}</h4>
        <small>${type}</small>
      </div>`;
    list.appendChild(div);
  });
}

function buildSummaryText() {
  const groups = (typeof DAY_GROUPS !== 'undefined') ? DAY_GROUPS : [];
  const day = [...DAY_SPOTS, ...groups].filter(s => picks.has(s.id) && !s.hideInCard);
  const over = OVERNIGHT_SPOTS.filter(s => picks.has(s.id));
  const lines = [];
  lines.push(lang === 'zh' ? '我選的地方：' : 'My picks:');
  if (day.length) {
    lines.push('');
    lines.push(lang === 'zh' ? '🌅 當天來回' : '🌅 Day trips');
    day.forEach(s => lines.push('  - ' + t(s.name)));
  }
  if (over.length) {
    lines.push('');
    lines.push(lang === 'zh' ? '🌙 過夜' : '🌙 Overnight');
    over.forEach(s => lines.push('  - ' + t(s.name)));
  }
  return lines.join('\n');
}

function buildShareLink() {
  const ids = [...picks].join(',');
  const url = new URL(window.location.href);
  url.searchParams.set('picks', ids);
  url.searchParams.set('lang', lang);
  return url.toString();
}

function showToast(msg) {
  const toast = document.getElementById('send-toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('show'), 2000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return true;
  }
}

function setupShareButtons() {
  document.getElementById('btn-copy').addEventListener('click', async () => {
    await copyToClipboard(buildSummaryText());
    showToast(t(UI.copied));
  });
  document.getElementById('btn-link').addEventListener('click', async () => {
    await copyToClipboard(buildShareLink());
    showToast(t(UI.copied));
  });
  document.getElementById('btn-email').addEventListener('click', () => {
    const body = buildSummaryText() + '\n\n' + buildShareLink();
    const url = 'mailto:' + encodeURIComponent(YOUR_EMAIL) +
      '?subject=' + encodeURIComponent(t(UI.emailSubject)) +
      '&body=' + encodeURIComponent(body);
    window.location.href = url;
  });
  const waBtn = document.getElementById('btn-wa');
  if (!YOUR_WHATSAPP) {
    waBtn.style.display = 'none';
  } else {
    waBtn.addEventListener('click', () => {
      const text = buildSummaryText() + '\n\n' + buildShareLink();
      window.open('https://wa.me/' + YOUR_WHATSAPP + '?text=' + encodeURIComponent(text), '_blank');
    });
  }
}

function dayCards() {
  const groups = (typeof DAY_GROUPS !== 'undefined') ? DAY_GROUPS : [];
  return DAY_SPOTS.filter(s => !s.hideInCard).concat(groups);
}

function renderAll() {
  const daySec = document.getElementById('day-section');
  const overSec = document.getElementById('overnight-section');
  daySec.innerHTML = '';
  overSec.innerHTML = '';
  sortSpots(dayCards()).forEach(s => daySec.appendChild(renderCard(s, false)));
  sortSpots(OVERNIGHT_SPOTS).forEach(s => overSec.appendChild(renderCard(s, true)));

  document.querySelectorAll('.sort-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.sort === sortMode);
  });

  document.getElementById('pickCount').textContent = picks.size;
  renderPicks();

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (UI[key]) {
      // preserve trailing count span on the picks tab
      if (key === 'tabPicks') {
        el.childNodes[0].nodeValue = t(UI[key]) + ' ';
      } else {
        el.textContent = t(UI[key]);
      }
    }
  });
  document.documentElement.lang = lang === 'zh' ? 'zh-TW' : 'en';
}

function switchTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.getElementById('day-section').classList.toggle('hidden', name !== 'day');
  document.getElementById('overnight-section').classList.toggle('hidden', name !== 'overnight');
  document.getElementById('picks-section').classList.toggle('hidden', name !== 'picks');
  document.getElementById('map-section').classList.toggle('hidden', name !== 'map');
  document.getElementById('sort-bar').classList.toggle('hidden', name === 'picks' || name === 'map');
  if (name === 'map') ensureMap();
}

let _map = null;
function makeIcon(color) {
  return L.divIcon({
    className: 'sg-marker',
    html: `<div style="width:18px;height:18px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.25)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -8]
  });
}

function ensureMap() {
  if (_map) {
    setTimeout(() => _map.invalidateSize(), 0);
    return;
  }
  const el = document.getElementById('map');
  _map = L.map(el).setView([46.5, 6.8], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
  }).addTo(_map);

  // Home marker
  L.marker(HOME_COORDS, { icon: makeIcon('#f5b800') })
    .bindPopup(`<h4>🏠 Saint-Genis Champ Fusy</h4><small>${t(UI.mapHome)}</small>`)
    .addTo(_map);

  const allBounds = [HOME_COORDS];

  const place = (spot, kind) => {
    const c = SPOT_COORDS[spot.id];
    if (!c) return;
    allBounds.push(c);
    const color = kind === 'day' ? '#3b82f6' : '#c75b5b';
    const score = (typeof spot.score === 'number') ? `<span class="pop-score">⭐ ${spot.score.toFixed(1)}</span>` : '';
    const timeLine = spot.duration ? t(spot.duration) : (spot.travel ? t(spot.travel) : '');
    const label = kind === 'day' ? t(UI.mapDay) : t(UI.mapOver);
    L.marker(c, { icon: makeIcon(color) })
      .bindPopup(`<h4>${t(spot.name)} ${score}</h4><small>${label}</small><br><small>⏱ ${timeLine}</small>`)
      .addTo(_map);
  };

  DAY_SPOTS.forEach(s => place(s, 'day'));
  OVERNIGHT_SPOTS.forEach(s => place(s, 'over'));

  _map.fitBounds(allBounds, { padding: [30, 30] });
}

function saveState() {
  try {
    localStorage.setItem('sg-picks', JSON.stringify([...picks]));
    localStorage.setItem('sg-lang', lang);
    localStorage.setItem('sg-sort', sortMode);
  } catch (e) {}
}

function loadState() {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlPicks = params.get('picks');
    const urlLang = params.get('lang');
    if (urlPicks) {
      // viewing a friend's shared link — don't merge with local storage
      fromFriendMode = true;
      urlPicks.split(',').filter(Boolean).forEach(id => picks.add(id));
      if (urlLang === 'en' || urlLang === 'zh') lang = urlLang;
      return;
    }
    const savedPicks = JSON.parse(localStorage.getItem('sg-picks') || '[]');
    savedPicks.forEach(id => picks.add(id));
    const savedLang = localStorage.getItem('sg-lang');
    if (savedLang === 'en' || savedLang === 'zh') lang = savedLang;
    const savedSort = localStorage.getItem('sg-sort');
    if (savedSort === 'score' || savedSort === 'time') sortMode = savedSort;
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.addEventListener('click', () => {
      lang = btn.dataset.lang;
      document.querySelectorAll('.lang-toggle button').forEach(b => b.classList.toggle('active', b === btn));
      saveState();
      renderAll();
    });
  });
  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => switchTab(t.dataset.tab)));
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sortMode = btn.dataset.sort;
      saveState();
      renderAll();
    });
  });
  setupShareButtons();
  renderAll();
  if (fromFriendMode) switchTab('picks');
});
