/* =========================================================
   Compare Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, '').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const faNumStr = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNumStr(Math.round(n).toLocaleString('en-US'));

/* ---------- Products pool ---------- */
const PRODUCTS = [
  {
    id: 1, title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', publisher: 'نشر چشمه',
    price: 289000, oldPrice: 320000, pages: 288, year: 1405, cover: 'شومیز',
    size: 'رقعی', language: 'فارسی', rating: 4.7, reviews: 124, sales: 2450,
    tint: 'from-[#aebca7] to-[#334c45]', titleLines: 'درختی که<br>روی ماه رشد کرد',
    badge: 'تازه', catLabel: 'رمان',
  },
  {
    id: 2, title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', publisher: 'نشر نی',
    price: 345000, oldPrice: null, pages: 240, year: 1404, cover: 'گالینگور',
    size: 'رقعی', language: 'فارسی', rating: 4.9, reviews: 218, sales: 892,
    tint: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن',
    badge: 'پرفروش', catLabel: 'تفکر',
  },
  {
    id: 3, title: 'چرا می‌خوانیم؟', author: 'دانیل پنک', publisher: 'نشر نو',
    price: 240000, oldPrice: 300000, pages: 200, year: 1403, cover: 'شومیز',
    size: 'رقعی', language: 'فارسی', rating: 4.5, reviews: 86, sales: 438,
    tint: 'from-[#8d98c5] to-[#2f3656]', titleLines: 'چرا<br>می‌خوانیم؟',
    badge: '۲۰٪', catLabel: 'توسعه فردی',
  },
  {
    id: 4, title: 'سمفونی خاموش', author: 'رضا قاسمی', publisher: 'نشر ققنوس',
    price: 198000, oldPrice: null, pages: 240, year: 1403, cover: 'شومیز',
    size: 'رقعی', language: 'فارسی', rating: 4.6, reviews: 142, sales: 674,
    tint: 'from-[#c9827b] to-[#4a2828]', titleLines: 'سمفونی<br>خاموش',
    badge: 'ویژه', catLabel: 'ادبیات',
  },
  {
    id: 5, title: 'ملت عشق', author: 'الیف شافاک', publisher: 'نشر مرکز',
    price: 395000, oldPrice: null, pages: 512, year: 1402, cover: 'گالینگور',
    size: 'وزیری', language: 'فارسی', rating: 4.9, reviews: 428, sales: 1248,
    tint: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق',
    badge: 'پرفروش', catLabel: 'رمان',
  },
  {
    id: 6, title: 'کار عمیق', author: 'کال نیوپورت', publisher: 'نشر هوپا',
    price: 310000, oldPrice: 380000, pages: 296, year: 1402, cover: 'شومیز',
    size: 'رقعی', language: 'فارسی', rating: 4.9, reviews: 312, sales: 1056,
    tint: 'from-[#7ea39a] to-[#254a41]', titleLines: 'کار<br>عمیق',
    badge: '۱۵٪', catLabel: 'کسب‌وکار',
  },
  {
    id: 7, title: 'چرا می‌خوانیم؟', author: 'دانیل پنک', publisher: 'نشر نو',
    price: 240000, oldPrice: 300000, pages: 200, year: 1403, cover: 'شومیز',
    size: 'رقعی', language: 'فارسی', rating: 4.5, reviews: 86, sales: 438,
    tint: 'from-[#8d98c5] to-[#2f3656]', titleLines: 'چرا<br>می‌خوانیم؟',
    badge: '۲۰٪', catLabel: 'توسعه فردی',
  },
  {
    id: 8, title: 'دنیای سوفی', author: 'یوستین گردر', publisher: 'نشر چشمه',
    price: 420000, oldPrice: null, pages: 640, year: 1401, cover: 'گالینگور',
    size: 'وزیری', language: 'فارسی', rating: 4.8, reviews: 298, sales: 892,
    tint: 'from-[#b8946b] to-[#4a3520]', titleLines: 'دنیای<br>سوفی',
    badge: null, catLabel: 'فلسفه',
  },
  {
    id: 9, title: 'ملت عشق', author: 'الیف شافاک', publisher: 'نشر مرکز',
    price: 395000, oldPrice: null, pages: 512, year: 1402, cover: 'گالینگور',
    size: 'وزیری', language: 'فارسی', rating: 4.9, reviews: 428, sales: 1248,
    tint: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق',
    badge: 'پرفروش', catLabel: 'رمان',
  },
  {
    id: 10, title: 'صبح بعد از باران', author: 'سارا محمودی', publisher: 'نشر نیماژ',
    price: 225000, oldPrice: null, pages: 216, year: 1404, cover: 'شومیز',
    size: 'رقعی', language: 'فارسی', rating: 4.4, reviews: 94, sales: 452,
    tint: 'from-[#8f96b5] to-[#3b3f5e]', titleLines: 'صبح<br>بعد از باران',
    badge: null, catLabel: 'داستان',
  },
  {
    id: 11, title: 'گلستان سعدی', author: 'سعدی شیرازی', publisher: 'نشر ققنوس',
    price: 265000, oldPrice: null, pages: 380, year: 1401, cover: 'گالینگور',
    size: 'وزیری', language: 'فارسی', rating: 4.7, reviews: 168, sales: 526,
    tint: 'from-[#a3936f] to-[#463a1c]', titleLines: 'گلستان<br>سعدی',
    badge: 'کلاسیک', catLabel: 'شعر',
  },
  {
    id: 12, title: 'فلسفه برای زندگی', author: 'ژولین باگینی', publisher: 'نشر مرکز',
    price: 320000, oldPrice: null, pages: 268, year: 1403, cover: 'شومیز',
    size: 'رقعی', language: 'فارسی', rating: 4.8, reviews: 182, sales: 674,
    tint: 'from-[#c0a17a] to-[#5a3f27]', titleLines: 'فلسفه<br>برای زندگی',
    badge: null, catLabel: 'فلسفه',
  },
];

/* ---------- State: محصولات در حال مقایسه ---------- */
let compareIds = [1, 2, 4];
const MAX_COMPARE = 4;

/* ---------- Refs ---------- */
const wrapper = $('#compareWrapper');
const emptyEl = $('#compareEmpty');

/* ---------- Helpers ---------- */
const getCompare = () => compareIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

const formatPrice = n => tomanShort(n);

/* ---------- ویژگی‌های مقایسه ---------- */
const ROWS = [
  {
    key: 'price', label: 'قیمت',
    render: p => `${formatPrice(p.price)} تومان`,
    value: p => p.price,
    best: 'min',
    highlightReverse: true,
  },
  {
    key: 'rating', label: 'امتیاز',
    render: p => `${faNumStr(p.rating)} / ۵ · (${faNumStr(p.reviews)} نظر)`,
    value: p => p.rating,
    best: 'max',
  },
  {
    key: 'pages', label: 'تعداد صفحه',
    render: p => `${faNumStr(p.pages)} صفحه`,
    value: p => p.pages,
    best: 'max',
  },
  {
    key: 'year', label: 'سال انتشار',
    render: p => faNumStr(p.year),
    value: p => p.year,
    best: 'max',
  },
  {
    key: 'publisher', label: 'ناشر',
    render: p => p.publisher,
    value: () => null, // no best
  },
  {
    key: 'cover', label: 'نوع جلد',
    render: p => p.cover,
    value: () => null,
  },
  {
    key: 'size', label: 'قطع',
    render: p => p.size,
    value: () => null,
  },
  {
    key: 'language', label: 'زبان',
    render: p => p.language,
    value: () => null,
  },
  {
    key: 'sales', label: 'فروش',
    render: p => `${faNumStr(p.sales)} نسخه`,
    value: p => p.sales,
    best: 'max',
  },
  {
    key: 'stock', label: 'موجودی',
    render: () => `<span class="compare-stock">موجود در انبار</span>`,
    value: () => null,
  },
];

const findBest = (list, row) => {
  if (!row.best) return null;
  const values = list.map(row.value).filter(v => v !== null && v !== undefined);
  if (!values.length) return null;
  return row.best === 'max' ? Math.max(...values) : Math.min(...values);
};

/* ---------- Render ---------- */
const renderCompare = () => {
  const list = getCompare();

  if (!list.length) {
    wrapper.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    return;
  }

  emptyEl.classList.add('hidden');
  emptyEl.classList.remove('flex');
  wrapper.classList.remove('hidden');

  const columns = list.length;

  wrapper.innerHTML = `
    <div class="compare-scroll">
      <div class="compare-grid" style="--cols:${columns + 1}">

        <!-- Header row -->
        <div class="compare-cell compare-cell--label compare-cell--head">
          <div class="compare-head-label">
            <i class="ri-scales-3-line text-accent"></i>
            <span>مقایسه</span>
          </div>
        </div>

        ${list.map(p => `
          <div class="compare-cell compare-cell--head">
            <div class="compare-head">
              <button class="compare-remove" data-remove="${p.id}" aria-label="حذف">
                <i class="ri-close-line"></i>
              </button>

              <div class="compare-cover bg-gradient-to-br ${p.tint}">
                ${p.badge ? `<span class="compare-cover-badge">${p.badge}</span>` : ''}
                <div class="relative z-[1] text-[12px] font-black leading-snug text-center">
                  ${p.titleLines}
                </div>
              </div>

              <h3 class="mt-3 text-[12px] font-black leading-snug line-clamp-2">${p.title}</h3>
              <p class="mt-1 text-[10px] text-muted">${p.author}</p>

              <div class="mt-3 flex items-center justify-center gap-1 text-[10px]">
                <i class="ri-star-fill text-[#f0b429]"></i>
                <b>${faNumStr(p.rating)}</b>
                <span class="text-muted">(${faNumStr(p.reviews)})</span>
              </div>

              <button class="compare-add-cart mt-3" data-add-cart="${p.id}">
                <i class="ri-shopping-bag-3-line"></i> افزودن به سبد
              </button>
            </div>
          </div>
        `).join('')}

        ${ROWS.map(row => {
          const best = findBest(list, row);
          return `
            <div class="compare-cell compare-cell--label">
              <span>${row.label}</span>
            </div>
            ${list.map(p => {
              const v = row.value(p);
              const isBest = row.best && v !== null && v === best;
              return `
                <div class="compare-cell compare-cell--value ${isBest ? 'is-best' : ''}">
                  ${isBest ? '<i class="ri-award-line compare-best-badge" title="بهترین انتخاب"></i>' : ''}
                  ${row.render(p)}
                </div>
              `;
            }).join('')}
          `;
        }).join('')}

      </div>
    </div>
  `;
};

/* ---------- Empty state ---------- */
$('#addFromEmpty')?.addEventListener('click', () => openPicker());

/* ---------- Remove product ---------- */
wrapper?.addEventListener('click', e => {
  const removeBtn = e.target.closest('[data-remove]');
  if (removeBtn) {
    const id = +removeBtn.dataset.remove;
    compareIds = compareIds.filter(x => x !== id);
    renderCompare();
    showToast('محصول از مقایسه حذف شد.');
    return;
  }

  const addBtn = e.target.closest('[data-add-cart]');
  if (addBtn) {
    showToast('به سبد خرید اضافه شد.');
  }
});

/* ---------- Clear all ---------- */
$('#clearCompare')?.addEventListener('click', () => {
  if (!compareIds.length) return;
  if (!confirm('همه محصولات از مقایسه پاک شوند؟')) return;
  compareIds = [];
  renderCompare();
  showToast('مقایسه خالی شد.');
});

/* ---------- Product picker modal ---------- */
const pickerModal = $('#pickerModal');
const pickerList = $('#pickerList');
const pickerSearch = $('#pickerSearch');

const openPicker = () => {
  pickerSearch.value = '';
  renderPicker('');
  pickerModal.classList.remove('hidden');
  pickerModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
  setTimeout(() => pickerSearch.focus(), 100);
};

const closePicker = () => {
  pickerModal.classList.add('hidden');
  pickerModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

const renderPicker = query => {
  const q = query.toLowerCase();
  const list = PRODUCTS.filter(p => {
    if (compareIds.includes(p.id)) return false;
    if (q && !`${p.title} ${p.author}`.toLowerCase().includes(q)) return false;
    return true;
  });

  if (!list.length) {
    pickerList.innerHTML = `
      <div class="flex flex-col items-center gap-2 py-10 text-center">
        <i class="ri-search-eye-line text-[36px] text-muted"></i>
        <b class="text-[12px]">محصولی یافت نشد</b>
        <p class="text-[10px] text-muted">جست‌وجو را تغییر دهید یا همه محصولات قبلاً اضافه شده‌اند.</p>
      </div>
    `;
    return;
  }

  pickerList.innerHTML = list.map(p => `
    <button class="picker-item" data-pick="${p.id}">
      <div class="grid h-[58px] w-[42px] shrink-0 place-items-center rounded-[10px] bg-gradient-to-br ${p.tint} text-[7px] font-black text-white text-center leading-tight p-1">
        ${p.title.slice(0, 10)}
      </div>
      <div class="min-w-0 flex-1 text-right">
        <b class="block truncate text-[12px]">${p.title}</b>
        <small class="mt-0.5 block text-[10px] text-muted">${p.author} · ${p.publisher}</small>
      </div>
      <div class="shrink-0 text-left">
        <b class="block text-[11px]">${formatPrice(p.price)}</b>
        <small class="text-[9px] text-muted">تومان</small>
      </div>
      <i class="ri-add-line ml-2 text-[16px] text-muted"></i>
    </button>
  `).join('');
};

$('#addCompare')?.addEventListener('click', openPicker);
$$('[data-picker-close]').forEach(b => b.addEventListener('click', closePicker));
pickerModal?.addEventListener('click', e => { if (e.target === pickerModal) closePicker(); });

pickerSearch?.addEventListener('input', e => renderPicker(e.target.value.trim()));

pickerList?.addEventListener('click', e => {
  const btn = e.target.closest('[data-pick]');
  if (!btn) return;
  const id = +btn.dataset.pick;

  if (compareIds.length >= MAX_COMPARE) {
    showToast(`حداکثر ${faNumStr(MAX_COMPARE)} محصول قابل مقایسه است.`, 'error');
    return;
  }
  if (!compareIds.includes(id)) {
    compareIds.push(id);
    renderCompare();
    showToast('محصول به مقایسه اضافه شد.');
  }
  // اگر هنوز ظرفیت داریم، مودال را باز نگه دار؛ در غیر این‌صورت ببند
  if (compareIds.length >= MAX_COMPARE) closePicker();
  else renderPicker(pickerSearch.value.trim());
});

/* ---------- Suggest grid ---------- */
const renderSuggest = () => {
  const grid = $('#suggestGrid');
  const list = PRODUCTS.slice(0, 8);

  grid.innerHTML = list.map(p => `
    <article class="product-card min-w-0">
      <div class="product-cover bg-gradient-to-br ${p.tint}">
        ${p.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${p.badge}</span>` : ''}
        <button class="wish"><i class="ri-heart-3-line"></i></button>
        <div class="relative z-[1] text-[15px] font-black leading-snug sm:text-[18px]">${p.titleLines}</div>
        <div class="relative z-[1] mt-1 text-[10px] text-white/65">${p.author}</div>
      </div>
      <div class="px-[3px] py-3.5">
        <span class="text-[9px] text-[#9aa19e]">${p.catLabel}</span>
        <h3 class="mt-1 text-xs font-extrabold">${p.title}</h3>
        <div class="mt-3 flex items-center gap-2">
          <strong class="text-[10px] sm:text-xs">${formatPrice(p.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
          <button class="add-cart" data-pick-from-suggest="${p.id}" aria-label="افزودن به مقایسه"><i class="ri-scales-3-line"></i></button>
        </div>
      </div>
    </article>
  `).join('');
};

$('#suggestGrid')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-pick-from-suggest]');
  if (!btn) return;
  const id = +btn.dataset.pickFromSuggest;
  if (compareIds.length >= MAX_COMPARE) {
    return showToast(`حداکثر ${faNumStr(MAX_COMPARE)} محصول قابل مقایسه است.`, 'error');
  }
  if (compareIds.includes(id)) {
    return showToast('این محصول از قبل در مقایسه است.');
  }
  compareIds.push(id);
  renderCompare();
  showToast('به مقایسه اضافه شد.');
  document.getElementById('compareWrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ---------- Toast ---------- */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[200] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

/* ---------- Init ---------- */
renderCompare();
renderSuggest();