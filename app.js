let lang = 'zh';
const picks = new Set();
const YOUR_EMAIL = 'ken91021615@gmail.com';
const YOUR_WHATSAPP = ''; // set to E.164 number without + e.g. "33612345678", or leave '' to hide
let fromFriendMode = false;

const t = (obj) => (obj && obj[lang]) || (obj && obj.zh) || '';

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

  let hotelsHtml = '';
  if (spot.hotels && spot.hotels.length) {
    hotelsHtml = `<div class="hotels"><h4>${t(UI.hotels)}</h4>` +
      spot.hotels.map(h => `<div class="hotel"><b>${h.name}</b> · ${h.price}<br><small>${t(h.note)}</small></div>`).join('') +
      `</div>`;
  }

  card.innerHTML = `
    <h3>${t(spot.name)}</h3>
    <p class="desc">${t(spot.desc)}</p>
    ${rows.join('')}
    ${hotelsHtml}
    <button class="select-btn">${selected ? t(UI.selected) : t(UI.select)}</button>
  `;

  card.querySelector('.select-btn').addEventListener('click', () => {
    if (picks.has(spot.id)) picks.delete(spot.id);
    else picks.add(spot.id);
    saveState();
    renderAll();
  });

  return card;
}

function renderPicks() {
  const list = document.getElementById('picks-list');
  const empty = document.getElementById('picks-empty');
  const sendBox = document.getElementById('send-box');
  const banner = document.getElementById('from-friend-banner');
  list.innerHTML = '';
  const all = [...DAY_SPOTS, ...OVERNIGHT_SPOTS];
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
  chosen.forEach(spot => {
    const div = document.createElement('div');
    div.className = 'pick-item';
    const type = DAY_SPOTS.find(d => d.id === spot.id)
      ? (lang === 'zh' ? '當天來回' : 'Day trip')
      : (lang === 'zh' ? '過夜' : 'Overnight');
    div.innerHTML = `<h4>${t(spot.name)}</h4><small>${type}</small>`;
    list.appendChild(div);
  });
}

function buildSummaryText() {
  const all = [...DAY_SPOTS, ...OVERNIGHT_SPOTS];
  const day = DAY_SPOTS.filter(s => picks.has(s.id));
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

function renderAll() {
  const daySec = document.getElementById('day-section');
  const overSec = document.getElementById('overnight-section');
  daySec.innerHTML = '';
  overSec.innerHTML = '';
  DAY_SPOTS.forEach(s => daySec.appendChild(renderCard(s, false)));
  OVERNIGHT_SPOTS.forEach(s => overSec.appendChild(renderCard(s, true)));

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
}

function saveState() {
  try {
    localStorage.setItem('sg-picks', JSON.stringify([...picks]));
    localStorage.setItem('sg-lang', lang);
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
  setupShareButtons();
  renderAll();
  if (fromFriendMode) switchTab('picks');
});
