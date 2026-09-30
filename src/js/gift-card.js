/* =========================================================
   Gift Card Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const faToEn = s => String(s).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
const tomanShort = n => faNum(Math.round(n).toLocaleString('en-US'));

/* ---------- طرح‌ها ---------- */
const DESIGNS = [
  { id: 'forest', label: 'جنگل', gradient: 'from-[#87927a] via-[#3b4a3f] to-[#1f2b27]', accent: '#d7f36b', emoji: '🌿' },
  { id: 'sunset', label: 'غروب', gradient: 'from-[#e5b57c] via-[#c58a80] to-[#4a221f]', accent: '#fbe9d2', emoji: '🌅' },
  { id: 'night',  label: 'شب',   gradient: 'from-[#8d98c5] via-[#2f3656] to-[#0f1521]', accent: '#c8a879', emoji: '🌙' },
  { id: 'bloom',  label: 'شکوفه', gradient: 'from-[#f5d5d0] via-[#c58a80] to-[#5a1f1a]', accent: '#d7f36b', emoji: '🌸' },
  { id: 'ink',    label: 'مرکب', gradient: 'from-[#2b2b2b] via-[#17211f] to-[#0a0a0a]', accent: '#d7f36b', emoji: '✒️' },
  { id: 'lemon',  label: 'لیمویی', gradient: 'from-[#d7f36b] via-[#a9c63d] to-[#5a6b1a]', accent: '#17211f', emoji: '🍋' },
  { id: 'ocean',  label: 'اقیانوس', gradient: 'from-[#7ea39a] via-[#2f5b52] to-[#132e2a]', accent: '#d7f36b', emoji: '🌊' },
  { id: 'desert', label: 'کویر', gradient: 'from-[#e5c58f] via-[#c0a17a] to-[#5a3f27]', accent: '#2b2b2b', emoji: '🏜️' },
  { id: 'plum',   label: 'آلو', gradient: 'from-[#a58ab8] via-[#6f4a75] to-[#2b0f2a]', accent: '#fbe9d2', emoji: '🍇' },
  { id: 'mint',   label: 'نعنا', gradient: 'from-[#a8d5c8] via-[#7ea39a] to-[#254a41]', accent: '#17211f', emoji: '🌱' },
  { id: 'coral',  label: 'مرجانی', gradient: 'from-[#f5b5a5] via-[#e66d5b] to-[#7a2a20]', accent: '#fbe9d2', emoji: '🐠' },
  { id: 'silver', label: 'نقره‌ای', gradient: 'from-[#e7e9e4] via-[#a5aeb2] to-[#4a5450]', accent: '#17211f', emoji: '💫' },
];

/* ---------- State ---------- */
const state = {
  design: 'forest',
  amount: 500000,
  to: '',
  from: '',
  message: '',
  when: 'now',
  date: '',
};

/* ---------- Refs ---------- */
const designGrid = $('#designGrid');
const preview = $('#giftCardPreview');
const amountInput = $('#giftAmount');
const messageInput = $('#giftMessage');
const msgCount = $('#msgCount');

/* ---------- به‌روزرسانی پیش‌نمایش ---------- */
const updatePreview = () => {
  const d = DESIGNS.find(x => x.id === state.design) || DESIGNS[0];

  // گرادیان پس‌زمینه
  preview.className = `gift-card bg-gradient-to-br ${d.gradient}`;

  // رنگ accent از متغیر CSS
  preview.style.setProperty('--gift-accent', d.accent);

  // برچسب طرح
  $('#giftCardLabel').textContent = d.label;

  // دریافت‌کننده
  $('#giftCardTo').textContent = state.to || '—';

  // پیام
  const mEl = $('#giftCardMessage');
  if (state.message) {
    mEl.textContent = state.message;
    mEl.classList.remove('is-placeholder');
  } else {
    mEl.textContent = 'یک پیام قشنگ برای کسی که دوستش داری...';
    mEl.classList.add('is-placeholder');
  }

  // مبلغ
  $('#giftCardAmount').textContent = `${tomanShort(state.amount || 0)} تومان`;

  // کد کارت
  $('#giftCardCode').textContent = state.to
    ? `NG-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
    : 'NG-XXXX-XXXX';
};

/* ---------- رندر طرح‌ها ---------- */
const renderDesigns = () => {
  designGrid.innerHTML = DESIGNS.map(d => `
    <button type="button" class="gift-design ${d.id === state.design ? 'is-active' : ''}"
      data-design="${d.id}" aria-label="طرح ${d.label}">
      <span class="gift-design-swatch bg-gradient-to-br ${d.gradient}">
        <span class="gift-design-emoji">${d.emoji}</span>
      </span>
      <small>${d.label}</small>
    </button>
  `).join('');
};

/* ---------- طرح‌های محبوب ---------- */
const renderPopular = () => {
  const wrap = $('#popularDesigns');
  const popular = ['sunset', 'forest', 'night', 'bloom'];

  wrap.innerHTML = popular.map(id => {
    const d = DESIGNS.find(x => x.id === id);
    return `
      <button type="button" class="popular-card bg-gradient-to-br ${d.gradient}" data-design-jump="${d.id}">
        <div class="popular-card-emoji">${d.emoji}</div>
        <div class="popular-card-info">
          <b>${d.label}</b>
          <small>طرح آماده</small>
        </div>
      </button>
    `;
  }).join('');
};

/* ---------- Events ---------- */

// انتخاب طرح
designGrid?.addEventListener('click', e => {
  const btn = e.target.closest('[data-design]');
  if (!btn) return;
  state.design = btn.dataset.design;
  $$('.gift-design').forEach(b => b.classList.toggle('is-active', b === btn));
  updatePreview();
});

// انتخاب طرح از کارت محبوب
$('#popularDesigns')?.addEventListener('click', e => {
  const btn = e.target.closest('[data-design-jump]');
  if (!btn) return;
  state.design = btn.dataset.designJump;
  renderDesigns();
  updatePreview();
  document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// مبالغ سریع
$$('.gift-amount').forEach(btn => {
  btn.addEventListener('click', () => {
    state.amount = +btn.dataset.amount;
    amountInput.value = state.amount;
    $$('.gift-amount').forEach(b => b.classList.toggle('is-active', b === btn));
    updatePreview();
  });
});

// ورودی مبلغ
amountInput?.addEventListener('input', e => {
  let v = faToEn(e.target.value).replace(/\D/g, '');
  if (v) v = String(Math.min(parseInt(v, 10) || 0, 10000000));
  state.amount = +v || 0;

  // فرمت سه‌رقمی در نمایش
  e.target.value = v ? Number(v).toLocaleString('en-US') : '';

  // هماهنگی با مبالغ سریع
  $$('.gift-amount').forEach(b => b.classList.toggle('is-active', +b.dataset.amount === state.amount));

  updatePreview();
});

// نام گیرنده
$('#giftTo')?.addEventListener('input', e => {
  state.to = e.target.value.trim();
  updatePreview();
});

// نام فرستنده
$('#giftFrom')?.addEventListener('input', e => {
  state.from = e.target.value.trim();
});

// پیام
messageInput?.addEventListener('input', e => {
  state.message = e.target.value;
  msgCount.textContent = faNum(e.target.value.length);
  updatePreview();
});

// تاریخ ارسال (radio)
$$('input[name="giftWhen"]').forEach(radio => {
  radio.addEventListener('change', () => {
    state.when = radio.value;
    $$('.gift-when-option').forEach(opt => {
      opt.classList.toggle('is-active', $('input', opt)?.checked);
    });
    $('#scheduleWrap').classList.toggle('hidden', state.when !== 'scheduled');
    if (state.when === 'scheduled') {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      const iso = d.toISOString().split('T')[0];
      const dateInput = $('#giftDate');
      dateInput.min = iso;
      if (!dateInput.value) dateInput.value = iso;
      state.date = dateInput.value;
    }
  });
});

$('#giftDate')?.addEventListener('change', e => {
  state.date = e.target.value;
});

/* ---------- پاک کردن خطا هنگام تایپ ---------- */
$('#giftForm')?.addEventListener('input', e => {
  const field = e.target.closest('.field');
  if (field?.classList.contains('has-error')) {
    field.classList.remove('has-error');
    const err = $('.error', field);
    if (err) err.textContent = '';
  }
});

/* ---------- ارسال فرم ---------- */
const successModal = $('#giftSuccessModal');

$('#giftForm')?.addEventListener('submit', e => {
  e.preventDefault();

  const amount = state.amount;
  const to = $('#giftTo');
  const email = $('#giftEmail');
  const message = $('#giftMessage');
  const terms = $('#giftTerms');

  let valid = true;
  const setErr = (input, msg) => {
    const field = input.closest('.field') || input.parentElement;
    field.classList.toggle('has-error', !!msg);
    const err = $('.error', field);
    if (err) err.textContent = msg || '';
  };

  // مبلغ
  if (!amount || amount < 50000) {
    const f = amountInput.closest('.field');
    f.classList.add('has-error');
    $('.error', f).textContent = 'حداقل مبلغ هدیه ۵۰,۰۰۰ تومان است.';
    valid = false;
  } else {
    amountInput.closest('.field').classList.remove('has-error');
  }

  // نام گیرنده
  if (to.value.trim().length < 2) { setErr(to, 'نام گیرنده را وارد کنید.'); valid = false; }
  else setErr(to, '');

  // ایمیل
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setErr(email, 'ایمیل معتبر نیست.'); valid = false;
  } else setErr(email, '');

  // پیام
  if (message.value.trim().length < 5) {
    setErr(message, 'پیام باید حداقل ۵ کاراکتر باشد.'); valid = false;
  } else setErr(message, '');

  // قوانین
  if (!terms.checked) {
    showToast('برای ادامه، قوانین کارت هدیه را بپذیرید.', 'error');
    valid = false;
  }

  if (!valid) {
    showToast('لطفاً فیلدهای مشخص‌شده را کامل کنید.', 'error');
    return;
  }

  // شبیه‌سازی ثبت
  const btn = $('#giftForm button[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال افزودن...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');
  }, 900);
});

/* ---------- بستن مودال موفقیت ---------- */
const closeSuccess = () => {
  successModal.classList.add('hidden');
  successModal.classList.remove('flex');
  document.body.classList.remove('overflow-hidden');
};
$$('[data-gift-close]').forEach(b => b.addEventListener('click', closeSuccess));
successModal?.addEventListener('click', e => { if (e.target === successModal) closeSuccess(); });

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
renderDesigns();
renderPopular();
updatePreview();
msgCount.textContent = '۰';