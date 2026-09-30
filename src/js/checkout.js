/* =========================================================
   Checkout page - اعتبارسنجی، محاسبه مبالغ، کد تخفیف
   ========================================================= */

// const $ = (s, root = document) => root.querySelector(s);
// const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- Utilities ---------- */
const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const toman = n => faNum(Math.round(n).toLocaleString('en-US')) + ' تومان';

/* ---------- داده‌های نمونه ---------- */
const CART = [
  { id: 5, title: 'روایت یک زندگی', qty: 1, price: 275000, cover: 'bg-[#657c71]' },
  { id: 6, title: 'فلسفه برای زندگی', qty: 1, price: 320000, cover: 'bg-[#98785a]' },
];

const COUPONS = {
  'NEGAR20': { type: 'percent', value: 20, label: '۲۰٪ تخفیف' },
  'BOOK50K': { type: 'fixed', value: 50000, label: '۵۰ هزار تومان تخفیف' },
};

/* ---------- State ---------- */
const state = {
  shipping: 35000,
  discount: 0,
  coupon: null,
};

/* ---------- Refs ---------- */
const form = $('#checkoutForm');
const sumItems = $('#sumItems');
const sumShipping = $('#sumShipping');
const sumDiscount = $('#sumDiscount');
const sumTotal = $('#sumTotal');
const discountRow = $('#discountRow');
const couponInput = $('#couponInput');
const couponMsg = $('#couponMsg');
const applyCouponBtn = $('#applyCoupon');
const submitBtn = $('#submitBtn');

/* ---------- محاسبه مبالغ ---------- */
const calcSubtotal = () => CART.reduce((s, i) => s + i.price * i.qty, 0);

const updateTotals = () => {
  const subtotal = calcSubtotal();
  const total = Math.max(0, subtotal + state.shipping - state.discount);

  sumItems.textContent = toman(subtotal);
  sumShipping.textContent = state.shipping === 0 ? 'رایگان' : toman(state.shipping);
  sumTotal.textContent = toman(total);

  if (state.discount > 0) {
    discountRow.classList.remove('hidden');
    discountRow.classList.add('flex');
    sumDiscount.textContent = '− ' + toman(state.discount);
  } else {
    discountRow.classList.add('hidden');
    discountRow.classList.remove('flex');
  }
};

/* ---------- انتخاب شیوه ارسال ---------- */
$$('input[name="shipping"]').forEach(radio => {
  radio.addEventListener('change', () => {
    state.shipping = +radio.dataset.cost || 0;
    updateTotals();
    $$('.ship-option').forEach(l => l.classList.toggle('is-selected', l.contains(radio) && radio.checked));
  });
});
// init selected
$$('.ship-option').forEach(l => l.classList.toggle('is-selected', $('input', l)?.checked));

/* ---------- انتخاب شیوه پرداخت ---------- */
$$('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', () => {
    $$('.pay-option').forEach(l => l.classList.toggle('is-selected', l.contains(radio) && radio.checked));
  });
});
$$('.pay-option').forEach(l => l.classList.toggle('is-selected', $('input', l)?.checked));

/* ---------- کد تخفیف ---------- */
const showCouponMsg = (msg, ok = true) => {
  couponMsg.textContent = msg;
  couponMsg.classList.remove('hidden', 'text-accent-dark', 'text-danger');
  couponMsg.classList.add(ok ? 'text-accent-dark' : 'text-danger');
};

applyCouponBtn?.addEventListener('click', () => {
  const code = (couponInput.value || '').trim().toUpperCase();
  if (!code) {
    state.discount = 0;
    state.coupon = null;
    couponMsg.classList.add('hidden');
    updateTotals();
    return;
  }
  const c = COUPONS[code];
  if (!c) {
    state.discount = 0;
    state.coupon = null;
    showCouponMsg('کد تخفیف معتبر نیست.', false);
    updateTotals();
    return;
  }
  const subtotal = calcSubtotal();
  state.discount = c.type === 'percent' ? Math.round(subtotal * c.value / 100) : c.value;
  state.discount = Math.min(state.discount, subtotal);
  state.coupon = code;
  showCouponMsg(`کد «${code}» اعمال شد — ${c.label}`, true);
  updateTotals();
});

// اعمال با Enter
couponInput?.addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); applyCouponBtn.click(); }
});

/* ---------- اعتبارسنجی ---------- */
const validators = {
  firstName: v => v.trim().length >= 2 || 'نام را وارد کنید.',
  lastName: v => v.trim().length >= 2 || 'نام خانوادگی را وارد کنید.',
  phone: v => /^0?9\d{9}$/.test(v.replace(/\D/g, '')) || 'شماره موبایل معتبر نیست (۱۱ رقم).',
  email: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'ایمیل معتبر نیست.',
  province: v => !!v || 'استان را انتخاب کنید.',
  city: v => v.trim().length >= 2 || 'شهر را وارد کنید.',
  address: v => v.trim().length >= 10 || 'نشانی کامل را وارد کنید (حداقل ۱۰ کاراکتر).',
  postalCode: v => /^\d{10}$/.test(v.replace(/\D/g, '')) || 'کد پستی باید ۱۰ رقم باشد.',
};

const setError = (input, message) => {
  const field = input.closest('.field');
  if (!field) return;
  const err = $('.error', field);
  if (message) {
    field.classList.add('has-error');
    if (err) err.textContent = message;
  } else {
    field.classList.remove('has-error');
    if (err) err.textContent = '';
  }
};

const validateField = input => {
  const name = input.name;
  const v = validators[name];
  if (!v) return true;
  const result = v(input.value);
  const ok = result === true;
  setError(input, ok ? '' : result);
  return ok;
};

// اعتبارسنجی لحظه‌ای
Object.keys(validators).forEach(name => {
  const input = form.elements[name];
  if (!input) return;
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.closest('.field')?.classList.contains('has-error')) validateField(input);
  });
});

/* ---------- ارسال فرم ---------- */
form.addEventListener('submit', e => {
  e.preventDefault();

  // اعتبارسنجی همه فیلدها
  let firstInvalid = null;
  Object.keys(validators).forEach(name => {
    const input = form.elements[name];
    if (!input) return;
    const ok = validateField(input);
    if (!ok && !firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) {
    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstInvalid.focus({ preventScroll: true });
    showToast('لطفاً فیلدهای مشخص‌شده را کامل کنید.', 'error');
    return;
  }

  // شبیه‌سازی پرداخت
  submitBtn.disabled = true;
  const original = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال انتقال به درگاه...';

  const payload = {
    customer: {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      phone: form.phone.value.replace(/\D/g, ''),
      email: form.email.value.trim(),
    },
    address: {
      province: form.province.value,
      city: form.city.value.trim(),
      address: form.address.value.trim(),
      postalCode: form.postalCode.value.replace(/\D/g, ''),
      unit: form.unit.value.trim(),
    },
    shipping: form.shipping.value,
    payment: form.payment.value,
    note: form.note.value.trim(),
    coupon: state.coupon,
    totals: {
      items: calcSubtotal(),
      shipping: state.shipping,
      discount: state.discount,
      total: Math.max(0, calcSubtotal() + state.shipping - state.discount),
    },
  };

  // اطلاعات را ذخیره می‌کنیم تا در صفحه موفقیت استفاده شود
  sessionStorage.setItem('negar_checkout', JSON.stringify(payload));

  setTimeout(() => {
    // در پیاده‌سازی واقعی اینجا به درگاه بانکی ریدایرکت می‌شود
    window.location.href = './checkout-success.html';
  }, 1400);
});

/* ---------- Toast ---------- */
const showToast = (msg, type = 'success') => {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.className = `fixed bottom-5 left-5 z-[100] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2600);
};

/* ---------- Init ---------- */
updateTotals();