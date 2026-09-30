/* =========================================================
   Sitemap Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- جست‌وجو در لینک‌ها ---------- */
const searchInput = $('#sitemapSearch');
const groups = $$('.sitemap-group');

const filterSitemap = q => {
  const query = q.trim().toLowerCase();

  if (!query) {
    groups.forEach(g => {
      g.classList.remove('hidden');
      $$('.sitemap-list li', g).forEach(li => li.classList.remove('hidden'));
    });
    return;
  }

  groups.forEach(g => {
    let matches = 0;
    $$('.sitemap-list li', g).forEach(li => {
      const text = li.textContent.toLowerCase();
      const match = text.includes(query);
      li.classList.toggle('hidden', !match);
      if (match) matches++;
    });
    g.classList.toggle('hidden', matches === 0);
  });
};

searchInput?.addEventListener('input', e => filterSitemap(e.target.value));

/* ---------- Ctrl+K ---------- */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInput?.focus();
  }
});

/* ---------- Highlight active link ---------- */
const currentPath = location.pathname.split('/').pop();
$$('.sitemap-list a').forEach(a => {
  const href = a.getAttribute('href') || '';
  const file = href.split('#')[0].split('/').pop();
  if (file === currentPath) {
    a.classList.add('is-current');
    a.innerHTML = `<i class="ri-arrow-left-line"></i> ${a.textContent}`;
  }
});

/* ---------- Smooth scroll برای anchor ها ---------- */
$$('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ---------- Toast (برای آینده) ---------- */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[200] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}