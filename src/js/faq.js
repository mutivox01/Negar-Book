/* =========================================================
   FAQ Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- دسته‌ها ---------- */
const CATEGORIES = [
  { id: 'all', label: 'همه سوالات', icon: 'ri-apps-2-line' },
  { id: 'order', label: 'سفارش و خرید', icon: 'ri-shopping-bag-3-line' },
  { id: 'shipping', label: 'ارسال و تحویل', icon: 'ri-truck-line' },
  { id: 'payment', label: 'پرداخت', icon: 'ri-bank-card-line' },
  { id: 'return', label: 'بازگشت و مرجوعی', icon: 'ri-refresh-line' },
  { id: 'account', label: 'حساب کاربری', icon: 'ri-user-3-line' },
  { id: 'product', label: 'کتاب و محصول', icon: 'ri-book-2-line' },
];

/* ---------- سوالات ---------- */
const FAQS = [
  {
    id: 1, cat: 'order',
    q: 'چطور می‌توانم یک سفارش جدید ثبت کنم؟',
    a: 'برای ثبت سفارش، کافیست کتاب موردنظرتان را از فروشگاه انتخاب کنید و روی «افزودن به سبد» بزنید. سپس به سبد خرید بروید، گزینه «تسویه حساب» را انتخاب کنید، اطلاعات ارسال و پرداخت را وارد کنید و سفارش را نهایی کنید. بعد از پرداخت، کد پیگیری برای شما پیامک می‌شود.',
  },
  {
    id: 2, cat: 'order',
    q: 'آیا می‌توانم سفارشم را بعد از ثبت، ویرایش کنم؟',
    a: 'تا پیش از ارسال سفارش، می‌توانید با پشتیبانی تماس بگیرید و درخواست تغییر آدرس یا افزودن کالا بدهید. بعد از ارسال، امکان ویرایش سفارش وجود ندارد ولی می‌توانید کالای جدید را با یک سفارش جداگانه ثبت کنید.',
  },
  {
    id: 3, cat: 'shipping',
    q: 'ارسال سفارش چقدر زمان می‌برد؟',
    a: 'سفارش‌ها در تهران با پیک سریع ظرف ۲۴ ساعت و با پست پیشتاز در ۳ تا ۵ روز کاری به دست شما می‌رسد. برای شهرستان‌ها معمولاً بین ۳ تا ۷ روز کاری زمان لازم است. در ایام تعطیلات و مناسبت‌ها ممکن است کمی بیشتر طول بکشد.',
  },
  {
    id: 4, cat: 'shipping',
    q: 'هزینه ارسال چقدر است؟',
    a: 'هزینه ارسال بر اساس شیوه‌ی انتخابی شما در مرحله‌ی تسویه حساب محاسبه می‌شود. برای سفارش‌های بالای ۹۰۰ هزار تومان، ارسال در سراسر ایران رایگان است.',
  },
  {
    id: 5, cat: 'shipping',
    q: 'امکان تحویل حضوری هم دارید؟',
    a: 'بله. می‌توانید در مرحله‌ی تسویه حساب، گزینه‌ی «تحویل حضوری» را انتخاب کنید و سفارش را از دفتر مرکزی نِگار (تهران، خیابان کتاب، پلاک ۲۴) دریافت کنید. این روش رایگان است و معمولاً همان روز آماده می‌شود.',
  },
  {
    id: 6, cat: 'payment',
    q: 'چه روش‌های پرداختی را می‌پذیرید؟',
    a: 'پرداخت آنلاین از طریق درگاه‌های امن بانکی (زرین‌پال و سامان)، پرداخت با کیف پول نِگار (بدون کارمزد) و پرداخت در محل (فقط تهران). پیشنهاد ما استفاده از پرداخت آنلاین است که هم سریع‌تر و هم مطمئن‌تر است.',
  },
  {
    id: 7, cat: 'payment',
    q: 'اگر پرداخت ناموفق بود، پولم چه می‌شود؟',
    a: 'اگر مبلغ از حساب شما کسر شده باشد ولی سفارش ثبت نشده باشد، معمولاً تا حداکثر ۷۲ ساعت به حساب شما برمی‌گردد. اگر بعد از این مدت مبلغ برنگشت، با پشتیبانی تماس بگیرید تا سریع پیگیری کنیم.',
  },
  {
    id: 8, cat: 'payment',
    q: 'کیف پول نِگار چطور کار می‌کند؟',
    a: 'کیف پول نِگار یک حساب اعتباری است که می‌توانید آن را شارژ کنید و خریدهای بعدی‌تان را بدون نیاز به درگاه بانکی انجام دهید. شارژ کیف پول از پنل کاربری و از بخش «کیف پول» قابل انجام است.',
  },
  {
    id: 9, cat: 'return',
    q: 'چند روز مهلت بازگشت کالا وجود دارد؟',
    a: 'تا ۷ روز پس از تحویل سفارش، در صورت عدم رضایت، می‌توانید درخواست بازگشت دهید. کتاب باید در بسته‌بندی اصلی، سالم و بدون نوشته یا خط‌خوردگی باشد.',
  },
  {
    id: 10, cat: 'return',
    q: 'هزینه ارسال بازگشت به عهده‌ی کیست؟',
    a: 'اگر بازگشت به دلیل ایراد کالا یا اشتباه ما باشد، هزینه‌ی ارسال بازگشت به عهده‌ی نِگار است. در غیر این صورت، هزینه‌ی ارسال بازگشت به عهده‌ی خریدار است.',
  },
  {
    id: 11, cat: 'return',
    q: 'مبلغ بازگشت چه زمانی واریز می‌شود؟',
    a: 'پس از دریافت کالا و تأیید سلامت آن توسط تیم انبار، مبلغ حداکثر تا ۴۸ ساعت به کیف پول شما واریز می‌شود. اگر تمایل دارید به حساب بانکی برگردد، درخواست خود را به پشتیبانی اعلام کنید.',
  },
  {
    id: 12, cat: 'account',
    q: 'چطور در نِگار ثبت‌نام کنم؟',
    a: 'روی دکمه «ورود / ثبت‌نام» در بالای سایت بزنید. با شماره موبایل ثبت‌نام کنید و کد پیامک‌شده را وارد کنید. بعد از آن می‌توانید اطلاعات حساب خود را کامل کنید.',
  },
  {
    id: 13, cat: 'account',
    q: 'رمز عبورم را فراموش کرده‌ام، چه کنم؟',
    a: 'در صفحه‌ی ورود، گزینه «فراموشی رمز» را انتخاب کنید. یک لینک بازیابی برای شما پیامک می‌شود. اگر به ایمیل دسترسی ندارید، با پشتیبانی تماس بگیرید.',
  },
  {
    id: 14, cat: 'account',
    q: 'چطور می‌توانم سفارش‌های قبلی‌ام را ببینم؟',
    a: 'وارد پنل کاربری شوید و از منوی «سفارش‌های من»، همه‌ی سفارش‌های قبلی و وضعیت لحظه‌ای‌شان را می‌بینید. برای پیگیری مرسوله، کد رهگیری در کنار هر سفارش نمایش داده می‌شود.',
  },
  {
    id: 15, cat: 'account',
    q: 'آیا می‌توانم حساب کاربری‌ام را حذف کنم؟',
    a: 'بله. از پنل کاربری، بخش «تنظیمات حساب» و سپس «منطقه حساس»، می‌توانید درخواست حذف حساب بدهید. توجه کنید که این عملیات دائمی است و همه‌ی اطلاعات شما پاک می‌شود.',
  },
  {
    id: 16, cat: 'product',
    q: 'چطور می‌توانم کتاب مناسبی برای خودم پیدا کنم؟',
    a: 'از دسته‌بندی‌های فروشگاه، فیلترهای دقیق (قیمت، امتیاز، موجودی) و بخش «پیشنهادهای ویژه» استفاده کنید. همچنین می‌توانید از صفحه‌ی «پیشنهاد هوشمند» در صفحه اصلی، بر اساس سلیقه‌ی خودتان کتاب پیدا کنید.',
  },
  {
    id: 17, cat: 'product',
    q: 'آیا کتاب‌های نایاب یا چاپ‌قدیمی هم دارید؟',
    a: 'بله، بخشی از کتاب‌های کلاسیک و کمیاب در نِگار عرضه می‌شود. اگر کتابی را پیدا نکردید، از طریق فرم تماس یا دکمه «پیشنهاد کتاب» به ما اطلاع دهید؛ در صورت امکان تهیه می‌کنیم.',
  },
  {
    id: 18, cat: 'product',
    q: 'چطور از اصالت کتاب‌ها مطمئن شوم؟',
    a: 'همه‌ی کتاب‌های نِگار مستقیماً از ناشران معتبر یا توزیع‌کنندگان رسمی تأمین می‌شوند. روی هر کتاب، شابک و اطلاعات ناشر درج شده است. در صورت مشاهده‌ی هرگونه مغایرت، کتاب را بازگردانید و مبلغ کامل را دریافت کنید.',
  },
  {
    id: 19, cat: 'product',
    q: 'امکان خرید عمده و سازمانی دارید؟',
    a: 'بله. برای خریدهای سازمانی، کتابخانه‌ها، مدارس و شرکت‌ها، تخفیف‌های ویژه در نظر گرفته شده است. برای دریافت پیشنهاد قیمت، از طریق ایمیل hello@negar.ir با ما تماس بگیرید.',
  },
  {
    id: 20, cat: 'order',
    q: 'چطور می‌توانم از تخفیف‌ها و پیشنهادها باخبر شوم؟',
    a: 'عضو خبرنامه نِگار شوید یا در شبکه‌های اجتماعی ما را دنبال کنید. همچنین در صفحه اصلی سایت، بخش «پیشنهادهای ویژه» هر هفته به‌روزرسانی می‌شود.',
  },
  {
    id: 21, cat: 'shipping',
    q: 'امکان کادوپیچ کردن سفارش وجود دارد؟',
    a: 'بله. در مرحله‌ی ثبت سفارش یا در توضیحات سفارش ذکر کنید که می‌خواهید کادوپیچ شود. کادوپیچ برای مناسبت‌های خاص رایگان است.',
  },
  {
    id: 22, cat: 'payment',
    q: 'فاکتور رسمی صادر می‌کنید؟',
    a: 'بله. اگر فاکتور رسمی برای شما لازم است، در توضیحات سفارش یا هنگام پرداخت اعلام کنید. فاکتور رسمی حداکثر تا ۳ روز پس از ثبت سفارش ارسال می‌شود.',
  },
  {
    id: 23, cat: 'account',
    q: 'حساب کاربری من مسدود شده، چه کنم؟',
    a: 'اگر حساب شما به دلیل تخلف یا فعالیت مشکوک مسدود شده باشد، می‌توانید از طریق ایمیل hello@negar.ir با ما در تماس باشید. تیم پشتیبانی پس از بررسی، پاسخ می‌دهد.',
  },
  {
    id: 24, cat: 'product',
    q: 'آیا کتاب‌های الکترونیکی هم می‌فروشید؟',
    a: 'در حال حاضر فقط کتاب‌های چاپی عرضه می‌شود. نسخه‌های الکترونیکی به‌زودی به فروشگاه اضافه خواهد شد. برای اطلاع از اخبار، عضو خبرنامه شوید.',
  },
];

/* ---------- State ---------- */
const state = {
  filter: 'all',
  search: '',
  expanded: new Set([1]), // اولین سوال باز
};

/* ---------- Refs ---------- */
const list = $('#faqList');
const empty = $('#faqEmpty');
const countEl = $('#faqCount');
const expandAllBtn = $('#faqExpandAll');

/* ---------- Filter ---------- */
const getFiltered = () => {
  return FAQS.filter(f => {
    if (state.filter !== 'all' && f.cat !== state.filter) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = `${f.q} ${f.a}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
};

/* ---------- Sidebar categories ---------- */
const renderCategories = () => {
  const wrap = $('#faqCategories');
  wrap.innerHTML = CATEGORIES.map(c => {
    const count = c.id === 'all' ? FAQS.length : FAQS.filter(f => f.cat === c.id).length;
    return `
      <button class="faq-sidebar-item ${c.id === state.filter ? 'is-active' : ''}" data-faq-cat="${c.id}">
        <i class="${c.icon}"></i>
        <span>${c.label}</span>
        <b class="faq-sidebar-count">${faNum(count)}</b>
      </button>
    `;
  }).join('');
};

/* ---------- Highlight helper ---------- */
const highlight = (text, query) => {
  if (!query) return text;
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${q})`, 'gi'), '<mark>$1</mark>');
};

/* ---------- Render FAQ list ---------- */
const render = () => {
  const faqs = getFiltered();
  countEl.textContent = faNum(faqs.length);

  if (!faqs.length) {
    list.innerHTML = '';
    list.classList.add('hidden');
    empty.classList.remove('hidden');
    empty.classList.add('flex');
    return;
  }

  empty.classList.add('hidden');
  empty.classList.remove('flex');
  list.classList.remove('hidden');

  list.innerHTML = faqs.map(f => {
    const isOpen = state.expanded.has(f.id);
    const catLabel = CATEGORIES.find(c => c.id === f.cat)?.label || '';

    return `
      <article class="faq-item ${isOpen ? 'is-open' : ''}" data-faq-id="${f.id}">
        <button class="faq-question" aria-expanded="${isOpen}" aria-controls="faq-answer-${f.id}">
          <span class="faq-question-num">${faNum(f.id)}</span>
          <span class="faq-question-text">${highlight(f.q, state.search)}</span>
          <span class="faq-cat-chip">${catLabel}</span>
          <span class="faq-question-icon">
            <i class="ri-add-line"></i>
          </span>
        </button>
        <div id="faq-answer-${f.id}" class="faq-answer">
          <div class="faq-answer-inner">
            <p>${highlight(f.a, state.search)}</p>
            <div class="faq-answer-foot">
              <small>این پاسخ مفید بود؟</small>
              <div class="flex items-center gap-1.5">
                <button class="faq-feedback" data-feedback="yes" data-id="${f.id}">
                  <i class="ri-thumb-up-line"></i> بله
                </button>
                <button class="faq-feedback" data-feedback="no" data-id="${f.id}">
                  <i class="ri-thumb-down-line"></i> خیر
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
};

/* ---------- Toggle answer ---------- */
list?.addEventListener('click', e => {
  const question = e.target.closest('.faq-question');
  if (question) {
    const item = question.closest('.faq-item');
    const id = +item.dataset.faqId;
    if (state.expanded.has(id)) state.expanded.delete(id);
    else state.expanded.add(id);

    // به‌روزرسانی DOM بدون رندر کامل
    const isOpen = state.expanded.has(id);
    item.classList.toggle('is-open', isOpen);
    question.setAttribute('aria-expanded', isOpen);
    return;
  }

  const feedback = e.target.closest('[data-feedback]');
  if (feedback) {
    const id = +feedback.dataset.id;
    const isYes = feedback.dataset.feedback === 'yes';
    if (isYes) showToast('ممنون از بازخورد شما! 🎉');
    else showToast('ممنون. تلاش می‌کنیم بهتر شود.');
    return;
  }
});

/* ---------- Filters ---------- */
$('#faqCategories')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-faq-cat]');
  if (!btn) return;
  state.filter = btn.dataset.faqCat;
  renderCategories();
  render();
});

/* ---------- Search ---------- */
$('#faqSearch')?.addEventListener('input', e => {
  state.search = e.target.value.trim();
  render();
});

/* ---------- Quick tags ---------- */
$$('[data-quick]').forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.dataset.quick;
    const input = $('#faqSearch');
    if (input) {
      input.value = q;
      state.search = q;
      state.filter = 'all';
      renderCategories();
      render();
      // اسکرول به لیست
      document.getElementById('faqList')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Expand all / collapse all ---------- */
expandAllBtn?.addEventListener('click', () => {
  const faqs = getFiltered();
  const allOpen = faqs.every(f => state.expanded.has(f.id));

  if (allOpen) {
    faqs.forEach(f => state.expanded.delete(f.id));
    expandAllBtn.innerHTML = '<i class="ri-arrow-down-s-line"></i> باز کردن همه';
  } else {
    faqs.forEach(f => state.expanded.add(f.id));
    expandAllBtn.innerHTML = '<i class="ri-arrow-up-s-line"></i> بستن همه';
  }
  render();
});

/* ---------- Keyboard: Ctrl+K focuses search ---------- */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    $('#faqSearch')?.focus();
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
  setTimeout(() => t.remove(), 2400);
}

/* ---------- Init ---------- */
renderCategories();
render();