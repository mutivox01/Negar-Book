/* =========================================================
   Contact Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- Contact form ---------- */
const contactForm = $('#contactForm');

const setError = (input, message) => {
  const field = input.closest('.field');
  if (!field) return;
  field.classList.toggle('has-error', !!message);
  const err = $('.error', field);
  if (err) err.textContent = message || '';
};

contactForm?.addEventListener('submit', e => {
  e.preventDefault();

  const fields = [
    { input: $('#cName'), check: v => v.trim().length >= 2, msg: 'نام را کامل وارد کنید.' },
    { input: $('#cPhone'), check: v => /^0?9\d{9}$/.test(v.replace(/\D/g, '')), msg: 'شماره موبایل معتبر نیست.' },
    { input: $('#cEmail'), check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'ایمیل معتبر نیست.' },
    { input: $('#cMessage'), check: v => v.trim().length >= 10, msg: 'پیام باید حداقل ۱۰ کاراکتر باشد.' },
  ];

  let valid = true;
  fields.forEach(f => {
    const ok = f.check(f.input.value);
    setError(f.input, ok ? '' : f.msg);
    if (!ok && valid) {
      valid = false;
      f.input.focus();
    }
  });

  if (!valid) return showToast('لطفاً فیلدهای مشخص‌شده را کامل کنید.', 'error');

  const btn = contactForm.querySelector('button[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال ارسال...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
    contactForm.reset();
    showToast('پیام شما با موفقیت ارسال شد. به‌زودی پاسخ می‌دهیم.');
  }, 1200);
});

/* ---------- پاک کردن خطا هنگام تایپ ---------- */
contactForm?.addEventListener('input', e => {
  const field = e.target.closest('.field');
  if (field?.classList.contains('has-error')) {
    field.classList.remove('has-error');
    const err = $('.error', field);
    if (err) err.textContent = '';
  }
});

/* ---------- Quick links ---------- */
$$('.contact-quick-item').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    const label = $('b', item)?.textContent?.trim();
    if (label === 'پیگیری سفارش') window.location.href = './account.html#orders';
    else if (label === 'درخواست بازگشت') showToast('برای درخواست بازگشت، با پشتیبانی تماس بگیرید.');
    else if (label === 'سوالات متداول') window.location.href = './faq.html';
  });
});

/* ---------- Suggest book modal ---------- */
const suggestModal = $('#suggestModal');
const suggestForm = $('#suggestForm');

const openSuggest = () => {
  suggestModal.classList.remove('hidden');
  suggestModal.classList.add('flex');
  document.body.classList.add('overflow-hidden');
};
const closeSuggest = () => {
  suggestModal.classList.add('hidden');
  suggestModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
  suggestForm?.reset();
};

$$('[data-suggest-book]').forEach(b => b.addEventListener('click', openSuggest));
$$('[data-suggest-close]').forEach(b => b.addEventListener('click', closeSuggest));
suggestModal?.addEventListener('click', e => {
  if (e.target === suggestModal) closeSuggest();
});

suggestForm?.addEventListener('submit', e => {
  e.preventDefault();
  const title = $('#sTitle');
  if (title.value.trim().length < 2) {
    const field = title.closest('.field');
    field.classList.add('has-error');
    $('.error', field).textContent = 'نام کتاب را وارد کنید.';
    return;
  }

  closeSuggest();
  showToast('پیشنهاد شما ثبت شد. ممنون از همراهی‌تان!');
});

/* ---------- Map CTA ---------- */
$('.map-cta')?.addEventListener('click', () => {
  showToast('در حال باز کردن اپلیکیشن نقشه...');
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