/* =========================================================
   Product Detail Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده‌های مشابه ---------- */
const RELATED = [
  { id: 2, title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', price: 345000, oldPrice: null,
    badge: 'پرفروش', cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن', catLabel: 'تفکر' },
  { id: 4, title: 'سمفونی خاموش', author: 'رضا قاسمی', price: 198000, oldPrice: null,
    badge: 'ویژه', cover: 'from-[#c9827b] to-[#4a2828]', titleLines: 'سمفونی<br>خاموش', catLabel: 'ادبیات' },
  { id: 8, title: 'کار عمیق', author: 'کال نیوپورت', price: 310000, oldPrice: 380000,
    badge: '۱۵٪ تخفیف', cover: 'from-[#7ea39a] to-[#254a41]', titleLines: 'کار<br>عمیق', catLabel: 'کسب‌وکار' },
  { id: 11, title: 'ملت عشق', author: 'الیف شافاک', price: 395000, oldPrice: null,
    badge: 'پرفروش', cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق', catLabel: 'رمان' },
];

const RECENT = [
  { id: 2, title: 'هنر شفاف اندیشیدن', price: 345000, cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن' },
  { id: 6, title: 'فلسفه برای زندگی', price: 320000, cover: 'from-[#c0a17a] to-[#5a3f27]', titleLines: 'فلسفه<br>برای زندگی' },
  { id: 9, title: 'دنیای سوفی', price: 420000, cover: 'from-[#b8946b] to-[#4a3520]', titleLines: 'دنیای<br>سوفی' },
  { id: 3, title: 'چرا می‌خوانیم؟', price: 240000, cover: 'from-[#8d98c5] to-[#2f3656]', titleLines: 'چرا<br>می‌خوانیم؟' },
  { id: 12, title: 'گلستان سعدی', price: 265000, cover: 'from-[#a3936f] to-[#463a1c]', titleLines: 'گلستان<br>سعدی' },
];

/* ---------- Book card ---------- */
const bookCardHTML = p => `
  <article class="product-card min-w-0">
    <div class="product-cover bg-gradient-to-br ${p.cover}">
      ${p.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${p.badge}</span>` : ''}
      <button class="wish" aria-label="افزودن به علاقه‌مندی"><i class="ri-heart-3-line"></i></button>
      <div class="relative z-[1] text-[17px] font-black leading-snug sm:text-[20px]">${p.titleLines || p.title}</div>
      ${p.author ? `<div class="relative z-[1] mt-1 text-[10px] text-white/65">${p.author}</div>` : ''}
    </div>
    <div class="px-[3px] py-3.5">
      ${p.catLabel ? `<span class="text-[9px] text-[#9aa19e]">${p.catLabel}</span>` : ''}
      <h3 class="mt-1 text-xs font-extrabold">${p.title}</h3>
      <div class="mt-3 flex items-center gap-2">
        <strong class="text-[10px] sm:text-xs">${tomanShort(p.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
        ${p.oldPrice ? `<del class="text-[9px] text-[#b0b5b2]">${tomanShort(p.oldPrice)}</del>` : ''}
        <button class="add-cart" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>
      </div>
    </div>
  </article>
`;

/* ---------- Render related/recent ---------- */
$('#relatedGrid').innerHTML = RELATED.map(bookCardHTML).join('');
$('#recentGrid').innerHTML = RECENT.map(p => `
  <a href="./product.html" class="recent-card">
    <div class="recent-cover bg-gradient-to-br ${p.cover}">${p.titleLines}</div>
    <b class="mt-2 block truncate text-[11px]">${p.title}</b>
    <small class="mt-1 block text-[10px] text-muted">${tomanShort(p.price)} تومان</small>
  </a>
`).join('');

/* ---------- گالری: تصاویر کوچک ---------- */
$$('.pdp-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.pdp-thumb').forEach(b => b.classList.toggle('is-active', b === btn));
    const main = $('#pdpMain');
    // رنگ گرادیان را از تصویر فعال بگیر
    const active = btn.className.match(/from-\[([^\]]+)\]\s+to-\[([^\]]+)\]/);
    if (active) {
      main.style.backgroundImage = `linear-gradient(135deg, ${active[1]}, ${active[2]})`;
    }
  });
});

/* ---------- استپر تعداد ---------- */
const qty = { value: 1, max: 5 };
const qtyValue = $('#pdpQtyValue');

$('#pdpQty')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-step]');
  if (!btn) return;
  const step = btn.dataset.step;
  if (step === 'inc' && qty.value < qty.max) qty.value++;
  if (step === 'dec' && qty.value > 1) qty.value--;
  qtyValue.textContent = faNum(qty.value);
});

/* ---------- افزودن به سبد ---------- */
$('#pdpAddCart')?.addEventListener('click', () => {
  const btn = $('#pdpAddCart');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-check-line"></i> به سبد اضافه شد';
  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
  }, 1400);
  // باز کردن دراور سبد
  document.querySelector('[data-cart-toggle]')?.click();
});

/* ---------- Wishlist toggle (دکمه داخل گالری + دکمه متنی) ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('.pdp-wish, #pdpWishlist');
  if (!btn) return;
  const icon = $('i', btn);
  if (!icon) return;
  const active = icon.classList.toggle('ri-heart-3-fill');
  icon.classList.toggle('ri-heart-3-line', !active);
  btn.classList.toggle('is-active', active);
  if (btn.id === 'pdpWishlist') {
    btn.childNodes[btn.childNodes.length - 1].textContent = active
      ? ' در علاقه‌مندی‌ها'
      : ' افزودن به علاقه‌مندی';
  }
});

/* ---------- اشتراک‌گذاری ---------- */
$('#pdpShare')?.addEventListener('click', async () => {
  const data = {
    title: document.title,
    text: 'درختی که روی ماه رشد کرد — نِگار',
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      await navigator.clipboard.writeText(data.url);
      toast('لینک صفحه کپی شد.');
    }
  } catch (_) { /* user cancelled */ }
});

/* ---------- تب‌ها ---------- */
const tabs = $$('.pdp-tab');
const panels = $$('.pdp-panel');

tabs.forEach(tab => tab.addEventListener('click', () => {
  const key = tab.dataset.tab;
  tabs.forEach(t => t.classList.toggle('is-active', t === tab));
  panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === key));
  // آپدیت URL hash برای بازگشت
  history.replaceState(null, '', '#' + key);
}));

// باز کردن تب فعال از hash
const hash = (window.location.hash || '').replace('#', '');
if (hash && tabs.find(t => t.dataset.tab === hash)) {
  tabs.find(t => t.dataset.tab === hash).click();
}

/* ---------- نوار لودینگ نظرات (نمونه) ---------- */
$('#loadMoreReviews')?.addEventListener('click', function () {
  this.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال بارگذاری...';
  setTimeout(() => {
    toast('به‌زودی نظرات بیشتری نمایش داده می‌شود.');
    this.innerHTML = 'مشاهده همه نظرات (۱۲۴) <i class="ri-arrow-down-s-line"></i>';
  }, 900);
});

/* ---------- Feedback مفید بود ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('.pdp-helpful');
  if (!btn) return;
  btn.classList.toggle('is-active');
});

/* ---------- Modal نظردهی ---------- */
const modal = $('#reviewModal');
const openModal = () => {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};
const closeModal = () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

$('#openReviewForm')?.addEventListener('click', openModal);
$$('[data-review-close]').forEach(b => b.addEventListener('click', closeModal));
modal?.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

/* ---------- ستاره‌های نظردهی ---------- */
const starWrap = $('#reviewStars');
const ratingValue = $('#ratingValue');
starWrap?.addEventListener('click', e => {
  const btn = e.target.closest('[data-star]');
  if (!btn) return;
  const val = +btn.dataset.star;
  ratingValue.value = val;
  $$('[data-star]', starWrap).forEach((b, i) => {
    const icon = $('i', b);
    const active = i < val;
    icon.classList.toggle('ri-star-fill', active);
    icon.classList.toggle('ri-star-line', !active);
  });
});

/* ---------- فرم نظردهی ---------- */
$('#reviewForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const text = $('#reviewText');
  const name = $('#reviewName');
  let valid = true;

  if (!ratingValue.value || ratingValue.value === '0') {
    toast('لطفاً امتیاز خود را انتخاب کنید.', 'error');
    valid = false;
  }
  if (text.value.trim().length < 5) {
    text.closest('.field').classList.add('has-error');
    $('.error', text.closest('.field')).textContent = 'نظر باید حداقل ۵ کاراکتر باشد.';
    valid = false;
  }
  if (name.value.trim().length < 2) {
    name.closest('.field').classList.add('has-error');
    $('.error', name.closest('.field')).textContent = 'نام را وارد کنید.';
    valid = false;
  }
  if (!valid) return;

  toast('نظر شما با موفقیت ثبت شد.');
  closeModal();
  e.target.reset();
  ratingValue.value = '0';
  $$('[data-star]', starWrap).forEach(b => {
    const icon = $('i', b);
    icon.classList.add('ri-star-line');
    icon.classList.remove('ri-star-fill');
  });
});

// پاک کردن خطاها هنگام تایپ
$('#reviewForm')?.addEventListener('input', e => {
  const field = e.target.closest('.field');
  if (field) {
    field.classList.remove('has-error');
    const err = $('.error', field);
    if (err) err.textContent = '';
  }
});

/* ---------- Toast ---------- */
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[100] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}