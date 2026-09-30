/* =========================================================
   About Page — شمارش آمار، فرم تماس
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- انیمیشن شمارش آمار ---------- */
const animateCount = el => {
  const target = parseInt(el.dataset.count, 10) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  const tick = now => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    el.textContent = faNum(value.toLocaleString('en-US')) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

/* ---------- IntersectionObserver برای اجرای انیمیشن هنگام دید ---------- */
const statCards = $$('.stat-num');
if ('IntersectionObserver' in window && statCards.length) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statCards.forEach(el => io.observe(el));
} else {
  statCards.forEach(animateCount);
}

/* ---------- فرم تماس ---------- */
const form = $('#aboutContactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();

  const name = $('#cName');
  const email = $('#cEmail');
  const msg = $('#cMsg');

  let valid = true;
  const setError = (input, message) => {
    const field = input.closest('.field');
    field.classList.toggle('has-error', !!message);
    const err = $('.error', field);
    if (err) err.textContent = message || '';
  };

  if (name.value.trim().length < 2) { setError(name, 'نام را وارد کنید.'); valid = false; } else setError(name, '');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError(email, 'ایمیل معتبر نیست.'); valid = false; } else setError(email, '');
  if (msg.value.trim().length < 10) { setError(msg, 'پیام باید حداقل ۱۰ کاراکتر باشد.'); valid = false; } else setError(msg, '');

  if (!valid) return;

  const btn = $('button[type="submit"]', form);
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال ارسال...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
    form.reset();
    toast('پیام شما با موفقیت ارسال شد. به‌زودی پاسخ می‌دهیم.');
  }, 1200);
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

/* ---------- Toast ---------- */
function toast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[100] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}