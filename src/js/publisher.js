/* =========================================================
   Publisher Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- داده ---------- */
const BOOKS = [
  { id: 1, title: 'درختی که روی ماه رشد کرد', author: 'مریم رستگار', price: 289000, oldPrice: 320000, type: 'new', badge: 'تازه',
    cover: 'from-[#aebca7] to-[#334c45]', titleLines: 'درختی که<br>روی ماه رشد کرد', catLabel: 'رمان', rating: 4.7 },
  { id: 2, title: 'سمفونی خاموش', author: 'رضا قاسمی', price: 198000, oldPrice: null, type: 'bestseller', badge: 'پرفروش',
    cover: 'from-[#c9827b] to-[#4a2828]', titleLines: 'سمفونی<br>خاموش', catLabel: 'ادبیات', rating: 4.6 },
  { id: 3, title: 'روزهای بی‌تقویم', author: 'مریم رستگار', price: 245000, oldPrice: null, type: 'bestseller', badge: 'برنده جایزه',
    cover: 'from-[#c8a879] to-[#483b29]', titleLines: 'روزهای<br>بی‌تقویم', catLabel: 'رمان', rating: 4.9 },
  { id: 4, title: 'دنیای سوفی', author: 'یوستین گردر', price: 420000, oldPrice: null, type: 'bestseller', badge: null,
    cover: 'from-[#b8946b] to-[#4a3520]', titleLines: 'دنیای<br>سوفی', catLabel: 'فلسفه', rating: 4.8 },
  { id: 5, title: 'صبح بعد از باران', author: 'سارا محمودی', price: 225000, oldPrice: null, type: 'new', badge: 'جدید',
    cover: 'from-[#8f96b5] to-[#3b3f5e]', titleLines: 'صبح<br>بعد از باران', catLabel: 'داستان', rating: 4.4 },
  { id: 6, title: 'گلستان سعدی', author: 'سعدی شیرازی', price: 265000, oldPrice: null, type: 'classic', badge: 'کلاسیک',
    cover: 'from-[#a3936f] to-[#463a1c]', titleLines: 'گلستان<br>سعدی', catLabel: 'شعر', rating: 4.7 },
  { id: 7, title: 'ملت عشق', author: 'الیف شافاک', price: 395000, oldPrice: null, type: 'bestseller', badge: 'پرفروش',
    cover: 'from-[#c58a80] to-[#4a221f]', titleLines: 'ملت<br>عشق', catLabel: 'رمان', rating: 4.9 },
  { id: 8, title: 'فلسفه برای زندگی', author: 'ژولین باگینی', price: 320000, oldPrice: null, type: 'new', badge: null,
    cover: 'from-[#c0a17a] to-[#5a3f27]', titleLines: 'فلسفه<br>برای زندگی', catLabel: 'فلسفه', rating: 4.8 },
];

/* ---------- State ---------- */
const state = { filter: 'all' };

/* ---------- Render ---------- */
const render = () => {
  const list = state.filter === 'all' ? BOOKS : BOOKS.filter(b => b.type === state.filter);

  $('#publisherGrid').innerHTML = list.map(p => `
    <article class="product-card min-w-0">
      <div class="product-cover bg-gradient-to-br ${p.cover}">
        ${p.badge ? `<span class="absolute top-3 right-3 z-[2] rounded-full bg-white/15 px-2.5 py-1.5 text-[8px] backdrop-blur-[10px]">${p.badge}</span>` : ''}
        <button class="wish" aria-label="افزودن به علاقه‌مندی"><i class="ri-heart-3-line"></i></button>
        <div class="relative z-[1] text-[15px] font-black leading-snug sm:text-[18px]">${p.titleLines}</div>
        <div class="relative z-[1] mt-1 text-[10px] text-white/65">${p.author}</div>
      </div>
      <div class="px-[3px] py-3.5">
        <div class="flex items-center justify-between">
          <span class="text-[9px] text-[#9aa19e]">${p.catLabel}</span>
          <span class="flex items-center gap-1 text-[9px] text-[#f0b429]">
            <i class="ri-star-fill"></i> <b class="text-muted">${faNum(p.rating)}</b>
          </span>
        </div>
        <h3 class="mt-1 text-xs font-extrabold">${p.title}</h3>
        <div class="mt-3 flex items-center gap-2">
          <strong class="text-[10px] sm:text-xs">${tomanShort(p.price)} <small class="text-[8px] font-medium text-[#9aa19e]">تومان</small></strong>
          ${p.oldPrice ? `<del class="text-[9px] text-[#b0b5b2]">${tomanShort(p.oldPrice)}</del>` : ''}
          <button class="add-cart" aria-label="افزودن به سبد"><i class="ri-add-line"></i></button>
        </div>
      </div>
    </article>
  `).join('');
};

/* ---------- Filters ---------- */
$$('[data-publisher-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.publisherFilter;
    $$('[data-publisher-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
    render();
  });
});

/* ---------- Follow Publisher ---------- */
const followBtn = $('#followPublisher');
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
  if (span) span.textContent = isFollowing ? 'دنبال می‌کنید' : 'دنبال کردن ناشر';
  showToast(isFollowing ? 'ناشر را دنبال می‌کنید.' : 'دنبال کردن لغو شد.');
});

/* ---------- Share ---------- */
$('#publisherShare')?.addEventListener('click', async () => {
  const data = {
    title: 'نشر چشمه — نِگار',
    text: 'منتخب کتاب‌های نشر چشمه در فروشگاه نِگار',
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

/* ---------- Newsletter ---------- */
$('#publisherNewsletter')?.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('input', e.target);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
    return showToast('ایمیل معتبر نیست.', 'error');
  }
  input.value = '';
  showToast('عضویت شما در خبرنامه این ناشر ثبت شد.');
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
render();