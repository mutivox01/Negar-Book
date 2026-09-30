/* =========================================================
   Maintenance Page
   ========================================================= */

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const faNum = n => String(n).padStart(2, '0').replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

/* ---------- شمارش معکوس ---------- */
const endTime = new Date(document.body.dataset.maintenanceEnd || Date.now() + 3600000);

const cdDays = $('#cdDays');
const cdHours = $('#cdHours');
const cdMinutes = $('#cdMinutes');
const cdSeconds = $('#cdSeconds');

const tick = () => {
  const now = Date.now();
  const diff = Math.max(0, endTime.getTime() - now);

  const total = Math.floor(diff / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  if (cdDays) cdDays.textContent = faNum(days);
  if (cdHours) cdHours.textContent = faNum(hours);
  if (cdMinutes) cdMinutes.textContent = faNum(minutes);
  if (cdSeconds) cdSeconds.textContent = faNum(seconds);

  if (diff === 0) {
    clearInterval(window.__maintTick);
    showToast('سایت به‌زودی فعال می‌شود! لطفاً صفحه را رفرش کنید.');
  }
};

tick();
window.__maintTick = setInterval(tick, 1000);

/* ---------- نوار پیشرفت (نمایشی) ---------- */
const progressBar = $('#progressBar');
const progressLabel = $('#progressLabel');
let progress = 68;

// افزایش آرام پیشرفت تا سقف ۹۵٪
setInterval(() => {
  if (progress >= 95) return;
  progress += Math.random() * 0.4;
  progress = Math.min(progress, 95);
  if (progressBar) progressBar.style.width = progress + '%';
  if (progressLabel) progressLabel.textContent = faNum(Math.floor(progress)) + '٪';
}, 4000);

/* ---------- فرم خبرنامه ---------- */
const form = $('#maintNewsletter');

form?.addEventListener('submit', e => {
  e.preventDefault();
  const input = $('input', form);
  const email = input.value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return showToast('ایمیل معتبر نیست.', 'error');
  }

  const btn = $('button', form);
  const original = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="ri-loader-4-line animate-spin"></i>';

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = original;
    input.value = '';
    showToast('ثبت شد! به‌محض فعال شدن سایت بهت خبر می‌دهیم.');
  }, 900);
});

/* ---------- Toast ---------- */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.textContent = msg;
  t.className = `fixed bottom-5 left-5 z-[200] rounded-xl px-4 py-3 text-xs font-bold text-white shadow-soft ${
    type === 'error' ? 'bg-danger' : 'bg-ink'
  }`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2800);
}