let lang = 'zh';
let sortMode = 'score'; // 'score' or 'time'
let totalDays = 7;
const picks = new Set();
const dayPlan = new Map(); // spotId -> Set<dayNumber>; absent = unassigned
const MAX_DAYS = 14;

function isOvernightSpot(id) {
  return OVERNIGHT_SPOTS.some(s => s.id === id);
}
const YOUR_EMAIL = 'ken91021615@gmail.com';
const YOUR_WHATSAPP = ''; // set to E.164 number without + e.g. "33612345678", or leave '' to hide
let fromFriendMode = false;
let friendMessage = '';

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

function pickItemHtml(spot) {
  const grouped = (typeof DAY_GROUPS !== 'undefined') ? DAY_GROUPS : [];
  const isDay = DAY_SPOTS.find(d => d.id === spot.id) || grouped.find(g => g.id === spot.id);
  const overnight = isOvernightSpot(spot.id);
  const type = isDay
    ? (lang === 'zh' ? '當天來回' : 'Day trip')
    : (lang === 'zh' ? '過夜（可複選天數）' : 'Overnight (multi-day)');
  const imgSrc = spot.image || (spot.wiki ? imageCache[spot.wiki] : null);
  const imgHtml = imgSrc
    ? `<div class="pick-img" style="background-image:url('${imgSrc}')"></div>`
    : `<div class="pick-img empty"></div>`;
  const currentSet = dayPlan.get(spot.id) || new Set();
  const chips = [
    `<button data-day="0" class="day-chip${currentSet.size === 0 ? ' active' : ''}">—</button>`
  ];
  for (let d = 1; d <= totalDays; d++) {
    chips.push(`<button data-day="${d}" class="day-chip${currentSet.has(d) ? ' active' : ''}">${d}</button>`);
  }
  const chipsHtml = fromFriendMode
    ? ''
    : `<div class="day-chips" data-spot-id="${spot.id}" data-overnight="${overnight ? '1' : '0'}">
         <span class="day-chip-label">${t(UI.setDayHint)}</span>${chips.join('')}
       </div>`;
  return `
    ${imgHtml}
    <div class="pick-text">
      <h4>${t(spot.name)}</h4>
      <small>${type}</small>
      ${chipsHtml}
    </div>`;
}

function formatMin(min) {
  if (min < 60) return `${min}m`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
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

  // Message box / display
  const msgBox = document.getElementById('message-box');
  const msgDisplay = document.getElementById('friend-message-display');
  if (fromFriendMode) {
    msgBox.classList.add('hidden');
    if (friendMessage) {
      msgDisplay.classList.remove('hidden');
      msgDisplay.innerHTML = `<div class="msg-title">${t(UI.msgFromFriend)}</div><div class="msg-body">${friendMessage.replace(/\n/g, '<br>')}</div>`;
    } else {
      msgDisplay.classList.add('hidden');
    }
  } else {
    msgDisplay.classList.add('hidden');
    msgBox.classList.remove('hidden');
    const ta = document.getElementById('friend-message');
    if (ta && ta.value !== friendMessage) ta.value = friendMessage;
  }

  if (chosen.length === 0) {
    empty.classList.remove('hidden');
    sendBox.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  sendBox.classList.toggle('hidden', fromFriendMode);

  // Group by day. Each spot may appear in multiple days (overnight that spans).
  // Travel time counted only on the earliest assigned day to avoid double-counting.
  const byDay = new Map();
  byDay.set(0, []);
  for (let d = 1; d <= MAX_DAYS; d++) byDay.set(d, []);
  chosen.forEach(spot => {
    const set = dayPlan.get(spot.id);
    if (!set || set.size === 0) {
      byDay.get(0).push(spot);
    } else {
      const minDay = Math.min(...set);
      set.forEach(d => {
        if (!byDay.has(d)) byDay.set(d, []);
        byDay.get(d).push({ spot, isArrivalDay: d === minDay });
      });
    }
  });

  // Render day sections (skip empty days)
  byDay.forEach((items, day) => {
    if (items.length === 0) return;
    const sec = document.createElement('div');
    sec.className = 'day-section' + (day === 0 ? ' unassigned' : '');
    // Count travel time only on arrival day (or always for unassigned/single-day)
    const totalMin = items.reduce((sum, it) => {
      const spot = it.spot || it;
      const counts = (day === 0) || (it.isArrivalDay !== false);
      return sum + (counts ? (spot.travelMin || 0) : 0);
    }, 0);
    const title = day === 0 ? t(UI.dayUnassigned) : `${t(UI.dayLabel)} ${day}`;
    const summary = day === 0
      ? `${items.length} ${t(UI.daySpots)}`
      : `${items.length} ${t(UI.daySpots)} · ${t(UI.dayTravel)}${formatMin(totalMin)}`;
    sec.innerHTML = `<h3 class="day-header"><span class="day-title">${title}</span><span class="day-summary">${summary}</span></h3>`;
    const wrap = document.createElement('div');
    wrap.className = 'day-items';
    items.forEach(it => {
      const spot = it.spot || it;
      const div = document.createElement('div');
      div.className = 'pick-item';
      div.innerHTML = pickItemHtml(spot);
      wrap.appendChild(div);
    });
    sec.appendChild(wrap);
    list.appendChild(sec);
  });

  // Wire up day chip clicks
  list.querySelectorAll('.day-chips').forEach(group => {
    const id = group.dataset.spotId;
    const isOver = group.dataset.overnight === '1';
    group.querySelectorAll('.day-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const d = parseInt(chip.dataset.day, 10);
        let set = dayPlan.get(id);
        if (d === 0) {
          dayPlan.delete(id);
        } else if (isOver) {
          // multi-select toggle
          if (!set) { set = new Set(); dayPlan.set(id, set); }
          if (set.has(d)) set.delete(d);
          else set.add(d);
          if (set.size === 0) dayPlan.delete(id);
        } else {
          // single-select replace
          dayPlan.set(id, new Set([d]));
        }
        saveState();
        renderPicks();
      });
    });
  });

  // Show the total-days control
  const tdc = document.getElementById('trip-days-control');
  tdc.classList.toggle('hidden', fromFriendMode);
  const tdi = document.getElementById('total-days-input');
  tdi.value = totalDays;
}

function buildSummaryText() {
  const groups = (typeof DAY_GROUPS !== 'undefined') ? DAY_GROUPS : [];
  const day = [...DAY_SPOTS, ...groups].filter(s => picks.has(s.id) && !s.hideInCard);
  const over = OVERNIGHT_SPOTS.filter(s => picks.has(s.id));
  const msgBlock = friendMessage.trim()
    ? `\n💌 ${lang === 'zh' ? '想對你說的話' : 'A note for you'}：\n${friendMessage.trim()}\n`
    : '';
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
  return lines.join('\n') + msgBlock;
}

function buildShareLink() {
  const ids = [...picks].join(',');
  const url = new URL(window.location.href);
  url.searchParams.set('picks', ids);
  url.searchParams.set('lang', lang);
  const days = encodeDays();
  if (days) url.searchParams.set('days', days);
  else url.searchParams.delete('days');
  if (friendMessage.trim()) url.searchParams.set('msg', friendMessage.trim());
  else url.searchParams.delete('msg');
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
  document.getElementById('packing-section').classList.toggle('hidden', name !== 'packing');
  document.getElementById('sort-bar').classList.toggle('hidden',
    name === 'picks' || name === 'map' || name === 'packing');
  if (name === 'map') ensureMap();
  if (name === 'packing') renderPacking();
}

const packed = new Set();

function loadPacking() {
  try {
    const saved = JSON.parse(localStorage.getItem('sg-packing') || '[]');
    saved.forEach(id => packed.add(id));
  } catch (e) {}
}

function savePacking() {
  try { localStorage.setItem('sg-packing', JSON.stringify([...packed])); } catch (e) {}
}

function renderPacking() {
  const root = document.getElementById('packing-list');
  if (!root || typeof PACKING_CATEGORIES === 'undefined') return;
  root.innerHTML = '';
  let total = 0, done = 0;
  PACKING_CATEGORIES.forEach(cat => {
    const sec = document.createElement('div');
    sec.className = 'packing-cat';
    let catDone = 0;
    const notesList = [];
    const itemsHtml = cat.items.map(item => {
      total++;
      const checked = packed.has(item.id);
      if (checked) { done++; catDone++; }
      const hasNote = !!item.note;
      const infoMark = hasNote
        ? `<span class="pack-info" title="${t(item.note).replace(/"/g, '&quot;')}">ℹ️</span>`
        : '';
      if (hasNote) notesList.push({ name: t(item.name), note: t(item.note) });
      return `<label class="pack-item ${checked ? 'checked' : ''}">
        <input type="checkbox" data-item-id="${item.id}" ${checked ? 'checked' : ''}>
        <span class="pack-name">${t(item.name)}</span>
        ${infoMark}
      </label>`;
    }).join('');
    const catNote = cat.note ? `<p class="pack-cat-note">${t(cat.note)}</p>` : '';
    const notesHtml = notesList.length
      ? `<div class="pack-notes-box">
           <div class="pack-notes-title">ℹ️ ${lang === 'zh' ? '備註' : 'Notes'}</div>
           ${notesList.map(n => `<div class="pack-note-row"><b>${n.name}</b>：<span>${n.note}</span></div>`).join('')}
         </div>`
      : '';
    sec.innerHTML = `
      <h3 class="pack-cat-title">${t(cat.title)} <small>${catDone}/${cat.items.length}</small></h3>
      ${catNote}
      <div class="pack-items">${itemsHtml}</div>
      ${notesHtml}`;
    root.appendChild(sec);
  });
  root.querySelectorAll('input[type=checkbox][data-item-id]').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.dataset.itemId;
      if (cb.checked) packed.add(id);
      else packed.delete(id);
      savePacking();
      renderPacking();
    });
  });
  // progress
  const pct = total ? Math.round(done / total * 100) : 0;
  document.getElementById('packing-bar-fill').style.width = pct + '%';
  document.getElementById('packing-progress-text').textContent =
    `${t(UI.packingProgress)}: ${done} / ${total} (${pct}%)`;
}

function setupPacking() {
  loadPacking();
  document.getElementById('packing-reset').addEventListener('click', () => {
    if (confirm(lang === 'zh' ? '確定要清掉所有勾選嗎？' : 'Clear all checked items?')) {
      packed.clear();
      savePacking();
      renderPacking();
    }
  });
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
    const dayObj = {};
    dayPlan.forEach((set, id) => { dayObj[id] = [...set]; });
    localStorage.setItem('sg-days', JSON.stringify(dayObj));
    localStorage.setItem('sg-totaldays', String(totalDays));
    localStorage.setItem('sg-msg', friendMessage);
  } catch (e) {}
}

function encodeDays() {
  // Format: "spotId:day1-day2-day3,spotId:day1"
  return [...dayPlan.entries()]
    .map(([id, set]) => `${id}:${[...set].sort((a, b) => a - b).join('-')}`)
    .join(',');
}

function parseDays(str) {
  if (!str) return;
  str.split(',').filter(Boolean).forEach(pair => {
    const [id, dStr] = pair.split(':');
    if (!id || !dStr) return;
    const days = dStr.split('-')
      .map(s => parseInt(s, 10))
      .filter(n => n >= 1 && n <= MAX_DAYS);
    if (days.length) dayPlan.set(id, new Set(days));
  });
}

function loadState() {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlPicks = params.get('picks');
    const urlLang = params.get('lang');
    const urlDays = params.get('days');
    if (urlPicks) {
      // viewing a friend's shared link — don't merge with local storage
      fromFriendMode = true;
      urlPicks.split(',').filter(Boolean).forEach(id => picks.add(id));
      if (urlLang === 'en' || urlLang === 'zh') lang = urlLang;
      parseDays(urlDays);
      friendMessage = params.get('msg') || '';
      return;
    }
    const savedPicks = JSON.parse(localStorage.getItem('sg-picks') || '[]');
    savedPicks.forEach(id => picks.add(id));
    const savedLang = localStorage.getItem('sg-lang');
    if (savedLang === 'en' || savedLang === 'zh') lang = savedLang;
    const savedSort = localStorage.getItem('sg-sort');
    if (savedSort === 'score' || savedSort === 'time') sortMode = savedSort;
    const savedDaysRaw = JSON.parse(localStorage.getItem('sg-days') || '{}');
    if (Array.isArray(savedDaysRaw)) {
      // legacy format: [[id, day], ...]
      savedDaysRaw.forEach(([id, d]) => dayPlan.set(id, new Set([d])));
    } else {
      Object.entries(savedDaysRaw).forEach(([id, arr]) => {
        if (Array.isArray(arr) && arr.length) dayPlan.set(id, new Set(arr));
      });
    }
    const savedTotal = parseInt(localStorage.getItem('sg-totaldays') || '7', 10);
    if (savedTotal >= 1 && savedTotal <= MAX_DAYS) totalDays = savedTotal;
    friendMessage = localStorage.getItem('sg-msg') || '';
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
  setupMusic();
  setupPacking();
  const msgTa = document.getElementById('friend-message');
  if (msgTa) {
    msgTa.addEventListener('input', () => {
      friendMessage = msgTa.value;
      saveState();
    });
  }
  // i18n placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (UI[key]) el.setAttribute('placeholder', t(UI[key]));
  });
  const tdi = document.getElementById('total-days-input');
  tdi.addEventListener('change', () => {
    const n = parseInt(tdi.value, 10);
    if (n >= 1 && n <= MAX_DAYS) {
      totalDays = n;
      saveState();
      renderPicks();
    } else {
      tdi.value = totalDays;
    }
  });
  renderAll();
  if (fromFriendMode) switchTab('picks');
});

function setupMusic() {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('music-toggle');
  audio.volume = 0.3;

  const update = (playing) => {
    btn.classList.toggle('playing', playing);
    btn.textContent = playing ? '🔊' : '🎵';
    btn.title = playing ? '靜音' : '播放背景音樂';
  };

  btn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().then(() => {
        update(true);
        localStorage.setItem('sg-music', '1');
      }).catch(() => {
        btn.textContent = '🎵';
        btn.title = '找不到 music/bg.mp3 — 請放一個 MP3 進去';
      });
    } else {
      audio.pause();
      update(false);
      localStorage.setItem('sg-music', '0');
    }
  });

  // Try to autoplay if user previously enabled it (browsers may block on first visit)
  if (localStorage.getItem('sg-music') === '1') {
    audio.play().then(() => update(true)).catch(() => {});
  }
}
