/* =========================================================
   Search Result Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده ---------- */
const RESULTS = [
  { id: 1, type: 'book', title: 'ملت عشق', author: 'الیف شافاک', publisher: 'نشر مرکز', price: 395000, oldPrice: null,
    rating: 4.9, reviews: 428, badge: 'پرفروش', catLabel: 'رمان',
    cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق',
    excerpt: 'رمانی درباره‌ی عشق، شمس و مولانا؛ روایتی که سال‌هاست در دل میلیون‌ها خواننده در سراسر جهان جا باز کرده.' },
  { id: 2, type: 'book', title: 'ملت عشق (نسخه جیبی)', author: 'الیف شافاک', publisher: 'نشر مرکز', price: 195000, oldPrice: null,
    rating: 4.7, reviews: 182, badge: null, catLabel: 'رمان',
    cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق',
    excerpt: 'نسخه‌ی جیبی و سبک رمان ملت عشق، مناسب سفر و هدیه.' },
  { id: 3, type: 'book', title: 'چهل قاعده‌ی عشق', author: 'الیف شافاک', publisher: 'نشر مرکز', price: 310000, oldPrice: null,
    rating: 4.8, reviews: 264, badge: null, catLabel: 'رمان',
    cover: 'from-[#b8946b] to-[#4a3520]', titleLines: 'چهل<br>قاعده‌ی عشق',
    excerpt: 'کتابی دیگر از الیف شافاک درباره‌ی عشق، پیوند و معنا در زندگی روزمره.' },
  { id: 4, type: 'book', title: 'عشق در سال‌های وبا', author: 'گابریل گارسیا مارکز', publisher: 'نشر چشمه', price: 340000, oldPrice: null,
    rating: 4.7, reviews: 198, badge: null, catLabel: 'رمان',
    cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'عشق در<br>سال‌های وبا',
    excerpt: 'شاهکار گابریل گارسیا مارکز درباره‌ی عشقی که در طول دهه‌ها دوام می‌آورد.' },
  { id: 5, type: 'book', title: 'جزء از کل', author: 'استیو تولتز', publisher: 'نشر چشمه', price: 420000, oldPrice: null,
    rating: 4.9, reviews: 342, badge: 'پرفروش', catLabel: 'رمان',
    cover: 'from-[#87927a] to-[#3b4a3f]', titleLines: 'جزء<br>از کل',
    excerpt: 'رمانی پرفروش از استیو تولتز با روایتی جذاب و شخصیت‌هایی ماندگار.' },
  { id: 6, type: 'book', title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', publisher: 'نشر نی', price: 345000, oldPrice: null,
    rating: 4.9, reviews: 218, badge: null, catLabel: 'تفکر',
    cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'هنر<br>شفاف اندیشیدن',
    excerpt: 'کتابی درباره‌ی خطاهای شناختی و تصمیم‌گیری بهتر در زندگی.' },
  { id: 7, type: 'book', title: 'دنیای سوفی', author: 'یوستین گردر', publisher: 'نشر چشمه', price: 420000, oldPrice: null,
    rating: 4.8, reviews: 298, badge: null, catLabel: 'فلسفه',
    cover: 'from-[#b8946b] to-[#4a3520]', titleLines: 'دنیای<br>سوفی',
    excerpt: 'یک رمان فلسفی درباره‌ی تاریخ اندیشه و پرسش‌های بنیادین بشر.' },
  { id: 8, type: 'book', title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', publisher: 'نشر چشمه', price: 289000, oldPrice: 320000,
    rating: 4.7, reviews: 124, badge: 'تازه', catLabel: 'رمان',
    cover: 'from-[#aebca7] to-[#334c45]', titleLines: 'درختی که<br>روی ماه رشد کرد',
    excerpt: 'روایتی شاعرانه درباره‌ی رشد، پذیرش و پیدا کردن نور در تاریک‌ترین شب‌ها.' },

  // نویسندگان
  { id: 9, type: 'author', title: 'الیف شافاک', publisher: 'ترکیه', rating: 4.9, booksCount: 6,
    initials: 'ا.ش', tint: 'from-[#c58a80] to-[#4a221f]',
    excerpt: 'نویسنده‌ی ترک‌تبار و خالق رمان‌های پرفروشی چون «ملت عشق» و «چهل قاعده‌ی عشق».' },
  { id: 10, type: 'author', title: 'مریم رستگار', publisher: 'ایران', rating: 4.8, booksCount: 8,
    initials: 'م.ر', tint: 'from-[#87927a] to-[#3b4a3f]',
    excerpt: 'نویسنده‌ی معاصر ایرانی با زبانی شاعرانه و آثاری چون «روزهای بی‌تقویم».' },

  // ناشران
  { id: 11, type: 'publisher', title: 'نشر مرکز', publisher: 'تهران', rating: 4.8, booksCount: 320,
    initials: 'م', tint: 'from-[#8d98c5] to-[#2f3656]',
    excerpt: 'یکی از قدیمی‌ترین و معتبرترین ناشران ایرانی با تمرکز روی ادبیات و علوم انسانی.' },
  { id: 12, type: 'publisher', title: 'نشر چشمه', publisher: 'تهران', rating: 4.9, booksCount: 486,
    initials: 'چ', tint: 'from-[#c0a17a] to-[#5a3f27]',
    excerpt: 'خانه‌ی ادبیات معاصر ایران و ناشر آثار نویسندگان بزرگ معاصر.' },

  // مقاله
  { id: 13, type: 'article', title: 'نقدی بر «ملت عشق»: عشق میان دو جهان', publisher: 'مجله نِگار',
    rating: 4.6, readTime: 10, categoryLabel: 'نقد و بررسی',
    cover: 'from-[#f5d5d0] to-[#c58a80]', icon: 'ri-book-2-line', iconColor: 'text-[#a33226]',
    excerpt: 'الیف شافاک در این رمان، دو روایت موازی می‌سازد که در نهایت به یک پرسش می‌رسند: عشق چه کاری با ما می‌کند؟' },
];

/* ---------- State ---------- */
const state = {
  tab: 'all',
  sort: 'relevance',
  query: 'ملت عشق',
  visible: 6,
};

/* ---------- Refs ---------- */
const list = $('#searchResults');
const emptyEl = $('#searchEmpty');
const loadWrap = $('#searchLoadWrap');
const countEl = $('#resultCount');
const queryLabel = $('#searchQueryLabel');

/* ---------- Filter + Sort ---------- */
const getFiltered = () => {
  let filtered = state.tab === 'all'
    ? RESULTS
    : RESULTS.filter(r => r.type === state.tab);

  if (state.sort === 'priceLow') filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
  else if (state.sort === 'priceHigh') filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
  else if (state.sort === 'rating') filtered = [...filtered].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return filtered;
};

/* ---------- Renderer ---------- */
const bookCard = r => `
  <article class="search-card">
    <div class="search-card-cover bg-gradient-to-br ${r.cover}">
      ${r.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${r.badge}</span>` : ''}
      <div class="relative z-[1] text-center text-[13px] font-black leading-snug text-white">${r.titleLines}</div>
    </div>

    <div class="search-card-body">
      <div class="flex flex-wrap items-center gap-2 text-[10px]">
        <span class="rounded-full bg-bg px-2.5 py-1 font-black text-muted">${r.catLabel}</span>
        <span class="text-muted"><i class="ri-building-2-line"></i> ${r.publisher}</span>
      </div>

      <h3 class="mt-2 text-[14px] font-black leading-[1.6]">
        <a href="./product.html" class="transition hover:text-accent-dark">${r.title}</a>
      </h3>
      <p class="mt-1 text-[11px] text-muted">نوشته <a href="./author.html" class="font-bold text-ink underline decoration-dotted">${r.author}</a></p>
      <p class="mt-2 line-clamp-2 text-[11px] leading-[1.9] text-[#4a5450]">${r.excerpt}</p>

      <div class="mt-3 flex flex-wrap items-center gap-3">
        <div class="flex items-center gap-1 text-[10px] text-[#f0b429]">
          <i class="ri-star-fill"></i>
          <b class="text-ink">${faNum(r.rating)}</b>
          <span class="text-muted">(${faNum(r.reviews)} نظر)</span>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2 border-t border-dashed border-border pt-3">
        <strong class="text-[12px]">${tomanShort(r.price)} <small class="text-[8px] font-medium text-muted">تومان</small></strong>
        ${r.oldPrice ? `<del class="text-[10px] text-[#b0b5b2]">${tomanShort(r.oldPrice)}</del>` : ''}
        <button class="add-cart mr-auto" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>
      </div>
    </div>
  </article>
`;

const authorCard = r => `
  <article class="search-card">
    <div class="search-card-avatar bg-gradient-to-br ${r.tint}">${r.initials}</div>
    <div class="search-card-body">
      <span class="rounded-full bg-bg px-2.5 py-1 text-[10px] font-black text-muted">نویسنده</span>
      <h3 class="mt-2 text-[14px] font-black">
        <a href="./author.html" class="transition hover:text-accent-dark">${r.title}</a>
      </h3>
      <p class="mt-1 text-[11px] text-muted">${r.publisher} · ${faNum(r.booksCount)} کتاب در نِگار</p>
      <p class="mt-2 text-[11px] leading-[1.9] text-[#4a5450]">${r.excerpt}</p>
      <a href="./author.html" class="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-ink hover:text-accent-dark">
        مشاهده پروفایل <i class="ri-arrow-left-line"></i>
      </a>
    </div>
  </article>
`;

const publisherCard = r => `
  <article class="search-card">
    <div class="search-card-avatar !rounded-[18px] bg-gradient-to-br ${r.tint}">${r.initials}</div>
    <div class="search-card-body">
      <span class="rounded-full bg-bg px-2.5 py-1 text-[10px] font-black text-muted">ناشر</span>
      <h3 class="mt-2 text-[14px] font-black">
        <a href="./publisher.html" class="transition hover:text-accent-dark">${r.title}</a>
      </h3>
      <p class="mt-1 text-[11px] text-muted">${r.publisher} · ${faNum(r.booksCount)} عنوان کتاب</p>
      <p class="mt-2 text-[11px] leading-[1.9] text-[#4a5450]">${r.excerpt}</p>
      <a href="./publisher.html" class="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-ink hover:text-accent-dark">
        مشاهده ناشر <i class="ri-arrow-left-line"></i>
      </a>
    </div>
  </article>
`;

const articleCard = r => `
  <article class="search-card">
    <div class="search-card-cover !min-h-[120px] bg-gradient-to-br ${r.cover}">
      <i class="${r.icon} text-[36px] text-white/80"></i>
    </div>
    <div class="search-card-body">
      <span class="rounded-full bg-bg px-2.5 py-1 text-[10px] font-black text-muted">${r.categoryLabel}</span>
      <h3 class="mt-2 text-[14px] font-black leading-[1.6]">
        <a href="./blog-single.html" class="transition hover:text-accent-dark">${r.title}</a>
      </h3>
      <p class="mt-1 text-[11px] text-muted"><i class="ri-time-line"></i> ${faNum(r.readTime)} دقیقه مطالعه</p>
      <p class="mt-2 line-clamp-2 text-[11px] leading-[1.9] text-[#4a5450]">${r.excerpt}</p>
      <a href="./blog-single.html" class="mt-3 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-ink hover:text-accent-dark">
        مطالعه مقاله <i class="ri-arrow-left-line"></i>
      </a>
    </div>
  </article>
`;

const cardFor = r => {
  if (r.type === 'author') return authorCard(r);
  if (r.type === 'publisher') return publisherCard(r);
  if (r.type === 'article') return articleCard(r);
  return bookCard(r);
};

/* ---------- Render ---------- */
const render = () => {
  const all = getFiltered();
  const items = all.slice(0, state.visible);

  countEl.textContent = faNum(all.length);

  if (!items.length) {
    list.innerHTML = '';
    list.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    loadWrap.classList.add('hidden');
    return;
  }

  list.classList.remove('hidden');
  emptyEl.classList.add('hidden');
  emptyEl.classList.remove('flex');
  list.innerHTML = items.map(cardFor).join('');
  loadWrap.classList.toggle('hidden', all.length <= state.visible);
};

/* ---------- Tabs ---------- */
$$('[data-search-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.tab = btn.dataset.searchTab;
    state.visible = 6;
    $$('[data-search-tab]').forEach(b => b.classList.toggle('is-active', b === btn));
    render();
  });
});

/* ---------- Sort ---------- */
$('#searchSort')?.addEventListener('change', e => {
  state.sort = e.target.value;
  render();
});

/* ---------- Load more ---------- */
$('#searchLoadMore')?.addEventListener('click', function () {
  this.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال بارگذاری...';
  setTimeout(() => {
    state.visible += 6;
    render();
    this.innerHTML = '<i class="ri-add-line"></i> نمایش نتایج بیشتر';
  }, 500);
});

/* ---------- Clear filters ---------- */
$('#searchClearFilters')?.addEventListener('click', () => {
  $$('.filter-cat').forEach(cb => (cb.checked = false));
  $$('.search-filter-block input[type="number"]').forEach(i => (i.value = ''));
  $$('.search-filter-block input[type="checkbox"]:not(.filter-cat)').forEach(i => (i.checked = false));
  showToast('فیلترها پاک شدند.');
});

/* ---------- Prefill query from URL ---------- */
const params = new URLSearchParams(location.search);
const q = params.get('q');
if (q) {
  queryLabel.textContent = q;
  $('#searchInput').value = q;
}

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