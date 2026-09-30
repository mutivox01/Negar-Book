/* =========================================================
   Admin — Users Page
   ========================================================= */

// const $ = (s, root = document) => root.querySelector(s);
// const $$ = (s, root = document) => [...root.querySelectorAll(s)];

// const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
// const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده‌ها ---------- */
const USERS = [
  { id: 1, name: 'سارا محمدی', email: 'sara@example.com', phone: '09123456789',
    level: 'gold', levelLabel: 'طلایی', orders: 42, spent: 12480000,
    status: 'active', joined: '۱۴۰۳/۰۲/۱۵', address: 'تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲' },
  { id: 2, name: 'امیر رضایی', email: 'amir@example.com', phone: '09121112233',
    level: 'silver', levelLabel: 'نقره‌ای', orders: 18, spent: 4320000,
    status: 'active', joined: '۱۴۰۳/۰۸/۰۳', address: 'تهران، میدان آرژانتین، برج نگین' },
  { id: 3, name: 'نگار کریمی', email: 'negar@example.com', phone: '09133334455',
    level: 'platinum', levelLabel: 'پلاتینیوم', orders: 68, spent: 28900000,
    status: 'vip', joined: '۱۴۰۲/۱۱/۲۱', address: 'اصفهان، خیابان چهارباغ، کوچه گلستان' },
  { id: 4, name: 'حسین نوری', email: 'hossein@example.com', phone: '09144445566',
    level: 'bronze', levelLabel: 'برنزی', orders: 5, spent: 890000,
    status: 'active', joined: '۱۴۰۴/۰۶/۱۰', address: 'مشهد، بلوار وکیل‌آباد، پلاک ۱۸۹' },
  { id: 5, name: 'مریم اکبری', email: 'maryam@example.com', phone: '09155556677',
    level: 'silver', levelLabel: 'نقره‌ای', orders: 12, spent: 2840000,
    status: 'blocked', joined: '۱۴۰۳/۰۴/۰۸', address: 'شیراز، بلوار زند، کوچه ۱۲' },
  { id: 6, name: 'رضا صادقی', email: 'reza@example.com', phone: '09166667788',
    level: 'gold', levelLabel: 'طلایی', orders: 38, spent: 11200000,
    status: 'active', joined: '۱۴۰۲/۰۹/۱۵', address: 'تبریز، خیابان امام، پلاک ۲۲۰' },
  { id: 7, name: 'زهرا موسوی', email: 'zahra@example.com', phone: '09177778899',
    level: 'silver', levelLabel: 'نقره‌ای', orders: 22, spent: 5850000,
    status: 'active', joined: '۱۴۰۳/۰۱/۳۰', address: 'کرج، عظیمیه، میدان مهران' },
  { id: 8, name: 'علی حسینی', email: 'ali@example.com', phone: '09188889900',
    level: 'platinum', levelLabel: 'پلاتینیوم', orders: 82, spent: 34500000,
    status: 'vip', joined: '۱۴۰۲/۰۵/۱۲', address: 'تهران، سعادت‌آباد، میدان کاج، پلاک ۸' },
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

/* ---------- Filtering ---------- */
const getFiltered = () => {
  let list = USERS.filter(u => {
    if (state.filter !== 'all' && u.status !== state.filter) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${u.name} ${u.email} ${u.phone}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (state.sort) {
    case 'oldest': list = [...list].reverse(); break;
    case 'orders': list.sort((a, b) => b.orders - a.orders); break;
    case 'spent': list.sort((a, b) => b.spent - a.spent); break;
    default: break;
  }
  return list;
};

/* ---------- Refs ---------- */
const tbody = $('#usersTableBody');
const emptyEl = $('#usersTableEmpty');
const paginationEl = $('#usersPagination');
const resultInfo = $('#usersResultInfo');
const selectAll = $('#selectAllUsers');

/* ---------- Helpers ---------- */
const levelStyles = {
  bronze: 'bg-[#f5e5d5] text-[#8a5a2c]',
  silver: 'bg-[#e7e9e4] text-[#4a5450]',
  gold: 'bg-[#fdf3d4] text-[#8a6d1a]',
  platinum: 'bg-[#e5dbe8] text-[#6f4a75]',
};

const statusStyles = {
  active: 'admin-status--delivered',
  vip: 'admin-status--shipped',
  blocked: 'admin-status--cancelled',
};

const statusLabels = {
  active: 'فعال',
  vip: 'VIP',
  blocked: 'مسدود',
};

/* ---------- Row ---------- */
const rowHTML = u => {
  const initials = u.name.split(' ').map(p => p[0]).join('.').slice(0, 3);
  return `
    <tr data-user-id="${u.id}">
      <td>
        <input type="checkbox" class="admin-checkbox user-check" value="${u.id}"
          ${state.selected.has(u.id) ? 'checked' : ''}>
      </td>
      <td>
        <div class="flex items-center gap-2.5">
          <div class="admin-avatar-sm bg-gradient-to-br from-[#87927a] to-[#3b4a3f]">${initials}</div>
          <div class="min-w-0">
            <b class="block truncate text-[11px]">${u.name}</b>
            <small class="mt-0.5 block text-[9px] text-muted" dir="ltr">${u.email}</small>
          </div>
        </div>
      </td>
      <td>
        <span class="admin-status ${levelStyles[u.level]}">
          <i class="ri-vip-crown-line"></i> ${u.levelLabel}
        </span>
      </td>
      <td><b class="text-[11px]">${faNum(u.orders)}</b></td>
      <td><b class="text-[11px]">${tomanShort(u.spent)} تومان</b></td>
      <td><span class="admin-status ${statusStyles[u.status]}">${statusLabels[u.status]}</span></td>
      <td class="text-[10px] text-muted whitespace-nowrap">${u.joined}</td>
      <td>
        <div class="flex items-center gap-1">
          <button class="admin-icon-btn !h-[30px] !w-[30px]" data-user-view="${u.id}" aria-label="مشاهده">
            <i class="ri-eye-line text-[13px]"></i>
          </button>
          <button class="admin-icon-btn !h-[30px] !w-[30px]" data-user-edit="${u.id}" aria-label="ویرایش">
            <i class="ri-edit-line text-[13px]"></i>
          </button>
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

    const pages = Math.ceil(total / state.perPage);
    let html = `<button class="admin-pagination" data-page="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''}><i class="ri-arrow-right-s-line"></i></button>`;
    for (let i = 1; i <= pages; i++) {
      html += `<button class="admin-pagination ${i === state.page ? 'is-active' : ''}" data-page="${i}">${faNum(i)}</button>`;
    }
    html += `<button class="admin-pagination" data-page="${state.page + 1}" ${state.page === pages ? 'disabled' : ''}><i class="ri-arrow-left-s-line"></i></button>`;
    paginationEl.innerHTML = html;
  }

  const visible = items;
  if (selectAll) selectAll.checked = visible.length > 0 && visible.every(u => state.selected.has(u.id));
};

/* ---------- Events ---------- */
$('#userSearch')?.addEventListener('input', e => {
  state.search = e.target.value.trim();
  state.page = 1;
  render();
});

$('#userSortSelect')?.addEventListener('change', e => {
  state.sort = e.target.value;
  state.page = 1;
  render();
});

$$('[data-user-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.userFilter;
    state.page = 1;
    $$('[data-user-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
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
  const cb = e.target.closest('.user-check');
  if (!cb) return;
  const id = +cb.value;
  cb.checked ? state.selected.add(id) : state.selected.delete(id);
});

selectAll?.addEventListener('change', e => {
  const list = getFiltered().slice((state.page - 1) * state.perPage, state.page * state.perPage);
  list.forEach(u => e.target.checked ? state.selected.add(u.id) : state.selected.delete(u.id));
  render();
});

/* ---------- User Detail Modal ---------- */
const modal = $('#adminUserModal');
const modalBody = $('#adminUserBody');
const modalTitle = $('#adminUserTitle');

const openUserDetail = id => {
  const u = USERS.find(x => x.id === id);
  if (!u) return;

  modalTitle.textContent = u.name;
  const initials = u.name.split(' ').map(p => p[0]).join('.').slice(0, 3);

  modalBody.innerHTML = `
    <div class="space-y-4">

      <!-- Profile header -->
      <div class="flex flex-col items-center gap-3 rounded-2xl bg-bg p-5 text-center">
        <div class="grid h-[80px] w-[80px] place-items-center rounded-full bg-gradient-to-br from-[#87927a] to-[#3b4a3f] text-[22px] font-black text-white">
          ${initials}
        </div>
        <div>
          <b class="text-[14px] font-black">${u.name}</b>
          <p class="mt-1 text-[10px] text-muted" dir="ltr">${u.email}</p>
          <p class="mt-0.5 text-[10px] text-muted" dir="ltr">${faNum(u.phone)}</p>
        </div>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <span class="admin-status ${levelStyles[u.level]}">
            <i class="ri-vip-crown-line"></i> ${u.levelLabel}
          </span>
          <span class="admin-status ${statusStyles[u.status]}">${statusLabels[u.status]}</span>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div class="rounded-xl border border-border p-3 text-center">
          <small class="block text-[9px] text-muted">سفارش‌ها</small>
          <b class="mt-1 block text-[14px] font-black">${faNum(u.orders)}</b>
        </div>
        <div class="rounded-xl border border-border p-3 text-center">
          <small class="block text-[9px] text-muted">مجموع خرید</small>
          <b class="mt-1 block text-[12px] font-black">${tomanShort(u.spent)}</b>
        </div>
        <div class="rounded-xl border border-border p-3 text-center">
          <small class="block text-[9px] text-muted">تاریخ عضویت</small>
          <b class="mt-1 block text-[11px] font-black">${u.joined}</b>
        </div>
        <div class="rounded-xl border border-border p-3 text-center">
          <small class="block text-[9px] text-muted">امتیاز وفاداری</small>
          <b class="mt-1 block text-[14px] font-black text-[#2e7d55]">${faNum(Math.round(u.spent / 100000))}</b>
        </div>
      </div>

      <!-- Contact -->
      <div class="rounded-2xl border border-border p-4">
        <b class="mb-2 block text-[11px] font-black"><i class="ri-map-pin-line"></i> آدرس پیش‌فرض</b>
        <p class="text-[10px] leading-6 text-muted">${u.address}</p>
      </div>

      <!-- Recent activity -->
      <div class="rounded-2xl border border-border p-4">
        <b class="mb-3 block text-[11px] font-black">آخرین سفارش‌ها</b>
        <div class="space-y-2 text-[10px]">
          <div class="flex justify-between border-b border-dashed border-border pb-2">
            <span class="font-mono" dir="ltr">NG-934821</span>
            <span class="text-muted">۱۴۰۵/۰۵/۱۲</span>
            <b>${tomanShort(630000)} تومان</b>
          </div>
          <div class="flex justify-between border-b border-dashed border-border pb-2">
            <span class="font-mono" dir="ltr">NG-931244</span>
            <span class="text-muted">۱۴۰۵/۰۴/۲۸</span>
            <b>${tomanShort(289000)} تومان</b>
          </div>
          <div class="flex justify-between">
            <span class="font-mono" dir="ltr">NG-929881</span>
            <span class="text-muted">۱۴۰۵/۰۴/۱۵</span>
            <b>${tomanShort(540000)} تومان</b>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap gap-2 border-t border-dashed border-border pt-4">
        <button class="admin-btn admin-btn--primary" data-user-action="edit">
          <i class="ri-edit-line"></i> ویرایش
        </button>
        <button class="admin-btn" data-user-action="mail">
          <i class="ri-mail-send-line"></i> ارسال ایمیل
        </button>
        ${u.status === 'blocked'
          ? `<button class="admin-btn admin-btn--ghost" data-user-action="unblock"><i class="ri-user-follow-line"></i> رفع مسدودی</button>`
          : `<button class="admin-btn admin-btn--ghost !text-danger" data-user-action="block"><i class="ri-user-forbid-line"></i> مسدود کردن</button>`
        }
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeUserDetail = () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

$$('[data-user-modal-close]').forEach(b => b.addEventListener('click', closeUserDetail));
modal?.addEventListener('click', e => { if (e.target === modal) closeUserDetail(); });

/* ---------- Table actions ---------- */
tbody?.addEventListener('click', e => {
  const view = e.target.closest('[data-user-view]');
  if (view) return openUserDetail(+view.dataset.userView);

  const edit = e.target.closest('[data-user-edit]');
  if (edit) {
    openUserDetail(+edit.dataset.userEdit);
    showToast('فرم ویرایش به‌زودی...');
  }
});

/* ---------- Actions in modal ---------- */
modalBody?.addEventListener('click', e => {
  const btn = e.target.closest('[data-user-action]');
  if (!btn) return;
  const action = btn.dataset.userAction;
  const name = modalTitle.textContent;

  if (action === 'edit') showToast('فرم ویرایش کاربر به‌زودی...');
  else if (action === 'mail') showToast('ایمیل ارسال شد.');
  else if (action === 'block') {
    if (confirm(`کاربر «${name}» مسدود شود؟`)) {
      showToast('کاربر مسدود شد.');
      closeUserDetail();
    }
  } else if (action === 'unblock') {
    showToast('کاربر رفع مسدودی شد.');
    closeUserDetail();
  }
});

/* ---------- Export ---------- */
$('[data-export-users]')?.addEventListener('click', () => {
  showToast('فایل CSV در حال آماده‌سازی...');
});

$('[data-add-user]')?.addEventListener('click', () => {
  showToast('فرم افزودن کاربر به‌زودی...');
});

/* ---------- Init ---------- */
render();