/* =========================================================
   Order Tracking Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده ---------- */
const ORDERS = {
  'NG-934821': {
    code: 'NG-934821',
    status: 'shipped',
    statusLabel: 'ارسال‌شده',
    statusIcon: 'ri-truck-line',
    date: '۱۴۰۵/۰۵/۱۲',
    total: 630000,
    refCode: 'IR-9384710294',
    carrier: 'پست پیشتاز',
    eta: '۱۴۰۵/۰۵/۱۶',
    address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
    items: [
      { title: 'روایت یک زندگی', author: 'نویسنده ناشناس', qty: 1, price: 275000, cover: 'bg-[#657c71]' },
      { title: 'فلسفه برای زندگی', author: 'ژولین باگینی', qty: 1, price: 320000, cover: 'bg-[#98785a]' },
    ],
    timeline: [
      { label: 'ثبت سفارش', date: '۱۴۰۵/۰۵/۱۲ — ۱۴:۳۲', done: true, icon: 'ri-shopping-bag-3-line' },
      { label: 'تأیید پرداخت', date: '۱۴۰۵/۰۵/۱۲ — ۱۴:۳۳', done: true, icon: 'ri-bank-card-line' },
      { label: 'آماده‌سازی در انبار', date: '۱۴۰۵/۰۵/۱۳ — ۰۹:۱۰', done: true, icon: 'ri-archive-2-line' },
      { label: 'تحویل به پست', date: '۱۴۰۵/۰۵/۱۴ — ۱۶:۴۵', done: true, icon: 'ri-truck-line' },
      { label: 'در حال ارسال', date: 'در مسیر مقصد', done: true, current: true, icon: 'ri-roadster-line' },
      { label: 'تحویل به شما', date: 'تخمین: ۱۴۰۵/۰۵/۱۶', done: false, icon: 'ri-home-4-line' },
    ],
  },
  'NG-931244': {
    code: 'NG-931244',
    status: 'delivered',
    statusLabel: 'تحویل‌شده',
    statusIcon: 'ri-checkbox-circle-line',
    date: '۱۴۰۵/۰۴/۲۸',
    total: 289000,
    refCode: 'IR-9371204856',
    carrier: 'پست پیشتاز',
    eta: '۱۴۰۵/۰۵/۰۱',
    address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
    items: [
      { title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', qty: 1, price: 289000, cover: 'bg-[#334c45]' },
    ],
    timeline: [
      { label: 'ثبت سفارش', date: '۱۴۰۵/۰۴/۲۸ — ۱۰:۱۵', done: true, icon: 'ri-shopping-bag-3-line' },
      { label: 'تأیید پرداخت', date: '۱۴۰۵/۰۴/۲۸ — ۱۰:۱۷', done: true, icon: 'ri-bank-card-line' },
      { label: 'آماده‌سازی در انبار', date: '۱۴۰۵/۰۴/۲۹ — ۰۸:۳۰', done: true, icon: 'ri-archive-2-line' },
      { label: 'تحویل به پست', date: '۱۴۰۵/۰۴/۳۰ — ۱۴:۰۰', done: true, icon: 'ri-truck-line' },
      { label: 'تحویل به شما', date: '۱۴۰۵/۰۵/۰۱ — ۱۱:۲۰', done: true, icon: 'ri-home-4-line' },
    ],
  },
  'NG-929881': {
    code: 'NG-929881',
    status: 'pending',
    statusLabel: 'در انتظار پرداخت',
    statusIcon: 'ri-time-line',
    date: '۱۴۰۵/۰۴/۱۵',
    total: 540000,
    refCode: null,
    carrier: null,
    eta: null,
    address: 'تهران، میدان آرژانتین، برج نگین، طبقه ۵',
    items: [
      { title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', qty: 1, price: 345000, cover: 'bg-[#483b29]' },
      { title: 'ملت عشق', author: 'الیف شافاک', qty: 1, price: 195000, cover: 'bg-[#4a221f]' },
    ],
    timeline: [
      { label: 'ثبت سفارش', date: '۱۴۰۵/۰۴/۱۵ — ۰۹:۱۰', done: true, icon: 'ri-shopping-bag-3-line' },
      { label: 'در انتظار پرداخت', date: 'در انتظار اقدام شما', done: false, current: true, icon: 'ri-time-line' },
      { label: 'تأیید پرداخت', date: '—', done: false, icon: 'ri-bank-card-line' },
      { label: 'آماده‌سازی در انبار', date: '—', done: false, icon: 'ri-archive-2-line' },
      { label: 'تحویل به پست', date: '—', done: false, icon: 'ri-truck-line' },
      { label: 'تحویل به شما', date: '—', done: false, icon: 'ri-home-4-line' },
    ],
  },
  'NG-926110': {
    code: 'NG-926110',
    status: 'cancelled',
    statusLabel: 'لغو‌شده',
    statusIcon: 'ri-close-circle-line',
    date: '۱۴۰۵/۰۳/۲۹',
    total: 198000,
    refCode: null,
    carrier: null,
    eta: null,
    address: 'شیراز، بلوار زند، کوچه ۱۲',
    items: [
      { title: 'سمفونی خاموش', author: 'رضا قاسمی', qty: 1, price: 198000, cover: 'bg-[#4a2828]' },
    ],
    timeline: [
      { label: 'ثبت سفارش', date: '۱۴۰۵/۰۳/۲۹ — ۱۸:۰۰', done: true, icon: 'ri-shopping-bag-3-line' },
      { label: 'لغو سفارش', date: '۱۴۰۵/۰۳/۳۰ — ۱۰:۰۰', done: true, danger: true, icon: 'ri-close-circle-line' },
      { label: 'بازگشت وجه', date: '۱۴۰۵/۰۴/۰۱ — ۱۲:۱۵', done: true, icon: 'ri-refund-2-line' },
    ],
  },
};

/* ---------- Refs ---------- */
const result = $('#trackingResult');
const form = $('#trackingForm');
const input = $('#trackingCode');

/* ---------- Status style map ---------- */
const statusStyles = {
  pending:   { badge: 'bg-[#fdeee0] text-[#a5622c]', icon: 'bg-gradient-to-br from-[#e8b66a] to-[#a5622c]' },
  shipped:   { badge: 'bg-[#d7dbea] text-[#5d658a]', icon: 'bg-gradient-to-br from-[#7d9bd1] to-[#2c5aa0]' },
  delivered: { badge: 'bg-[#e0f4e8] text-[#2e7d55]', icon: 'bg-gradient-to-br from-[#7ea39a] to-[#254a41]' },
  cancelled: { badge: 'bg-danger/10 text-danger',      icon: 'bg-gradient-to-br from-[#d98a80] to-[#a33226]' },
};

/* ---------- Render ---------- */
const renderOrder = order => {
  const s = statusStyles[order.status] || statusStyles.pending;

  // Header
  $('#trackingCodeLabel').textContent = order.code;
  $('#trackingDate').textContent = order.date;
  $('#trackingTotal').textContent = tomanShort(order.total) + ' تومان';
  $('#trackingStatusBadge').textContent = order.statusLabel;
  $('#trackingStatusBadge').className = `tracking-status-badge ${s.badge}`;
  $('#trackingStatusIcon').className = `tracking-status-icon ${s.icon}`;
  $('#trackingStatusIcon').innerHTML = `<i class="${order.statusIcon}"></i>`;

  // Items
  $('#trackingItemsCount').textContent = `${faNum(order.items.length)} قلم کالا`;
  $('#trackingItems').innerHTML = order.items.map(i => `
    <div class="flex items-center gap-3 rounded-2xl border border-border p-3">
      <div class="grid h-[64px] w-[48px] shrink-0 place-items-center rounded-[10px] ${i.cover} text-[8px] font-black text-white text-center leading-tight p-1">
        ${i.title.slice(0, 10)}
      </div>
      <div class="min-w-0 flex-1">
        <b class="block text-[12px]">${i.title}</b>
        <small class="mt-1 block text-[10px] text-muted">${i.author}</small>
        <div class="mt-1.5 flex items-center gap-3 text-[10px] text-muted">
          <span>تعداد: ${faNum(i.qty)}</span>
          <span>× ${tomanShort(i.price)}</span>
        </div>
      </div>
      <b class="shrink-0 text-[12px]">${tomanShort(i.price * i.qty)}</b>
    </div>
  `).join('');

  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = order.total - subtotal;
  $('#trackingSubtotal').textContent = tomanShort(subtotal) + ' تومان';
  $('#trackingShipping').textContent = shipping <= 0 ? 'رایگان' : tomanShort(shipping) + ' تومان';
  $('#trackingGrandTotal').textContent = tomanShort(order.total) + ' تومان';

  // Ref info
  $('#trackingRefCode').textContent = order.refCode || '—';
  $('#trackingCarrier').textContent = order.carrier || '—';
  $('#trackingEta').textContent = order.eta || '—';
  $('#trackingAddress').textContent = order.address;

  // Timeline
  $('#trackingTimeline').innerHTML = order.timeline.map(t => {
    const cls = [
      'tracking-step',
      t.done ? 'is-done' : '',
      t.current ? 'is-current' : '',
      t.danger ? 'is-danger' : '',
    ].filter(Boolean).join(' ');

    return `
      <li class="${cls}">
        <span class="tracking-step-dot">
          <i class="${t.icon}"></i>
        </span>
        <div class="tracking-step-body">
          <b>${t.label}</b>
          <small>${t.date}</small>
        </div>
      </li>
    `;
  }).join('');

  result.classList.remove('hidden');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ---------- Error ---------- */
const setError = msg => {
  const field = input.closest('.field');
  field.classList.toggle('has-error', !!msg);
  const err = $('.error', field);
  if (err) err.textContent = msg || '';
};

/* ---------- Form submit ---------- */
form?.addEventListener('submit', e => {
  e.preventDefault();
  const code = input.value.trim().toUpperCase();

  if (!code) {
    setError('کد سفارش یا رهگیری را وارد کنید.');
    return;
  }

  // جست‌وجو در کد سفارش
  let order = ORDERS[code];

  // اگر کد رهگیری بود، در همه سفارش‌ها بگرد
  if (!order) {
    order = Object.values(ORDERS).find(o => o.refCode === code);
  }

  if (!order) {
    setError('سفارشی با این کد پیدا نشد. لطفاً کد را بررسی کنید.');
    result.classList.add('hidden');
    return;
  }

  setError('');
  renderOrder(order);
});

/* ---------- Demo chips ---------- */
$$('[data-demo]').forEach(btn => {
  btn.addEventListener('click', () => {
    input.value = btn.dataset.demo;
    setError('');
    form?.dispatchEvent(new Event('submit', { cancelable: true }));
  });
});

/* ---------- Copy ref ---------- */
$('#trackingCopyRef')?.addEventListener('click', async () => {
  const code = $('#trackingRefCode').textContent.trim();
  if (!code || code === '—') return showToast('کد رهگیری موجود نیست.', 'error');
  try {
    await navigator.clipboard.writeText(code);
    showToast('کد رهگیری کپی شد.');
  } catch (_) {
    showToast('کپی ناموفق بود.', 'error');
  }
});

/* ---------- Print ---------- */
$('#trackingPrint')?.addEventListener('click', () => {
  window.print();
});

/* ---------- Refresh ---------- */
$('#trackingRefresh')?.addEventListener('click', function () {
  const original = this.innerHTML;
  this.disabled = true;
  this.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال بروزرسانی...';
  setTimeout(() => {
    this.disabled = false;
    this.innerHTML = original;
    showToast('وضعیت سفارش بروزرسانی شد.');
  }, 900);
});

/* ---------- Cancel ---------- */
$('#trackingCancel')?.addEventListener('click', () => {
  if (confirm('آیا از لغو این سفارش مطمئن هستید؟')) {
    showToast('درخواست لغو شما ثبت شد. با شما تماس می‌گیریم.');
  }
});

/* ---------- Prefill from URL ---------- */
const params = new URLSearchParams(location.search);
const preCode = params.get('code');
if (preCode && ORDERS[preCode.toUpperCase()]) {
  input.value = preCode.toUpperCase();
  form?.dispatchEvent(new Event('submit', { cancelable: true }));
}

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

/* ---------- Clear error ---------- */
input?.addEventListener('input', () => setError(''));