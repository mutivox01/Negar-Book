/* =========================================================
   Shop page - فیلترها، مرتب‌سازی، صفحه‌بندی و رندر محصولات
   ========================================================= */

// const $ = (s, root = document) => root.querySelector(s);
// const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- داده‌های نمونه محصولات ---------- */
const PRODUCTS = [
  { id: 1, title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', cat: 'fiction', catLabel: 'رمان',
    price: 289000, oldPrice: null, rating: 4.7, badge: 'تازه', available: true,
    cover: 'from-[#aebca7] to-[#334c45]', titleLines: 'درختی که<br>روی ماه رشد کرد' },
  { id: 2, title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', cat: 'psychology', catLabel: 'تفکر',
    price: 345000, oldPrice: null, rating: 4.9, badge: 'پرفروش', available: true,
    cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن' },
  { id: 3, title: 'چرا می‌خوانیم؟', author: 'دانیل پنک', cat: 'psychology', catLabel: 'توسعه فردی',
    price: 240000, oldPrice: 300000, rating: 4.5, badge: '۲۰٪ تخفیف', available: true,
    cover: 'from-[#8d98c5] to-[#2f3656]', titleLines: 'چرا<br>می‌خوانیم؟' },
  { id: 4, title: 'سمفونی خاموش', author: 'رضا قاسمی', cat: 'fiction', catLabel: 'ادبیات فارسی',
    price: 198000, oldPrice: null, rating: 4.6, badge: 'ویژه', available: true,
    cover: 'from-[#c9827b] to-[#4a2828]', titleLines: 'سمفونی<br>خاموش' },
  { id: 5, title: 'روایت یک زندگی', author: 'نویسنده ناشناس', cat: 'history', catLabel: 'زندگی‌نامه',
    price: 275000, oldPrice: null, rating: 4.3, badge: null, available: true,
    cover: 'from-[#87927a] to-[#3b4a3f]', titleLines: 'روایت<br>یک زندگی' },
  { id: 6, title: 'فلسفه برای زندگی', author: 'ژولین باگینی', cat: 'psychology', catLabel: 'فلسفه',
    price: 320000, oldPrice: null, rating: 4.8, badge: null, available: false,
    cover: 'from-[#c0a17a] to-[#5a3f27]', titleLines: 'فلسفه<br>برای زندگی' },
  { id: 7, title: 'صبح بعد از باران', author: 'سارا محمودی', cat: 'fiction', catLabel: 'داستان',
    price: 225000, oldPrice: null, rating: 4.4, badge: null, available: true,
    cover: 'from-[#8f96b5] to-[#3b3f5e]', titleLines: 'صبح<br>بعد از باران' },
  { id: 8, title: 'کار عمیق', author: 'کال نیوپورت', cat: 'business', catLabel: 'کسب‌وکار',
    price: 310000, oldPrice: 380000, rating: 4.9, badge: '۱۵٪ تخفیف', available: true,
    cover: 'from-[#7ea39a] to-[#254a41]', titleLines: 'کار<br>عمیق' },
  { id: 9, title: 'دنیای سوفی', author: 'یوستین گردر', cat: 'psychology', catLabel: 'فلسفه',
    price: 420000, oldPrice: null, rating: 4.8, badge: 'کلاسیک', available: true,
    cover: 'from-[#b8946b] to-[#4a3520]', titleLines: 'دنیای<br>سوفی' },
  { id: 10, title: 'قصه‌های خوب برای بچه‌های خوب', author: 'گابریل گارسیا مارکز', cat: 'kids', catLabel: 'کودک',
    price: 189000, oldPrice: null, rating: 4.2, badge: null, available: true,
    cover: 'from-[#e5b57c] to-[#8a5a20]', titleLines: 'قصه‌های<br>خوب' },
  { id: 11, title: 'ملت عشق', author: 'الیف شافاک', cat: 'fiction', catLabel: 'رمان',
    price: 395000, oldPrice: null, rating: 4.9, badge: 'پرفروش', available: true,
    cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق' },
  { id: 12, title: 'گلستان سعدی', author: 'سعدی شیرازی', cat: 'poetry', catLabel: 'شعر',
    price: 265000, oldPrice: null, rating: 4.7, badge: 'کلاسیک', available: true,
    cover: 'from-[#a3936f] to-[#463a1c]', titleLines: 'گلستان<br>سعدی' },
];

/* ---------- Utilities ---------- */
const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const toman = n => faNum(n.toLocaleString('en-US'));

/* ---------- State ---------- */
const state = {
  query: '',
  cats: new Set(),
  priceMin: null,
  priceMax: null,
  rating: 0,
  onlyAvailable: false,
  onlyDiscount: false,
  sort: 'popular',
  view: 'grid',
  page: 1,
  perPage: 9,
};

/* ---------- Refs ---------- */
const grid = $('#shopGrid');
const emptyState = $('#emptyState');
const resultCount = $('#resultCount');
const resultCountMobile = $('#resultCountMobile');
const pagination = $('#pagination');
const chips = $('#activeChips');
const sortSelect = $('#sortSelect');
const filterSearch = $('#filterSearch');
const priceMin = $('#priceMin');
const priceMax = $('#priceMax');
const onlyAvailable = $('#onlyAvailable');
const onlyDiscount = $('#onlyDiscount');

/* ---------- Filtering + Sorting ---------- */
const getFiltered = () => {
  let list = PRODUCTS.filter(p => {
    if (state.query && !(`${p.title} ${p.author}`.includes(state.query))) return false;
    if (state.cats.size && !state.cats.has(p.cat)) return false;
    if (state.priceMin != null && p.price < state.priceMin) return false;
    if (state.priceMax != null && p.price > state.priceMax) return false;
    if (state.rating && p.rating < state.rating) return false;
    if (state.onlyAvailable && !p.available) return false;
    if (state.onlyDiscount && !p.oldPrice) return false;
    return true;
  });

  switch (state.sort) {
    case 'newest':    list.sort((a, b) => b.id - a.id); break;
    case 'cheap':     list.sort((a, b) => a.price - b.price); break;
    case 'expensive': list.sort((a, b) => b.price - a.price); break;
    default:          list.sort((a, b) => b.rating - a.rating);
  }
  return list;
};

/* ---------- Render helpers ---------- */
const discountPercent = p => p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

const cardHTML = p => `
  <article class="product-card min-w-0 ${state.view === 'list' ? 'col-span-2 lg:col-span-3 !flex items-center gap-4 !rounded-[22px] !border !border-border !bg-white !p-3' : ''}" data-id="${p.id}">
    <div class="product-cover bg-gradient-to-br ${p.cover} ${state.view === 'list' ? '!min-h-[120px] !w-[120px] !shrink-0 !p-3 !rounded-[16px]' : ''}">
      ${p.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${p.badge}</span>` : ''}
      <button class="wish" aria-label="افزودن به علاقه‌مندی"><i class="ri-heart-3-line"></i></button>
      <div class="relative z-[1] ${state.view === 'list' ? 'text-[12px]' : 'text-[17px] sm:text-[23px]'} font-black leading-snug">${p.titleLines}</div>
      ${state.view !== 'list' ? `<div class="relative z-[1] mt-1 text-[10px] text-white/65">${p.author}</div>` : ''}
    </div>
    <div class="${state.view === 'list' ? 'flex-1' : 'px-[3px] py-3.5'}">
      <span class="text-[9px] text-[#9aa19e]">${p.catLabel}</span>
      <h3 class="mt-1 text-xs font-extrabold">${p.title}</h3>
      ${state.view === 'list' ? `<p class="mt-1 text-[10px] text-muted">${p.author}</p>` : ''}
      <div class="mt-3 flex items-center gap-2">
        <strong class="text-[10px] sm:text-xs">${toman(p.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
        ${p.oldPrice ? `<del class="text-[9px] text-[#b0b5b2]">${toman(p.oldPrice)}</del>` : ''}
        ${!p.available ? `<span class="mr-auto text-[9px] font-bold text-danger">ناموجود</span>` : `<button class="add-cart" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>`}
      </div>
    </div>
  </article>
`;

const renderChips = () => {
  const list = [];
  if (state.query) list.push(['query', `«${state.query}»`]);
  state.cats.forEach(c => {
    const labels = { fiction: 'رمان و داستان', psychology: 'روان‌شناسی', business: 'کسب‌وکار', history: 'تاریخ', kids: 'کودک و نوجوان', poetry: 'شعر' };
    list.push(['cat:' + c, labels[c]]);
  });
  if (state.priceMin != null) list.push(['priceMin', `از ${toman(state.priceMin)}`]);
  if (state.priceMax != null) list.push(['priceMax', `تا ${toman(state.priceMax)}`]);
  if (state.rating) list.push(['rating', `${faNum(state.rating)}+ ستاره`]);
  if (state.onlyAvailable) list.push(['available', 'فقط موجود']);
  if (state.onlyDiscount) list.push(['discount', 'فقط تخفیف‌دار']);

  if (!list.length) { chips.classList.add('hidden'); chips.innerHTML = ''; return; }
  chips.classList.remove('hidden');
  chips.innerHTML = list.map(([key, label]) => `
    <span class="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-3 py-1.5 text-[10px] font-bold" data-chip="${key}">
      ${label}<i class="ri-close-line cursor-pointer text-muted" data-chip-remove="${key}"></i>
    </span>
  `).join('');
};

const renderPagination = total => {
  const pages = Math.ceil(total / state.perPage);
  if (pages <= 1) { pagination.innerHTML = ''; return; }

  let html = `<button class="page-btn" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''}><i class="ri-arrow-right-s-line"></i></button>`;
  for (let i = 1; i <= pages; i++) {
    html += `<button class="page-btn" data-page="${i}" data-active="${i === state.page}">${faNum(i)}</button>`;
  }
  html += `<button class="page-btn" data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''}><i class="ri-arrow-left-s-line"></i></button>`;
  pagination.innerHTML = html;
};

const render = () => {
  const list = getFiltered();
  const total = list.length;
  const start = (state.page - 1) * state.perPage;
  const pageItems = list.slice(start, start + state.perPage);

  if (!total) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    emptyState.classList.add('flex');
    pagination.innerHTML = '';
    resultCount && (resultCount.textContent = 'نتیجه‌ای یافت نشد');
    resultCountMobile && (resultCountMobile.textContent = '۰ محصول');
    renderChips();
    return;
  }

  grid.classList.remove('hidden');
  emptyState.classList.add('hidden');
  emptyState.classList.remove('flex');
  grid.innerHTML = pageItems.map(cardHTML).join('');

  const label = `نمایش ${faNum(start + 1)}–${faNum(Math.min(start + state.perPage, total))} از ${faNum(total)} محصول`;
  resultCount && (resultCount.textContent = label);
  resultCountMobile && (resultCountMobile.textContent = `${faNum(total)} محصول`);

  renderPagination(total);
  renderChips();
};

/* ---------- Event listeners ---------- */

// sort
sortSelect?.addEventListener('change', e => {
  state.sort = e.target.value;
  state.page = 1;
  render();
});

// category checkboxes
$$('.filter-cat').forEach(cb => cb.addEventListener('change', () => {
  cb.checked ? state.cats.add(cb.value) : state.cats.delete(cb.value);
  state.page = 1;
  render();
}));

// rating radios
$$('.filter-rating').forEach(r => r.addEventListener('change', () => {
  state.rating = +r.value;
  state.page = 1;
  render();
}));

// price
[priceMin, priceMax].forEach(el => el?.addEventListener('input', () => {
  state.priceMin = priceMin.value ? +priceMin.value : null;
  state.priceMax = priceMax.value ? +priceMax.value : null;
  state.page = 1;
  render();
}));

// availability
onlyAvailable?.addEventListener('change', e => { state.onlyAvailable = e.target.checked; state.page = 1; render(); });
onlyDiscount?.addEventListener('change', e => { state.onlyDiscount = e.target.checked; state.page = 1; render(); });

// filter search
filterSearch?.addEventListener('input', e => {
  state.query = e.target.value.trim();
  state.page = 1;
  render();
});

// clear filters
const clearAll = () => {
  state.query = ''; state.cats.clear();
  state.priceMin = state.priceMax = null;
  state.rating = 0; state.onlyAvailable = false; state.onlyDiscount = false;
  state.page = 1;
  filterSearch && (filterSearch.value = '');
  priceMin && (priceMin.value = '');
  priceMax && (priceMax.value = '');
  $$('.filter-cat').forEach(cb => cb.checked = false);
  $$('.filter-rating').forEach(r => r.checked = r.value === '0');
  onlyAvailable && (onlyAvailable.checked = false);
  onlyDiscount && (onlyDiscount.checked = false);
  render();
};
$('#clearFilters')?.addEventListener('click', clearAll);
$('#resetFromEmpty')?.addEventListener('click', clearAll);

// chips remove
chips?.addEventListener('click', e => {
  const t = e.target.closest('[data-chip-remove]');
  if (!t) return;
  const key = t.dataset.chipRemove;
  if (key === 'query') { state.query = ''; filterSearch.value = ''; }
  else if (key.startsWith('cat:')) { const c = key.slice(4); state.cats.delete(c); $(`.filter-cat[value="${c}"]`).checked = false; }
  else if (key === 'priceMin') { state.priceMin = null; priceMin.value = ''; }
  else if (key === 'priceMax') { state.priceMax = null; priceMax.value = ''; }
  else if (key === 'rating') { state.rating = 0; $$('.filter-rating').forEach(r => r.checked = r.value === '0'); }
  else if (key === 'available') { state.onlyAvailable = false; onlyAvailable.checked = false; }
  else if (key === 'discount') { state.onlyDiscount = false; onlyDiscount.checked = false; }
  state.page = 1;
  render();
});

// pagination
pagination?.addEventListener('click', e => {
  const btn = e.target.closest('[data-page]');
  if (!btn || btn.disabled) return;
  const page = +btn.dataset.page;
  if (page < 1) return;
  state.page = page;
  render();
  document.querySelector('#shopGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// view mode
$$('.view-btn').forEach(btn => btn.addEventListener('click', () => {
  state.view = btn.dataset.view;
  $$('.view-btn').forEach(b => b.dataset.active = (b === btn));
  render();
}));

// mobile filters drawer
const filtersPanel = $('#filtersPanel');
const filtersOverlay = $('#filtersOverlay');
const openFilters = () => {
  filtersPanel.classList.remove('translate-x-[105%]');
  filtersPanel.classList.add('translate-x-0');
  filtersOverlay?.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
};
const closeFilters = () => {
  filtersPanel.classList.add('translate-x-[105%]');
  filtersPanel.classList.remove('translate-x-0');
  filtersOverlay?.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
};
$$('[data-filters-open]').forEach(b => b.addEventListener('click', openFilters));
$$('[data-filters-close]').forEach(b => b.addEventListener('click', closeFilters));

/* ---------- Init ---------- */
render();