/* =========================================================
   Error Pages (400 / 401 / 500) — منطق مشترک
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- شمارش معکوس + ریدایرکت خودکار ---------- */
const body = document.body;
const autoRedirect = body.dataset.autoRedirect;
const seconds = parseInt(body.dataset.countdown || '10', 10);

const countdownEl = $('#countdown');
const cancelBtn = $('#cancelRedirect');

let remaining = seconds;
let timerId = null;
let cancelled = false;

const stopTimer = () => {
  if (timerId) clearInterval(timerId);
  timerId = null;
};

const goNow = () => {
  if (cancelled || !autoRedirect) return;
  window.location.href = autoRedirect;
};

if (autoRedirect && countdownEl) {
  countdownEl.textContent = faNum(remaining);

  timerId = setInterval(() => {
    remaining--;
    countdownEl.textContent = faNum(Math.max(remaining, 0));
    if (remaining <= 0) {
      stopTimer();
      goNow();
    }
  }, 1000);
}

/* ---------- لغو بازگشت خودکار ---------- */
cancelBtn?.addEventListener('click', () => {
  cancelled = true;
  stopTimer();
  const box = countdownEl?.closest('p');
  if (box) {
    box.innerHTML = '<i class="ri-check-line text-accent-dark"></i> بازگشت خودکار لغو شد.';
    box.classList.add('bg-accent/10', 'border-accent/40');
  }
});

/* ---------- دکمه تلاش مجدد (فقط در 500) ---------- */
$('#reloadBtn')?.addEventListener('click', () => {
  const btn = $('#reloadBtn');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i> در حال تلاش...';
  btn.disabled = true;
  setTimeout(() => {
    window.location.reload();
  }, 900);
});

/* ---------- افکت پارالاکس سبک روی موس (فقط دسکتاپ) ---------- */
if (window.matchMedia('(pointer: fine)').matches) {
  const wrap = $('.error-wrap');
  const orb = $('.error-orb');
  const floats = $$('.error-float');

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    if (orb) orb.style.transform = `translate(${dx * 10}px, ${dy * 10}px)`;
    floats.forEach((el, i) => {
      const f = (i + 1) * 0.6;
      el.style.transform = `translate(${dx * 12 * f}px, ${dy * 12 * f}px)`;
    });
  });
}

/* ---------- کیبورد: کلید R برای reload، Esc برای بازگشت ---------- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && autoRedirect) {
    window.location.href = autoRedirect;
  }
  if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
    if (document.activeElement.tagName !== 'INPUT') {
      window.location.reload();
    }
  }
});