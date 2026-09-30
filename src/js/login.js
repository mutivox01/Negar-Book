/* =========================================================
   Login / Register Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const faToEn = s => String(s).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

/* ---------- State ---------- */
const state = {
  mode: 'login',       // 'login' | 'register'
  phone: '',
  otp: '',
  verifiedCode: '123456', // شبیه‌سازی
  timerId: null,
  secondsLeft: 120,
};

/* ---------- Helpers ---------- */
const showToast = (msg, type = 'success') => {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[200] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
};

const setError = (input, message) => {
  const field = input.closest('.field') || input.parentElement;
  field.classList.toggle('has-error', !!message);
  const err = $('.error', field);
  if (err) err.textContent = message || '';
};

const clearAllErrors = () => {
  $$('.field.has-error').forEach(f => {
    f.classList.remove('has-error');
    const err = $('.error', f);
    if (err) err.textContent = '';
  });
  $$('.otp-input').forEach(i => i.classList.remove('has-error'));
  const err = $('#authOtpError');
  if (err) err.textContent = '';
};

/* ---------- Step navigation ---------- */
const goToStep = step => {
  $$('.auth-step').forEach(s => s.classList.toggle('is-active', s.dataset.step === step));
  clearAllErrors();
};

/* ---------- Tabs (login / register) ---------- */
const tabs = $$('.auth-tab');
const indicator = $('#authTabIndicator');
const authTitle = $('#authTitle');
const authDesc = $('#authDesc');
const phoneSubmitText = $('#phoneSubmitText');

const moveIndicator = () => {
  const active = $('.auth-tab.is-active');
  if (!active || !indicator) return;
  const rect = active.getBoundingClientRect();
  const parentRect = active.parentElement.getBoundingClientRect();
  indicator.style.width = rect.width + 'px';
  indicator.style.transform = `translateX(${rect.right - parentRect.right + 4}px)`;
};

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    state.mode = tab.dataset.authTab;
    tabs.forEach(t => t.classList.toggle('is-active', t === tab));
    moveIndicator();

    if (state.mode === 'login') {
      authTitle.textContent = 'ورود به حساب';
      authDesc.textContent = 'برای ادامه، شماره موبایلت را وارد کن.';
      phoneSubmitText.textContent = 'ارسال کد ورود';
    } else {
      authTitle.textContent = 'ساخت حساب جدید';
      authDesc.textContent = 'برای شروع، شماره موبایلت را وارد کن.';
      phoneSubmitText.textContent = 'ارسال کد ثبت‌نام';
    }
  });
});

// Initial position
window.addEventListener('load', moveIndicator);
window.addEventListener('resize', moveIndicator);
setTimeout(moveIndicator, 100);

/* ---------- Phone form ---------- */
const phoneInput = $('#authPhone');

phoneInput?.addEventListener('input', e => {
  let v = faToEn(e.target.value).replace(/\D/g, '');
  if (v.startsWith('98')) v = v.slice(2);
  if (v.startsWith('0')) v = v.slice(1);
  v = v.slice(0, 10);
  const parts = [v.slice(0, 3), v.slice(3, 6), v.slice(6, 10)].filter(Boolean);
  e.target.value = parts.join(' ');
  setError(phoneInput, '');
});

$('#phoneForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const raw = faToEn(phoneInput.value).replace(/\D/g, '');
  const normalized = raw.length === 10 ? '0' + raw : raw;

  if (!/^09\d{9}$/.test(normalized)) {
    setError(phoneInput, 'شماره موبایل معتبر نیست.');
    return;
  }

  state.phone = normalized;
  const masked = `${normalized.slice(0, 4)}***${normalized.slice(-4)}`;
  $('#otpPhoneDisplay').textContent = faNum(masked);

  state.verifiedCode = '123456';
  console.log('کد تأیید (نمایشی):', state.verifiedCode);
  showToast('کد تأیید پیامک شد. کد نمایشی: ۱۲۳۴۵۶');

  goToStep('otp');
  startOtpTimer();
  setTimeout(() => $$('#authOtpInputs .otp-input')[0]?.focus(), 150);
});

/* ---------- OTP ---------- */
const otpInputs = $$('#authOtpInputs .otp-input');
const otpError = $('#authOtpError');

otpInputs.forEach((input, i) => {
  input.addEventListener('input', e => {
    let v = faToEn(e.target.value).replace(/\D/g, '');
    e.target.value = v.slice(-1);
    if (v && i < otpInputs.length - 1) otpInputs[i + 1].focus();
    clearOtpError();
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !e.target.value && i > 0) otpInputs[i - 1].focus();
    if (e.key === 'ArrowLeft' && i < otpInputs.length - 1) otpInputs[i + 1].focus();
    if (e.key === 'ArrowRight' && i > 0) otpInputs[i - 1].focus();
  });

  input.addEventListener('paste', e => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    const digits = faToEn(text).replace(/\D/g, '').slice(0, otpInputs.length);
    digits.split('').forEach((d, idx) => {
      if (otpInputs[idx]) otpInputs[idx].value = d;
    });
    const next = Math.min(digits.length, otpInputs.length - 1);
    otpInputs[next]?.focus();
  });
});

const clearOtpError = () => {
  otpError.textContent = '';
  otpInputs.forEach(i => i.classList.remove('has-error'));
};

/* ---------- OTP Timer ---------- */
const otpTimer = $('#authOtpTimer');
const resendOtp = $('#authResendOtp');

const startOtpTimer = () => {
  if (state.timerId) clearInterval(state.timerId);
  state.secondsLeft = 120;

  const tick = () => {
    const m = Math.floor(state.secondsLeft / 60);
    const s = state.secondsLeft % 60;
    const label = `${faNum(String(m).padStart(2, '0'))}:${faNum(String(s).padStart(2, '0'))}`;
    otpTimer.innerHTML = `ارسال مجدد کد تا <b>${label}</b>`;

    if (state.secondsLeft <= 0) {
      clearInterval(state.timerId);
      state.timerId = null;
      otpTimer.classList.add('hidden');
      resendOtp.classList.remove('hidden');
      return;
    }
    state.secondsLeft--;
  };

  tick();
  state.timerId = setInterval(tick, 1000);
  otpTimer.classList.remove('hidden');
  resendOtp.classList.add('hidden');
};

resendOtp?.addEventListener('click', () => {
  state.verifiedCode = '123456';
  showToast('کد جدید ارسال شد. کد نمایشی: ۱۲۳۴۵۶');
  startOtpTimer();
});

/* ---------- OTP form submit ---------- */
$('#otpForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const code = otpInputs.map(i => faToEn(i.value)).join('');

  if (code.length !== 6) {
    otpError.textContent = 'کد ۶ رقمی را کامل وارد کنید.';
    otpInputs.forEach(i => i.classList.add('has-error'));
    return;
  }
  if (code !== state.verifiedCode) {
    otpError.textContent = 'کد وارد شده صحیح نیست. (کد نمایشی: ۱۲۳۴۵۶)';
    otpInputs.forEach(i => i.classList.add('has-error'));
    return;
  }

  clearOtpError();
  if (state.timerId) clearInterval(state.timerId);
  state.otp = code;

  // اگر حالت ورود بود، مستقیم موفقیت
  if (state.mode === 'login') {
    goToStep('success');
  } else {
    // حالت ثبت‌نام: مرحله تکمیل اطلاعات
    goToStep('complete');
    setTimeout(() => $('#authName')?.focus(), 150);
  }
});

/* ---------- Back buttons ---------- */
$$('[data-back]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (state.timerId) clearInterval(state.timerId);
    otpInputs.forEach(i => (i.value = ''));
    goToStep(btn.dataset.back);
  });
});

/* ---------- Complete form (register) ---------- */
$('#completeForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#authName');
  const email = $('#authEmail');

  let valid = true;

  if (name.value.trim().length < 2) {
    setError(name, 'نام را وارد کنید.');
    valid = false;
  } else setError(name, '');

  if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setError(email, 'ایمیل معتبر نیست.');
    valid = false;
  } else setError(email, '');

  if (!valid) return;

  const btn = $('#completeForm button[type="submit"]');
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال ساخت حساب...';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
    showToast('حساب شما با موفقیت ساخته شد!');
    goToStep('success');
  }, 900);
});

/* ---------- Social buttons (نمایشی) ---------- */
$$('.auth-social').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('ورود با شبکه‌های اجتماعی به‌زودی فعال می‌شود.');
  });
});

/* ---------- Init ---------- */
phoneInput?.focus();