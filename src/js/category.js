/* =========================================================
   Category Page — رندر داینامیک دسته‌ها و محصولات
   ========================================================= */

// const $ = (s, root = document) => root.querySelector(s);
// const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده‌های دسته‌ها ---------- */
const CATEGORIES = [
  {
    key: 'fiction', title: 'رمان و داستان', count: 480, icon: 'ri-book-open-line',
    desc: 'دنیاهای تازه، شخصیت‌های ماندگار', tint: 'from-[#aebca7] to-[#334c45]',
    subs: ['رمان ایرانی', 'رمان خارجی', 'داستان کوتاه', 'کلاسیک'],
  },
  {
    key: 'psychology', title: 'روان‌شناسی', count: 320, icon: 'ri-mental-health-line',
    desc: 'خودشناسی و رشد فردی', tint: 'from-[#c8a879] to-[#483b29]',
    subs: ['توسعه فردی', 'خودشناسی', 'اضطراب و افسردگی', 'روابط'],
  },
  {
    key: 'business', title: 'کسب‌وکار', count: 210, icon: 'ri-lightbulb-flash-line',
    desc: 'کارآفرینی، مدیریت، مالی', tint: 'from-[#7ea39a] to-[#254a41]',
    subs: ['کارآفرینی', 'مدیریت', 'بازاریابی', 'سرمایه‌گذاری'],
  },
  {
    key: 'history', title: 'تاریخ', count: 180, icon: 'ri-global-line',
    desc: 'ایران، جهان و تمدن‌ها', tint: 'from-[#c0a17a] to-[#5a3f27]',
    subs: ['تاریخ ایران', 'تاریخ جهان', 'تاریخ اسلام', 'تمدن‌ها'],
  },
  {
    key: 'kids', title: 'کودک و نوجوان', count: 540, icon: 'ri-magic-line',
    desc: 'داستان، رنگ، بازی و یادگیری', tint: 'from-[#e5b57c] to-[#8a5a20]',
    subs: ['۳-۶ سال', '۷-۱۲ سال', 'نوجوان', 'کمیک'],
  },
  {
    key: 'poetry', title: 'شعر', count: 140, icon: 'ri-quill-pen-line',
    desc: 'قلم‌هایی از دیروز تا امروز', tint: 'from-[#a3936f] to-[#463a1c]',
    subs: ['شعر کلاسیک', 'شعر معاصر', 'شعر جهان', 'تصحیح انتقادی'],
  },
  {
    key: 'philosophy', title: 'فلسفه', count: 260, icon: 'ri-brain-line',
    desc: 'پرسش‌هایی برای اندیشیدن', tint: 'from-[#b8946b] to-[#4a3520]',
    subs: ['فلسفه غرب', 'فلسفه شرق', 'فلسفه اخلاق', 'منطق'],
  },
  {
    key: 'art', title: 'هنر', count: 310, icon: 'ri-palette-line',
    desc: 'نقاشی، سینما، موسیقی', tint: 'from-[#c58a80] to-[#4a221f]',
    subs: ['نقاشی', 'سینما', 'موسیقی', 'عکاسی'],
  },
  {
    key: 'tech', title: 'فناوری', count: 140, icon: 'ri-code-s-slash-line',
    desc: 'برنامه‌نویسی و هوش مصنوعی', tint: 'from-[#8d98c5] to-[#2f3656]',
    subs: ['برنامه‌نویسی', 'هوش مصنوعی', 'طراحی', 'شبکه'],
  },
];

/* ---------- کتاب‌های نمونه برای هر دسته ---------- */
const BOOKS = {
  fiction: [
    { title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', price: 289000, badge: 'تازه',
      cover: 'from-[#aebca7] to-[#334c45]', catLabel: 'رمان' },
    { title: 'سمفونی خاموش', author: 'رضا قاسمی', price: 198000, badge: 'ویژه',
      cover: 'from-[#c9827b] to-[#4a2828]', catLabel: 'ادبیات فارسی' },
    { title: 'ملت عشق', author: 'الیف شافاک', price: 395000, badge: 'پرفروش',
      cover: 'from-[#c58a80] to-[#4a221f]', catLabel: 'رمان' },
    { title: 'صبح بعد از باران', author: 'سارا محمودی', price: 225000, badge: null,
      cover: 'from-[#8f96b5] to-[#3b3f5e]', catLabel: 'داستان' },
  ],
  kids: [
    { title: 'قصه‌های خوب برای بچه‌های خوب', author: 'گابریل گارسیا مارکز', price: 189000, badge: 'کودک',
      cover: 'from-[#e5b57c] to-[#8a5a20]', catLabel: 'کودک' },
    { title: 'ماهی سیاه کوچولو', author: 'صمد بهرنگی', price: 95000, badge: 'کلاسیک',
      cover: 'from-[#8fb5c0] to-[#28586b]', catLabel: 'داستان کودک' },
    { title: 'شازده کوچولو', author: 'آنتوان دو سنت اگزوپری', price: 145000, badge: 'پرفروش',
      cover: 'from-[#e6c878] to-[#7a561a]', catLabel: 'نوجوان' },
    { title: 'قصه‌های هزار و یک شب', author: 'ناشناس', price: 265000, badge: null,
      cover: 'from-[#c98966] to-[#6b3a13]', catLabel: 'کلاسیک' },
  ],
};

/* ---------- State ---------- */
let viewMode = 'grid';

/* ---------- Refs ---------- */
const grid = $('#categoryGrid');

/* ---------- HTML ---------- */
const catCardHTML = c => `
  <article class="cat-card" data-cat="${c.key}">
    <div class="cat-cover bg-gradient-to-br ${c.tint}">
      <span class="cat-icon"><i class="${c.icon}"></i></span>
      <span class="cat-count">${faNum(c.count)} عنوان</span>
      <div class="cat-title">
        <b>${c.title}</b>
        <small>${c.desc}</small>
      </div>
      <i class="ri-arrow-left-up-line cat-arrow"></i>
    </div>

    <div class="cat-subs">
      ${c.subs.map(s => `<a href="./shop.html" class="cat-sub">${s}</a>`).join('')}
    </div>

    <div class="cat-footer">
      <a href="./shop.html" class="cat-cta">
        مشاهده همه <i class="ri-arrow-left-line"></i>
      </a>
      <button class="cat-bookmark" type="button" aria-label="نشان‌گذاری">
        <i class="ri-bookmark-line"></i>
      </button>
    </div>
  </article>
`;

const bookCardHTML = b => `
  <article class="product-card min-w-0">
    <div class="product-cover bg-gradient-to-br ${b.cover}">
      ${b.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${b.badge}</span>` : ''}
      <button class="wish" aria-label="افزودن به علاقه‌مندی"><i class="ri-heart-3-line"></i></button>
      <div class="relative z-[1] text-[17px] font-black leading-snug sm:text-[20px]">${b.title}</div>
      <div class="relative z-[1] mt-1 text-[10px] text-white/65">${b.author}</div>
    </div>
    <div class="px-[3px] py-3.5">
      <span class="text-[9px] text-[#9aa19e]">${b.catLabel}</span>
      <h3 class="mt-1 text-xs font-extrabold">${b.title}</h3>
      <div class="mt-3 flex items-center gap-2">
        <strong class="text-[10px] sm:text-xs">${tomanShort(b.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
        <button class="add-cart" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>
      </div>
    </div>
  </article>
`;

/* ---------- Render ---------- */
const renderCategories = () => {
  grid.innerHTML = CATEGORIES.map(catCardHTML).join('');
  grid.classList.toggle('cat-grid--list', viewMode === 'list');
};

const renderFiction = () => {
  const wrap = $('#fictionGrid');
  if (wrap) wrap.innerHTML = (BOOKS.fiction || []).map(bookCardHTML).join('');
};

const renderKids = () => {
  const wrap = $('#kidsGrid');
  if (wrap) wrap.innerHTML = (BOOKS.kids || []).map(bookCardHTML).join('');
};

/* ---------- View toggle ---------- */
$$('[data-cat-view]').forEach(btn => {
  btn.addEventListener('click', () => {
    viewMode = btn.dataset.catView;
    $$('[data-cat-view]').forEach(b => b.classList.toggle('is-active', b === btn));
    grid.classList.toggle('cat-grid--list', viewMode === 'list');
  });
});

/* ---------- Bookmark toggle ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('.cat-bookmark');
  if (!b) return;
  const icon = $('i', b);
  if (!icon) return;
  icon.classList.toggle('ri-bookmark-line');
  icon.classList.toggle('ri-bookmark-fill');
  b.classList.toggle('is-active');
});

/* ---------- Init ---------- */
renderCategories();
renderFiction();
renderKids();