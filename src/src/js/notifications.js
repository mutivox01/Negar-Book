/* =========================================================
   Notifications Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- داده ---------- */
const NOTIFS = [
  {
    id: 1, type: 'order', category: 'order', important: true, unread: true,
    title: 'سفارش NG-934821 ارسال شد',
    body: 'سفارش شما با کد رهگیری IR-9384710294 ارسال شد. تحویل ۳ تا ۵ روز کاری.',
    date: '۲ ساعت پیش', icon: 'ri-truck-line',
    tint: 'bg-[#d7dbea] text-[#5d658a]',
    action: { label: 'پیگیری سفارش', href: './account.html#orders' },
  },
  {
    id: 2, type: 'promo', category: 'promo', important: true, unread: true,
    title: '۲۰٪ تخفیف ویژه روی همه رمان‌ها',
    body: 'تا پایان هفته، با کد NEGAR20 روی همه رمان‌ها ۲۰٪ تخفیف بگیر.',
    date: '۴ ساعت پیش', icon: 'ri-price-tag-3-line',
    tint: 'bg-accent/40 text-ink',
    action: { label: 'مشاهده تخفیف‌ها', href: './offers.html' },
  },
  {
    id: 3, type: 'system', category: 'system', important: false, unread: true,
    title: 'به باشگاه کتاب‌خوانان نِگار خوش آمدی 🎉',
    body: 'حسابت با موفقیت ساخته شد. برای اولین خریدت ۱۵٪ تخفیف بگیر.',
    date: 'دیروز', icon: 'ri-sparkling-2-line',
    tint: 'bg-[#fbe9d2] text-[#a5622c]',
    action: { label: 'شروع خرید', href: './shop.html' },
  },
  {
    id: 4, type: 'order', category: 'order', important: false, unread: true,
    title: 'سفارش NG-931244 تحویل داده شد',
    body: 'امیدواریم از کتابت لذت ببری! نظرت را برای ما بنویس.',
    date: '۲ روز پیش', icon: 'ri-checkbox-circle-line',
    tint: 'bg-[#e0f4e8] text-[#2e7d55]',
    action: { label: 'نوشتن نظر', href: './account.html#orders' },
  },
  {
    id: 5, type: 'promo', category: 'promo', important: false, unread: false,
    title: 'کتاب‌های تازه رسیده',
    body: '۱۲ کتاب تازه از ناشران محبوب به فروشگاه اضافه شد.',
    date: '۳ روز پیش', icon: 'ri-book-3-line',
    tint: 'bg-[#dce8dc] text-[#56735e]',
    action: { label: 'مشاهده کتاب‌ها', href: './shop.html' },
  },
  {
    id: 6, type: 'system', category: 'system', important: false, unread: true,
    title: 'تراکنش کیف پول شما تأیید شد',
    body: 'مبلغ ۱۰۰,۰۰۰ تومان به کیف پول شما اضافه شد.',
    date: '۳ روز پیش', icon: 'ri-wallet-3-line',
    tint: 'bg-[#e0f4e8] text-[#2e7d55]',
    action: { label: 'مشاهده کیف پول', href: './account.html#wallet' },
  },
  {
    id: 7, type: 'order', category: 'order', important: false, unread: false,
    title: 'سفارش شما در حال آماده‌سازی است',
    body: 'سفارش NG-929881 در انبار در حال بسته‌بندی است.',
    date: '۴ روز پیش', icon: 'ri-archive-2-line',
    tint: 'bg-[#d7dbea] text-[#5d658a]',
    action: { label: 'مشاهده سفارش', href: './account.html#orders' },
  },
  {
    id: 8, type: 'promo', category: 'promo', important: true, unread: true,
    title: 'کارت هدیه نِگار را امتحان کن',
    body: 'با کارت هدیه نِگار، به دوستت یک کتاب خوب هدیه بده.',
    date: '۵ روز پیش', icon: 'ri-gift-2-line',
    tint: 'bg-[#f5d5d0] text-[#a33226]',
    action: { label: 'ساخت کارت هدیه', href: './gift-card.html' },
  },
  {
    id: 9, type: 'system', category: 'system', important: false, unread: false,
    title: 'به‌روزرسانی قوانین و شرایط',
    body: 'قوانین استفاده از نِگار بروزرسانی شد. برای اطلاع بیشتر کلیک کن.',
    date: '۱ هفته پیش', icon: 'ri-file-list-3-line',
    tint: 'bg-bg text-ink',
    action: { label: 'مشاهده قوانین', href: '#' },
  },
  {
    id: 10, type: 'order', category: 'order', important: false, unread: false,
    title: 'لغو سفارش NG-926110',
    body: 'سفارش شما لغو شد و مبلغ به کیف پولتان بازگشت.',
    date: '۱ هفته پیش', icon: 'ri-close-circle-line',
    tint: 'bg-danger/10 text-danger',
    action: { label: 'جزئیات بیشتر', href: './account.html#orders' },
  },
  {
    id: 11, type: 'promo', category: 'promo', important: false, unread: false,
    title: 'هفته‌ی کتاب‌های کلاسیک',
    body: 'برای یک هفته، کتاب‌های کلاسیک با ۲۵٪ تخفیف.',
    date: '۲ هفته پیش', icon: 'ri-history-line',
    tint: 'bg-[#f0e4c8] text-[#5a3f27]',
    action: { label: 'مشاهده کتاب‌ها', href: './shop.html' },
  },
  {
    id: 12, type: 'system', category: 'system', important: false, unread: false,
    title: 'نظر شما تأیید شد',
    body: 'نظر شما برای «ملت عشق» تأیید و منتشر شد. ممنون!',
    date: '۲ هفته پیش', icon: 'ri-chat-check-line',
    tint: 'bg-[#e0f4e8] text-[#2e7d55]',
    action: { label: 'مشاهده نظر', href: './product.html' },
  },
];

/* ---------- State ---------- */
const state = {
  filter: 'all',
  visible: 8,
  notifs: NOTIFS.map(n => ({ ...n })),
};

/* ---------- Refs ---------- */
const list = $('#notifList');
const emptyEl = $('#notifEmpty');
const loadMoreWrap = $('#notifLoadMoreWrap');
const unreadCount = $('#notifUnreadCount');
const totalCount = $('#notifTotalCount');

/* ---------- Filter + Sort ---------- */
const getFiltered = () => {
  return state.notifs.filter(n => {
    if (state.filter === 'all') return true;
    if (state.filter === 'unread') return n.unread;
    if (state.filter === 'important') return n.important;
    return n.category === state.filter;
  });
};

/* ---------- Notif card ---------- */
const notifHTML = n => `
  <article class="notif-card ${n.unread ? 'is-unread' : ''}" data-notif-id="${n.id}">
    <div class="notif-icon ${n.tint}">
      <i class="${n.icon}"></i>
    </div>

    <div class="notif-body">
      <div class="flex flex-wrap items-start justify-between gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <b class="notif-title">${n.title}</b>
          ${n.important ? '<span class="notif-badge notif-badge--important"><i class="ri-alert-line"></i> مهم</span>' : ''}
          ${n.unread ? '<span class="notif-dot"></span>' : ''}
        </div>
        <small class="notif-date">${n.date}</small>
      </div>

      <p class="notif-text">${n.body}</p>

      <div class="notif-actions">
        ${n.action ? `
          <a href="${n.action.href}" class="notif-action">
            ${n.action.label}
            <i class="ri-arrow-left-line"></i>
          </a>
        ` : ''}
        <button class="notif-icon-btn" data-notif-read="${n.id}" aria-label="خوانده‌شده">
          <i class="ri-check-line"></i>
        </button>
        <button class="notif-icon-btn is-danger" data-notif-remove="${n.id}" aria-label="حذف">
          <i class="ri-delete-bin-6-line"></i>
        </button>
      </div>
    </div>
  </article>
`;

/* ---------- Render ---------- */
const render = () => {
  const filtered = getFiltered();
  const items = filtered.slice(0, state.visible);

  if (!items.length) {
    list.innerHTML = '';
    list.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    loadMoreWrap.classList.add('hidden');
  } else {
    list.classList.remove('hidden');
    emptyEl.classList.add('hidden');
    emptyEl.classList.remove('flex');
    list.innerHTML = items.map(notifHTML).join('');
    loadMoreWrap.classList.toggle('hidden', filtered.length <= state.visible);
  }

  // آمار
  const unread = state.notifs.filter(n => n.unread).length;
  if (unreadCount) unreadCount.textContent = faNum(unread);
  if (totalCount) totalCount.textContent = faNum(state.notifs.length);
};

/* ---------- Events ---------- */
$$('[data-notif-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.notifFilter;
    state.visible = 8;
    $$('[data-notif-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
    render();
  });
});

list?.addEventListener('click', e => {
  const readBtn = e.target.closest('[data-notif-read]');
  if (readBtn) {
    const id = +readBtn.dataset.notifRead;
    const n = state.notifs.find(x => x.id === id);
    if (n) {
      n.unread = !n.unread;
      render();
      showToast(n.unread ? 'به خوانده‌نشده‌ها منتقل شد.' : 'به‌عنوان خوانده‌شده علامت زده شد.');
    }
    return;
  }

  const removeBtn = e.target.closest('[data-notif-remove]');
  if (removeBtn) {
    const id = +removeBtn.dataset.notifRemove;
    const card = removeBtn.closest('.notif-card');
    card.style.transition = 'opacity .25s, transform .25s';
    card.style.opacity = '0';
    card.style.transform = 'translateX(20px)';
    setTimeout(() => {
      state.notifs = state.notifs.filter(x => x.id !== id);
      render();
      showToast('اعلان حذف شد.');
    }, 220);
    return;
  }
});

$('#markAllRead')?.addEventListener('click', () => {
  state.notifs.forEach(n => (n.unread = false));
  render();
  showToast('همه اعلان‌ها به‌عنوان خوانده‌شده علامت زده شدند.');
});

$('#clearAllNotifs')?.addEventListener('click', () => {
  if (!state.notifs.length) return;
  if (!confirm('همه اعلان‌ها پاک شوند؟ این عملیات قابل بازگشت نیست.')) return;
  state.notifs = [];
  render();
  showToast('همه اعلان‌ها پاک شدند.');
});

$('#notifLoadMore')?.addEventListener('click', function () {
  this.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال بارگذاری...';
  setTimeout(() => {
    state.visible += 6;
    render();
    this.innerHTML = '<i class="ri-arrow-down-line"></i> نمایش اعلان‌های بیشتر';
  }, 500);
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
render();