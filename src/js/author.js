/* =========================================================
   Author Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده‌های کتاب‌ها ---------- */
const BOOKS = [
  {
    id: 1,
    title: 'درختی که روی ماه رشد کرد',
    year: '۱۴۰۵',
    type: 'novel',
    typeLabel: 'رمان',
    pages: 288,
    price: 289000,
    oldPrice: 320000,
    rating: 4.7,
    badge: 'تازه',
    cover: 'from-[#aebca7] to-[#334c45]',
    titleLines: 'درختی که<br>روی ماه رشد کرد',
    excerpt: 'زنی که در میانه‌ی جدایی، ریشه‌هایش را در جایی می‌کاود که انتظار ندارد.',
  },
  {
    id: 2,
    title: 'سمفونی خاموش',
    year: '۱۴۰۳',
    type: 'novel',
    typeLabel: 'رمان',
    pages: 240,
    price: 198000,
    oldPrice: null,
    rating: 4.6,
    badge: 'ویژه',
    cover: 'from-[#c9827b] to-[#4a2828]',
    titleLines: 'سمفونی<br>خاموش',
    excerpt: 'روایت مادری که با موسیقی سکوت، زبان تازه‌ای برای گریه پیدا می‌کند.',
  },
  {
    id: 3,
    title: 'روزهای بی‌تقویم',
    year: '۱۳۹۸',
    type: 'novel',
    typeLabel: 'رمان',
    pages: 310,
    price: 245000,
    oldPrice: null,
    rating: 4.9,
    badge: 'برنده جایزه',
    cover: 'from-[#c8a879] to-[#483b29]',
    titleLines: 'روزهای<br>بی‌تقویم',
    excerpt: 'داستان زنی که از همه‌چیز خسته است و تصمیم می‌گیرد یک سال بیهیچ برنامه زندگی کند.',
  },
  {
    id: 4,
    title: 'بوی چای در خانه‌ی خالی',
    year: '۱۴۰۱',
    type: 'story',
    typeLabel: 'داستان کوتاه',
    pages: 168,
    price: 175000,
    oldPrice: 200000,
    rating: 4.5,
    badge: null,
    cover: 'from-[#87927a] to-[#3b4a3f]',
    titleLines: 'بوی چای<br>در خانه‌ی خالی',
    excerpt: 'یازده داستان کوتاه درباره‌ی فقدان، خانه و چیزهایی که دیگر نیستند.',
  },
  {
    id: 5,
    title: 'خاطرات یک کوچه',
    year: '۱۳۹۵',
    type: 'novel',
    typeLabel: 'رمان',
    pages: 268,
    price: 210000,
    oldPrice: null,
    rating: 4.4,
    badge: null,
    cover: 'from-[#8d98c5] to-[#2f3656]',
    titleLines: 'خاطرات<br>یک کوچه',
    excerpt: 'یک کوچه، سه نسل، و یک راز که همه می‌دانند ولی هیچ‌کس نمی‌گوید.',
  },
  {
    id: 6,
    title: 'پنجره‌ای به حیاط پشتی',
    year: '۱۳۹۲',
    type: 'story',
    typeLabel: 'داستان کوتاه',
    pages: 140,
    price: 155000,
    oldPrice: null,
    rating: 4.3,
    badge: null,
    cover: 'from-[#c58a80] to-[#4a221f]',
    titleLines: 'پنجره‌ای<br>به حیاط پشتی',
    excerpt: 'نه داستان کوتاه درباره‌ی زندگی در آپارتمان‌هایی که هیچ‌کس همسایه‌اش را نمی‌شناسد.',
  },
  {
    id: 7,
    title: 'پیش از آنکه باران بیاید',
    year: '۱۳۹۰',
    type: 'novel',
    typeLabel: 'رمان',
    pages: 232,
    price: 185000,
    oldPrice: null,
    rating: 4.2,
    badge: 'اولین کتاب',
    cover: 'from-[#b8946b] to-[#4a3520]',
    titleLines: 'پیش از آنکه<br>باران بیاید',
    excerpt: 'اولین رمان مریم رستگار درباره‌ی دختری که منتظر آمدن پدرش است.',
  },
  {
    id: 8,
    title: 'سنگ‌های کوچک روی میز',
    year: '۱۴۰۲',
    type: 'story',
    typeLabel: 'داستان کوتاه',
    pages: 152,
    price: 168000,
    oldPrice: null,
    rating: 4.6,
    badge: null,
    cover: 'from-[#7ea39a] to-[#254a41]',
    titleLines: 'سنگ‌های کوچک<br>روی میز',
    excerpt: 'دوازده داستان کوتاه درباره‌ی آدم‌های معمولی که یک اتفاق کوچک زندگی‌شان را عوض می‌کند.',
  },
];

/* ---------- State ---------- */
const state = {
  filter: 'all',
};

/* ---------- Refs ---------- */
const booksGrid = $('#booksGrid');

/* ---------- Book card ---------- */
const bookCardHTML = b => `
  <article class="product-card min-w-0" data-book-type="${b.type}">
    <div class="product-cover bg-gradient-to-br ${b.cover}">
      ${b.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${b.badge}</span>` : ''}
      <button class="wish" aria-label="افزودن به علاقه‌مندی"><i class="ri-heart-3-line"></i></button>
      <div class="relative z-[1] text-[15px] font-black leading-snug sm:text-[18px]">${b.titleLines}</div>
      <div class="relative z-[1] mt-1 text-[10px] text-white/65">مریم رستگار — ${b.year}</div>
    </div>
    <div class="px-[3px] py-3.5">
      <div class="flex items-center justify-between">
        <span class="text-[9px] text-[#9aa19e]">${b.typeLabel}</span>
        <span class="flex items-center gap-1 text-[9px] text-[#f0b429]">
          <i class="ri-star-fill"></i>
          <b class="text-muted">${faNum(b.rating)}</b>
        </span>
      </div>
      <h3 class="mt-1 text-xs font-extrabold">${b.title}</h3>
      <p class="mt-1 line-clamp-2 text-[9px] leading-5 text-muted">${b.excerpt}</p>
      <div class="mt-3 flex items-center gap-2">
        <strong class="text-[10px] sm:text-xs">${tomanShort(b.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
        ${b.oldPrice ? `<del class="text-[9px] text-[#b0b5b2]">${tomanShort(b.oldPrice)}</del>` : ''}
        <button class="add-cart" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>
      </div>
    </div>
  </article>
`;

/* ---------- Render ---------- */
const renderBooks = () => {
  const list = state.filter === 'all'
    ? BOOKS
    : BOOKS.filter(b => b.type === state.filter);

  booksGrid.innerHTML = list.map(bookCardHTML).join('');
};

/* ---------- Book filters ---------- */
$$('[data-books-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.booksFilter;
    $$('[data-books-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
    renderBooks();
  });
});

/* ---------- Follow Author ---------- */
const followBtn = $('#followAuthor');
let isFollowing = false;
followBtn?.addEventListener('click', () => {
  isFollowing = !isFollowing;
  followBtn.classList.toggle('is-active', isFollowing);
  const icon = $('i', followBtn);
  const span = $('span', followBtn);
  if (icon) {
    icon.classList.toggle('ri-user-add-line', !isFollowing);
    icon.classList.toggle('ri-user-follow-line', isFollowing);
  }
  if (span) {
    span.textContent = isFollowing ? 'دنبال می‌کنید' : 'دنبال کردن';
  }
  showToast(isFollowing ? 'این نویسنده را دنبال می‌کنید.' : 'دنبال کردن لغو شد.');
});

/* ---------- Share ---------- */
$('#shareAuthor')?.addEventListener('click', async () => {
  const data = {
    title: document.title,
    text: 'مریم رستگار — نویسنده‌ی رمان و داستان کوتاه | نِگار',
    url: window.location.href,
  };
  try {
    if (navigator.share) await navigator.share(data);
    else {
      await navigator.clipboard.writeText(data.url);
      showToast('لینک کپی شد.');
    }
  } catch (_) {}
});

/* ---------- Message ---------- */
$('#messageAuthor')?.addEventListener('click', () => {
  showToast('برای ارسال پیام، ابتدا وارد حساب کاربری شوید.');
});

/* ---------- Newsletter ---------- */
$('#authorNewsletter')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('input', e.target);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
    return showToast('ایمیل معتبر نیست.', 'error');
  }
  input.value = '';
  showToast('عضویت شما در خبرنامه این نویسنده ثبت شد.');
});

/* ---------- Smooth scroll to sections + active state ---------- */
const tabs = $$('.author-tab');
const sections = ['about', 'books', 'quotes', 'events', 'reviews']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const setActiveTab = id => {
  tabs.forEach(t => t.classList.toggle('is-active', t.getAttribute('href') === '#' + id));
};

tabs.forEach(tab => tab.addEventListener('click', e => {
  const target = tab.getAttribute('href');
  if (!target?.startsWith('#')) return;
  e.preventDefault();
  const el = document.querySelector(target);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top: y, behavior: 'smooth' });
  setActiveTab(target.slice(1));
}));

// Observer برای هماهنگی با اسکرول
if ('IntersectionObserver' in window && sections.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveTab(entry.target.id);
    });
  }, { rootMargin: '-100px 0px -60% 0px' });
  sections.forEach(s => io.observe(s));
}

/* ---------- Modal نوشتن نظر ---------- */
const modal = $('#authorReviewModal');
const form = $('#authorReviewForm');
const ratingValue = $('#authorRatingValue');

const openModal = () => {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};
const closeModal = () => {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};

$('#writeAuthorReview')?.addEventListener('click', openModal);
$$('[data-author-review-close]').forEach(b => b.addEventListener('click', closeModal));
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

/* ---------- ستاره‌های نظردهی ---------- */
const starWrap = $('#authorReviewStars');
starWrap?.addEventListener('click', e => {
  const btn = e.target.closest('[data-star]');
  if (!btn) return;
  const val = +btn.dataset.star;
  ratingValue.value = val;
  $$('[data-star]', starWrap).forEach((b, i) => {
    const icon = $('i', b);
    const active = i < val;
    icon.classList.toggle('ri-star-fill', active);
    icon.classList.toggle('ri-star-line', !active);
  });
});

/* ---------- Submit review ---------- */
form?.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#authorReviewName');
  const text = $('#authorReviewText');
  let valid = true;

  if (!ratingValue.value || ratingValue.value === '0') {
    showToast('لطفاً امتیاز خود را انتخاب کنید.', 'error');
    valid = false;
  }
  if (text.value.trim().length < 5) {
    const field = text.closest('.field');
    field.classList.add('has-error');
    $('.error', field).textContent = 'نظر باید حداقل ۵ کاراکتر باشد.';
    valid = false;
  }
  if (name.value.trim().length < 2) {
    const field = name.closest('.field');
    field.classList.add('has-error');
    $('.error', field).textContent = 'نام را وارد کنید.';
    valid = false;
  }

  if (!valid) return;

  showToast('نظر شما با موفقیت ثبت شد و پس از تأیید نمایش داده می‌شود.');
  closeModal();
  form.reset();
  ratingValue.value = '0';
  $$('[data-star]', starWrap).forEach(b => {
    const icon = $('i', b);
    icon.classList.add('ri-star-line');
    icon.classList.remove('ri-star-fill');
  });
});

/* ---------- پاک کردن خطا هنگام تایپ ---------- */
form?.addEventListener('input', e => {
  const field = e.target.closest('.field');
  if (field?.classList.contains('has-error')) {
    field.classList.remove('has-error');
    const err = $('.error', field);
    if (err) err.textContent = '';
  }
});

/* ---------- Helpful feedback ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('.pdp-helpful');
  if (!btn) return;
  btn.classList.toggle('is-active');
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
renderBooks();