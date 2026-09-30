/* =========================================================
   Admin — Orders Page
   ========================================================= */

// const $ = (s, root = document) => root.querySelector(s);
// const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
// const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده‌های نمونه ---------- */
const ORDERS = [
  { code: 'NG-934821', customer: 'سارا محمدی', phone: '09123456789', email: 'sara@example.com',
    total: 630000, payment: 'online', paymentLabel: 'آنلاین', status: 'shipped', statusLabel: 'ارسال‌شده',
    date: '۱۴۰۵/۰۵/۱۲', time: '۱۴:۳۲', tracking: 'IR-9384710294',
    address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
    items: [
      { title: 'روایت یک زندگی', qty: 1, price: 275000, cover: 'bg-[#657c71]' },
      { title: 'فلسفه برای زندگی', qty: 1, price: 320000, cover: 'bg-[#98785a]' },
    ],
  },
  { code: 'NG-934790', customer: 'امیر رضایی', phone: '09121112233', email: 'amir@example.com',
    total: 289000, payment: 'online', paymentLabel: 'آنلاین', status: 'pending', statusLabel: 'در انتظار بررسی',
    date: '۱۴۰۵/۰۵/۱۲', time: '۱۱:۱۵', tracking: null,
    address: 'تهران، میدان آرژانتین، برج نگین، طبقه ۵',
    items: [{ title: 'درختی که روی ماه رشد کرد', qty: 1, price: 289000, cover: 'bg-[#334c45]' }],
  },
  { code: 'NG-934755', customer: 'نگار کریمی', phone: '09133334455', email: 'negar@example.com',
    total: 1240000, payment: 'wallet', paymentLabel: 'کیف پول', status: 'delivered', statusLabel: 'تحویل‌شده',
    date: '۱۴۰۵/۰۵/۱۱', time: '۱۸:۴۰', tracking: 'IR-9384710288',
    address: 'اصفهان، خیابان چهارباغ، کوچه گلستان، پلاک ۴۵',
    items: [
      { title: 'ملت عشق', qty: 2, price: 395000, cover: 'bg-[#4a221f]' },
      { title: 'هنر شفاف اندیشیدن', qty: 1, price: 345000, cover: 'bg-[#483b29]' },
    ],
  },
  { code: 'NG-934712', customer: 'حسین نوری', phone: '09144445566', email: 'hossein@example.com',
    total: 540000, payment: 'online', paymentLabel: 'آنلاین', status: 'pending', statusLabel: 'در انتظار بررسی',
    date: '۱۴۰۵/۰۵/۱۱', time: '۰۹:۵۲', tracking: null,
    address: 'مشهد، بلوار وکیل‌آباد، پلاک ۱۸۹',
    items: [
      { title: 'هنر شفاف اندیشیدن', qty: 1, price: 345000, cover: 'bg-[#483b29]' },
      { title: 'ملت عشق', qty: 1, price: 195000, cover: 'bg-[#4a221f]' },
    ],
  },
  { code: 'NG-934688', customer: 'مریم اکبری', phone: '09155556677', email: 'maryam@example.com',
    total: 198000, payment: 'cod', paymentLabel: 'در محل', status: 'cancelled', statusLabel: 'لغو‌شده',
    date: '۱۴۰۵/۰۵/۱۰', time: '۲۰:۰۵', tracking: null,
    address: 'شیراز، بلوار زند، کوچه ۱۲',
    items: [{ title: 'سمفونی خاموش', qty: 1, price: 198000, cover: 'bg-[#4a2828]' }],
  },
  { code: 'NG-934651', customer: 'رضا صادقی', phone: '09166667788', email: 'reza@example.com',
    total: 780000, payment: 'online', paymentLabel: 'آنلاین', status: 'shipped', statusLabel: 'ارسال‌شده',
    date: '۱۴۰۵/۰۵/۱۰', time: '۱۳:۲۰', tracking: 'IR-9384710281',
    address: 'تبریز، خیابان امام، پلاک ۲۲۰',
    items: [
      { title: 'کار عمیق', qty: 1, price: 310000, cover: 'bg-[#254a41]' },
      { title: 'چرا می‌خوانیم؟', qty: 2, price: 235000, cover: 'bg-[#2f3656]' },
    ],
  },
  { code: 'NG-934620', customer: 'زهرا موسوی', phone: '09177778899', email: 'zahra@example.com',
    total: 425000, payment: 'wallet', paymentLabel: 'کیف پول', status: 'delivered', statusLabel: 'تحویل‌شده',
    date: '۱۴۰۵/۰۵/۰۹', time: '۱۶:۳۰', tracking: 'IR-9384710275',
    address: 'کرج، عظیمیه، میدان مهران',
    items: [{ title: 'دنیای سوفی', qty: 1, price: 425000, cover: 'bg-[#4a3520]' }],
  },
  { code: 'NG-934587', customer: 'علی حسینی', phone: '09188889900', email: 'ali@example.com',
    total: 890000, payment: 'online', paymentLabel: 'آنلاین', status: 'delivered', statusLabel: 'تحویل‌شده',
    date: '۱۴۰۵/۰۵/۰۹', time: '۱۱:۴۰', tracking: 'IR-9384710269',
    address: 'تهران، سعادت‌آباد، میدان کاج، پلاک ۸',
    items: [
      { title: 'ملت عشق', qty: 1, price: 395000, cover: 'bg-[#4a221f]' },
      { title: 'دنیای سوفی', qty: 1, price: 425000, cover: 'bg-[#4a3520]' },
    ],
  },
];

/* ---------- State ---------- */
const state = {
  filter: 'all',
  search: '',
  sort: 'newest',
  page: 1,
  perPage: 8,
  selected: new Set(),
};

/* ---------- Filter + Sort ---------- */
const getFiltered = () => {
  let list = ORDERS.filter(o => {
    if (state.filter !== 'all' && o.status !== state.filter) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${o.code} ${o.customer} ${o.phone} ${o.tracking || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (state.sort) {
    case 'oldest': list = [...list].reverse(); break;
    case 'highest': list.sort((a, b) => b.total - a.total); break;
    case 'lowest': list.sort((a, b) => a.total - b.total); break;
    default: break;
  }

  return list;
};

/* ---------- Refs ---------- */
const tbody = $('#ordersTableBody');
const emptyEl = $('#ordersTableEmpty');
const paginationEl = $('#ordersPagination');
const resultInfo = $('#ordersResultInfo');
const bulkEl = $('#bulkActions');
const selectedCount = $('#selectedCount');
const selectAll = $('#selectAllOrders');

/* ---------- Row HTML ---------- */
const paymentBadge = p => {
  const map = {
    online: 'bg-[#d7dbea] text-[#5d658a]',
    wallet: 'bg-[#e0f4e8] text-[#2e7d55]',
    cod: 'bg-[#fdeee0] text-[#a5622c]',
  };
  return `<span class="admin-status ${map[p] || 'bg-bg text-muted'}">${ORDERS.find(o => o.payment === p)?.paymentLabel || p}</span>`;
};

const rowHTML = o => {
  const statusMap = {
    pending: 'admin-status--pending',
    shipped: 'admin-status--shipped',
    delivered: 'admin-status--delivered',
    cancelled: 'admin-status--cancelled',
  };
  const initials = o.customer.split(' ').map(p => p[0]).join('.').slice(0, 3);

  return `
    <tr data-order-code="${o.code}">
      <td>
        <input type="checkbox" class="admin-checkbox order-check" value="${o.code}"
          ${state.selected.has(o.code) ? 'checked' : ''}>
      </td>
      <td>
        <span class="font-mono font-black text-[11px]" dir="ltr">${o.code}</span>
        ${o.tracking ? `<small class="mt-1 block text-[9px] text-muted font-mono" dir="ltr">${o.tracking}</small>` : ''}
      </td>
      <td>
        <div class="flex items-center gap-2">
          <div class="admin-avatar-sm bg-gradient-to-br from-[#87927a] to-[#3b4a3f]">${initials}</div>
          <div class="min-w-0">
            <b class="block truncate text-[11px]">${o.customer}</b>
            <small class="mt-0.5 block text-[9px] text-muted" dir="ltr">${faNum(o.phone)}</small>
          </div>
        </div>
      </td>
      <td><b class="text-[11px]">${tomanShort(o.total)} تومان</b></td>
      <td>${paymentBadge(o.payment)}</td>
      <td><span class="admin-status ${statusMap[o.status]}">${o.statusLabel}</span></td>
      <td class="text-[10px] text-muted whitespace-nowrap">
        ${o.date}<br><span class="text-[9px]">${o.time}</span>
      </td>
      <td>
        <div class="flex items-center gap-1">
          <button class="admin-icon-btn !h-[30px] !w-[30px]" data-order-view="${o.code}" aria-label="مشاهده">
            <i class="ri-eye-line text-[13px]"></i>
          </button>
          <div class="admin-dropdown">
            <button class="admin-icon-btn !h-[30px] !w-[30px]" data-order-menu="${o.code}" aria-label="گزینه‌ها">
              <i class="ri-more-2-line text-[13px]"></i>
            </button>
          </div>
        </div>
      </td>
    </tr>
  `;
};

/* ---------- Render ---------- */
const render = () => {
  const list = getFiltered();
  const total = list.length;
  const start = (state.page - 1) * state.perPage;
  const items = list.slice(start, start + state.perPage);

  if (!items.length) {
    tbody.innerHTML = '';
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    paginationEl.innerHTML = '';
    resultInfo.textContent = 'نتیجه‌ای یافت نشد';
  } else {
    emptyEl.classList.add('hidden');
    emptyEl.classList.remove('flex');
    tbody.innerHTML = items.map(rowHTML).join('');
    resultInfo.textContent = `نمایش ${faNum(start + 1)} تا ${faNum(Math.min(start + state.perPage, total))} از ${faNum(total)}`;

    // Pagination
    const pages = Math.ceil(total / state.perPage);
    let html = `<button class="admin-pagination" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''}><i class="ri-arrow-right-s-line"></i></button>`;
    for (let i = 1; i <= pages; i++) {
      html += `<button class="admin-pagination ${i === state.page ? 'is-active' : ''}" data-page="${i}">${faNum(i)}</button>`;
    }
    html += `<button class="admin-pagination" data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''}><i class="ri-arrow-left-s-line"></i></button>`;
    paginationEl.innerHTML = html;
  }

  updateBulk();
};

const updateBulk = () => {
  const n = state.selected.size;
  selectedCount.textContent = faNum(n);
  bulkEl.classList.toggle('hidden', n === 0);
  bulkEl.classList.toggle('flex', n > 0);

  const visible = getFiltered().slice((state.page - 1) * state.perPage, state.page * state.perPage);
  const allChecked = visible.length > 0 && visible.every(o => state.selected.has(o.code));
  if (selectAll) selectAll.checked = allChecked;
};

/* ---------- Events ---------- */
$('#orderSearch')?.addEventListener('input', e => {
  state.search = e.target.value.trim();
  state.page = 1;
  render();
});

$('#orderSortSelect')?.addEventListener('change', e => {
  state.sort = e.target.value;
  state.page = 1;
  render();
});

$$('[data-order-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.orderFilter;
    state.page = 1;
    $$('[data-order-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
    render();
  });
});

paginationEl?.addEventListener('click', e => {
  const btn = e.target.closest('[data-page]');
  if (!btn || btn.disabled) return;
  state.page = +btn.dataset.page;
  render();
});

tbody?.addEventListener('change', e => {
  const cb = e.target.closest('.order-check');
  if (!cb) return;
  cb.checked ? state.selected.add(cb.value) : state.selected.delete(cb.value);
  updateBulk();
});

selectAll?.addEventListener('change', e => {
  const visible = getFiltered().slice((state.page - 1) * state.perPage, state.page * state.perPage);
  visible.forEach(o => e.target.checked ? state.selected.add(o.code) : state.selected.delete(o.code));
  render();
});

/* ---------- Order Detail Modal ---------- */
const modal = $('#adminOrderModal');
const modalBody = $('#adminOrderBody');
const modalTitle = $('#adminOrderTitle');

const openDetail = code => {
  const o = ORDERS.find(x => x.code === code);
  if (!o) return;

  modalTitle.textContent = `سفارش ${o.code}`;

  const statusMap = {
    pending: 'admin-status--pending',
    shipped: 'admin-status--shipped',
    delivered: 'admin-status--delivered',
    cancelled: 'admin-status--cancelled',
  };

  const items = o.items.map(i => `
    <div class="flex items-center gap-3 rounded-2xl border border-border p-3">
      <div class="grid h-[64px] w-[48px] shrink-0 place-items-center rounded-[10px] ${i.cover} text-[8px] font-black text-white text-center leading-tight p-1">
        ${i.title.slice(0, 10)}
      </div>
      <div class="min-w-0 flex-1">
        <b class="block text-[12px]">${i.title}</b>
        <div class="mt-1 flex items-center gap-3 text-[10px] text-muted">
          <span>تعداد: ${faNum(i.qty)}</span>
          <span>× ${tomanShort(i.price)}</span>
        </div>
      </div>
      <b class="shrink-0 text-[12px]">${tomanShort(i.price * i.qty)} تومان</b>
    </div>
  `).join('');

  const subtotal = o.items.reduce((s, i) => s + i.price * i.qty, 0);

  modalBody.innerHTML = `
    <div class="space-y-4">

      <!-- Status bar -->
      <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-bg p-4">
        <div class="flex items-center gap-3">
          <span class="admin-status ${statusMap[o.status]}">${o.statusLabel}</span>
          <small class="text-[10px] text-muted">${o.date} — ${o.time}</small>
        </div>
        ${o.tracking ? `
          <div class="text-[10px] text-muted">
            کد رهگیری: <b class="text-ink font-mono" dir="ltr">${o.tracking}</b>
          </div>
        ` : ''}
      </div>

      <!-- Customer + Address -->
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl border border-border p-4">
          <b class="mb-2 block text-[11px] font-black"><i class="ri-user-3-line"></i> مشتری</b>
          <p class="text-[11px] font-bold">${o.customer}</p>
          <p class="mt-1 text-[10px] text-muted" dir="ltr">${faNum(o.phone)}</p>
          <p class="mt-1 text-[10px] text-muted" dir="ltr">${o.email}</p>
        </div>
        <div class="rounded-2xl border border-border p-4">
          <b class="mb-2 block text-[11px] font-black"><i class="ri-map-pin-line"></i> آدرس تحویل</b>
          <p class="text-[10px] leading-6 text-muted">${o.address}</p>
        </div>
      </div>

      <!-- Items -->
      <div class="space-y-2">
        <b class="block text-[12px] font-black">کالاهای سفارش (${faNum(o.items.length)})</b>
        ${items}
      </div>

      <!-- Totals -->
      <div class="space-y-2 rounded-2xl border border-border p-4 text-[11px]">
        <div class="flex justify-between"><span class="text-muted">جمع کالاها</span><b>${tomanShort(subtotal)} تومان</b></div>
        <div class="flex justify-between"><span class="text-muted">هزینه ارسال</span><b>${tomanShort(35000)} تومان</b></div>
        <div class="flex justify-between border-t border-dashed border-border pt-2 text-[13px]">
          <span class="font-black">مبلغ کل</span>
          <b class="font-black">${tomanShort(o.total)} تومان</b>
        </div>
      </div>

      <!-- Payment -->
      <div class="rounded-2xl border border-border p-4">
        <b class="mb-2 block text-[11px] font-black"><i class="ri-bank-card-line"></i> شیوه پرداخت</b>
        <p class="text-[11px] text-muted">${o.paymentLabel}</p>
      </div>

      <!-- Status actions -->
      <div class="rounded-2xl border border-border p-4">
        <b class="mb-3 block text-[11px] font-black">تغییر وضعیت سفارش</b>
        <div class="flex flex-wrap gap-2">
          <button class="order-status-btn ${o.status === 'pending' ? 'is-active' : ''}" data-set-status="pending">
            <i class="ri-time-line"></i> در انتظار
          </button>
          <button class="order-status-btn ${o.status === 'shipped' ? 'is-active' : ''}" data-set-status="shipped">
            <i class="ri-truck-line"></i> ارسال‌شده
          </button>
          <button class="order-status-btn ${o.status === 'delivered' ? 'is-active' : ''}" data-set-status="delivered">
            <i class="ri-checkbox-circle-line"></i> تحویل‌شده
          </button>
          <button class="order-status-btn order-status-btn--danger ${o.status === 'cancelled' ? 'is-active' : ''}" data-set-status="cancelled">
            <i class="ri-close-circle-line"></i> لغو
          </button>
        </div>
      </div>

      <!-- Footer actions -->
      <div class="flex flex-wrap gap-2 border-t border-dashed border-border pt-4">
        <button class="admin-btn admin-btn--primary">
          <i class="ri-printer-line"></i> چاپ فاکتور
        </button>
        <button class="admin-btn">
          <i class="ri-file-download-line"></i> دانلود PDF
        </button>
        <button class="admin-btn">
          <i class="ri-mail-send-line"></i> ارسال ایمیل
        </button>
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeDetail = () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

$$('[data-order-modal-close]').forEach(b => b.addEventListener('click', closeDetail));
modal?.addEventListener('click', e => { if (e.target === modal) closeDetail(); });

/* ---------- Table actions ---------- */
tbody?.addEventListener('click', e => {
  const view = e.target.closest('[data-order-view]');
  if (view) return openDetail(view.dataset.orderView);

  const menu = e.target.closest('[data-order-menu]');
  if (menu) {
    const code = menu.dataset.orderMenu;
    showOrderMenu(menu, code);
  }
});

/* ---------- Dropdown Menu ---------- */
let activeMenu = null;

const showOrderMenu = (anchor, code) => {
  closeMenu();
  const rect = anchor.getBoundingClientRect();
  const menu = document.createElement('div');
  menu.className = 'admin-popover';
  menu.style.top = (rect.bottom + 6) + 'px';
  menu.style.left = (rect.left - 140) + 'px';
  menu.innerHTML = `
    <button data-menu-action="view"><i class="ri-eye-line"></i> مشاهده جزئیات</button>
    <button data-menu-action="print"><i class="ri-printer-line"></i> چاپ فاکتور</button>
    <button data-menu-action="mail"><i class="ri-mail-send-line"></i> ارسال ایمیل</button>
    <hr>
    <button data-menu-action="cancel" class="is-danger"><i class="ri-close-circle-line"></i> لغو سفارش</button>
  `;
  document.body.appendChild(menu);
  activeMenu = menu;

  menu.addEventListener('click', e => {
    const b = e.target.closest('[data-menu-action]');
    if (!b) return;
    const action = b.dataset.menuAction;
    closeMenu();
    if (action === 'view') openDetail(code);
    else if (action === 'print') showToast('فاکتور در حال آماده‌سازی...');
    else if (action === 'mail') showToast('ایمیل ارسال شد.');
    else if (action === 'cancel') {
      if (confirm(`سفارش ${code} لغو شود؟`)) {
        const o = ORDERS.find(x => x.code === code);
        if (o) { o.status = 'cancelled'; o.statusLabel = 'لغو‌شده'; }
        render();
        showToast('سفارش لغو شد.');
      }
    }
  });
};

const closeMenu = () => {
  if (activeMenu) { activeMenu.remove(); activeMenu = null; }
};

document.addEventListener('click', e => {
  if (!e.target.closest('[data-order-menu]')) closeMenu();
});
window.addEventListener('resize', closeMenu);
window.addEventListener('scroll', closeMenu, { passive: true });

/* ---------- Status buttons in modal ---------- */
modalBody?.addEventListener('click', e => {
  const btn = e.target.closest('[data-set-status]');
  if (!btn) return;
  const status = btn.dataset.setStatus;
  const code = modalTitle.textContent.replace('سفارش ', '').trim();
  const o = ORDERS.find(x => x.code === code);
  if (!o) return;

  const labels = { pending: 'در انتظار بررسی', shipped: 'ارسال‌شده', delivered: 'تحویل‌شده', cancelled: 'لغو‌شده' };
  o.status = status;
  o.statusLabel = labels[status];

  $$('[data-set-status]', modalBody).forEach(b => b.classList.toggle('is-active', b === btn));
  render();
  showToast(`وضعیت سفارش به «${labels[status]}» تغییر کرد.`);
});

/* ---------- Export ---------- */
$('[data-export-orders]')?.addEventListener('click', () => {
  showToast('فایل CSV در حال آماده‌سازی است...');
});

$('[data-refresh-orders]')?.addEventListener('click', () => {
  state.selected.clear();
  state.page = 1;
  render();
  showToast('جدول بروزرسانی شد.');
});

/* ---------- Init ---------- */
render();