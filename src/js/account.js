/* =========================================================
   Account Page - Full Logic
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const toman = n => faNum(Math.round(n).toLocaleString('en-US')) + ' تومان';
const tomanNum = n => faNum(Math.round(n).toLocaleString('en-US'));

/* =========================================================
   DATA
   ========================================================= */

const ORDERS = [
  {
    code: 'NG-934821',
    date: '۱۴۰۵/۰۵/۱۲',
    status: 'shipped',
    statusLabel: 'ارسال‌شده',
    total: 630000,
    shipping: 35000,
    discount: 0,
    payment: 'پرداخت آنلاین',
    tracking: 'IR-9384710294',
    address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
    items: [
      { title: 'روایت یک زندگی', author: 'نویسنده ناشناس', qty: 1, price: 275000, cover: 'bg-[#657c71]' },
      { title: 'فلسفه برای زندگی', author: 'ژولین باگینی', qty: 1, price: 320000, cover: 'bg-[#98785a]' },
    ],
  },
  {
    code: 'NG-931244',
    date: '۱۴۰۵/۰۴/۲۸',
    status: 'delivered',
    statusLabel: 'تحویل‌شده',
    total: 289000,
    shipping: 0,
    discount: 0,
    payment: 'پرداخت آنلاین',
    tracking: 'IR-9371204856',
    address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
    items: [
      { title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', qty: 1, price: 289000, cover: 'bg-[#334c45]' },
    ],
  },
  {
    code: 'NG-929881',
    date: '۱۴۰۵/۰۴/۱۵',
    status: 'pending',
    statusLabel: 'در انتظار پرداخت',
    total: 540000,
    shipping: 35000,
    discount: 0,
    payment: 'درگاه بانکی',
    tracking: null,
    address: 'تهران، میدان آرژانتین، برج نگین، طبقه ۵',
    items: [
      { title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', qty: 1, price: 345000, cover: 'bg-[#483b29]' },
      { title: 'ملت عشق', author: 'الیف شافاک', qty: 1, price: 195000, cover: 'bg-[#4a221f]' },
    ],
  },
  {
    code: 'NG-926110',
    date: '۱۴۰۵/۰۳/۲۹',
    status: 'cancelled',
    statusLabel: 'لغو‌شده',
    total: 198000,
    shipping: 0,
    discount: 0,
    payment: 'بازگشت وجه',
    tracking: null,
    address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
    items: [
      { title: 'سمفونی خاموش', author: 'رضا قاسمی', qty: 1, price: 198000, cover: 'bg-[#4a2828]' },
    ],
  },
];

const ADDRESSES = [
  {
    id: 1,
    title: 'خانه',
    province: 'تهران',
    city: 'تهران',
    address: 'خیابان ولیعصر، کوچه بهار، پلاک ۱۲، واحد ۳',
    postal: '۱۹۸۴۵۶۷۸۹۰',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    isDefault: true,
  },
  {
    id: 2,
    title: 'محل کار',
    province: 'تهران',
    city: 'تهران',
    address: 'میدان آرژانتین، برج نگین، طبقه ۵',
    postal: '۱۹۸۴۵۶۷۸۹۱',
    phone: '۰۹۱۲۳۴۵۶۷۸۹',
    isDefault: false,
  },
];

const WISHLIST = [
  { id: 2, title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', price: 345000,
    cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن', badge: 'پرفروش' },
  { id: 4, title: 'سمفونی خاموش', author: 'رضا قاسمی', price: 198000,
    cover: 'from-[#c9827b] to-[#4a2828]', titleLines: 'سمفونی<br>خاموش', badge: null },
  { id: 8, title: 'کار عمیق', author: 'کال نیوپورت', price: 310000, oldPrice: 380000,
    cover: 'from-[#7ea39a] to-[#254a41]', titleLines: 'کار<br>عمیق', badge: '۱۵٪' },
  { id: 11, title: 'ملت عشق', author: 'الیف شافاک', price: 395000,
    cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق', badge: 'پرفروش' },
  { id: 3, title: 'چرا می‌خوانیم؟', author: 'دانیل پنک', price: 240000,
    cover: 'from-[#8d98c5] to-[#2f3656]', titleLines: 'چرا<br>می‌خوانیم؟', badge: null },
  { id: 9, title: 'دنیای سوفی', author: 'یوستین گردر', price: 420000,
    cover: 'from-[#b8946b] to-[#4a3520]', titleLines: 'دنیای<br>سوفی', badge: null },
];

const TRANSACTIONS = [
  {
    id: 'TX-20250812-1432',
    type: 'charge',
    title: 'شارژ کیف پول',
    date: '۱۴۰۵/۰۵/۱۲ — ۱۴:۳۲',
    amount: 100000,
    before: 125000,
    after: 225000,
  },
  {
    id: 'TX-20250808-0912',
    type: 'purchase',
    title: 'خرید سفارش NG-934821',
    date: '۱۴۰۵/۰۵/۰۸ — ۰۹:۱۲',
    amount: -289000,
    before: 414000,
    after: 125000,
  },
  {
    id: 'TX-20250802-1745',
    type: 'refund',
    title: 'بازگشت وجه سفارش لغو‌شده',
    date: '۱۴۰۵/۰۵/۰۲ — ۱۷:۴۵',
    amount: 198000,
    before: 216000,
    after: 414000,
  },
];

/* =========================================================
   STATE
   ========================================================= */

const state = {
  orderFilter: 'all',
  walletBalance: 125000,
  profile: {
    firstName: 'سارا',
    lastName: 'محمدی',
    phone: '09123456789',
    email: 'sara@example.com',
    bio: '',
  },
};

/* =========================================================
   TABS
   ========================================================= */

const navItems = $$('.acc-nav-item[data-acc-tab]');
const panels = $$('.acc-panel');
const sidebar = $('#accountSidebar');

const openSidebar = () => {
  sidebar?.classList.add('is-open');
  document.body.classList.add('overflow-hidden');
};
const closeSidebar = () => {
  sidebar?.classList.remove('is-open');
  document.body.classList.remove('overflow-hidden');
};

const switchTab = (key, scroll = true) => {
  navItems.forEach(n => n.classList.toggle('is-active', n.dataset.accTab === key));
  panels.forEach(p => p.classList.toggle('is-active', p.dataset.accPanel === key));
  history.replaceState(null, '', '#' + key);
  closeSidebar();
  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
};

navItems.forEach(n => n.addEventListener('click', () => switchTab(n.dataset.accTab)));

$('[data-account-menu]')?.addEventListener('click', openSidebar);
$('[data-account-close]')?.addEventListener('click', closeSidebar);

// تب اولیه بر اساس هش
const validTabs = ['dashboard', 'orders', 'addresses', 'wishlist', 'wallet', 'settings'];
const initialTab = (location.hash || '#dashboard').replace('#', '');
switchTab(validTabs.includes(initialTab) ? initialTab : 'dashboard', false);

// کلیک روی لینک «سفارش‌های من» در هدر پروفایل
$$('a[href="#orders"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    switchTab('orders');
  });
});

/* =========================================================
   LOGOUT
   ========================================================= */

const logout = () => {
  if (confirm('از حساب کاربری خارج می‌شوید؟')) {
    toast('با موفقیت خارج شدید.');
    setTimeout(() => (window.location.href = '../index.html'), 700);
  }
};
$('#logoutBtn')?.addEventListener('click', logout);
$('#logoutBtn2')?.addEventListener('click', logout);

/* =========================================================
   ORDERS
   ========================================================= */

const ordersList = $('#ordersList');
const ordersEmpty = $('#ordersEmpty');

const orderCardHTML = o => `
  <article class="order-card" data-order-code="${o.code}">
    <header class="flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-border pb-3">
      <div class="flex items-center gap-3">
        <span class="order-code">${o.code}</span>
        <span class="text-[10px] text-muted">${o.date}</span>
      </div>
      <span class="order-status order-status--${o.status}">${o.statusLabel}</span>
    </header>

    <div class="mt-3 flex flex-wrap items-center gap-3">
      <div class="flex items-center gap-2">
        ${o.items.slice(0, 3).map(i => `
          <div class="order-mini ${i.cover}">${i.title.slice(0, 8)}</div>
        `).join('')}
      </div>
      <div class="min-w-0 flex-1">
        <b class="block text-[11px]">${o.items.map(i => i.title).join('، ')}</b>
        <small class="mt-1 block text-[10px] text-muted">${faNum(o.items.length)} قلم کالا</small>
      </div>
      <div class="text-left">
        <small class="block text-[9px] text-muted">مبلغ</small>
        <b class="text-[12px]">${toman(o.total)}</b>
      </div>
    </div>

    <footer class="mt-3 flex flex-wrap gap-2 border-t border-dashed border-border pt-3">
      <button type="button" class="order-action" data-order-detail="${o.code}">
        مشاهده جزئیات <i class="ri-arrow-left-line"></i>
      </button>
      ${o.status === 'shipped' ? `<button type="button" class="order-action order-action--ghost" data-order-track="${o.code}">پیگیری مرسوله <i class="ri-truck-line"></i></button>` : ''}
      ${o.status === 'delivered' ? `<button type="button" class="order-action order-action--ghost" data-order-rebuy="${o.code}">خرید مجدد <i class="ri-refresh-line"></i></button>` : ''}
      ${o.status === 'pending' ? `<button type="button" class="order-action order-action--accent" data-order-pay="${o.code}">پرداخت <i class="ri-secure-payment-line"></i></button>` : ''}
      ${o.status === 'cancelled' ? `<button type="button" class="order-action order-action--ghost" data-order-remove="${o.code}">حذف از تاریخچه</button>` : ''}
      <button type="button" class="order-action order-action--ghost" data-order-invoice="${o.code}">
        فاکتور <i class="ri-file-download-line"></i>
      </button>
    </footer>
  </article>
`;

const renderOrders = () => {
  const list = state.orderFilter === 'all'
    ? ORDERS
    : ORDERS.filter(o => o.status === state.orderFilter);

  if (!list.length) {
    ordersList.innerHTML = '';
    ordersEmpty.classList.remove('hidden');
    ordersEmpty.classList.add('flex');
    return;
  }
  ordersEmpty.classList.add('hidden');
  ordersEmpty.classList.remove('flex');
  ordersList.innerHTML = list.map(orderCardHTML).join('');
};

$$('[data-order-status]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.orderFilter = btn.dataset.orderStatus;
    $$('[data-order-status]').forEach(b => b.classList.toggle('is-active', b === btn));
    renderOrders();
  });
});

/* =========================================================
   ORDER DETAIL MODAL
   ========================================================= */

const orderDetailModal = $('#orderDetailModal');
const orderDetailBody = $('#orderDetailBody');
const orderDetailTitle = $('#orderDetailTitle');

const openOrderDetail = code => {
  const o = ORDERS.find(x => x.code === code);
  if (!o) return;

  orderDetailTitle.textContent = `سفارش ${o.code}`;

  const itemsHTML = o.items.map(i => `
    <div class="flex items-center gap-3 rounded-2xl border border-border p-3">
      <div class="grid h-[72px] w-[54px] shrink-0 place-items-center rounded-[12px] ${i.cover} text-[9px] font-black text-white text-center leading-tight p-1">
        ${i.title.slice(0, 12)}
      </div>
      <div class="min-w-0 flex-1">
        <b class="block text-[12px]">${i.title}</b>
        <small class="mt-1 block text-[10px] text-muted">${i.author}</small>
        <div class="mt-1.5 flex items-center gap-3 text-[10px] text-muted">
          <span>تعداد: ${faNum(i.qty)}</span>
          <span>× ${tomanNum(i.price)} تومان</span>
        </div>
      </div>
      <b class="shrink-0 text-[12px]">${tomanNum(i.price * i.qty)} تومان</b>
    </div>
  `).join('');

  const timeline = [
    { label: 'ثبت سفارش', done: true, date: o.date },
    { label: 'تأیید پرداخت', done: o.status !== 'pending' && o.status !== 'cancelled', date: null },
    { label: 'آماده‌سازی', done: ['shipped', 'delivered'].includes(o.status), date: null },
    { label: 'ارسال', done: ['shipped', 'delivered'].includes(o.status), date: null },
    { label: 'تحویل', done: o.status === 'delivered', date: null },
  ];

  orderDetailBody.innerHTML = `
    <div class="space-y-4">

      <!-- Status -->
      <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-bg p-4">
        <div class="flex items-center gap-3">
          <span class="order-status order-status--${o.status}">${o.statusLabel}</span>
          <small class="text-[10px] text-muted">تاریخ ثبت: ${o.date}</small>
        </div>
        ${o.tracking ? `
          <div class="text-[10px] text-muted">
            کد رهگیری: <b class="text-ink font-mono" dir="ltr">${o.tracking}</b>
          </div>
        ` : ''}
      </div>

      <!-- Timeline -->
      <div class="rounded-2xl border border-border p-4">
        <b class="mb-3 block text-[12px] font-black">وضعیت سفارش</b>
        <ol class="relative space-y-3 pr-5">
          <span class="absolute top-2 bottom-2 right-[6px] w-px bg-border"></span>
          ${timeline.map(t => `
            <li class="relative flex items-center gap-3">
              <span class="absolute -right-[19px] top-1.5 h-[12px] w-[12px] rounded-full border-2 border-white ${t.done ? 'bg-accent' : 'bg-border'}"></span>
              <b class="text-[11px] ${t.done ? 'text-ink' : 'text-muted'}">${t.label}</b>
            </li>
          `).join('')}
        </ol>
      </div>

      <!-- Items -->
      <div class="space-y-2">
        <b class="block text-[12px] font-black">کالاهای سفارش</b>
        ${itemsHTML}
      </div>

      <!-- Totals -->
      <div class="space-y-2 rounded-2xl border border-border p-4 text-[11px]">
        <div class="flex justify-between">
          <span class="text-muted">جمع کالاها</span>
          <b>${tomanNum(o.items.reduce((s, i) => s + i.price * i.qty, 0))} تومان</b>
        </div>
        <div class="flex justify-between">
          <span class="text-muted">هزینه ارسال</span>
          <b>${o.shipping === 0 ? 'رایگان' : tomanNum(o.shipping) + ' تومان'}</b>
        </div>
        ${o.discount > 0 ? `
          <div class="flex justify-between text-accent-dark">
            <span>تخفیف</span>
            <b>− ${tomanNum(o.discount)} تومان</b>
          </div>
        ` : ''}
        <div class="flex justify-between border-t border-dashed border-border pt-2 text-[13px]">
          <span class="font-black">مبلغ کل</span>
          <b class="font-black">${toman(o.total)}</b>
        </div>
      </div>

      <!-- Address & Payment -->
      <div class="grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl border border-border p-4">
          <b class="mb-2 block text-[11px] font-black">
            <i class="ri-map-pin-line"></i> آدرس تحویل
          </b>
          <p class="text-[10px] leading-6 text-muted">${o.address}</p>
        </div>
        <div class="rounded-2xl border border-border p-4">
          <b class="mb-2 block text-[11px] font-black">
            <i class="ri-bank-card-line"></i> شیوه پرداخت
          </b>
          <p class="text-[10px] leading-6 text-muted">${o.payment}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap gap-2 pt-2">
        ${o.status === 'delivered' ? `
          <button type="button" class="order-action order-action--accent" data-order-rebuy="${o.code}">
            <i class="ri-refresh-line"></i> خرید مجدد
          </button>
        ` : ''}
        ${o.status === 'shipped' && o.tracking ? `
          <button type="button" class="order-action order-action--accent" data-order-track="${o.code}">
            <i class="ri-truck-line"></i> پیگیری مرسوله
          </button>
        ` : ''}
        ${o.status === 'pending' ? `
          <button type="button" class="order-action order-action--accent" data-order-pay="${o.code}">
            <i class="ri-secure-payment-line"></i> ادامه پرداخت
          </button>
        ` : ''}
        <button type="button" class="order-action order-action--ghost" data-order-invoice="${o.code}">
          <i class="ri-file-download-line"></i> دانلود فاکتور
        </button>
      </div>

    </div>
  `;

  orderDetailModal.classList.remove('hidden');
  orderDetailModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeOrderDetail = () => {
  orderDetailModal.classList.add('hidden');
  orderDetailModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

$$('[data-order-detail-close]').forEach(b => b.addEventListener('click', closeOrderDetail));
orderDetailModal?.addEventListener('click', e => {
  if (e.target === orderDetailModal) closeOrderDetail();
});

/* =========================================================
   ORDER ACTIONS (Event Delegation)
   ========================================================= */

document.addEventListener('click', e => {
  const detailBtn = e.target.closest('[data-order-detail]');
  if (detailBtn) return openOrderDetail(detailBtn.dataset.orderDetail);

  const trackBtn = e.target.closest('[data-order-track]');
  if (trackBtn) {
    const o = ORDERS.find(x => x.code === trackBtn.dataset.orderTrack);
    if (o?.tracking) {
      toast(`کد رهگیری: ${o.tracking}`);
    } else {
      toast('کد رهگیری هنوز صادر نشده است.', 'error');
    }
    return;
  }

  const rebuyBtn = e.target.closest('[data-order-rebuy]');
  if (rebuyBtn) {
    toast('کالاها به سبد خرید اضافه شد.');
    return;
  }

  const payBtn = e.target.closest('[data-order-pay]');
  if (payBtn) {
    toast('در حال انتقال به درگاه پرداخت...');
    setTimeout(() => (window.location.href = './checkout.html'), 900);
    return;
  }

  const removeBtn = e.target.closest('[data-order-remove]');
  if (removeBtn) {
    if (confirm('این سفارش از تاریخچه حذف شود؟')) {
      const idx = ORDERS.findIndex(x => x.code === removeBtn.dataset.orderRemove);
      if (idx > -1) ORDERS.splice(idx, 1);
      renderOrders();
      toast('سفارش از تاریخچه حذف شد.');
    }
    return;
  }

  const invoiceBtn = e.target.closest('[data-order-invoice]');
  if (invoiceBtn) {
    toast('فاکتور در حال آماده‌سازی است...');
    return;
  }
});

/* =========================================================
   ADDRESSES
   ========================================================= */

const addressList = $('#addressList');

const addressCardHTML = a => `
  <article class="address-card" data-id="${a.id}">
    <header class="flex items-start justify-between gap-2">
      <div class="flex items-center gap-2">
        <span class="address-tag"><i class="ri-map-pin-2-line"></i> ${a.title}</span>
        ${a.isDefault ? '<span class="address-default">پیش‌فرض</span>' : ''}
      </div>
      <button type="button" class="icon-btn !h-[34px] !w-[34px]" data-address-delete aria-label="حذف">
        <i class="ri-delete-bin-6-line text-[14px]"></i>
      </button>
    </header>
    <p class="mt-3 text-[11px] leading-6 text-[#4a5450]">
      ${a.province}، ${a.city}، ${a.address}
    </p>
    <div class="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-muted">
      <span><i class="ri-mail-line"></i> کد پستی: ${a.postal}</span>
      <span><i class="ri-phone-line"></i> ${a.phone}</span>
    </div>
    <footer class="mt-4 flex items-center gap-2 border-t border-dashed border-border pt-3">
      ${!a.isDefault
        ? '<button type="button" class="order-action order-action--ghost" data-address-default>تعیین به‌عنوان پیش‌فرض</button>'
        : '<span class="text-[10px] text-muted">آدرس اصلی شما</span>'
      }
      <button type="button" class="order-action order-action--ghost" data-address-edit>ویرایش</button>
    </footer>
  </article>
`;

const renderAddresses = () => {
  addressList.innerHTML = ADDRESSES.map(addressCardHTML).join('');
};

addressList?.addEventListener('click', e => {
  const card = e.target.closest('.address-card');
  if (!card) return;
  const id = +card.dataset.id;
  const item = ADDRESSES.find(a => a.id === id);
  if (!item) return;

  if (e.target.closest('[data-address-delete]')) {
    if (ADDRESSES.length === 1) {
      toast('حداقل یک آدرس باید داشته باشید.', 'error');
      return;
    }
    if (confirm(`آدرس «${item.title}» حذف شود؟`)) {
      const idx = ADDRESSES.findIndex(a => a.id === id);
      ADDRESSES.splice(idx, 1);
      if (item.isDefault && ADDRESSES.length) ADDRESSES[0].isDefault = true;
      renderAddresses();
      toast('آدرس حذف شد.');
    }
    return;
  }

  if (e.target.closest('[data-address-default]')) {
    ADDRESSES.forEach(a => (a.isDefault = a.id === id));
    renderAddresses();
    toast('آدرس پیش‌فرض تغییر کرد.');
    return;
  }

  if (e.target.closest('[data-address-edit]')) {
    openAddressModal(item);
    return;
  }
});

/* =========================================================
   ADDRESS MODAL (افزودن / ویرایش)
   ========================================================= */

const addressModal = $('#addressModal');
const addressForm = $('#addressForm');
let editingAddressId = null;

const openAddressModal = (address = null) => {
  editingAddressId = address?.id ?? null;
  const modalTitle = addressModal.querySelector('b');
  if (modalTitle) modalTitle.textContent = address ? 'ویرایش آدرس' : 'افزودن آدرس جدید';

  if (address) {
    $('#aTitle').value = address.title;
    $('#aProvince').value = address.province;
    $('#aCity').value = address.city;
    $('#aAddress').value = address.address;
    $('#aPostal').value = address.postal;
    $('#aPhone').value = address.phone;
  } else {
    addressForm.reset();
  }

  addressModal.classList.remove('hidden');
  addressModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeAddressModal = () => {
  addressModal.classList.add('hidden');
  addressModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  addressForm.reset();
  editingAddressId = null;
};

$('[data-address-new]')?.addEventListener('click', () => openAddressModal());
$$('[data-address-close]').forEach(b => b.addEventListener('click', closeAddressModal));
addressModal?.addEventListener('click', e => {
  if (e.target === addressModal) closeAddressModal();
});

addressForm?.addEventListener('submit', e => {
  e.preventDefault();

  const data = {
    title: $('#aTitle').value.trim(),
    province: $('#aProvince').value.trim(),
    city: $('#aCity').value.trim(),
    address: $('#aAddress').value.trim(),
    postal: $('#aPostal').value.replace(/\D/g, ''),
    phone: $('#aPhone').value.trim(),
  };

  // Validation
  if (!data.title || !data.province || !data.city || data.address.length < 10) {
    toast('لطفاً همه فیلدها را کامل کنید.', 'error');
    return;
  }
  if (!/^\d{10}$/.test(data.postal)) {
    toast('کد پستی باید ۱۰ رقم باشد.', 'error');
    return;
  }

  if (editingAddressId) {
    const idx = ADDRESSES.findIndex(a => a.id === editingAddressId);
    if (idx > -1) {
      ADDRESSES[idx] = { ...ADDRESSES[idx], ...data };
    }
    toast('آدرس ویرایش شد.');
  } else {
    ADDRESSES.push({
      id: Date.now(),
      ...data,
      isDefault: ADDRESSES.length === 0,
    });
    toast('آدرس جدید ذخیره شد.');
  }

  renderAddresses();
  closeAddressModal();
});

/* =========================================================
   WISHLIST
   ========================================================= */

const wishlistGrid = $('#wishlistGrid');
const wishlistEmpty = $('#wishlistEmpty');
const wishlistCount = $('#wishlistCount');

const wishCardHTML = p => `
  <article class="product-card min-w-0" data-wish-id="${p.id}">
    <div class="product-cover bg-gradient-to-br ${p.cover}">
      ${p.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${p.badge}</span>` : ''}
      <button class="wish is-active" aria-label="حذف از علاقه‌مندی"><i class="ri-heart-3-fill"></i></button>
      <div class="relative z-[1] text-[15px] font-black leading-snug">${p.titleLines}</div>
      <div class="relative z-[1] mt-1 text-[10px] text-white/65">${p.author}</div>
    </div>
    <div class="px-[3px] py-3">
      <h3 class="mt-1 text-[11px] font-extrabold">${p.title}</h3>
      <div class="mt-2 flex items-center gap-2">
        <strong class="text-[10px]">${tomanNum(p.price)}</strong>
        <button class="add-cart" data-wish-add="${p.id}"><i class="ri-add-line"></i></button>
      </div>
    </div>
  </article>
`;

const renderWishlist = () => {
  if (!WISHLIST.length) {
    wishlistGrid.innerHTML = '';
    wishlistEmpty.classList.remove('hidden');
    wishlistEmpty.classList.add('flex');
    wishlistCount.textContent = '۰ کالا';
    return;
  }
  wishlistEmpty.classList.add('hidden');
  wishlistEmpty.classList.remove('flex');
  wishlistGrid.innerHTML = WISHLIST.map(wishCardHTML).join('');
  wishlistCount.textContent = `${faNum(WISHLIST.length)} کالا`;
};

wishlistGrid?.addEventListener('click', e => {
  const card = e.target.closest('.product-card[data-wish-id]');
  if (!card) return;
  const id = +card.dataset.wishId;

  // حذف از علاقه‌مندی
  if (e.target.closest('.wish')) {
    const idx = WISHLIST.findIndex(x => x.id === id);
    if (idx > -1) {
      WISHLIST.splice(idx, 1);
      renderWishlist();
      toast('از علاقه‌مندی‌ها حذف شد.');
    }
    return;
  }

  // افزودن به سبد
  if (e.target.closest('[data-wish-add]')) {
    toast('به سبد خرید اضافه شد.');
  }
});

/* =========================================================
   GENERIC ACCOUNT MODAL
   ========================================================= */

const accountModal = $('#accountModal');
const modalBody = $('#modalBody');
const modalTitle = $('#modalTitle');
const modalKicker = $('#modalKicker');

const openAccountModal = ({ title = '', kicker = '', body = '' }) => {
  modalTitle.textContent = title;
  modalKicker.textContent = kicker;
  modalBody.innerHTML = body;
  accountModal.classList.remove('hidden');
  accountModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeAccountModal = () => {
  accountModal.classList.add('hidden');
  accountModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  modalBody.innerHTML = '';
};

$$('[data-modal-close]').forEach(b => b.addEventListener('click', closeAccountModal));
accountModal?.addEventListener('click', e => {
  if (e.target === accountModal) closeAccountModal();
});

/* =========================================================
   WALLET — Charge Modal
   ========================================================= */

const walletChargeModal = $('#walletChargeModal');
const walletChargeForm = $('#walletChargeForm');
const walletAmountInput = $('#walletAmount');

const openWalletCharge = () => {
  walletChargeModal.classList.remove('hidden');
  walletChargeModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeWalletCharge = () => {
  walletChargeModal.classList.add('hidden');
  walletChargeModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  walletChargeForm.reset();
  $$('.wallet-amount').forEach(b => b.classList.remove('is-active'));
};

// دکمه شارژ کیف پول در تب wallet
$$('button').forEach(btn => {
  if (btn.textContent.includes('شارژ کیف پول')) {
    btn.addEventListener('click', openWalletCharge);
  }
});

$$('[data-wallet-close]').forEach(b => b.addEventListener('click', closeWalletCharge));
walletChargeModal?.addEventListener('click', e => {
  if (e.target === walletChargeModal) closeWalletCharge();
});

// انتخاب مبلغ‌های سریع
$$('.wallet-amount').forEach(btn => {
  btn.addEventListener('click', () => {
    $$('.wallet-amount').forEach(b => b.classList.toggle('is-active', b === btn));
    walletAmountInput.value = btn.dataset.walletAmount;
  });
});

// وقتی مقدار دستی وارد شد، انتخاب سریع را بردار
walletAmountInput?.addEventListener('input', () => {
  $$('.wallet-amount').forEach(b => {
    b.classList.toggle('is-active', +b.dataset.walletAmount === +walletAmountInput.value);
  });
});

walletChargeForm?.addEventListener('submit', e => {
  e.preventDefault();
  const amount = +walletAmountInput.value;
  if (!amount || amount < 10000) {
    toast('حداقل مبلغ شارژ ۱۰,۰۰۰ تومان است.', 'error');
    return;
  }

  closeWalletCharge();
  toast(`در حال انتقال به درگاه برای شارژ ${toman(amount)}...`);
});

/* =========================================================
   TRANSACTION DETAIL (Generic Modal)
   ========================================================= */

const showTransactionDetail = tx => {
  const isPlus = tx.amount > 0;
  const iconClass = isPlus ? 'bg-[#e0f4e8] text-[#2e7d55]' : 'bg-red-50 text-danger';
  const iconName = tx.type === 'charge' ? 'ri-add-line'
    : tx.type === 'refund' ? 'ri-refund-2-line'
    : 'ri-shopping-bag-3-line';

  const tmpl = document.getElementById('transactionDetailTemplate');
  const clone = tmpl.content.cloneNode(true);
  const wrapper = document.createElement('div');
  wrapper.appendChild(clone);

  // پر کردن مقادیر
  const $w = s => wrapper.querySelector(s);
  $w('#txModalIcon').className = `grid h-12 w-12 place-items-center rounded-xl ${iconClass}`;
  $w('#txModalIcon').innerHTML = `<i class="${iconName} text-[20px]"></i>`;
  $w('#txModalTitle').textContent = tx.title;
  $w('#txModalDate').textContent = tx.date;
  $w('#txModalAmount').textContent = (isPlus ? '+ ' : '− ') + tomanNum(Math.abs(tx.amount)) + ' تومان';
  $w('#txModalBefore').textContent = tomanNum(tx.before) + ' تومان';
  $w('#txModalAfter').textContent = tomanNum(tx.after) + ' تومان';
  $w('#txModalId').textContent = tx.id;

  openAccountModal({
    title: 'جزئیات تراکنش',
    kicker: 'کیف پول',
    body: wrapper.innerHTML,
  });
};

// کلیک روی هر تراکنش
$$('.wallet-tx-item').forEach((el, idx) => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    const tx = TRANSACTIONS[idx];
    if (tx) showTransactionDetail(tx);
  });
});

// دکمه تاریخچه تراکنش‌ها — نمایش همه در مودال
$$('button').forEach(btn => {
  if (btn.textContent.includes('تاریخچه تراکنش‌ها')) {
    btn.addEventListener('click', () => {
      const rows = TRANSACTIONS.map(tx => {
        const isPlus = tx.amount > 0;
        return `
          <div class="flex items-center gap-3 rounded-2xl border border-border p-3 cursor-pointer hover:bg-bg transition"
               data-tx-id="${tx.id}">
            <div class="grid h-10 w-10 place-items-center rounded-xl ${isPlus ? 'bg-[#e0f4e8] text-[#2e7d55]' : 'bg-red-50 text-danger'}">
              <i class="${isPlus ? 'ri-add-line' : 'ri-shopping-bag-3-line'}"></i>
            </div>
            <div class="min-w-0 flex-1">
              <b class="block text-[11px]">${tx.title}</b>
              <small class="mt-1 block text-[10px] text-muted">${tx.date}</small>
            </div>
            <b class="text-[11px] ${isPlus ? 'text-[#2e7d55]' : 'text-danger'}">
              ${isPlus ? '+ ' : '− '}${tomanNum(Math.abs(tx.amount))}
            </b>
          </div>
        `;
      }).join('');

      openAccountModal({
        title: 'تاریخچه تراکنش‌ها',
        kicker: 'کیف پول',
        body: `<div class="space-y-2">${rows}</div>`,
      });

      // اتصال دوباره کلیک‌ها
      modalBody.querySelectorAll('[data-tx-id]').forEach(el => {
        el.addEventListener('click', () => {
          const tx = TRANSACTIONS.find(t => t.id === el.dataset.txId);
          if (tx) showTransactionDetail(tx);
        });
      });
    });
  }
});

/* =========================================================
   DELETE ACCOUNT
   ========================================================= */

const deleteAccountModal = $('#deleteAccountModal');
const deleteAccountConfirm = $('#deleteAccountConfirm');

const openDeleteAccount = () => {
  deleteAccountConfirm.value = '';
  deleteAccountModal.classList.remove('hidden');
  deleteAccountModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeDeleteAccount = () => {
  deleteAccountModal.classList.add('hidden');
  deleteAccountModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

// دکمه «درخواست حذف حساب»
$$('button').forEach(btn => {
  if (btn.textContent.includes('درخواست حذف حساب')) {
    btn.addEventListener('click', openDeleteAccount);
  }
});

$$('[data-delete-close]').forEach(b => b.addEventListener('click', closeDeleteAccount));
deleteAccountModal?.addEventListener('click', e => {
  if (e.target === deleteAccountModal) closeDeleteAccount();
});

$('#confirmDeleteAccount')?.addEventListener('click', () => {
  if (deleteAccountConfirm.value.trim() !== 'حذف حساب') {
    toast('برای تأیید، عبارت «حذف حساب» را وارد کنید.', 'error');
    deleteAccountConfirm.focus();
    return;
  }
  closeDeleteAccount();
  toast('حساب کاربری شما در حال حذف است...');
  setTimeout(() => (window.location.href = '../index.html'), 1500);
});

/* =========================================================
   PROFILE FORM
   ========================================================= */

$('#profileForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const firstName = $('#pFirstName').value.trim();
  const lastName = $('#pLastName').value.trim();
  const phone = $('#pPhone').value.trim();
  const email = $('#pEmail').value.trim();
  const bio = $('#pBio').value.trim();

  // Validation
  if (firstName.length < 2 || lastName.length < 2) {
    toast('نام و نام خانوادگی باید حداقل ۲ کاراکتر باشد.', 'error');
    return;
  }
  if (!/^0?9\d{9}$/.test(phone.replace(/\D/g, ''))) {
    toast('شماره موبایل معتبر نیست.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    toast('ایمیل معتبر نیست.', 'error');
    return;
  }

  state.profile = { firstName, lastName, phone, email, bio };

  // بروزرسانی هدر پروفایل
  const profileName = document.querySelector('.profile-header h1');
  const profileAvatar = document.querySelector('.profile-avatar');
  if (profileName) profileName.textContent = `${firstName} ${lastName}`;
  if (profileAvatar) profileAvatar.textContent = `${firstName[0]}.${lastName[0]}`;

  toast('اطلاعات پروفایل ذخیره شد.');
});

/* =========================================================
   PASSWORD FORM
   ========================================================= */

$('#passwordForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const oldP = $('#pOld').value;
  const newP = $('#pNew').value;
  const conf = $('#pConfirm').value;

  if (!oldP) {
    toast('رمز فعلی را وارد کنید.', 'error');
    return;
  }
  if (newP.length < 6) {
    toast('رمز جدید باید حداقل ۶ کاراکتر باشد.', 'error');
    return;
  }
  if (newP !== conf) {
    toast('تکرار رمز جدید یکسان نیست.', 'error');
    return;
  }

  e.target.reset();
  toast('رمز عبور با موفقیت تغییر کرد.');
});

/* =========================================================
   INIT
   ========================================================= */

renderOrders();
renderAddresses();
renderWishlist();

/* =========================================================
   TOAST
   ========================================================= */

function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[200] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}