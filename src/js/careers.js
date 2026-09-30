/* =========================================================
   Careers Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- داده‌های موقعیت‌ها ---------- */
const JOBS = [
  {
    id: 1,
    title: 'توسعه‌دهنده ارشد فرانت‌اند',
    dept: 'tech', deptLabel: 'فناوری',
    type: 'full', typeLabel: 'تمام‌وقت',
    location: 'تهران (دورکاری جزئی)',
    salary: '۴۵ تا ۶۰ میلیون',
    tags: ['React', 'TypeScript', 'Tailwind'],
    date: '۲ روز پیش',
    desc: 'به دنبال کسی هستیم که عاشق ساختن رابط‌های کاربری تمیز، سریع و دسترس‌پذیر باشد. تو با تیم طراحی و محصول، تجربه‌ی خرید کتاب را ساده‌تر و دلپذیرتر می‌کنی.',
    requirements: [
      'حداقل ۴ سال تجربه‌ی کار با React',
      'تسلط به TypeScript و معماری کامپوننت‌محور',
      'آشنایی با Tailwind CSS و اصول طراحی ریسپانسیو',
      'تجربه‌ی کار با ابزارهای تست (Jest، Playwright)',
      'روحیه‌ی یادگیری و کار تیمی',
    ],
    bonuses: [
      'تجربه‌ی کار روی محصولات فروشگاهی',
      'آشنایی با Next.js و SSR',
      'داشتن نمونه‌کار متن‌باز',
    ],
  },
  {
    id: 2,
    title: 'طراح تجربه‌ی کاربری (UX)',
    dept: 'design', deptLabel: 'طراحی',
    type: 'full', typeLabel: 'تمام‌وقت',
    location: 'تهران (حضوری)',
    salary: '۳۸ تا ۵۰ میلیون',
    tags: ['Figma', 'Design System', 'Research'],
    date: '۳ روز پیش',
    desc: 'اگر باور داری طراحی خوب، زندگی آدم‌ها را ساده‌تر می‌کند، جای تو اینجاست. تو روی تجربه‌ی خرید، جست‌وجو و مطالعه در نِگار کار می‌کنی.',
    requirements: [
      'حداقل ۳ سال تجربه در طراحی محصول',
      'تسلط به Figma و اصول Design System',
      'مهارت در مصاحبه و تست کاربر',
      'توانایی مستندسازی فرآیندهای طراحی',
    ],
    bonuses: [
      'تجربه‌ی کار در حوزه‌ی کتاب یا محتوا',
      'آشنایی با اصول دسترس‌پذیری (a11y)',
    ],
  },
  {
    id: 3,
    title: 'کارشناس تولید محتوا و مجله',
    dept: 'content', deptLabel: 'محتوا',
    type: 'full', typeLabel: 'تمام‌وقت',
    location: 'تهران (ترکیبی)',
    salary: '۲۵ تا ۳۵ میلیون',
    tags: ['نوشتن', 'ویراستاری', 'کتاب'],
    date: '۵ روز پیش',
    desc: 'ما به دنبال کسی هستیم که عاشق نوشتن درباره‌ی کتاب باشد. تو در بخش مجله‌ی نِگار می‌نویسی، ویرایش می‌کنی و با نویسندگان مهمان همکاری می‌کنی.',
    requirements: [
      'حداقل ۲ سال تجربه‌ی نویسندگی محتوای فارسی',
      'تسلط به ویراستاری و نگارش روان',
      'آشنایی با سئو و ساختار محتوایی',
      'علاقه‌ی جدی به کتاب و ادبیات',
    ],
    bonuses: [
      'سابقه‌ی نویسندگی در مجلات یا وب‌سایت‌های ادبی',
      'داشتن نمونه‌کار منتشرشده',
    ],
  },
  {
    id: 4,
    title: 'کارشناس بازاریابی دیجیتال',
    dept: 'marketing', deptLabel: 'بازاریابی',
    type: 'full', typeLabel: 'تمام‌وقت',
    location: 'تهران (حضوری)',
    salary: '۳۰ تا ۴۰ میلیون',
    tags: ['سئو', 'کمپین', 'تحلیل'],
    date: '۱ هفته پیش',
    desc: 'مسئولیت رشد ترافیک و فروش از کانال‌های دیجیتال با توست. از کمپین‌های اینستاگرام تا بهینه‌سازی نرخ تبدیل در سایت.',
    requirements: [
      'حداقل ۳ سال تجربه در بازاریابی دیجیتال',
      'تسلط به Google Analytics و ابزارهای تحلیل',
      'تجربه‌ی مدیریت کمپین‌های تبلیغاتی',
      'آشنایی با سئو فنی و محتوایی',
    ],
    bonuses: [
      'تجربه در فروشگاه‌های آنلاین',
      'آشنایی با ایمیل مارکتینگ',
    ],
  },
  {
    id: 5,
    title: 'کارشناس پشتیبانی مشتریان',
    dept: 'support', deptLabel: 'پشتیبانی',
    type: 'full', typeLabel: 'تمام‌وقت',
    location: 'تهران (حضوری)',
    salary: '۱۸ تا ۲۵ میلیون',
    tags: ['ارتباط', 'CRM', 'صبر'],
    date: '۱ هفته پیش',
    desc: 'اولین لبخند نِگار، تویی. تو با مشتریان گفت‌وگو می‌کنی، مشکلاتشان را حل می‌کنی و بازخوردهایشان را به تیم محصول می‌رسانی.',
    requirements: [
      'حداقل ۱ سال تجربه‌ی پشتیبانی مشتری',
      'مهارت ارتباطی بالا و صبر',
      'آشنایی با سیستم‌های CRM',
      'تسلط به زبان فارسی و نگارش درست',
    ],
    bonuses: [
      'آشنایی با حوزه‌ی کتاب و نشر',
      'تجربه‌ی کار در فروشگاه آنلاین',
    ],
  },
  {
    id: 6,
    title: 'کارآموز طراحی گرافیک',
    dept: 'design', deptLabel: 'طراحی',
    type: 'intern', typeLabel: 'کارآموزی',
    location: 'تهران (حضوری)',
    salary: '۱۰ تا ۱۵ میلیون',
    tags: ['Photoshop', 'Illustrator', 'کتاب'],
    date: '۱ هفته پیش',
    desc: 'اگر تازه‌کار هستی و می‌خواهی در محیط حرفه‌ای رشد کنی، این فرصت برای توست. کنار تیم طراحی، پوستر، بنر و کاور کتاب طراحی می‌کنی.',
    requirements: [
      'آشنایی با Photoshop و Illustrator',
      'ذوق بصری و علاقه به یادگیری',
      'داشتن نمونه‌کار (حتی دانشجویی)',
    ],
    bonuses: [
      'آشنایی با Figma',
      'علاقه به طراحی جلد کتاب',
    ],
  },
  {
    id: 7,
    title: 'کارشناس انبار و لجستیک (نیمه‌وقت)',
    dept: 'operation', deptLabel: 'عملیات',
    type: 'part', typeLabel: 'نیمه‌وقت',
    location: 'تهران (حضوری)',
    salary: '۱۲ تا ۱۸ میلیون',
    tags: ['انبار', 'بسته‌بندی', 'دقت'],
    date: '۲ هفته پیش',
    desc: 'مسئولیت آماده‌سازی و ارسال سفارش‌ها با دقت و سرعت. تو مطمئن می‌شوی هر کتاب، سالم و زیبا به دست مشتری می‌رسد.',
    requirements: [
      'دقت بالا در بسته‌بندی و چک سفارش',
      'توانایی کار فیزیکی سبک',
      'آشنایی با اصول انبارداری',
    ],
    bonuses: [
      'تجربه در انبار کتاب یا محصولات فرهنگی',
    ],
  },
];

/* ---------- State ---------- */
const state = {
  filter: 'all',
  search: '',
};

/* ---------- Refs ---------- */
const jobsList = $('#jobsList');
const jobsEmpty = $('#jobsEmpty');
const jobCount = $('#jobCount');

/* ---------- Department filters ---------- */
const DEPTS = [
  { id: 'all', label: 'همه' },
  { id: 'tech', label: 'فناوری' },
  { id: 'design', label: 'طراحی' },
  { id: 'content', label: 'محتوا' },
  { id: 'marketing', label: 'بازاریابی' },
  { id: 'support', label: 'پشتیبانی' },
  { id: 'operation', label: 'عملیات' },
];

const renderFilters = () => {
  const wrap = $('#jobFilters');
  wrap.innerHTML = DEPTS.map(d => {
    const count = d.id === 'all' ? JOBS.length : JOBS.filter(j => j.dept === d.id).length;
    return `
      <button class="blog-chip ${d.id === state.filter ? 'is-active' : ''}" data-job-cat="${d.id}">
        ${d.label}
        <span class="blog-chip-count">${faNum(count)}</span>
      </button>
    `;
  }).join('');
};

/* ---------- Job card ---------- */
const jobCardHTML = j => `
  <article class="job-card" data-job-id="${j.id}">
    <div class="job-card-head">
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2 text-[10px]">
          <span class="job-tag bg-bg text-muted">${j.deptLabel}</span>
          <span class="job-tag ${j.type === 'intern' ? 'bg-accent/40 text-ink' : j.type === 'part' ? 'bg-[#d7dbea] text-[#5d658a]' : 'bg-[#e0f4e8] text-[#2e7d55]'}">${j.typeLabel}</span>
        </div>

        <h3 class="mt-2 text-[15px] font-black leading-[1.5]">${j.title}</h3>

        <div class="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-muted">
          <span><i class="ri-map-pin-line"></i> ${j.location}</span>
          <span>·</span>
          <span><i class="ri-money-dollar-circle-line"></i> ${j.salary} تومان</span>
          <span>·</span>
          <span><i class="ri-time-line"></i> ${j.date}</span>
        </div>

        <div class="mt-3 flex flex-wrap gap-1.5">
          ${j.tags.map(t => `<span class="job-skill">${t}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="job-card-foot">
      <button class="admin-btn !text-[11px]" data-job-view="${j.id}">
        <i class="ri-eye-line"></i> جزئیات
      </button>
      <button class="admin-btn admin-btn--primary !text-[11px]" data-job-apply="${j.id}">
        <i class="ri-send-plane-line"></i> ارسال درخواست
      </button>
    </div>
  </article>
`;

/* ---------- Filter + Render ---------- */
const getFiltered = () => {
  return JOBS.filter(j => {
    if (state.filter !== 'all' && j.dept !== state.filter) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${j.title} ${j.deptLabel} ${j.tags.join(' ')} ${j.location}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
};

const render = () => {
  const list = getFiltered();
  jobCount.textContent = faNum(list.length);

  if (!list.length) {
    jobsList.innerHTML = '';
    jobsList.classList.add('hidden');
    jobsEmpty.classList.remove('hidden');
    jobsEmpty.classList.add('flex');
    return;
  }

  jobsEmpty.classList.add('hidden');
  jobsEmpty.classList.remove('flex');
  jobsList.classList.remove('hidden');
  jobsList.innerHTML = list.map(jobCardHTML).join('');
};

/* ---------- Events ---------- */
$('#jobFilters')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-job-cat]');
  if (!btn) return;
  state.filter = btn.dataset.jobCat;
  renderFilters();
  render();
});

$('#jobSearch')?.addEventListener('input', e => {
  state.search = e.target.value.trim();
  render();
});

/* ---------- Job detail modal ---------- */
const jobModal = $('#jobModal');
const jobModalBody = $('#jobModalBody');
const jobModalTitle = $('#jobModalTitle');

const openJobModal = id => {
  const j = JOBS.find(x => x.id === id);
  if (!j) return;

  jobModalTitle.textContent = j.title;

  jobModalBody.innerHTML = `
    <div class="space-y-4">

      <!-- Quick info -->
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div class="pdp-spec">
          <small>دپارتمان</small>
          <b>${j.deptLabel}</b>
        </div>
        <div class="pdp-spec">
          <small>نوع همکاری</small>
          <b>${j.typeLabel}</b>
        </div>
        <div class="pdp-spec">
          <small>موقعیت</small>
          <b>${j.location}</b>
        </div>
        <div class="pdp-spec">
          <small>حقوق (تومان)</small>
          <b>${j.salary}</b>
        </div>
      </div>

      <!-- Description -->
      <div class="rounded-2xl border border-border p-5">
        <b class="mb-2 block text-[12px] font-black">درباره‌ی نقش</b>
        <p class="text-[11px] leading-[2.2] text-[#4a5450]">${j.desc}</p>
      </div>

      <!-- Requirements -->
      <div class="rounded-2xl border border-border p-5">
        <b class="mb-3 block text-[12px] font-black">شرایط لازم</b>
        <ul class="space-y-2 text-[11px] leading-6 text-[#4a5450]">
          ${j.requirements.map(r => `
            <li class="flex items-start gap-2">
              <i class="ri-check-line mt-1 text-[13px] text-[#2e7d55]"></i>
              <span>${r}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Bonuses -->
      ${j.bonuses.length ? `
        <div class="rounded-2xl border border-border p-5">
          <b class="mb-3 block text-[12px] font-black">موارد امتیازآور</b>
          <ul class="space-y-2 text-[11px] leading-6 text-[#4a5450]">
            ${j.bonuses.map(b => `
              <li class="flex items-start gap-2">
                <i class="ri-add-line mt-1 text-[13px] text-accent-dark"></i>
                <span>${b}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}

      <!-- Actions -->
      <div class="flex flex-wrap gap-2 border-t border-dashed border-border pt-4">
        <button class="admin-btn admin-btn--primary" data-job-apply="${j.id}">
          <i class="ri-send-plane-line"></i> ارسال درخواست
        </button>
        <button class="admin-btn" data-job-share="${j.id}">
          <i class="ri-share-forward-line"></i> اشتراک‌گذاری
        </button>
      </div>

    </div>
  `;

  jobModal.classList.remove('hidden');
  jobModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeJobModal = () => {
  jobModal.classList.add('hidden');
  jobModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

$$('[data-job-close]').forEach(b => b.addEventListener('click', closeJobModal));
jobModal?.addEventListener('click', e => { if (e.target === jobModal) closeJobModal(); });

/* ---------- Apply modal ---------- */
const applyModal = $('#applyModal');
const applyForm = $('#applyForm');
const applyModalTitle = $('#applyModalTitle');

const openApplyModal = id => {
  const j = JOBS.find(x => x.id === id);
  if (!j) return;

  applyModalTitle.textContent = `درخواست برای ${j.title}`;
  applyForm.dataset.jobId = id;

  applyModal.classList.remove('hidden');
  applyModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};

const closeApplyModal = () => {
  applyModal.classList.add('hidden');
  applyModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  applyForm.reset();
  applyForm.dataset.jobId = '';
};

$$('[data-apply-close]').forEach(b => b.addEventListener('click', closeApplyModal));
applyModal?.addEventListener('click', e => { if (e.target === applyModal) closeApplyModal(); });

/* ---------- Actions ---------- */
document.addEventListener('click', e => {
  const viewBtn = e.target.closest('[data-job-view]');
  if (viewBtn) return openJobModal(+viewBtn.dataset.jobView);

  const applyBtn = e.target.closest('[data-job-apply]');
  if (applyBtn) {
    closeJobModal();
    return openApplyModal(+applyBtn.dataset.jobApply);
  }

  const shareBtn = e.target.closest('[data-job-share]');
  if (shareBtn) {
    const j = JOBS.find(x => x.id === +shareBtn.dataset.jobShare);
    if (!j) return;
    const url = `${window.location.origin}${window.location.pathname}#job-${j.id}`;
    if (navigator.share) {
      navigator.share({ title: `موقعیت شغلی: ${j.title}`, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(url);
      showToast('لینک موقعیت کپی شد.');
    }
  }
});

/* ---------- Apply form submit ---------- */
applyForm?.addEventListener('submit', e => {
  e.preventDefault();

  const fields = [
    { input: $('#afName'), check: v => v.trim().length >= 2, msg: 'نام را کامل وارد کنید.' },
    { input: $('#afEmail'), check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'ایمیل معتبر نیست.' },
    { input: $('#afPhone'), check: v => /^0?9\d{9}$/.test(v.replace(/\D/g, '')), msg: 'شماره موبایل معتبر نیست.' },
    { input: $('#afResume'), check: v => v.trim().length >= 8, msg: 'لینک رزومه را وارد کنید.' },
    { input: $('#afCover'), check: v => v.trim().length >= 20, msg: 'حداقل ۲۰ کاراکتر بنویسید.' },
  ];

  let valid = true;

  fields.forEach(f => {
    const field = f.input.closest('.field');
    const err = $('.error', field);
    const ok = f.check(f.input.value);
    field.classList.toggle('has-error', !ok);
    if (err) err.textContent = ok ? '' : f.msg;
    if (!ok) valid = false;
  });

  if (!valid) {
    showToast('لطفاً فیلدهای مشخص‌شده را کامل کنید.', 'error');
    return;
  }

  const btn = applyForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال ارسال...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
    closeApplyModal();
    showToast('درخواست شما با موفقیت ارسال شد. به‌زودی با شما تماس می‌گیریم.');
  }, 1200);
});

/* ---------- Clear errors on input ---------- */
applyForm?.addEventListener('input', e => {
  const field = e.target.closest('.field');
  if (field?.classList.contains('has-error')) {
    field.classList.remove('has-error');
    const err = $('.error', field);
    if (err) err.textContent = '';
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
  setTimeout(() => t.remove(), 2600);
}

/* ---------- Init ---------- */
renderFilters();
render();