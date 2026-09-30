/* =========================================================
   Admin — Settings Page
   ========================================================= */

// const $ = (s, root = document) => root.querySelector(s);
// const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- Tabs ---------- */
const tabs = $$('.settings-tab');
const panels = $$('.settings-panel');

const switchSettingsTab = (key, updateHash = true) => {
  tabs.forEach(t => t.classList.toggle('is-active', t.dataset.settingsTab === key));
  panels.forEach(p => p.classList.toggle('is-active', p.dataset.settingsPanel === key));
  if (updateHash) history.replaceState(null, '', '#' + key);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

tabs.forEach(t => t.addEventListener('click', () => switchSettingsTab(t.dataset.settingsTab)));

// Hash اولیه
const initial = (location.hash || '#general').replace('#', '');
const validTabs = ['general', 'profile', 'notifications', 'payment', 'shipping', 'security', 'danger'];
switchSettingsTab(validTabs.includes(initial) ? initial : 'general', false);

/* ---------- Form: General ---------- */
$('#generalForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#sShopName').value.trim();
  const email = $('#sShopEmail').value.trim();
  const phone = $('#sShopPhone').value.trim();

  if (name.length < 2) return showToast('نام فروشگاه خیلی کوتاه است.', 'error');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('ایمیل معتبر نیست.', 'error');
  if (!/^0?\d{10,11}$/.test(phone.replace(/\D/g, ''))) return showToast('شماره تلفن معتبر نیست.', 'error');

  showToast('تنظیمات عمومی ذخیره شد.');
});

/* ---------- Form: Admin Profile ---------- */
$('#adminProfileForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const fn = $('#aFirstName').value.trim();
  const ln = $('#aLastName').value.trim();
  const email = $('#aEmail').value.trim();
  const phone = $('#aPhone').value.trim();

  if (fn.length < 2 || ln.length < 2) return showToast('نام و نام خانوادگی را کامل کنید.', 'error');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showToast('ایمیل معتبر نیست.', 'error');
  if (!/^0?9\d{9}$/.test(phone.replace(/\D/g, ''))) return showToast('شماره موبایل معتبر نیست.', 'error');

  showToast('اطلاعات مدیر ذخیره شد.');
});

/* ---------- Form: Admin Password ---------- */
$('#adminPasswordForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const oldP = $('#aOldP').value;
  const newP = $('#aNewP').value;
  const conf = $('#aConfirmP').value;

  if (!oldP) return showToast('رمز فعلی را وارد کنید.', 'error');
  if (newP.length < 8) return showToast('رمز جدید باید حداقل ۸ کاراکتر باشد.', 'error');
  if (!/[A-Z]/.test(newP) || !/[0-9]/.test(newP)) {
    return showToast('رمز جدید باید شامل حرف بزرگ و عدد باشد.', 'error');
  }
  if (newP !== conf) return showToast('تکرار رمز جدید یکسان نیست.', 'error');

  e.target.reset();
  showToast('رمز عبور مدیر تغییر کرد.');
});

/* ---------- Shipping Save ---------- */
$('[data-save-shipping]')?.addEventListener('click', () => {
  showToast('روش‌های ارسال ذخیره شد.');
});

/* ---------- Danger: Reset Settings ---------- */
$('[data-reset-settings]')?.addEventListener('click', () => {
  if (!confirm('همه تنظیمات به حالت اولیه بازگردند؟ این عملیات قابل بازگشت نیست.')) return;
  showToast('تنظیمات به حالت اولیه بازنشانی شد.');
});

/* ---------- Danger: Delete Store ---------- */
$('[data-delete-store]')?.addEventListener('click', () => {
  const word = prompt('برای تأیید حذف فروشگاه، عبارت «حذف فروشگاه» را وارد کنید:');
  if (word !== 'حذف فروشگاه') {
    return showToast('عبارت تأیید صحیح نبود. عملیات لغو شد.', 'error');
  }
  showToast('فروشگاه در حال حذف...', 'error');
  setTimeout(() => (window.location.href = '../../index.html'), 1500);
});

/* ---------- Switch toggles auto-toast ---------- */
$$('.switch input, .toggle-row input').forEach(input => {
  input.addEventListener('change', () => {
    // فقط برای سوییچ‌های Payment/Security پیام بده
    if (input.closest('.payment-gateway') || input.closest('.shipping-row')) {
      showToast('تغییرات ذخیره شد.');
    }
  });
});