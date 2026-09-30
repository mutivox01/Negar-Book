/* =========================================================
   Cart page - مدیریت کامل سبد خرید
   ========================================================= */

// const $ = (s, root = document) => root.querySelector(s);
// const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- Utilities ---------- */
const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const toman = n => faNum(Math.round(n).toLocaleString('en-US')) + ' تومان';
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده‌های نمونه ---------- */
const DEFAULT_CART = [
  {
    id: 5, title: 'روایت یک زندگی', author: 'نویسنده ناشناس',
    price: 275000, oldPrice: null, qty: 1,
    stock: 5, catLabel: 'زندگی‌نامه',
    cover: 'from-[#87927a] to-[#3b4a3f]', titleLines: 'روایت<br>یک زندگی',
  },
  {
    id: 6, title: 'فلسفه برای زندگی', author: 'ژولین باگینی',
    price: 320000, oldPrice: null, qty: 1,
    stock: 3, catLabel: 'فلسفه',
    cover: 'from-[#c0a17a] to-[#5a3f27]', titleLines: 'فلسفه<br>برای زندگی',
  },
];

const RECOMMENDED = [
  { id: 2, title: 'هنر شفاف اندیشیدن', price: 345000, oldPrice: null, rating: 4.9,
    badge: 'پرفروش', cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن', author: 'رولف دوبلی', catLabel: 'تفکر' },
  { id: 4, title: 'سمفونی خاموش', price: 198000, oldPrice: null, rating: 4.6,
    badge: 'ویژه', cover: 'from-[#c9827b] to-[#4a2828]', titleLines: 'سمفونی<br>خاموش', author: 'رضا قاسمی', catLabel: 'ادبیات' },
  { id: 8, title: 'کار عمیق', price: 310000, oldPrice: 380000, rating: 4.9,
    badge: '۱۵٪ تخفیف', cover: 'from-[#7ea39a] to-[#254a41]', titleLines: 'کار<br>عمیق', author: 'کال نیوپورت', catLabel: 'کسب‌وکار' },
  { id: 11, title: 'ملت عشق', price: 395000, oldPrice: null, rating: 4.9,
    badge: 'پرفروش', cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق', author: 'الیف شافاک', catLabel: 'رمان' },
];

const COUPONS = {
  'NEGAR20': { type: 'percent', value: 20, label: '۲۰٪ تخفیف' },
  'BOOK50K': { type: 'fixed', value: 50000, label: '۵۰ هزار تومان تخفیف' },
};

const FREE_SHIPPING_THRESHOLD = 900000;

/* ---------- State ---------- */
let cart = JSON.parse(localStorage.getItem('negar_cart') || 'null') || [...DEFAULT_CART];
let discount = 0;
let coupon = null;

const save = () => localStorage.setItem('negar_cart', JSON.stringify(cart));

/* ---------- Refs ---------- */
const itemsWrap = $('#cartItems');
const emptyCart = $('#emptyCart');
const cartLayout = $('#cartLayout');
const cartAside = $('#cartAside');
const recommendedSection = $('#recommendedSection');
const recommendedGrid = $('#recommendedGrid');
const cartCount = $('#cartCount');
const summaryCount = $('#summaryCount');
const sumItems = $('#sumItems');
const sumDiscount = $('#sumDiscount');
const sumTotal = $('#sumTotal');
const discountRow = $('#discountRow');
const couponInput = $('#couponInput');
const couponMsg = $('#couponMsg');
const applyCouponBtn = $('#applyCoupon');
const goCheckout = $('#goCheckout');
const clearCartBtn = $('#clearCart');
const freeShipBar = $('#freeShipBar');
const freeShipMsg = $('#freeShipMsg');

/* ---------- محاسبه‌ها ---------- */
const subtotal = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
const totalQty = () => cart.reduce((s, i) => s + i.qty, 0);

const updateTotals = () => {
  const sub = subtotal();
  const tot = Math.max(0, sub - discount);

  sumItems.textContent = toman(sub);
  sumTotal.textContent = toman(tot);

  // تخفیف
  if (discount > 0) {
    discountRow.classList.remove('hidden');
    discountRow.classList.add('flex');
    sumDiscount.textContent = '− ' + toman(discount);
  } else {
    discountRow.classList.add('hidden');
    discountRow.classList.remove('flex');
  }

  // نوار ارسال رایگان
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - sub);
  const percent = Math.min(100, (sub / FREE_SHIPPING_THRESHOLD) * 100);
  freeShipBar.style.width = percent + '%';

  if (remaining === 0) {
    freeShipMsg.textContent = '🎉 ارسال سفارش شما رایگان است!';
    freeShipMsg.classList.add('text-accent-dark');
    freeShipMsg.classList.remove('text-muted');
  } else {
    freeShipMsg.textContent = `${toman(remaining)} تا ارسال رایگان`;
    freeShipMsg.classList.add('text-muted');
    freeShipMsg.classList.remove('text-accent-dark');
  }

  // شمارنده‌ها
  const q = totalQty();
  cartCount.textContent = faNum(q);
  summaryCount.textContent = `${faNum(q)} کالا`;

  // دکمه‌ها
  const empty = cart.length === 0;
  goCheckout.classList.toggle('pointer-events-none', empty);
  goCheckout.classList.toggle('opacity-50', empty);

  save();
};

/* ---------- رندر آیتم‌ها ---------- */
const itemHTML = item => `
  <article class="cart-item" data-id="${item.id}">
    <div class="flex items-start gap-4">

      <!-- کاور -->
      <div class="relative grid h-[130px] w-[92px] shrink-0 place-items-end overflow-hidden rounded-[16px] bg-gradient-to-br ${item.cover} p-3 text-white shadow-[0_10px_25px_rgba(0,0,0,.08)]">
        <div class="relative z-[1] text-[11px] font-black leading-snug">${item.titleLines}</div>
        <span class="absolute top-2.5 right-2.5 z-[2] rounded-full bg-white/15 px-2 py-1 text-[8px] backdrop-blur-[10px]">${item.catLabel}</span>
      </div>

      <!-- محتوا -->
      <div class="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <h3 class="truncate text-[13px] font-extrabold">${item.title}</h3>
              <p class="mt-1 text-[10px] text-muted">${item.author}</p>
            </div>
            <button type="button" class="cart-remove shrink-0 grid h-[30px] w-[30px] place-items-center rounded-[9px] text-muted hover:bg-danger/10 hover:text-danger transition"
              data-action="remove" aria-label="حذف">
              <i class="ri-delete-bin-6-line text-[15px]"></i>
            </button>
          </div>

          <div class="mt-2.5 flex items-center gap-2">
            ${item.oldPrice ? `<del class="text-[10px] text-[#b0b5b2]">${tomanShort(item.oldPrice)}</del>` : ''}
            <span class="text-[11px] font-bold">${toman(item.price)}</span>
          </div>
        </div>

        <!-- اکشن‌ها -->
        <div class="flex flex-wrap items-center justify-between gap-2.5">
          <div class="qty-stepper" data-id="${item.id}">
            <button type="button" data-action="dec" aria-label="کاهش">
              <i class="ri-subtract-line"></i>
            </button>
            <span class="qty-value">${faNum(item.qty)}</span>
            <button type="button" data-action="inc" ${item.qty >= item.stock ? 'disabled' : ''} aria-label="افزایش">
              <i class="ri-add-line"></i>
            </button>
          </div>
          <span class="text-[10px] text-muted">
            جمع: <b class="text-ink">${toman(item.price * item.qty)}</b>
          </span>
        </div>

        ${item.qty >= item.stock ? `<p class="text-[9px] font-bold text-danger">بیشتر از موجودی نمی‌توانید اضافه کنید.</p>` : ''}
      </div>

    </div>
  </article>
`;

const renderItems = () => {
  if (!cart.length) {
    itemsWrap.innerHTML = '';
    itemsWrap.classList.add('hidden');
    emptyCart.classList.remove('hidden');
    emptyCart.classList.add('flex');
    cartAside.classList.add('hidden');
    updateTotals();
    return;
  }

  itemsWrap.classList.remove('hidden');
  emptyCart.classList.add('hidden');
  emptyCart.classList.remove('flex');
  cartAside.classList.remove('hidden');

  itemsWrap.innerHTML = cart.map(itemHTML).join('');
};

/* ---------- رندر پیشنهادها ---------- */
const recCardHTML = p => `
  <article class="product-card min-w-0">
    <div class="product-cover bg-gradient-to-br ${p.cover}">
      ${p.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${p.badge}</span>` : ''}
      <button class="wish" aria-label="افزودن به علاقه‌مندی"><i class="ri-heart-3-line"></i></button>
      <div class="relative z-[1] text-[17px] font-black leading-snug sm:text-[20px]">${p.titleLines}</div>
      <div class="relative z-[1] mt-1 text-[10px] text-white/65">${p.author}</div>
    </div>
    <div class="px-[3px] py-3.5">
      <span class="text-[9px] text-[#9aa19e]">${p.catLabel}</span>
      <h3 class="mt-1 text-xs font-extrabold">${p.title}</h3>
      <div class="mt-3 flex items-center gap-2">
        <strong class="text-[10px] sm:text-xs">${tomanShort(p.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
        ${p.oldPrice ? `<del class="text-[9px] text-[#b0b5b2]">${tomanShort(p.oldPrice)}</del>` : ''}
        <button class="add-cart" data-recommend="${p.id}" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>
      </div>
    </div>
  </article>
`;

const renderRecommended = () => {
  // محصولاتی که در سبد نیستند
  const ids = new Set(cart.map(i => i.id));
  const list = RECOMMENDED.filter(p => !ids.has(p.id));
  if (!list.length) {
    recommendedSection.classList.add('hidden');
    return;
  }
  recommendedSection.classList.remove('hidden');
  recommendedGrid.innerHTML = list.map(recCardHTML).join('');
};

/* ---------- تغییر تعداد / حذف ---------- */
itemsWrap.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  const itemEl = btn.closest('.cart-item');
  const id = +itemEl.dataset.id;
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (action === 'inc') {
    if (item.qty < item.stock) item.qty++;
  } else if (action === 'dec') {
    if (item.qty > 1) item.qty--;
  } else if (action === 'remove') {
    // انیمیشن حذف
    itemEl.style.transition = 'opacity .25s, transform .25s';
    itemEl.style.opacity = '0';
    itemEl.style.transform = 'translateX(20px)';
    setTimeout(() => {
      cart = cart.filter(i => i.id !== id);
      // اگر تخفیف داشتیم، دوباره محاسبه شود
      if (coupon && COUPONS[coupon]) recalcDiscount();
      renderItems();
      renderRecommended();
      updateTotals();
    }, 220);
    return;
  }

  renderItems();
  if (coupon) recalcDiscount();
  updateTotals();
});

/* ---------- افزودن از پیشنهادها ---------- */
recommendedGrid.addEventListener('click', e => {
  const btn = e.target.closest('[data-recommend]');
  if (!btn) return;
  const id = +btn.dataset.recommend;
  const product = RECOMMENDED.find(p => p.id === id);
  if (!product) return;

  const exists = cart.find(i => i.id === id);
  if (exists) {
    if (exists.qty < exists.stock) exists.qty++;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      author: product.author,
      price: product.price,
      oldPrice: product.oldPrice,
      qty: 1,
      stock: 5,
      catLabel: product.catLabel,
      cover: product.cover,
      titleLines: product.titleLines,
    });
  }

  // فیدبک روی دکمه
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="ri-check-line"></i>';
  setTimeout(() => (btn.innerHTML = original), 900);

  if (coupon) recalcDiscount();
  renderItems();
  renderRecommended();
  updateTotals();
  showToast('به سبد خرید اضافه شد.');
});

/* ---------- کد تخفیف ---------- */
const recalcDiscount = () => {
  if (!coupon || !COUPONS[coupon]) { discount = 0; return; }
  const c = COUPONS[coupon];
  const sub = subtotal();
  discount = c.type === 'percent' ? Math.round(sub * c.value / 100) : c.value;
  discount = Math.min(discount, sub);
};

const showCouponMsg = (msg, ok = true) => {
  couponMsg.textContent = msg;
  couponMsg.classList.remove('hidden', 'text-accent-dark', 'text-danger');
  couponMsg.classList.add(ok ? 'text-accent-dark' : 'text-danger');
};

applyCouponBtn?.addEventListener('click', () => {
  const code = (couponInput.value || '').trim().toUpperCase();
  if (!code) {
    discount = 0; coupon = null;
    couponMsg.classList.add('hidden');
    updateTotals();
    return;
  }
  const c = COUPONS[code];
  if (!c) {
    discount = 0; coupon = null;
    showCouponMsg('کد تخفیف معتبر نیست.', false);
    updateTotals();
    return;
  }
  coupon = code;
  recalcDiscount();
  showCouponMsg(`کد «${code}» اعمال شد — ${c.label}`, true);
  updateTotals();
});

couponInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); applyCouponBtn.click(); }
});

/* ---------- خالی کردن سبد ---------- */
clearCartBtn?.addEventListener('click', () => {
  if (!cart.length) return;
  if (!confirm('آیا مطمئن هستید که می‌خواهید سبد خرید را خالی کنید؟')) return;
  cart = [];
  discount = 0; coupon = null;
  couponInput.value = '';
  couponMsg.classList.add('hidden');
  renderItems();
  renderRecommended();
  updateTotals();
  showToast('سبد خرید خالی شد.');
});

/* ---------- Toast ---------- */
const showToast = (msg, type = 'success') => {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.className = `fixed bottom-5 left-5 z-[100] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2400);
};

/* ---------- Init ---------- */
// اگر کد تخفیف از قبل در سشن ذخیره شده بود، بازیابی کنیم
const savedCoupon = sessionStorage.getItem('negar_coupon');
if (savedCoupon && COUPONS[savedCoupon]) {
  coupon = savedCoupon;
  couponInput.value = savedCoupon;
  recalcDiscount();
  showCouponMsg(`کد «${savedCoupon}» اعمال شد.`, true);
}

renderItems();
renderRecommended();
updateTotals();