let lang = 'zh';
const picks = new Set();

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
  list.innerHTML = '';
  const all = [...DAY_SPOTS, ...OVERNIGHT_SPOTS];
  const chosen = all.filter(s => picks.has(s.id));
  if (chosen.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
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
  renderAll();
});
