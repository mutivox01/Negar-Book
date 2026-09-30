/* =========================================================
   Terms Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- داده قوانین ---------- */
const SECTIONS = [
  {
    id: 'acceptance',
    title: '۱. پذیرش قوانین',
    icon: 'ri-shield-check-line',
    paragraphs: [
      'با ورود به وب‌سایت نِگار و استفاده از خدمات آن، شما به‌طور کامل و بدون قید و شرط، این قوانین و مقررات را می‌پذیرید. اگر با هر یک از این شرایط موافق نیستید، لطفاً از سایت استفاده نکنید.',
      'نِگار این حق را برای خود محفوظ می‌دارد که در هر زمان، این قوانین را بروزرسانی کند. مسئولیت اطلاع از تغییرات، بر عهده‌ی کاربر است و تاریخ آخرین بروزرسانی در بالای همین صفحه اعلام می‌شود.',
    ],
  },
  {
    id: 'account',
    title: '۲. حساب کاربری',
    icon: 'ri-user-3-line',
    list: [
      'برای استفاده‌ی کامل از امکانات نِگار، باید با شماره موبایل معتبر ثبت‌نام کنید.',
      'کاربر موظف است اطلاعات صحیح و بروز وارد کند؛ در صورت وارد کردن اطلاعات نادرست، نِگار مسئولیتی در قبال سفارش‌های نادرست ندارد.',
      'حفظ محرمانگی رمز عبور و کد تأیید پیامکی، به عهده‌ی کاربر است.',
      'در صورت مشاهده‌ی هرگونه فعالیت مشکوک در حساب، کاربر باید بلافاصله به پشتیبانی اطلاع دهد.',
      'نِگار حق دارد در صورت تخلف، حساب کاربر را موقتاً یا دائماً مسدود کند.',
    ],
  },
  {
    id: 'orders',
    title: '۳. سفارش و خرید',
    icon: 'ri-shopping-bag-3-line',
    paragraphs: [
      'پس از نهایی کردن سفارش و پرداخت موفق، ایمیل و پیامک تأیید برای شما ارسال می‌شود. اگر ظرف ۳۰ دقیقه پس از پرداخت، تأییدیه دریافت نکردید، با پشتیبانی تماس بگیرید.',
    ],
    list: [
      'قیمت‌ها به تومان و شامل مالیات بر ارزش افزوده است.',
      'نِگار حق دارد قیمت‌ها را در هر زمان تغییر دهد؛ اما تغییرات روی سفارش‌های ثبت‌شده اثری ندارد.',
      'در صورت اتمام موجودی پس از ثبت سفارش، مبلغ کامل به کیف پول شما بازگردانده می‌شود.',
      'امکان ویرایش سفارش پس از ارسال وجود ندارد؛ برای سفارش جدید، باید سفارش جداگانه ثبت کنید.',
    ],
  },
  {
    id: 'payment',
    title: '۴. پرداخت',
    icon: 'ri-bank-card-line',
    list: [
      'پرداخت از طریق درگاه‌های بانکی امن (زرین‌پال، سامان) یا کیف پول نِگار انجام می‌شود.',
      'در صورت ناموفق بودن پرداخت، مبلغ کسر‌شده حداکثر تا ۷۲ ساعت کاری به حساب شما برمی‌گردد.',
      'نِگار هیچ‌گاه اطلاعات کارت بانکی شما را ذخیره نمی‌کند؛ همه‌ی پرداخت‌ها از طریق درگاه بانکی انجام می‌شود.',
      'برای سفارش‌های سازمانی و خرید عمده، امکان صدور فاکتور رسمی وجود دارد.',
    ],
  },
  {
    id: 'shipping',
    title: '۵. ارسال و تحویل',
    icon: 'ri-truck-line',
    list: [
      'ارسال سفارش‌ها در تهران با پیک سریع (۲۴ ساعته) و در سراسر ایران با پست پیشتاز (۳ تا ۵ روز کاری) انجام می‌شود.',
      'برای سفارش‌های بالای ۹۰۰,۰۰۰ تومان، ارسال در سراسر ایران رایگان است.',
      'امکان تحویل حضوری از دفتر مرکزی نِگار (تهران، خیابان کتاب، پلاک ۲۴) وجود دارد.',
      'در ایام تعطیلات رسمی و مناسبت‌ها، زمان تحویل ممکن است کمی طولانی‌تر شود.',
      'مسئولیت صحت آدرس و شماره تماس گیرنده، بر عهده‌ی خریدار است.',
    ],
  },
  {
    id: 'returns',
    title: '۶. بازگشت و مرجوعی',
    icon: 'ri-refresh-line',
    paragraphs: [
      'رضایت شما برای ما مهم است. اگر از خرید خود راضی نیستید، می‌توانید تا ۷ روز پس از تحویل، درخواست بازگشت دهید.',
    ],
    list: [
      'کتاب باید در بسته‌بندی اصلی، سالم، بدون خط‌خوردگی یا نوشته باشد.',
      'اگر بازگشت به دلیل ایراد کالا یا اشتباه نِگار باشد، هزینه‌ی ارسال بازگشت به عهده‌ی نِگار است.',
      'در غیر این صورت، هزینه‌ی ارسال بازگشت به عهده‌ی خریدار است.',
      'پس از تأیید سلامت کالا توسط انبار، مبلغ حداکثر تا ۴۸ ساعت به کیف پول شما بازگردانده می‌شود.',
      'کتاب‌های حراج و تخفیف‌دار نیز مشمول بازگشت هستند، مگر در غیر این صورت اعلام شود.',
    ],
  },
  {
    id: 'privacy',
    title: '۷. حریم خصوصی',
    icon: 'ri-shield-keyhole-line',
    paragraphs: [
      'نِگار به حریم خصوصی کاربران خود احترام می‌گذارد و متعهد به محافظت از اطلاعات شخصی شماست.',
    ],
    list: [
      'اطلاعات شخصی شما فقط برای پردازش سفارش، اطلاع‌رسانی و بهبود خدمات استفاده می‌شود.',
      'ما هرگز اطلاعات شما را به شرکت‌های ثالث نمی‌فروشیم.',
      'همه‌ی ارتباطات سایت با پروتکل SSL رمزنگاری می‌شود.',
      'می‌توانید در هر زمان درخواست حذف حساب و اطلاعات خود را ثبت کنید.',
    ],
  },
  {
    id: 'intellectual',
    title: '۸. مالکیت معنوی',
    icon: 'ri-copyright-line',
    list: [
      'همه‌ی محتوا، تصاویر، متن‌ها و طراحی سایت نِگار متعلق به نِگار است.',
      'استفاده‌ی تجاری از محتوای سایت بدون اجازه‌ی کتبی، ممنوع است.',
      'استفاده‌ی شخصی و غیرتجاری با ذکر منبع، مجاز است.',
    ],
  },
  {
    id: 'changes',
    title: '۹. تغییرات قوانین',
    icon: 'ri-edit-2-line',
    paragraphs: [
      'نِگار ممکن است این قوانین را در هر زمان تغییر دهد. تغییرات از لحظه‌ی انتشار در این صفحه، لازم‌الاجرا می‌شود. ادامه‌ی استفاده از سایت پس از بروزرسانی قوانین، به منزله‌ی پذیرش نسخه‌ی جدید است.',
    ],
  },
  {
    id: 'contact-law',
    title: '۱۰. قوانین حاکم و حل اختلاف',
    icon: 'ri-scales-3-line',
    paragraphs: [
      'این قوانین تحت قوانین جمهوری اسلامی ایران تفسیر می‌شود. در صورت بروز هرگونه اختلاف، ابتدا تلاش می‌شود موضوع از طریق گفت‌وگو حل شود؛ در صورت نیاز، پرونده به مراجع قانونی ارجاع داده می‌شود.',
    ],
  },
];

/* ---------- Refs ---------- */
const content = $('#termsContent');
const toc = $('#termsToc');
const emptyEl = $('#termsEmpty');

/* ---------- Render ---------- */
const renderContent = () => {
  content.innerHTML = SECTIONS.map((s, i) => {
    const body = [
      ...(s.paragraphs || []).map(p => `<p class="terms-p">${p}</p>`),
      ...(s.list ? [`
        <ul class="terms-list">
          ${s.list.map(item => `
            <li>
              <i class="ri-check-line"></i>
              <span>${item}</span>
            </li>
          `).join('')}
        </ul>
      `] : []),
    ].join('');

    return `
      <article class="terms-block" id="${s.id}" data-terms-id="${s.id}">
        <header class="terms-block-head">
          <span class="terms-block-icon"><i class="${s.icon}"></i></span>
          <h2>${s.title}</h2>
        </header>
        <div class="terms-block-body">
          ${body}
        </div>
      </article>
    `;
  }).join('');
};

const renderToc = () => {
  toc.innerHTML = `
    <p class="terms-toc-title">فهرست مطالب</p>
    ${SECTIONS.map(s => `
      <a href="#${s.id}" class="terms-toc-item" data-toc-target="${s.id}">
        <i class="ri-arrow-left-s-line"></i>
        <span>${s.title.replace(/^\d+\.\s*/, '')}</span>
      </a>
    `).join('')}
  `;
};

/* ---------- Smooth scroll TOC ---------- */
toc?.addEventListener('click', e => {
  const link = e.target.closest('[data-toc-target]');
  if (!link) return;
  e.preventDefault();
  const el = document.getElementById(link.dataset.tocTarget);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top: y, behavior: 'smooth' });
  setActiveToc(link.dataset.tocTarget);
});

const setActiveToc = id => {
  $$('.terms-toc-item').forEach(a => a.classList.toggle('is-active', a.dataset.tocTarget === id));
};

/* ---------- Scroll spy ---------- */
if ('IntersectionObserver' in window) {
  const blocks = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveToc(entry.target.id);
    });
  }, { rootMargin: '-120px 0px -70% 0px' });
  blocks.forEach(b => io.observe(b));
}

/* ---------- Search ---------- */
const searchInput = $('#termsSearch');
searchInput?.addEventListener('input', e => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) {
    content.classList.remove('hidden');
    emptyEl.classList.add('hidden');
    emptyEl.classList.remove('flex');
    $$('.terms-block').forEach(b => b.classList.remove('hidden'));
    return;
  }

  let matches = 0;
  $$('.terms-block').forEach(block => {
    const text = block.textContent.toLowerCase();
    const hit = text.includes(q);
    block.classList.toggle('hidden', !hit);
    if (hit) matches++;
  });

  if (matches === 0) {
    content.classList.add('hidden');
    emptyEl.classList.remove('hidden');
    emptyEl.classList.add('flex');
  } else {
    content.classList.remove('hidden');
    emptyEl.classList.add('hidden');
    emptyEl.classList.remove('flex');
  }
});

/* ---------- Ctrl+K ---------- */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInput?.focus();
  }
});

/* ---------- Print ---------- */
$('#printTerms')?.addEventListener('click', () => window.print());

/* ---------- Share ---------- */
$('#shareTerms')?.addEventListener('click', async () => {
  const data = {
    title: document.title,
    text: 'قوانین و مقررات نِگار',
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
renderContent();
renderToc();