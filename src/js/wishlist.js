/* =========================================================
   Wishlist Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده اولیه ---------- */
let WISHLIST = [
  { id: 1, title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', price: 289000, oldPrice: 320000,
    rating: 4.7, available: true, added: '1405/05/12', badge: 'تازه', catLabel: 'رمان',
    cover: 'from-[#aebca7] to-[#334c45]', titleLines: 'درختی که<br>روی ماه رشد کرد' },
  { id: 2, title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', price: 345000, oldPrice: null,
    rating: 4.9, available: true, added: '1405/05/10', badge: 'پرفروش', catLabel: 'تفکر',
    cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن' },
  { id: 3, title: 'چرا می‌خوانیم؟', author: 'دانیل پنک', price: 240000, oldPrice: 300000,
    rating: 4.5, available: true, added: '1405/05/08', badge: '۲۰٪', catLabel: 'توسعه فردی',
    cover: 'from-[#8d98c5] to-[#2f3656]', titleLines: 'چرا<br>می‌خوانیم؟' },
  { id: 4, title: 'سمفونی خاموش', author: 'رضا قاسمی', price: 198000, oldPrice: null,
    rating: 4.6, available: true, added: '1405/05/05', badge: null, catLabel: 'ادبیات',
    cover: 'from-[#c9827b] to-[#4a2828]', titleLines: 'سمفونی<br>خاموش' },
  { id: 5, title: 'ملت عشق', author: 'الیف شافاک', price: 395000, oldPrice: null,
    rating: 4.9, available: true, added: '1405/05/01', badge: 'پرفروش', catLabel: 'رمان',
    cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق' },
  { id: 6, title: 'کار عمیق', author: 'کال نیوپورت', price: 310000, oldPrice: 380000,
    rating: 4.9, available: false, added: '1405/04/28', badge: '۱۵٪', catLabel: 'کسب‌وکار',
    cover: 'from-[#7ea39a] to-[#254a41]', titleLines: 'کار<br>عمیق' },
  { id: 7, title: 'دنیای سوفی', author: 'یوستین گردر', price: 420000, oldPrice: null,
    rating: 4.8, available: true, added: '1405/04/25', badge: null, catLabel: 'فلسفه',
    cover: 'from-[#b8946b] to-[#4a3520]', titleLines: 'دنیای<br>سوفی' },
  { id: 8, title: 'صبح بعد از باران', author: 'سارا محمودی', price: 225000, oldPrice: null,
    rating: 4.4, available: true, added: '1405/04/22', badge: null, catLabel: 'داستان',
    cover: 'from-[#8f96b5] to-[#3b3f5e]', titleLines: 'صبح<br>بعد از باران' },
];

const SUGGEST = [
  { title: 'گلستان سعدی', author: 'سعدی شیرازی', price: 265000, cover: 'from-[#a3936f] to-[#463a1c]', titleLines: 'گلستان<br>سعدی' },
  { title: 'فلسفه برای زندگی', author: 'ژولین باگینی', price: 320000, cover: 'from-[#c0a17a] to-[#5a3f27]', titleLines: 'فلسفه<br>برای زندگی' },
  { title: 'قصه‌های خوب', author: 'گابریل گارسیا مارکز', price: 189000, cover: 'from-[#e5b57c] to-[#8a5a20]', titleLines: 'قصه‌های<br>خوب' },
  { title: 'روایت یک زندگی', author: 'ناشناس', price: 275000, cover: 'from-[#87927a] to-[#3b4a3f]', titleLines: 'روایت<br>یک زندگی' },
];

/* ---------- State ---------- */
const state = {
  filter: 'all',
  search: '',
  sort: 'newest',
  selected: new Set(),
  selectMode: false,
};

/* ---------- Refs ---------- */
const grid = $('#wishGrid');
const emptyEl = $('#wishEmpty');

/* ---------- helpers ---------- */
const discountPercent = p => p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

/* ---------- Filter + Sort ---------- */
const getFiltered = () => {
  let list = WISHLIST.filter(p => {
    if (state.filter === 'available' && !p.available) return false;
    if (state.filter === 'unavailable' && p.available) return false;
    if (state.filter === 'discount' && !p.oldPrice) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${p.title} ${p.author}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (state.sort) {
    case 'cheap':     list.sort((a, b) => a.price - b.price); break;
    case 'expensive': list.sort((a, b) => b.price - a.price); break;
    case 'discount':  list.sort((a, b) => discountPercent(b) - discountPercent(a)); break;
    case 'rating':    list.sort((a, b) => b.rating - a.rating); break;
    default:          list.sort((a, b) => b.added.localeCompare(a.added));
  }
  return list;
};

/* ---------- Card ---------- */
const cardHTML = p => {
  const disc = discountPercent(p);
  const isSelected = state.selected.has(p.id);
  return `
    <article class="wish-card ${isSelected ? 'is-selected' : ''}" data-wish-id="${p.id}">
      <div class="product-cover bg-gradient-to-br ${p.cover}">
        ${p.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${p.badge}</span>` : ''}
        ${state.selectMode ? `
          <label class="wish-check">
            <input type="checkbox" class="wish-checkbox" value="${p.id}" ${isSelected ? 'checked' : ''}>
            <span class="wish-checkmark"><i class="ri-check-line"></i></span>
          </label>
        ` : ''}
        <button class="wish is-active" data-wish-toggle="${p.id}" aria-label="حذف از علاقه‌مندی">
          <i class="ri-heart-3-fill"></i>
        </button>
        <div class="relative z-[1] text-[15px] font-black leading-snug sm:text-[18px]">${p.titleLines}</div>
        <div class="relative z-[1] mt-1 text-[10px] text-white/65">${p.author}</div>
      </div>
      <div class="px-[3px] py-3.5">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[9px] text-[#9aa19e]">${p.catLabel}</span>
          ${disc ? `<span class="rounded-full bg-danger/10 px-2 py-0.5 text-[9px] font-black text-danger">${faNum(disc)}٪</span>` : ''}
        </div>
        <h3 class="mt-1 text-xs font-extrabold">${p.title}</h3>
        <div class="mt-1 flex items-center gap-1 text-[9px]">
          <i class="ri-star-fill text-[#f0b429]"></i>
          <b class="text-muted">${faNum(p.rating)}</b>
          ${!p.available ? '<span class="mr-auto text-[9px] font-black text-danger">ناموجود</span>' : ''}
        </div>
        <div class="mt-3 flex items-center gap-2">
          <strong class="text-[10px] sm:text-xs">${tomanShort(p.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
          ${p.oldPrice ? `<del class="text-[9px] text-[#b0b5b2]">${tomanShort(p.oldPrice)}</del>` : ''}
          <button class="add-cart" data-wish-add="${p.id}" aria-label="افزودن به سبد" ${!p.available ? 'disabled' : ''}>
            <i class="ri-add-line"></i>
          </button>
        </div>
        <div class="mt-2 flex items-center justify-between border-t border-dashed border-border pt-2 text-[9px] text-muted">
          <span><i class="ri-calendar-line"></i> ${p.added}</span>
          <button class="font-bold text-ink hover:text-danger" data-wish-remove="${p.id}">
            <i class="ri-close-line"></i> حذف
          </button>
        </div>
      </div>
    </article>
  `;
};

/* ---------- Render ---------- */
const render = () => {
  const list = getFiltered();

  // آمار
  $('#wishCount').textContent = faNum(WISHLIST.length);
  $('#wishTotal').textContent = tomanShort(WISHLIST.reduce((s, p) => s + p.price, 0)) + ' تومان';
  $('#kpiTotal').textContent = faNum(WISHLIST.length);
  $('#kpiDiscount').textContent = faNum(WISHLIST.filter(p => p.oldPrice).length);
  $('#kpiAvailable').textContent = faNum(WISHLIST.filter(p => p.available).length);
  $('#tabAll').textContent = faNum(WISHLIST.length);
  $('#tabDiscount').textContent = faNum(WISHLIST.filter(p => p.oldPrice).length);

  if (!list.length) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    return;
  }

  emptyEl.classList.add('hidden');
  emptyEl.classList.remove('flex');
  grid.classList.remove('hidden');
  grid.innerHTML = list.map(cardHTML).join('');
};

/* ---------- Filters ---------- */
$$('[data-wish-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.wishFilter;
    $$('[data-wish-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
    render();
  });
});

$('#wishSearch')?.addEventListener('input', e => {
  state.search = e.target.value.trim();
  render();
});

$('#wishSort')?.addEventListener('change', e => {
  state.sort = e.target.value;
  render();
});

/* ---------- Actions on grid ---------- */
grid?.addEventListener('click', e => {
  const toggleBtn = e.target.closest('[data-wish-toggle]');
  if (toggleBtn) {
    const id = +toggleBtn.dataset.wishToggle;
    removeFromWishlist(id);
    return;
  }

  const removeBtn = e.target.closest('[data-wish-remove]');
  if (removeBtn) {
    removeFromWishlist(+removeBtn.dataset.wishRemove);
    return;
  }

  const addBtn = e.target.closest('[data-wish-add]');
  if (addBtn) {
    if (addBtn.disabled) return;
    const original = addBtn.innerHTML;
    addBtn.innerHTML = '<i class="ri-check-line"></i>';
    setTimeout(() => (addBtn.innerHTML = original), 1000);
    showToast('به سبد خرید اضافه شد.');
    return;
  }
});

grid?.addEventListener('change', e => {
  const cb = e.target.closest('.wish-checkbox');
  if (!cb) return;
  const id = +cb.value;
  cb.checked ? state.selected.add(id) : state.selected.delete(id);
  updateBulk();
});

/* ---------- Remove ---------- */
const removeFromWishlist = id => {
  const p = WISHLIST.find(x => x.id === id);
  if (!p) return;
  const card = grid.querySelector(`[data-wish-id="${id}"]`);
  if (card) {
    card.style.transition = 'opacity .25s, transform .25s';
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
  }
  setTimeout(() => {
    WISHLIST = WISHLIST.filter(x => x.id !== id);
    state.selected.delete(id);
    render();
    updateBulk();
    showToast('از علاقه‌مندی‌ها حذف شد.');
  }, 220);
};

/* ---------- Bulk ---------- */
const bulkEl = $('#wishBulk');
const updateBulk = () => {
  const n = state.selected.size;
  $('#wishSelectedCount').textContent = faNum(n);
  bulkEl.classList.toggle('hidden', !state.selectMode);
  bulkEl.classList.toggle('flex', state.selectMode);
};

$('#wishToggleSelect')?.addEventListener('click', function () {
  state.selectMode = !state.selectMode;
  state.selected.clear();
  this.classList.toggle('admin-btn--primary', state.selectMode);
  this.innerHTML = state.selectMode
    ? '<i class="ri-close-line"></i> لغو انتخاب'
    : '<i class="ri-checkbox-multiple-line"></i> انتخاب گروهی';
  render();
  updateBulk();
});

$('#wishSelectAll')?.addEventListener('change', e => {
  const visible = getFiltered();
  visible.forEach(p => e.target.checked ? state.selected.add(p.id) : state.selected.delete(p.id));
  render();
  updateBulk();
});

$('#wishAddSelected')?.addEventListener('click', () => {
  if (!state.selected.size) return showToast('موردی انتخاب نشده.', 'error');
  showToast(`${faNum(state.selected.size)} مورد به سبد خرید اضافه شد.`);
  state.selected.clear();
  render();
  updateBulk();
});

$('#wishRemoveSelected')?.addEventListener('click', () => {
  if (!state.selected.size) return showToast('موردی انتخاب نشده.', 'error');
  if (!confirm(`${faNum(state.selected.size)} مورد از علاقه‌مندی‌ها حذف شوند؟`)) return;
  WISHLIST = WISHLIST.filter(p => !state.selected.has(p.id));
  state.selected.clear();
  render();
  updateBulk();
  showToast('موارد انتخاب‌شده حذف شدند.');
});

/* ---------- Bulk top actions ---------- */
$('#wishClearAll')?.addEventListener('click', () => {
  if (!WISHLIST.length) return;
  if (!confirm('همه‌ی علاقه‌مندی‌ها پاک شوند؟')) return;
  WISHLIST = [];
  state.selected.clear();
  render();
  updateBulk();
  showToast('همه علاقه‌مندی‌ها پاک شدند.');
});

$('#wishAddAll')?.addEventListener('click', () => {
  const available = WISHLIST.filter(p => p.available);
  if (!available.length) return showToast('کتاب موجودی برای افزودن نیست.', 'error');
  showToast(`${faNum(available.length)} کتاب به سبد خرید اضافه شد.`);
  document.querySelector('[data-cart-toggle]')?.click();
});

/* ---------- Suggest ---------- */
const renderSuggest = () => {
  const g = $('#wishSuggest');
  g.innerHTML = SUGGEST.map(p => `
    <article class="product-card min-w-0">
      <div class="product-cover bg-gradient-to-br ${p.cover}">
        <button class="wish"><i class="ri-heart-3-line"></i></button>
        <div class="relative z-[1] text-[15px] font-black leading-snug sm:text-[18px]">${p.titleLines}</div>
        <div class="relative z-[1] mt-1 text-[10px] text-white/65">${p.author}</div>
      </div>
      <div class="px-[3px] py-3.5">
        <h3 class="mt-1 text-xs font-extrabold">${p.title}</h3>
        <div class="mt-3 flex items-center gap-2">
          <strong class="text-[10px] sm:text-xs">${tomanShort(p.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
          <button class="add-cart" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>
        </div>
      </div>
    </article>
  `).join('');
};

/* ---------- Toast ---------- */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[200] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

/* ---------- Init ---------- */
render();
renderSuggest();
updateBulk();