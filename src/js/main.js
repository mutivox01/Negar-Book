const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- Drawer/Panel helper ---------- */
const createDrawer = ({ panel, overlay, openTriggers, closeTriggers }) => {
  if (!panel) return;
  const open = () => {
    panel.classList.add('open');
    overlay?.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };
  const close = () => {
    panel.classList.remove('open');
    overlay?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };
  $$(openTriggers).forEach(el => el.addEventListener('click', open));
  $$(closeTriggers).forEach(el => el.addEventListener('click', close));
  return { open, close };
};

/* ---------- Mobile drawer ---------- */
createDrawer({
  panel: $('#mobileDrawer'),
  overlay: $('#mobileOverlay'),
  openTriggers: '[data-mobile-open]',
  closeTriggers: '[data-mobile-close]'
});

/* ---------- Cart panel ---------- */
const cartPanel = $('#cartPanel');
const cartDrawer = createDrawer({
  panel: cartPanel,
  overlay: $('#cartOverlay'),
  openTriggers: '[data-cart-toggle]',
  closeTriggers: '[data-cart-close]'
});

/* ---------- Mega menu ---------- */
const megaMenu = $('#megaMenu');
$$('[data-mega-toggle]').forEach(el => el.addEventListener('click', e => {
  e.stopPropagation();
  megaMenu?.classList.toggle('hidden');
}));
document.addEventListener('click', e => {
  if (!megaMenu || megaMenu.classList.contains('hidden')) return;
  if (!e.target.closest('#megaMenu') && !e.target.closest('[data-mega-toggle]')) {
    megaMenu.classList.add('hidden');
  }
});

/* ---------- Search + suggestions ---------- */
const searchInput = $('#searchInput');
const suggestions = $('#searchSuggestions');
const SEARCH_TERMS = ['ملت عشق', 'هنر شفاف اندیشیدن', 'رمان‌های تازه', 'کتاب روان‌شناسی', 'کتاب کودک'];
const HIDDEN = 'hidden';

const renderSuggestions = value => {
  if (!suggestions) return;
  const q = value.trim();
  if (!q) return suggestions.classList.add(HIDDEN);

  const items = SEARCH_TERMS.filter(t => t.includes(q)).slice(0, 4);
  const list = items.length ? items : [`جست‌وجوی «${q}»`];

  suggestions.innerHTML = list.map(t =>
    `<div class="suggestion"><span>${t}</span><i class="ri-arrow-left-up-line"></i></div>`
  ).join('');
  suggestions.classList.remove(HIDDEN);
};

searchInput?.addEventListener('input', e => renderSuggestions(e.target.value));

document.addEventListener('click', e => {
  if (!e.target.closest('.search-box')) suggestions?.classList.add(HIDDEN);
});

$$('[data-search-focus]').forEach(el => el.addEventListener('click', () => {
  searchInput?.focus();
  searchInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}));

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInput?.focus();
  }
});

/* ---------- Product filters ---------- */
const tabs = $$('.tab');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => {
    t.classList.toggle('bg-ink', t === tab);
    t.classList.toggle('text-white', t === tab);
    t.classList.toggle('text-[#8a928f]', t !== tab);
  });
  const filter = tab.dataset.filter;
  $$('.product-card').forEach(card => {
    const match = filter === 'all' || card.dataset.type === filter;
    card.classList.toggle(HIDDEN, !match);
  });
}));

/* ---------- Wishlist toggle ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('.wish');
  if (!btn) return;
  const icon = $('i', btn);
  if (!icon) return;
  icon.classList.toggle('ri-heart-3-line');
  icon.classList.toggle('ri-heart-3-fill');
});

/* ---------- Add to cart ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('.add-cart');
  if (!btn) return;
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="ri-check-line"></i>';
  setTimeout(() => (btn.innerHTML = original), 1200);
  cartDrawer?.open();
});

/* ---------- Newsletter ---------- */
$$('.newsletter-form').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('input', form);
  if (!input?.value.trim()) return;
  input.value = '';

  const toast = document.createElement('div');
  toast.textContent = 'عضویت شما با موفقیت ثبت شد.';
  toast.className = 'fixed bottom-5 left-5 z-[100] rounded-xl bg-ink px-4 py-3 text-xs text-white shadow-soft';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}));