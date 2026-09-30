/* =========================================================
   Blog List Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- داده‌ها ---------- */
const CATEGORIES = [
  { id: 'all', label: 'همه', count: 148 },
  { id: 'guides', label: 'راهنمای مطالعه', count: 32 },
  { id: 'review', label: 'نقد و بررسی', count: 26 },
  { id: 'interview', label: 'گفت‌وگو', count: 18 },
  { id: 'essay', label: 'جستار', count: 24 },
  { id: 'news', label: 'خبرهای نشر', count: 30 },
  { id: 'topics', label: 'موضوعی', count: 18 },
];

const ARTICLES = [
  {
    id: 1, title: 'چطور یک عادت مطالعه ماندگار بسازیم؟',
    excerpt: 'همه‌ی ما می‌دانیم کتاب خواندن خوب است؛ اما چرا این‌قدر سخت است که شروع کنیم و ادامه دهیم؟ هفت راهکار عملی.',
    category: 'guides', categoryLabel: 'راهنمای مطالعه',
    author: 'سارا محمدی', authorInitials: 'س.م',
    authorTint: 'from-[#87927a] to-[#3b4a3f]',
    date: '۲ روز پیش', readTime: 8, views: 2450, comments: 24,
    tint: 'from-[#dce8dc] to-[#8fb5a5]',
    icon: 'ri-book-marked-line', iconColor: 'text-[#56735e]',
  },
  {
    id: 2, title: 'چند رمان کوتاه برای یک آخرهفته آرام',
    excerpt: 'اگر وقت کافی برای یک رمان طولانی ندارید، این پنج رمان کوتاه می‌توانند یک آخرهفته‌ی خوب بسازند.',
    category: 'guides', categoryLabel: 'راهنمای مطالعه',
    author: 'علی حکیمی', authorInitials: 'ع.ح',
    authorTint: 'from-[#c0a17a] to-[#5a3f27]',
    date: '۴ روز پیش', readTime: 5, views: 1820, comments: 14,
    tint: 'from-[#e8d9cb] to-[#c89a75]',
    icon: 'ri-quill-pen-line', iconColor: 'text-[#88674d]',
  },
  {
    id: 3, title: 'کتاب‌هایی که نگاهت به کار را تغییر می‌دهند',
    excerpt: 'این هفت کتاب، برای کسانی است که می‌خواهند در کارشان عمیق‌تر و مؤثرتر باشند — از «کار عمیق» تا «هدف».',
    category: 'topics', categoryLabel: 'موضوعی',
    author: 'نگار کریمی', authorInitials: 'ن.ک',
    authorTint: 'from-[#8d98c5] to-[#2f3656]',
    date: '۱ هفته پیش', readTime: 6, views: 3140, comments: 32,
    tint: 'from-[#d7dbea] to-[#8d98c5]',
    icon: 'ri-lightbulb-line', iconColor: 'text-[#5d658a]',
  },
  {
    id: 4, title: 'گفت‌وگو با مریم رستگار: از سکوت تا نوشتن',
    excerpt: 'نویسنده‌ی «درختی که روی ماه رشد کرد» از روند نوشتن، سکوت و ریشه‌هایی می‌گوید که در ماه می‌دوند.',
    category: 'interview', categoryLabel: 'گفت‌وگو',
    author: 'سارا محمدی', authorInitials: 'س.م',
    authorTint: 'from-[#87927a] to-[#3b4a3f]',
    date: '۱ هفته پیش', readTime: 12, views: 4210, comments: 48,
    tint: 'from-[#fbe9d2] to-[#e5b57c]',
    icon: 'ri-mic-line', iconColor: 'text-[#a5622c]',
  },
  {
    id: 5, title: 'نقدی بر «ملت عشق»: عشق میان دو جهان',
    excerpt: 'الیف شافاک در این رمان، دو روایت موازی می‌سازد که در نهایت به یک پرسش می‌رسند: عشق چه کاری با ما می‌کند؟',
    category: 'review', categoryLabel: 'نقد و بررسی',
    author: 'رضا کریمی', authorInitials: 'ر.ک',
    authorTint: 'from-[#c58a80] to-[#4a221f]',
    date: '۲ هفته پیش', readTime: 10, views: 2890, comments: 22,
    tint: 'from-[#f5d5d0] to-[#c58a80]',
    icon: 'ri-book-2-line', iconColor: 'text-[#a33226]',
  },
  {
    id: 6, title: 'چرا کتاب‌های کلاسیک را باید دوباره خواند؟',
    excerpt: 'هر بار که یک کتاب کلاسیک را دوباره می‌خوانیم، چیز تازه‌ای در آن کشف می‌کنیم — چون خودمان تغییر کرده‌ایم.',
    category: 'essay', categoryLabel: 'جستار',
    author: 'علی حکیمی', authorInitials: 'ع.ح',
    authorTint: 'from-[#c0a17a] to-[#5a3f27]',
    date: '۲ هفته پیش', readTime: 7, views: 1620, comments: 18,
    tint: 'from-[#f0e4c8] to-[#c0a17a]',
    icon: 'ri-history-line', iconColor: 'text-[#5a3f27]',
  },
  {
    id: 7, title: 'تازه‌های نشر ایران در پاییز ۱۴۰۵',
    excerpt: 'از میان بیش از ۲۰۰ عنوان کتاب تازه، ۱۰ کتاب را برای شما انتخاب کردیم که ارزش خواندن دارند.',
    category: 'news', categoryLabel: 'خبرهای نشر',
    author: 'نگار کریمی', authorInitials: 'ن.ک',
    authorTint: 'from-[#8d98c5] to-[#2f3656]',
    date: '۳ هفته پیش', readTime: 6, views: 1980, comments: 12,
    tint: 'from-[#dce6f5] to-[#8d98c5]',
    icon: 'ri-newspaper-line', iconColor: 'text-[#2f3656]',
  },
  {
    id: 8, title: 'چگونه برای بچه‌ها کتاب انتخاب کنیم؟',
    excerpt: 'انتخاب کتاب برای کودک، بیش از یک خرید ساده است. راهنمای والدین برای انتخاب کتاب متناسب با سن و علاقه.',
    category: 'guides', categoryLabel: 'راهنمای مطالعه',
    author: 'سارا محمدی', authorInitials: 'س.م',
    authorTint: 'from-[#87927a] to-[#3b4a3f]',
    date: '۳ هفته پیش', readTime: 9, views: 2340, comments: 28,
    tint: 'from-[#fbe9d2] to-[#e5b57c]',
    icon: 'ri-parent-line', iconColor: 'text-[#a5622c]',
  },
];

const POPULAR = [
  { id: 4, title: 'گفت‌وگو با مریم رستگار: از سکوت تا نوشتن', views: 4210 },
  { id: 3, title: 'کتاب‌هایی که نگاهت به کار را تغییر می‌دهند', views: 3140 },
  { id: 5, title: 'نقدی بر «ملت عشق»: عشق میان دو جهان', views: 2890 },
  { id: 1, title: 'چطور یک عادت مطالعه ماندگار بسازیم؟', views: 2450 },
];

const TAGS = [
  'رمان', 'داستان کوتاه', 'روان‌شناسی', 'کسب‌وکار', 'شعر',
  'فلسفه', 'کودک', 'کلاسیک', 'ادبیات زنان', 'نقد',
  'گفت‌وگو', 'تاریخ', 'خودشناسی', 'عادت‌ها',
];

/* ---------- State ---------- */
const state = {
  filter: 'all',
  search: '',
  sort: 'newest',
  visible: 6,
};

/* ---------- Refs ---------- */
const grid = $('#articlesGrid');
const emptyEl = $('#articlesEmpty');
const countEl = $('#articleCount');
const loadMoreWrap = $('#loadMoreWrap');
const loadMoreBtn = $('#loadMoreArticles');

/* ---------- Filter + Sort ---------- */
const getFiltered = () => {
  let list = ARTICLES.filter(a => {
    if (state.filter !== 'all' && a.category !== state.filter) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${a.title} ${a.excerpt} ${a.author}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  switch (state.sort) {
    case 'popular': list.sort((a, b) => b.views - a.views); break;
    case 'oldest':  list = [...list].reverse(); break;
    default:        /* newest — ترتیب اصلی */ break;
  }

  return list;
};

/* ---------- HTML ---------- */
const articleCardHTML = a => `
  <article class="blog-card">
    <a href="./blog-single.html" class="blog-card-cover bg-gradient-to-br ${a.tint}">
      <i class="ri-article-line absolute top-4 left-4 text-[16px] text-ink/25"></i>
      <i class="${a.icon} blog-card-icon ${a.iconColor}"></i>
      <span class="absolute top-4 right-4 z-[2] rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-black text-ink backdrop-blur-sm">
        ${a.categoryLabel}
      </span>
    </a>

    <div class="blog-card-body">
      <div class="flex items-center gap-3 text-[10px] text-muted">
        <span><i class="ri-time-line"></i> ${faNum(a.readTime)} دقیقه مطالعه</span>
        <span>·</span>
        <span><i class="ri-eye-line"></i> ${faNum(a.views)}</span>
      </div>

      <h3 class="mt-2 text-[14px] font-black leading-[1.6]">
        <a href="./blog-single.html" class="transition hover:text-accent-dark">${a.title}</a>
      </h3>

      <p class="mt-2 text-[11px] leading-[1.9] text-muted line-clamp-2">${a.excerpt}</p>

      <div class="mt-4 flex items-center justify-between gap-3 border-t border-dashed border-border pt-4">
        <div class="flex items-center gap-2.5">
          <div class="grid h-[32px] w-[32px] shrink-0 place-items-center rounded-full bg-gradient-to-br ${a.authorTint} text-[10px] font-black text-white">
            ${a.authorInitials}
          </div>
          <div class="min-w-0">
            <b class="block text-[10px] font-black">${a.author}</b>
            <small class="mt-0.5 block text-[9px] text-muted">${a.date}</small>
          </div>
        </div>

        <a href="./blog-single.html" class="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-ink hover:text-accent-dark">
          ادامه <i class="ri-arrow-left-line"></i>
        </a>
      </div>
    </div>
  </article>
`;

/* ---------- Render ---------- */
const renderCategories = () => {
  const wrap = $('#blogCategories');
  wrap.innerHTML = CATEGORIES.map(c => `
    <button class="blog-chip ${c.id === state.filter ? 'is-active' : ''}" data-blog-cat="${c.id}">
      ${c.label}
      <span class="blog-chip-count">${faNum(c.count)}</span>
    </button>
  `).join('');
};

const renderArticles = () => {
  const list = getFiltered();
  countEl.textContent = `(${faNum(list.length)})`;

  const items = list.slice(0, state.visible);

  if (!items.length) {
    grid.innerHTML = '';
    grid.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
    loadMoreWrap.classList.add('hidden');
    return;
  }

  grid.classList.remove('hidden');
  emptyEl.classList.add('hidden');
  emptyEl.classList.remove('flex');
  grid.innerHTML = items.map(articleCardHTML).join('');

  if (list.length > state.visible) {
    loadMoreWrap.classList.remove('hidden');
  } else {
    loadMoreWrap.classList.add('hidden');
  }
};

/* ---------- Sidebar: popular + tags ---------- */
const renderPopular = () => {
  $('#popularPosts').innerHTML = POPULAR.map((p, i) => `
    <li>
      <a href="./blog-single.html" class="blog-popular-item">
        <span class="blog-popular-rank ${i === 0 ? 'is-first' : i < 3 ? 'is-top' : ''}">${faNum(i + 1)}</span>
        <div class="min-w-0 flex-1">
          <b class="line-clamp-2 text-[11px] font-bold leading-5 transition hover:text-accent-dark">${p.title}</b>
          <small class="mt-1 block text-[9px] text-muted">
            <i class="ri-eye-line"></i> ${faNum(p.views)} بازدید
          </small>
        </div>
      </a>
    </li>
  `).join('');
};

const renderTags = () => {
  $('#blogTags').innerHTML = TAGS.map(t => `
    <button class="blog-tag" data-tag="${t}">#${t}</button>
  `).join('');
};

/* ---------- Events ---------- */
$('#blogCategories')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-blog-cat]');
  if (!btn) return;
  state.filter = btn.dataset.blogCat;
  state.visible = 6;
  renderCategories();
  renderArticles();
});

$('#blogSearch')?.addEventListener('input', e => {
  state.search = e.target.value.trim();
  state.visible = 6;
  renderArticles();
});

$('#blogSort')?.addEventListener('change', e => {
  state.sort = e.target.value;
  renderArticles();
});

loadMoreBtn?.addEventListener('click', () => {
  state.visible += 4;
  renderArticles();
});

$('#blogTags')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-tag]');
  if (!btn) return;
  const tag = btn.dataset.tag;
  const input = $('#blogSearch');
  if (input) {
    input.value = tag;
    state.search = tag;
    state.visible = 6;
    renderArticles();
    showToast(`جست‌وجو برای برچسب «${tag}»`);
  }
});

/* ---------- Newsletter ---------- */
$('#blogNewsletter')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('input', e.target);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
    return showToast('ایمیل معتبر نیست.', 'error');
  }
  input.value = '';
  showToast('عضویت شما در خبرنامه ثبت شد.');
});

/* ---------- Toast ---------- */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[100] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

/* ---------- Init ---------- */
renderCategories();
renderArticles();
renderPopular();
renderTags();