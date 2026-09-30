/* =========================================================
   Newsletter Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- داده ---------- */
const ISSUES = [
  {
    id: 148, num: 148, title: 'سه کتاب برای شروع پاییز',
    date: '۱۴۰۵/۰۵/۱۵', year: '1405', views: 4210, opens: 68,
    tag: 'فصل تازه', tagTint: 'bg-accent/40 text-ink',
    summary: 'سه کتاب که می‌توانند پاییزت را متفاوت کنند — از یک رمان کوتاه تا یک جستار فلسفی.',
    highlights: ['کتاب هفته: روزهای بی‌تقویم', 'مقاله: چطور عادت مطالعه بسازیم', 'کد تخفیف: NEGAR20'],
    tint: 'from-[#e5b57c] via-[#c58a80] to-[#4a221f]',
    icon: 'ri-leaf-line',
  },
  {
    id: 147, num: 147, title: 'کتاب‌هایی که زندگی‌ات را تغییر می‌دهند',
    date: '۱۴۰۵/۰۵/۰۸', year: '1405', views: 5120, opens: 72,
    tag: 'ویژه', tagTint: 'bg-[#d7dbea] text-[#5d658a]',
    summary: 'هفت کتاب که خوانندگان نِگار گفته‌اند زندگی‌شان را تغییر داده‌اند.',
    highlights: ['منتخب خوانندگان', 'مصاحبه با مریم رستگار', 'کد تخفیف: BOOK50K'],
    tint: 'from-[#8d98c5] via-[#5d658a] to-[#2f3656]',
    icon: 'ri-bookmark-3-line',
  },
  {
    id: 146, num: 146, title: 'دنیای فلسفه برای تازه‌کارها',
    date: '۱۴۰۵/۰۴/۲۵', year: '1405', views: 3890, opens: 65,
    tag: 'راهنما', tagTint: 'bg-[#e8d9cb] text-[#88674d]',
    summary: 'از کجا شروع کنیم اگر هیچ‌چیز از فلسفه نمی‌دانیم؟ مسیر پیشنهادی نِگار.',
    highlights: ['۵ کتاب شروع فلسفه', 'گفت‌وگو با یک مترجم', 'پیشنهاد ویژه'],
    tint: 'from-[#c8a879] via-[#a5622c] to-[#4a2a10]',
    icon: 'ri-brain-line',
  },
  {
    id: 145, num: 145, title: 'کتاب‌های تابستانی برای روزهای گرم',
    date: '۱۴۰۵/۰۴/۱۸', year: '1405', views: 4450, opens: 69,
    tag: 'فصلی', tagTint: 'bg-[#fbe9d2] text-[#a5622c]',
    summary: 'پنج رمان سبک و خواندنی برای بعدازظهرهای تابستان.',
    highlights: ['۵ رمان سبک', 'چیدمان کتاب تابستان', 'تخفیف ۲۰٪'],
    tint: 'from-[#e5b57c] via-[#d96e5d] to-[#7a2a20]',
    icon: 'ri-sun-line',
  },
  {
    id: 144, num: 144, title: 'چطور یک کتابخانه خانگی بسازیم؟',
    date: '۱۴۰۵/۰۴/۱۱', year: '1405', views: 3620, opens: 63,
    tag: 'راهنما', tagTint: 'bg-[#dce8dc] text-[#56735e]',
    summary: 'راهنمای گام‌به‌گام برای ساختن یک کتابخانه کوچک در خانه.',
    highlights: ['چیدمان قفسه', 'انتخاب کتاب', 'بودجه‌بندی'],
    tint: 'from-[#87927a] via-[#56735e] to-[#334c45]',
    icon: 'ri-home-4-line',
  },
  {
    id: 143, num: 143, title: 'داستان‌های کوتاه برای سفر',
    date: '۱۴۰۵/۰۴/۰۴', year: '1405', views: 3980, opens: 66,
    tag: 'سفر', tagTint: 'bg-[#d7dbea] text-[#5d658a]',
    summary: 'پنج مجموعه داستان کوتاه که در سفر عالی جواب می‌دهند.',
    highlights: ['۵ مجموعه', 'نکات سفر', 'کد تخفیف سفر'],
    tint: 'from-[#7ea39a] via-[#2f5b52] to-[#132e2a]',
    icon: 'ri-luggage-cart-line',
  },
  {
    id: 142, num: 142, title: 'پرفروش‌های نیمه اول سال',
    date: '۱۴۰۵/۰۳/۲۸', year: '1405', views: 5340, opens: 74,
    tag: 'فروش', tagTint: 'bg-accent/40 text-ink',
    summary: 'نگاهی به ۱۰ کتاب پرفروش نِگار در شش ماه گذشته.',
    highlights: ['۱۰ کتاب پرفروش', 'تحلیل بازار کتاب', 'تخفیف ویژه'],
    tint: 'from-[#c58a80] via-[#a33226] to-[#4a221f]',
    icon: 'ri-fire-line',
  },
  {
    id: 141, num: 141, title: 'شعر خواندن؛ یک عادت فراموش‌شده',
    date: '۱۴۰۵/۰۳/۲۱', year: '1405', views: 3120, opens: 61,
    tag: 'شعر', tagTint: 'bg-[#f0e4c8] text-[#5a3f27]',
    summary: 'چرا شعر خواندن می‌تواند آرام‌بخش باشد و از کجا شروع کنیم.',
    highlights: ['۵ مجموعه شعر', 'شعر و ذهن‌آگاهی', 'پیشنهاد شاعر'],
    tint: 'from-[#a3936f] via-[#5a3f27] to-[#2b1c08]',
    icon: 'ri-quill-pen-line',
  },
  {
    id: 140, num: 140, title: 'معرفی ۸ نویسنده زن ایرانی',
    date: '۱۴۰۵/۰۳/۱۴', year: '1405', views: 4820, opens: 71,
    tag: 'ویژه', tagTint: 'bg-[#f5d5d0] text-[#a33226]',
    summary: 'هشت نویسنده زن که صدایشان ارزش شنیدن دارد.',
    highlights: ['۸ نویسنده', 'گزیده‌ای از آثار', 'گفت‌وگو'],
    tint: 'from-[#c58a80] via-[#8a2c20] to-[#2b0f0c]',
    icon: 'ri-women-line',
  },
  {
    id: 139, num: 139, title: 'از کتاب تا فیلم؛ اقتباس‌های ماندگار',
    date: '۱۴۰۵/۰۳/۰۷', year: '1405', views: 4250, opens: 67,
    tag: 'سینما', tagTint: 'bg-[#e7e9e4] text-[#4a5450]',
    summary: 'کتاب‌هایی که به فیلم تبدیل شدند — و مقایسه آن‌ها.',
    highlights: ['۱۰ اقتباس', 'مقایسه کتاب و فیلم', 'پیشنهاد تماشا'],
    tint: 'from-[#2b2b2b] via-[#17211f] to-[#0a0a0a]',
    icon: 'ri-movie-2-line',
  },
  {
    id: 138, num: 138, title: 'کتاب‌هایی برای روزهای سخت',
    date: '۱۴۰۵/۰۲/۲۹', year: '1405', views: 5640, opens: 76,
    tag: 'دلگرم‌کننده', tagTint: 'bg-accent/40 text-ink',
    summary: 'هفت کتاب که در روزهای سخت می‌توانند هم‌صحبت آدم باشند.',
    highlights: ['۷ کتاب', 'کتاب درمانی', 'پیشنهاد روان‌شناس'],
    tint: 'from-[#87927a] via-[#3b4a3f] to-[#1a2620]',
    icon: 'ri-heart-3-line',
  },
  {
    id: 137, num: 137, title: 'دنیای کتاب‌های صوتی',
    date: '۱۴۰۵/۰۲/۲۲', year: '1405', views: 3890, opens: 64,
    tag: 'راهنما', tagTint: 'bg-[#d7dbea] text-[#5d658a]',
    summary: 'همه‌چیز درباره کتاب صوتی — از انتخاب تا گوش دادن.',
    highlights: ['راهنمای کامل', 'بهترین اپلیکیشن‌ها', 'پیشنهاد ویژه'],
    tint: 'from-[#8d98c5] via-[#5d658a] to-[#2f3656]',
    icon: 'ri-headphone-line',
  },
];

/* ---------- State ---------- */
const state = {
  year: 'all',
  search: '',
  sort: 'newest',
};

/* ---------- Refs ---------- */
const archive = $('#nlArchive');
const emptyEl = $('#nlEmpty');

/* ---------- Year chips ---------- */
const renderYears = () => {
  const years = [...new Set(ISSUES.map(i => i.year))].sort().reverse();
  const wrap = $('#nlYears');

  wrap.innerHTML = `
    <button class="blog-chip ${state.year === 'all' ? 'is-active' : ''}" data-year="all">
      همه سال‌ها <span class="blog-chip-count">${faNum(ISSUES.length)}</span>
    </button>
    ${years.map(y => {
      const count = ISSUES.filter(i => i.year === y).length;
      return `
        <button class="blog-chip ${state.year === y ? 'is-active' : ''}" data-year="${y}">
          ${faNum(y)} <span class="blog-chip-count">${faNum(count)}</span>
        </button>
      `;
    }).join('')}
  `;
};

/* ---------- Filter + Sort ---------- */
const getFiltered = () => {
  let list = ISSUES.filter(i => {
    if (state.year !== 'all' && i.year !== state.year) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${i.title} ${i.summary} ${i.highlights.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (state.sort) {
    case 'popular': list.sort((a, b) => b.views - a.views); break;
    case 'oldest': list = [...list].reverse(); break;
    default: break;
  }

  return list;
};

/* ---------- Issue card ---------- */
const issueCardHTML = i => `
  <article class="nl-card" data-issue-id="${i.id}">
    <div class="nl-card-cover bg-gradient-to-br ${i.tint}">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute -top-8 -right-8 h-[120px] w-[120px] rounded-full border border-white/15"></div>
      </div>
      <i class="${i.icon} relative z-[1] text-[42px] text-white/80"></i>
      <span class="nl-card-num">شماره ${faNum(i.num)}</span>
    </div>

    <div class="nl-card-body">
      <div class="flex flex-wrap items-center gap-2 text-[10px]">
        <span class="rounded-full ${i.tagTint} px-2.5 py-1 font-black">${i.tag}</span>
        <span class="text-muted"><i class="ri-calendar-line"></i> ${i.date}</span>
        <span class="text-muted">·</span>
        <span class="text-muted"><i class="ri-eye-line"></i> ${faNum(i.views)}</span>
      </div>

      <h3 class="mt-3 text-[15px] font-black leading-[1.6]">${i.title}</h3>
      <p class="mt-2 line-clamp-2 text-[11px] leading-[1.9] text-muted">${i.summary}</p>

      <div class="mt-3 flex items-center justify-between gap-3 border-t border-dashed border-border pt-3 text-[10px]">
        <span class="text-muted">
          <i class="ri-mail-open-line"></i> نرخ باز شدن: <b class="text-ink">${faNum(i.opens)}٪</b>
        </span>
        <button class="inline-flex items-center gap-1.5 font-extrabold text-ink hover:text-accent-dark" data-issue-view="${i.id}">
          مطالعه شماره <i class="ri-arrow-left-line"></i>
        </button>
      </div>
    </div>
  </article>
`;

/* ---------- Render ---------- */
const render = () => {
  const list = getFiltered();

  if (!list.length) {
    archive.innerHTML = '';
    archive.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    return;
  }

  archive.classList.remove('hidden');
  emptyEl.classList.add('hidden');
  emptyEl.classList.remove('flex');
  archive.innerHTML = list.map(issueCardHTML).join('');
};

/* ---------- Events ---------- */
$('#nlYears')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-year]');
  if (!btn) return;
  state.year = btn.dataset.year;
  renderYears();
  render();
});

$('#nlSearch')?.addEventListener('input', e => {
  state.search = e.target.value.trim();
  render();
});

$('#nlSort')?.addEventListener('change', e => {
  state.sort = e.target.value;
  render();
});

/* ---------- Issue modal ---------- */
const modal = $('#issueModal');
const modalTitle = $('#issueTitle');
const modalBody = $('#issueBody');
const modalKicker = $('#issueKicker');

const openIssue = id => {
  const i = ISSUES.find(x => x.id === id);
  if (!i) return;

  modalKicker.textContent = `شماره ${faNum(i.num)} — ${i.date}`;
  modalTitle.textContent = i.title;

  modalBody.innerHTML = `
    <div class="space-y-5">

      <!-- Cover -->
      <div class="relative grid min-h-[160px] place-items-center overflow-hidden rounded-[20px] bg-gradient-to-br ${i.tint} p-6 text-white">
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div class="absolute -top-10 -right-10 h-[140px] w-[140px] rounded-full border border-white/15"></div>
        </div>
        <i class="${i.icon} relative z-[1] text-[60px] text-white/85"></i>
        <span class="relative z-[1] mt-3 rounded-full bg-white/15 px-3 py-1 text-[10px] font-black backdrop-blur-sm">
          شماره ${faNum(i.num)}
        </span>
      </div>

      <!-- Summary -->
      <div class="rounded-2xl border border-border p-5">
        <b class="mb-2 block text-[12px] font-black">در این شماره می‌خوانید</b>
        <p class="text-[11px] leading-[2.1] text-[#4a5450]">${i.summary}</p>
      </div>

      <!-- Highlights -->
      <div class="rounded-2xl border border-border p-5">
        <b class="mb-3 block text-[12px] font-black">سرفصل‌ها</b>
        <ul class="space-y-2.5 text-[11px] text-[#4a5450]">
          ${i.highlights.map(h => `
            <li class="flex items-start gap-2">
              <i class="ri-check-line mt-1 text-[13px] text-[#2e7d55]"></i>
              <span class="font-bold">${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-2">
        <div class="rounded-xl bg-bg p-3 text-center">
          <small class="block text-[9px] text-muted">بازدید</small>
          <b class="mt-1 block text-[13px] font-black">${faNum(i.views)}</b>
        </div>
        <div class="rounded-xl bg-bg p-3 text-center">
          <small class="block text-[9px] text-muted">نرخ باز شدن</small>
          <b class="mt-1 block text-[13px] font-black text-[#2e7d55]">${faNum(i.opens)}٪</b>
        </div>
        <div class="rounded-xl bg-bg p-3 text-center">
          <small class="block text-[9px] text-muted">تاریخ</small>
          <b class="mt-1 block text-[11px] font-black">${i.date}</b>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex flex-wrap gap-2 border-t border-dashed border-border pt-4">
        <a href="./blog.html" class="admin-btn admin-btn--primary !text-[11px]">
          <i class="ri-external-link-line"></i> مطالعه در سایت
        </a>
        <button class="admin-btn !text-[11px]" data-issue-share>
          <i class="ri-share-forward-line"></i> اشتراک‌گذاری
        </button>
      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeIssue = () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

archive?.addEventListener('click', e => {
  const btn = e.target.closest('[data-issue-view]');
  if (btn) return openIssue(+btn.dataset.issueView);
});

$$('[data-issue-close]').forEach(b => b.addEventListener('click', closeIssue));
modal?.addEventListener('click', e => { if (e.target === modal) closeIssue(); });

modalBody?.addEventListener('click', e => {
  if (e.target.closest('[data-issue-share]')) {
    const t = $('#issueTitle').textContent;
    if (navigator.share) {
      navigator.share({ title: t, url: location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(location.href);
      showToast('لینک کپی شد.');
    }
  }
});

/* ---------- Newsletter form ---------- */
$('#newsletterForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('#nlEmail');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
    return showToast('ایمیل معتبر نیست.', 'error');
  }

  const btn = $('button', e.target);
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i>';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
    input.value = '';
    showToast('عضویت شما ثبت شد. خوش آمدید! 🎉');
  }, 900);
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
renderYears();
render();