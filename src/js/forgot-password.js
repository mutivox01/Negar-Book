/* =========================================================
   Forgot Password Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);
const faToEn = s => String(s).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

/* ---------- State ---------- */
const state = {
  phone: '',
  otp: '',
  timerId: null,
  secondsLeft: 120,
  verifiedCode: null, // شبیه‌سازی: کد تأیید اینجا ذخیره می‌شود
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
  if (!field) return;
  field.classList.toggle('has-error', !!message);
  const err = $('.error', field);
  if (err) err.textContent = message || '';
};

/* ---------- Step navigation ---------- */
const goToStep = n => {
  $$('.forgot-panel').forEach(p => p.classList.toggle('is-active', p.dataset.panel === String(n)));
  $$('.forgot-step').forEach(s => {
    const step = +s.dataset.step;
    s.classList.toggle('is-active', step === n);
    s.classList.toggle('is-done', step < n);
  });
  // آپدیت آیکون‌های مراحل انجام‌شده
  $$('.forgot-step').forEach(s => {
    const num = $('.forgot-step-num', s);
    if (!num) return;
    const step = +s.dataset.step;
    if (step < n) {
      num.innerHTML = '<i class="ri-check-line"></i>';
    } else {
      num.textContent = faNum(step);
    }
  });
};

/* ---------- Step 1: phone ---------- */
const step1Form = $('#step1Form');
const phoneInput = $('#phone');

// فرمت خودکار شماره
phoneInput?.addEventListener('input', e => {
  let v = faToEn(e.target.value).replace(/\D/g, '');
  if (v.startsWith('98')) v = v.slice(2);
  if (v.startsWith('0')) v = v.slice(1);
  v = v.slice(0, 10);
  // فرمت ۳-۳-۴
  const parts = [v.slice(0, 3), v.slice(3, 6), v.slice(6, 10)].filter(Boolean);
  e.target.value = parts.join(' ');
});

step1Form?.addEventListener('submit', e => {
  e.preventDefault();
  const raw = faToEn(phoneInput.value).replace(/\D/g, '');
  const normalized = raw.length === 10 ? '0' + raw : raw;

  if (!/^09\d{9}$/.test(normalized)) {
    setError(phoneInput, 'شماره موبایل معتبر نیست.');
    return;
  }
  setError(phoneInput, '');

  state.phone = normalized;
  const masked = `${normalized.slice(0, 4)}***${normalized.slice(-4)}`;
  $('#phoneDisplay').textContent = faNum(masked);

  // شبیه‌سازی ارسال کد
  state.verifiedCode = '123456'; // در نسخه واقعی از سرور می‌آید
  console.log('کد تأیید (نمایشی):', state.verifiedCode);
  showToast('کد تأیید پیامک شد. کد نمایشی: ۱۲۳۴۵۶');

  goToStep(2);
  startOtpTimer();
  setTimeout(() => $$('.otp-input')[0]?.focus(), 150);
});

/* ---------- Step 2: OTP ---------- */
const otpInputs = $$('.otp-input');
const otpError = $('#otpError');

otpInputs.forEach((input, i) => {
  input.addEventListener('input', e => {
    let v = faToEn(e.target.value).replace(/\D/g, '');
    e.target.value = v.slice(-1);

    if (v && i < otpInputs.length - 1) {
      otpInputs[i + 1].focus();
    }
    clearOtpError();
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !e.target.value && i > 0) {
      otpInputs[i - 1].focus();
    }
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
const otpTimer = $('#otpTimer');
const resendOtp = $('#resendOtp');

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

/* ---------- Step 2: submit ---------- */
$('#step2Form')?.addEventListener('submit', e => {
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
  goToStep(3);
  setTimeout(() => $('#newPassword')?.focus(), 150);
});

/* ---------- Back buttons ---------- */
$$('[data-back]').forEach(btn => {
  btn.addEventListener('click', () => {
    const step = +btn.dataset.back;
    if (state.timerId) clearInterval(state.timerId);
    goToStep(step);
  });
});

/* ---------- Password toggles ---------- */
$$('.password-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.toggle);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    const icon = $('i', btn);
    if (icon) {
      icon.classList.toggle('ri-eye-line', !isPassword);
      icon.classList.toggle('ri-eye-off-line', isPassword);
    }
  });
});

/* ---------- Password strength ---------- */
const newPassInput = $('#newPassword');
const strengthBars = $$('.strength-bar');
const strengthLabel = $('#strengthLabel');

const reqs = {
  length: $('#req-length'),
  upper: $('#req-upper'),
  lower: $('#req-lower'),
  number: $('#req-number'),
};

const evaluate = v => {
  const checks = {
    length: v.length >= 8,
    upper: /[A-Z]/.test(v),
    lower: /[a-z]/.test(v),
    number: /\d/.test(v),
  };

  // به‌روزرسانی requirements
  Object.entries(checks).forEach(([key, ok]) => {
    const el = reqs[key];
    if (!el) return;
    el.classList.toggle('is-ok', ok);
    const icon = $('i', el);
    if (icon) {
      icon.classList.toggle('ri-checkbox-blank-circle-line', !ok);
      icon.classList.toggle('ri-checkbox-circle-fill', ok);
    }
  });

  // امتیاز
  const score = Object.values(checks).filter(Boolean).length;
  const extra = v.length >= 12 ? 1 : 0;
  const total = Math.min(4, score + (extra ? 1 : 0));

  const labels = ['—', 'ضعیف', 'متوسط', 'خوب', 'قوی'];
  const colors = ['', 'bg-danger', 'bg-[#f0b429]', 'bg-accent-dark', 'bg-[#2e7d55]'];

  strengthBars.forEach((bar, i) => {
    bar.className = 'strength-bar';
    if (i < total) bar.classList.add(colors[total]);
  });

  if (strengthLabel) {
    strengthLabel.textContent = `قدرت رمز: ${v ? labels[total] : '—'}`;
    strengthLabel.className = 'strength-label';
    if (v) {
      strengthLabel.classList.add(
        total <= 1 ? 'text-danger' :
        total === 2 ? 'text-[#a5622c]' :
        total === 3 ? 'text-accent-dark' :
        'text-[#2e7d55]'
      );
    }
  }

  return {
    valid: Object.values(checks).every(Boolean),
    checks,
  };
};

newPassInput?.addEventListener('input', e => {
  evaluate(e.target.value);
});

/* ---------- Step 3: submit ---------- */
$('#step3Form')?.addEventListener('submit', e => {
  e.preventDefault();
  const np = $('#newPassword');
  const cp = $('#confirmPassword');

  const { valid } = evaluate(np.value);
  if (!valid) {
    setError(np, 'رمز جدید باید همه‌ی شرایط را داشته باشد.');
    return;
  }
  setError(np, '');

  if (np.value !== cp.value) {
    setError(cp, 'تکرار رمز یکسان نیست.');
    return;
  }
  setError(cp, '');

  // شبیه‌سازی ذخیره
  setTimeout(() => {
    goToStep(4);
  }, 400);
});

/* ---------- Phone field: clear error on input ---------- */
phoneInput?.addEventListener('input', () => setError(phoneInput, ''));
otpInputs.forEach(i => i.addEventListener('input', clearOtpError));

/* ---------- Keyboard: Ctrl+K (بی‌ربط به forgot، برای سازگاری) ---------- */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
  }
});

/* ---------- Init ---------- */
phoneInput?.focus();