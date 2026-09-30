/* =========================================================
   Admin Panel - Shared Logic
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- سایدبار موبایل ---------- */
const sidebar = $('#adminSidebar');
const overlay = $('#adminOverlay');

const openSidebar = () => {
  sidebar?.classList.add('is-open');
  overlay?.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
};

const closeSidebar = () => {
  sidebar?.classList.remove('is-open');
  overlay?.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
};

$$('[data-admin-open]').forEach(b => b.addEventListener('click', openSidebar));
$$('[data-admin-close]').forEach(b => b.addEventListener('click', closeSidebar));

/* ---------- داده‌های نمونه ---------- */
const RECENT_ORDERS = [
  { code: 'NG-934821', customer: 'سارا محمدی', total: 630000, status: 'shipped', statusLabel: 'ارسال‌شده', date: '۱۴۰۵/۰۵/۱۲' },
  { code: 'NG-934790', customer: 'امیر رضایی', total: 289000, status: 'pending', statusLabel: 'در انتظار', date: '۱۴۰۵/۰۵/۱۲' },
  { code: 'NG-934755', customer: 'نگار کریمی', total: 1240000, status: 'delivered', statusLabel: 'تحویل‌شده', date: '۱۴۰۵/۰۵/۱۱' },
  { code: 'NG-934712', customer: 'حسین نوری', total: 540000, status: 'pending', statusLabel: 'در انتظار', date: '۱۴۰۵/۰۵/۱۱' },
  { code: 'NG-934688', customer: 'مریم اکبری', total: 198000, status: 'cancelled', statusLabel: 'لغو‌شده', date: '۱۴۰۵/۰۵/۱۰' },
  { code: 'NG-934651', customer: 'رضا صادقی', total: 780000, status: 'shipped', statusLabel: 'ارسال‌شده', date: '۱۴۰۵/۰۵/۱۰' },
];

const TOP_PRODUCTS = [
  { title: 'ملت عشق', author: 'الیف شافاک', sold: 1248, price: 395000, cover: 'from-[#c58a80] to-[#4a221f]' },
  { title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', sold: 892, price: 345000, cover: 'from-[#c8a879] to-[#483b29]' },
  { title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', sold: 674, price: 289000, cover: 'from-[#aebca7] to-[#334c45]' },
  { title: 'کار عمیق', author: 'کال نیوپورت', sold: 512, price: 310000, cover: 'from-[#7ea39a] to-[#254a41]' },
  { title: 'چرا می‌خوانیم؟', author: 'دانیل پنک', sold: 438, price: 240000, cover: 'from-[#8d98c5] to-[#2f3656]' },
];

/* ---------- جدول محصولات (فقط در products.html) ---------- */
const PRODUCTS_TABLE = [
  { id: 1, title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', cat: 'رمان', price: 289000, oldPrice: null, stock: 42, status: 'active', cover: 'from-[#aebca7] to-[#334c45]' },
  { id: 2, title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', cat: 'تفکر', price: 345000, oldPrice: null, stock: 8, status: 'low', cover: 'from-[#c8a879] to-[#483b29]' },
  { id: 3, title: 'چرا می‌خوانیم؟', author: 'دانیل پنک', cat: 'توسعه فردی', price: 240000, oldPrice: 300000, stock: 24, status: 'active', cover: 'from-[#8d98c5] to-[#2f3656]' },
  { id: 4, title: 'سمفونی خاموش', author: 'رضا قاسمی', cat: 'ادبیات', price: 198000, oldPrice: null, stock: 0, status: 'out', cover: 'from-[#c9827b] to-[#4a2828]' },
  { id: 5, title: 'ملت عشق', author: 'الیف شافاک', cat: 'رمان', price: 395000, oldPrice: null, stock: 118, status: 'active', cover: 'from-[#c58a80] to-[#4a221f]' },
  { id: 6, title: 'کار عمیق', author: 'کال نیوپورت', cat: 'کسب‌وکار', price: 310000, oldPrice: 380000, stock: 5, status: 'low', cover: 'from-[#7ea39a] to-[#254a41]' },
];

const productsTableBody = $('#productsTableBody');
if (productsTableBody) {
  productsTableBody.innerHTML = PRODUCTS_TABLE.map(p => {
    const statusMap = {
      active: ['admin-status--delivered', 'موجود'],
      low: ['admin-status--pending', `کم (${faNum(p.stock)})`],
      out: ['admin-status--cancelled', 'ناموجود'],
    };
    const [cls, label] = statusMap[p.status];

    return `
      <tr>
        <td><input type="checkbox" class="admin-checkbox"></td>
        <td>
          <div class="flex items-center gap-2.5">
            <div class="grid h-[52px] w-[40px] shrink-0 place-items-center rounded-[10px] bg-gradient-to-br ${p.cover} text-[7px] font-black text-white text-center leading-tight p-1">
              ${p.title.slice(0, 8)}
            </div>
            <div class="min-w-0">
              <b class="block truncate text-[11px]">${p.title}</b>
              <small class="mt-0.5 block text-[9px] text-muted">${p.author}</small>
            </div>
          </div>
        </td>
        <td><span class="text-[10px] font-bold">${p.cat}</span></td>
        <td>
          <div class="flex flex-col">
            <b class="text-[11px]">${tomanShort(p.price)}</b>
            ${p.oldPrice ? `<del class="mt-0.5 text-[9px] text-muted">${tomanShort(p.oldPrice)}</del>` : ''}
          </div>
        </td>
        <td><b class="text-[11px]">${faNum(p.stock)}</b></td>
        <td><span class="admin-status ${cls}">${label}</span></td>
        <td>
          <div class="flex items-center gap-1">
            <button class="admin-icon-btn !h-[30px] !w-[30px]"><i class="ri-edit-line text-[13px]"></i></button>
            <button class="admin-icon-btn !h-[30px] !w-[30px]"><i class="ri-delete-bin-6-line text-[13px]"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

/* ---------- رندر سفارش‌های اخیر ---------- */
const statusClass = s => `admin-status--${s}`;

const recentOrdersBody = $('#recentOrdersBody');
if (recentOrdersBody) {
  recentOrdersBody.innerHTML = RECENT_ORDERS.map(o => `
    <tr>
      <td>
        <span class="font-mono font-black text-[11px]" dir="ltr">${o.code}</span>
      </td>
      <td>
        <div class="flex items-center gap-2">
          <div class="admin-avatar-sm bg-gradient-to-br from-[#87927a] to-[#3b4a3f]">${o.customer.split(' ').map(p => p[0]).join('.').slice(0, 3)}</div>
          <span class="text-[11px] font-bold">${o.customer}</span>
        </div>
      </td>
      <td><b class="text-[11px]">${tomanShort(o.total)} تومان</b></td>
      <td><span class="admin-status ${statusClass(o.status)}">${o.statusLabel}</span></td>
      <td class="text-[10px] text-muted">${o.date}</td>
      <td>
        <button class="admin-icon-btn !h-[30px] !w-[30px]" aria-label="مشاهده">
          <i class="ri-arrow-left-s-line text-[14px]"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

/* ---------- رندر پرفروش‌ترین‌ها ---------- */
const topProductsEl = $('#topProducts');
if (topProductsEl) {
  const maxSold = Math.max(...TOP_PRODUCTS.map(p => p.sold));
  topProductsEl.innerHTML = TOP_PRODUCTS.map((p, i) => `
    <li class="admin-product-item">
      <span class="admin-product-rank ${i === 0 ? 'is-first' : i < 3 ? 'is-top' : ''}">${faNum(i + 1)}</span>
      <div class="grid h-[52px] w-[40px] shrink-0 place-items-center rounded-[10px] bg-gradient-to-br ${p.cover} text-[7px] font-black text-white text-center leading-tight p-1">
        ${p.title.slice(0, 10)}
      </div>
      <div class="min-w-0 flex-1">
        <b class="block truncate text-[11px]">${p.title}</b>
        <small class="mt-0.5 block text-[9px] text-muted">${p.author}</small>
        <div class="mt-2 h-[4px] w-full overflow-hidden rounded-full bg-bg">
          <div class="h-full rounded-full bg-accent" style="width:${(p.sold / maxSold) * 100}%"></div>
        </div>
      </div>
      <div class="shrink-0 text-left">
        <b class="block text-[11px]">${faNum(p.sold)}</b>
        <small class="text-[9px] text-muted">فروش</small>
      </div>
    </li>
  `).join('');
}

/* ---------- گزارش‌گیری (نمایشی) ---------- */
$$('.admin-btn').forEach(btn => {
  if (btn.textContent.includes('گزارش')) {
    btn.addEventListener('click', () => {
      showToast('گزارش در حال آماده‌سازی است...');
    });
  }
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

window.showToast = showToast;