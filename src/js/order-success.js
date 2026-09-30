/* =========================================================
   Order Success Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده‌های سفارش (از checkout یا sessionStorage) ---------- */
const DEFAULT_ORDER = {
  code: 'NG-' + Math.floor(100000 + Math.random() * 900000),
  total: 630000,
  subtotal: 595000,
  shipping: 35000,
  payment: 'پرداخت آنلاین',
  shippingMethod: 'پست پیشتاز',
  eta: '۱۴۰۵/۰۵/۱۶',
  address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
  recipient: 'سارا محمدی',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  items: [
    { title: 'روایت یک زندگی', author: 'نویسنده ناشناس', qty: 1, price: 275000, cover: 'bg-[#657c71]' },
    { title: 'فلسفه برای زندگی', author: 'ژولین باگینی', qty: 1, price: 320000, cover: 'bg-[#98785a]' },
  ],
};

const SUGGEST = [
  { title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', price: 345000, cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن' },
  { title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', price: 289000, cover: 'from-[#aebca7] to-[#334c45]', titleLines: 'درختی که<br>روی ماه رشد کرد' },
  { title: 'ملت عشق', author: 'الیف شافاک', price: 395000, cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق' },
  { title: 'کار عمیق', author: 'کال نیوپورت', price: 310000, cover: 'from-[#7ea39a] to-[#254a41]', titleLines: 'کار<br>عمیق' },
];

/* ---------- خواندن سفارش از checkout ---------- */
let order = DEFAULT_ORDER;
try {
  const saved = sessionStorage.getItem('negar_checkout');
  if (saved) {
    const data = JSON.parse(saved);
    order = {
      ...DEFAULT_ORDER,
      code: 'NG-' + Math.floor(100000 + Math.random() * 900000),
      subtotal: data.totals?.items || DEFAULT_ORDER.subtotal,
      shipping: data.totals?.shipping || DEFAULT_ORDER.shipping,
      total: data.totals?.total || DEFAULT_ORDER.total,
      address: data.address?.address || DEFAULT_ORDER.address,
      recipient: `${data.customer?.firstName || ''} ${data.customer?.lastName || ''}`.trim() || DEFAULT_ORDER.recipient,
      phone: faNum(data.customer?.phone || DEFAULT_ORDER.phone),
      shippingMethod: data.shipping === 'express' ? 'پیک سریع' : data.shipping === 'pickup' ? 'تحویل حضوری' : 'پست پیشتاز',
    };
  }
} catch (_) {}

/* ---------- Render ---------- */
const renderOrder = () => {
  // هدر
  $('#successCode').textContent = order.code;
  $('#successTotal').textContent = tomanShort(order.total) + ' تومان';
  $('#successPayment').textContent = order.payment;
  $('#successEta').textContent = order.eta;
  $('#successShipping').textContent = order.shippingMethod;

  // آیتم‌ها
  $('#successItemsCount').textContent = `${faNum(order.items.length)} قلم`;
  $('#successItems').innerHTML = order.items.map(i => `
    <div class="flex items-center gap-3 rounded-2xl border border-border p-3">
      <div class="grid h-[64px] w-[48px] shrink-0 place-items-center rounded-[10px] ${i.cover} text-[8px] font-black text-white text-center leading-tight p-1">
        ${i.title.slice(0, 10)}
      </div>
      <div class="min-w-0 flex-1">
        <b class="block text-[12px]">${i.title}</b>
        <small class="mt-1 block text-[10px] text-muted">${i.author}</small>
        <div class="mt-1.5 flex items-center gap-3 text-[10px] text-muted">
          <span>تعداد: ${faNum(i.qty)}</span>
        </div>
      </div>
      <b class="shrink-0 text-[12px]">${tomanShort(i.price * i.qty)}</b>
    </div>
  `).join('');

  // جمع
  $('#successSubtotal').textContent = tomanShort(order.subtotal) + ' تومان';
  $('#successShippingCost').textContent = order.shipping <= 0 ? 'رایگان' : tomanShort(order.shipping) + ' تومان';
  $('#successGrandTotal').textContent = tomanShort(order.total) + ' تومان';

  // آدرس
  $('#successAddress').textContent = order.address;
  $('#successRecipient').textContent = `گیرنده: ${order.recipient} — ${order.phone}`;

  // کد سفارش را در sessionStorage ذخیره کن تا در order-tracking استفاده شود
  sessionStorage.setItem('negar_last_order', order.code);
};

/* ---------- Copy code ---------- */
$('#copyCode')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(order.code);
    showToast('کد سفارش کپی شد.');
  } catch (_) {
    showToast('کپی ناموفق بود.', 'error');
  }
});

/* ---------- پیشنهادها ---------- */
const renderSuggest = () => {
  const grid = $('#successSuggest');
  grid.innerHTML = SUGGEST.map(p => `
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
renderOrder();
renderSuggest();