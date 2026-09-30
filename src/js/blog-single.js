/* =========================================================
   Blog Single Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- داده‌های نظرات ---------- */
const COMMENTS = [
  {
    id: 1, name: 'نگار کریمی', initials: 'ن.ک',
    tint: 'from-[#8d98c5] to-[#2f3656]',
    date: '۲ روز پیش', likes: 18,
    text: 'خیلی مقاله کاربردی بود. من چند ساله تلاش می‌کنم عادت مطالعه رو در خودم بسازم و اینجا سه راهکار جدید پیدا کردم که حتماً امتحان می‌کنم. ممنون از تیم نِگار!',
  },
  {
    id: 2, name: 'حسین نوری', initials: 'ح.ن',
    tint: 'from-[#87927a] to-[#3b4a3f]',
    date: '۲ روز پیش', likes: 12,
    text: 'بخش «شروع کوچک» عالی بود. من همیشه هدف‌های بزرگ می‌گذاشتم و آخرش نمی‌تونستم ادامه بدم. از امروز ۵ صفحه در روز رو شروع می‌کنم.',
  },
  {
    id: 3, name: 'زهرا موسوی', initials: 'ز.م',
    tint: 'from-[#c58a80] to-[#4a221f]',
    date: '۱ روز پیش', likes: 8,
    text: 'نکته‌ی «دفتر یادداشت مطالعه» رو خیلی دوست داشتم. من از چند ماه پیش شروع کردم به یادداشت‌برداری و واقعاً حس می‌کنم کتاب‌ها بیشتر در ذهنم می‌مونن.',
  },
  {
    id: 4, name: 'مریم اکبری', initials: 'م.ا',
    tint: 'from-[#c0a17a] to-[#5a3f27]',
    date: '۱ روز پیش', likes: 5,
    text: 'من کتاب‌های صوتی رو هم به لیست‌هام اضافه کردم. برای مسیر رفت و برگشت به محل کار عالیه.',
  },
];

/* ---------- داده مقالات مرتبط ---------- */
const RELATED_ARTICLES = [
  {
    title: 'چند رمان کوتاه برای یک آخرهفته آرام',
    excerpt: 'پنج رمان کوتاه که می‌توانند یک آخرهفته‌ی خوب بسازند.',
    categoryLabel: 'راهنمای مطالعه',
    tint: 'from-[#e8d9cb] to-[#c89a75]',
    icon: 'ri-quill-pen-line', iconColor: 'text-[#88674d]',
    readTime: 5,
  },
  {
    title: 'چرا کتاب‌های کلاسیک را باید دوباره خواند؟',
    excerpt: 'هر بار که یک کتاب کلاسیک را دوباره می‌خوانیم، چیز تازه‌ای کشف می‌کنیم.',
    categoryLabel: 'جستار',
    tint: 'from-[#f0e4c8] to-[#c0a17a]',
    icon: 'ri-history-line', iconColor: 'text-[#5a3f27]',
    readTime: 7,
  },
  {
    title: 'گفت‌وگو با مریم رستگار: از سکوت تا نوشتن',
    excerpt: 'نویسنده‌ی «درختی که روی ماه رشد کرد» از روند نوشتن می‌گوید.',
    categoryLabel: 'گفت‌وگو',
    tint: 'from-[#fbe9d2] to-[#e5b57c]',
    icon: 'ri-mic-line', iconColor: 'text-[#a5622c]',
    readTime: 12,
  },
];

/* ---------- فهرست مطالب (TOC) ---------- */
const TOC = [
  { id: 'sec-1', title: 'چرا عادت مطالعه این‌قدر سخت است؟' },
  { id: 'sec-2', title: 'هفت راهکار عملی برای ساختن عادت مطالعه' },
  { id: 'sec-3', title: 'جمع‌بندی' },
];

const renderTOC = () => {
  const list = $('#tocList');
  if (!list) return;
  list.innerHTML = TOC.map(t => `
    <li>
      <a href="#${t.id}" class="toc-link" data-toc-target="${t.id}">
        <i class="ri-arrow-left-s-line"></i>
        ${t.title}
      </a>
    </li>
  `).join('');
};

/* ---------- اسکرول نرم روی TOC + فعال شدن با اسکرول ---------- */
$('#tocList')?.addEventListener('click', e => {
  const link = e.target.closest('[data-toc-target]');
  if (!link) return;
  e.preventDefault();
  const el = document.getElementById(link.dataset.tocTarget);
  if (el) {
    window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  }
});

if ('IntersectionObserver' in window) {
  const links = $$('[data-toc-target]');
  const targets = links.map(l => document.getElementById(l.dataset.tocTarget)).filter(Boolean);

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle('is-active', l.dataset.tocTarget === entry.target.id));
      }
    });
  }, { rootMargin: '-100px 0px -70% 0px' });

  targets.forEach(t => io.observe(t));
}

/* ---------- Share ---------- */
$$('[data-share]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const data = {
      title: document.title,
      text: 'چطور یک عادت مطالعه ماندگار بسازیم؟',
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(data.url);
        showToast('لینک مقاله کپی شد.');
      }
    } catch (_) {}
  });
});

$('#copyLink')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast('لینک مقاله کپی شد.');
  } catch (_) {
    showToast('کپی لینک ناموفق بود.', 'error');
  }
});

/* ---------- Bookmark ---------- */
$('[data-bookmark]')?.addEventListener('click', function () {
  const icon = $('i', this);
  const active = icon.classList.toggle('ri-bookmark-fill');
  icon.classList.toggle('ri-bookmark-line', !active);
  this.classList.toggle('is-active', active);
  showToast(active ? 'مقاله در علاقه‌مندی‌ها ذخیره شد.' : 'از علاقه‌مندی‌ها حذف شد.');
});

/* ---------- Social share buttons ---------- */
$$('.article-share').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('در حال انتقال به شبکه اجتماعی...');
  });
});

/* ---------- Comments ---------- */
let commentsShown = 3;
const commentsList = $('#commentsList');

const commentCardHTML = c => `
  <article class="blog-comment">
    <div class="blog-comment-avatar bg-gradient-to-br ${c.tint}">${c.initials}</div>
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div>
          <b class="text-[12px] font-black">${c.name}</b>
          <small class="mr-2 text-[10px] text-muted">${c.date}</small>
        </div>
      </div>
      <p class="mt-2 text-[11px] leading-[2] text-[#4a5450]">${c.text}</p>
      <div class="mt-3 flex items-center gap-4 text-[10px] text-muted">
        <button class="pdp-helpful" data-comment-like="${c.id}">
          <i class="ri-thumb-up-line"></i> پسندیدن (<span data-comment-likes="${c.id}">${faNum(c.likes)}</span>)
        </button>
        <button class="pdp-helpful">
          <i class="ri-chat-3-line"></i> پاسخ
        </button>
      </div>
    </div>
  </article>
`;

const renderComments = () => {
  if (!commentsList) return;
  const list = COMMENTS.slice(0, commentsShown);
  commentsList.innerHTML = list.map(commentCardHTML).join('');

  const loadMoreBtn = $('#loadMoreComments');
  if (loadMoreBtn) {
    loadMoreBtn.classList.toggle('hidden', commentsShown >= COMMENTS.length);
  }
};

$('#loadMoreComments')?.addEventListener('click', function () {
  this.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال بارگذاری...';
  setTimeout(() => {
    commentsShown += 3;
    renderComments();
    $('#loadMoreComments').innerHTML = 'مشاهده نظرات بیشتر <i class="ri-arrow-down-s-line"></i>';
  }, 700);
});

/* ---------- Comment like ---------- */
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-comment-like]');
  if (!btn) return;
  const id = +btn.dataset.commentLike;
  const c = COMMENTS.find(x => x.id === id);
  if (!c) return;

  const active = btn.classList.toggle('is-active');
  c.likes += active ? 1 : -1;
  const span = $(`[data-comment-likes="${id}"]`);
  if (span) span.textContent = faNum(c.likes);
});

/* ---------- Comment form ---------- */
$('#commentForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#cmName');
  const text = $('#cmText');
  let valid = true;

  const setError = (input, message) => {
    const field = input.closest('.field');
    field.classList.toggle('has-error', !!message);
    const err = $('.error', field);
    if (err) err.textContent = message || '';
  };

  if (name.value.trim().length < 2) { setError(name, 'نام را وارد کنید.'); valid = false; } else setError(name, '');
  if (text.value.trim().length < 5) { setError(text, 'نظر باید حداقل ۵ کاراکتر باشد.'); valid = false; } else setError(text, '');

  if (!valid) return;

  COMMENTS.unshift({
    id: Date.now(),
    name: name.value.trim(),
    initials: name.value.trim().split(' ').map(p => p[0]).join('.').slice(0, 3),
    tint: 'from-[#c58a80] to-[#4a221f]',
    date: 'همین حالا',
    likes: 0,
    text: text.value.trim(),
  });
  commentsShown = 3;
  renderComments();
  e.target.reset();
  showToast('نظر شما ثبت شد و پس از تأیید نمایش داده می‌شود.');
});

/* ---------- Newsletter ---------- */
$('#singleNewsletter')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('input', e.target);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
    return showToast('ایمیل معتبر نیست.', 'error');
  }
  input.value = '';
  showToast('عضویت شما در خبرنامه ثبت شد.');
});

/* ---------- مقالات مرتبط ---------- */
const renderRelated = () => {
  const grid = $('#relatedArticles');
  if (!grid) return;
  grid.innerHTML = RELATED_ARTICLES.map(a => `
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
        </div>
        <h3 class="mt-2 text-[13px] font-black leading-[1.6]">
          <a href="./blog-single.html" class="transition hover:text-accent-dark">${a.title}</a>
        </h3>
        <p class="mt-2 text-[11px] leading-[1.9] text-muted line-clamp-2">${a.excerpt}</p>
      </div>
    </article>
  `).join('');
};

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
renderTOC();
renderComments();
renderRelated();