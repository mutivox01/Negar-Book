/* =========================================================
   Offers Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده ---------- */
const OFFERS = [
  {
    id: 1, title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار',
    price: 202300, oldPrice: 289000, discount: 30,
    category: 'fiction', categoryLabel: 'رمان',
    cover: 'from-[#aebca7] to-[#334c45]', titleLines: 'درختی که<br>روی ماه رشد کرد',
    endsIn: '2026-10-02T23:59:59', badge: 'پرفروش',
  },
  {
    id: 2, title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی',
    price: 241500, oldPrice: 345000, discount: 30,
    category: 'psychology', categoryLabel: 'تفکر',
    cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن',
    endsIn: '2026-10-01T23:59:59', badge: 'محبوب',
  },
  {
    id: 3, title: 'ملت عشق', author: 'الیف شافاک',
    price: 256750, oldPrice: 395000, discount: 35,
    category: 'fiction', categoryLabel: 'رمان',
    cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق',
    endsIn: '2026-09-30T20:00:00', badge: 'پرفروش',
  },
  {
    id: 4, title: 'کار عمیق', author: 'کال نیوپورت',
    price: 232500, oldPrice: 310000, discount: 25,
    category: 'business', categoryLabel: 'کسب‌وکار',
    cover: 'from-[#7ea39a] to-[#254a41]', titleLines: 'کار<br>عمیق',
    endsIn: '2026-10-05T23:59:59', badge: 'ویژه',
  },
  {
    id: 5, title: 'دنیای سوفی', author: 'یوستین گردر',
    price: 336000, oldPrice: 420000, discount: 20,
    category: 'psychology', categoryLabel: 'فلسفه',
    cover: 'from-[#b8946b] to-[#4a3520]', titleLines: 'دنیای<br>سوفی',
    endsIn: '2026-10-08T23:59:59', badge: null,
  },
  {
    id: 6, title: 'چرا می‌خوانیم؟', author: 'دانیل پنک',
    price: 192000, oldPrice: 240000, discount: 20,
    category: 'psychology', categoryLabel: 'توسعه فردی',
    cover: 'from-[#8d98c5] to-[#2f3656]', titleLines: 'چرا<br>می‌خوانیم؟',
    endsIn: '2026-10-03T23:59:59', badge: 'جدید',
  },
  {
    id: 7, title: 'سمفونی خاموش', author: 'رضا قاسمی',
    price: 138600, oldPrice: 198000, discount: 30,
    category: 'fiction', categoryLabel: 'ادبیات',
    cover: 'from-[#c9827b] to-[#4a2828]', titleLines: 'سمفونی<br>خاموش',
    endsIn: '2026-10-06T23:59:59', badge: null,
  },
  {
    id: 8, title: 'قصه‌های خوب برای بچه‌های خوب', author: 'گابریل گارسیا مارکز',
    price: 141750, oldPrice: 189000, discount: 25,
    category: 'kids', categoryLabel: 'کودک',
    cover: 'from-[#e5b57c] to-[#8a5a20]', titleLines: 'قصه‌های<br>خوب',
    endsIn: '2026-10-10T23:59:59', badge: 'ویژه',
  },
  {
    id: 9, title: 'گلستان سعدی', author: 'سعدی شیرازی',
    price: 212000, oldPrice: 265000, discount: 20,
    category: 'poetry', categoryLabel: 'شعر',
    cover: 'from-[#a3936f] to-[#463a1c]', titleLines: 'گلستان<br>سعدی',
    endsIn: '2026-10-04T23:59:59', badge: 'کلاسیک',
  },
  {
    id: 10, title: 'روایت یک زندگی', author: 'نویسنده ناشناس',
    price: 192500, oldPrice: 275000, discount: 30,
    category: 'fiction', categoryLabel: 'زندگی‌نامه',
    cover: 'from-[#87927a] to-[#3b4a3f]', titleLines: 'روایت<br>یک زندگی',
    endsIn: '2026-10-07T23:59:59', badge: null,
  },
  {
    id: 11, title: 'صبح بعد از باران', author: 'سارا محمودی',
    price: 157500, oldPrice: 225000, discount: 30,
    category: 'fiction', categoryLabel: 'داستان',
    cover: 'from-[#8f96b5] to-[#3b3f5e]', titleLines: 'صبح<br>بعد از باران',
    endsIn: '2026-10-09T23:59:59', badge: 'جدید',
  },
  {
    id: 12, title: 'فلسفه برای زندگی', author: 'ژولین باگینی',
    price: 272000, oldPrice: 320000, discount: 15,
    category: 'psychology', categoryLabel: 'فلسفه',
    cover: 'from-[#c0a17a] to-[#5a3f27]', titleLines: 'فلسفه<br>برای زندگی',
    endsIn: '2026-10-12T23:59:59', badge: null,
  },
];

const CATEGORIES = [
  { id: 'all', label: 'همه' },
  { id: 'fiction', label: 'رمان و ادبیات' },
  { id: 'psychology', label: 'روان‌شناسی' },
  { id: 'business', label: 'کسب‌وکار' },
  { id: 'kids', label: 'کودک' },
  { id: 'poetry', label: 'شعر' },
];

/* ---------- State ---------- */
const state = {
  filter: 'all',
  sort: 'discount',
};

/* ---------- Refs ---------- */
const grid = $('#offersGrid');
const emptyEl = $('#offersEmpty');
const countEl = $('#offerCount');

/* ---------- Helpers ---------- */
const timeLeft = endISO => {
  const diff = new Date(endISO).getTime() - Date.now();
  if (diff <= 0) return { text: 'پایان یافته', urgent: true };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return { text: `${faNum(days)} روز و ${faNum(hours)} ساعت`, urgent: false };
  if (hours > 0) return { text: `${faNum(hours)} ساعت و ${faNum(mins)} دقیقه`, urgent: true };
  return { text: `${faNum(mins)} دقیقه`, urgent: true };
};

/* ---------- Filter + Sort ---------- */
const getFiltered = () => {
  let list = OFFERS.filter(o => state.filter === 'all' || o.category === state.filter);

  switch (state.sort) {
    case 'newest': list.sort((a, b) => b.id - a.id); break;
    case 'price':  list.sort((a, b) => a.price - b.price); break;
    case 'ending': list.sort((a, b) => new Date(a.endsIn) - new Date(b.endsIn)); break;
    default:       list.sort((a, b) => b.discount - a.discount);
  }

  return list;
};

/* ---------- Card HTML ---------- */
const offerCardHTML = o => {
  const t = timeLeft(o.endsIn);
  return `
    <article class="product-card min-w-0 offer-card" data-offer-id="${o.id}">
      <div class="product-cover bg-gradient-to-br ${o.cover}">
        <span class="offer-discount">${faNum(o.discount)}٪</span>
        ${o.badge ? `<span class="offer-badge">${o.badge}</span>` : ''}
        <button class="wish" aria-label="افزودن به علاقه‌مندی"><i class="ri-heart-3-line"></i></button>
        <div class="relative z-[1] text-[17px] font-black leading-snug sm:text-[20px]">${o.titleLines}</div>
        <div class="relative z-[1] mt-1 text-[10px] text-white/65">${o.author}</div>
      </div>
      <div class="px-[3px] py-3.5">
        <div class="flex items-center justify-between gap-2">
          <span class="text-[9px] text-[#9aa19e]">${o.categoryLabel}</span>
          <span class="offer-timer ${t.urgent ? 'is-urgent' : ''}">
            <i class="ri-timer-line"></i> ${t.text}
          </span>
        </div>
        <h3 class="mt-1 text-xs font-extrabold">${o.title}</h3>
        <div class="mt-3 flex items-end gap-2">
          <strong class="text-[11px] sm:text-[13px] text-ink">${tomanShort(o.price)}</strong>
          <small class="mb-0.5 text-[8px] font-medium text-muted">تومان</small>
          <del class="mb-0.5 mr-auto text-[9px] text-[#b0b5b2]">${tomanShort(o.oldPrice)}</del>
          <button class="add-cart" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>
        </div>
      </div>
    </article>
  `;
};

/* ---------- Render ---------- */
const renderFilters = () => {
  const wrap = $('#offerFilters');
  wrap.innerHTML = CATEGORIES.map(c => {
    const count = c.id === 'all' ? OFFERS.length : OFFERS.filter(o => o.category === c.id).length;
    return `
      <button class="blog-chip ${c.id === state.filter ? 'is-active' : ''}" data-offer-cat="${c.id}">
        ${c.label} <span class="blog-chip-count">${faNum(count)}</span>
      </button>
    `;
  }).join('');
};

const render = () => {
  const list = getFiltered();
  countEl.textContent = faNum(list.length);

  if (!list.length) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    return;
  }

  grid.classList.remove('hidden');
  emptyEl.classList.add('hidden');
  emptyEl.classList.remove('flex');
  grid.innerHTML = list.map(offerCardHTML).join('');
};

/* ---------- Events ---------- */
$('#offerFilters')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-offer-cat]');
  if (!btn) return;
  state.filter = btn.dataset.offerCat;
  renderFilters();
  render();
});

$('#offerSort')?.addEventListener('change', e => {
  state.sort = e.target.value;
  render();
});

/* ---------- Copy coupon ---------- */
const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`کد «${text}» کپی شد.`);
  } catch (_) {
    showToast('کپی ناموفق بود.', 'error');
  }
};

$('#copyCoupon')?.addEventListener('click', () => copyToClipboard('NEGAR20'));
$('#copyCodeBtn')?.addEventListener('click', () => copyToClipboard('NEGAR20'));

/* ---------- Countdown ---------- */
const END = new Date();
END.setDate(END.getDate() + 3);
END.setHours(23, 59, 59, 999);

const cdDays = $('#cdDays');
const cdHours = $('#cdHours');
const cdMinutes = $('#cdMinutes');
const cdSeconds = $('#cdSeconds');

const fmt = n => String(n).padStart(2, '0');

const tickCountdown = () => {
  const diff = Math.max(0, END.getTime() - Date.now());
  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (cdDays) cdDays.textContent = faNum(fmt(days));
  if (cdHours) cdHours.textContent = faNum(fmt(hours));
  if (cdMinutes) cdMinutes.textContent = faNum(fmt(mins));
  if (cdSeconds) cdSeconds.textContent = faNum(fmt(secs));

  if (diff === 0) clearInterval(window.__offerTick);
};

tickCountdown();
window.__offerTick = setInterval(tickCountdown, 1000);

/* ---------- Daily deal ---------- */
$('[data-add-daily]')?.addEventListener('click', function () {
  const original = this.innerHTML;
  this.disabled = true;
  this.innerHTML = '<i class="ri-check-line"></i> به سبد اضافه شد';
  setTimeout(() => {
    this.disabled = false;
    this.innerHTML = original;
  }, 1400);
  document.querySelector('[data-cart-toggle]')?.click();
});

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
renderFilters();
render();