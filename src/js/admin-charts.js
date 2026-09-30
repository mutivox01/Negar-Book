/* =========================================================
   Admin Panel - Charts (Chart.js v4)
   ========================================================= */


/* ---------- تنظیمات پیش‌فرض Chart.js ---------- */
if (typeof Chart !== 'undefined') {
  Chart.defaults.font.family = 'Vazirmatn, ui-sans-serif, system-ui, sans-serif';
  Chart.defaults.font.size = 11;
  Chart.defaults.color = '#78817e';
  Chart.defaults.borderColor = '#e7e9e4';

  // تولتیپ فارسی و راست‌چین
  Chart.defaults.plugins.tooltip.rtl = true;
  Chart.defaults.plugins.tooltip.textDirection = 'rtl';
  Chart.defaults.plugins.tooltip.backgroundColor = '#17211f';
  Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
  Chart.defaults.plugins.tooltip.bodyColor = '#d7f36b';
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
  Chart.defaults.plugins.tooltip.displayColors = false;
}


/* ---------- داده‌های نمونه ---------- */
const LABELS_30 = Array.from({ length: 30 }, (_, i) => faNum(i + 1));
const LABELS_7 = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'];

const SALES_DATA = {
  7:  [42, 58, 51, 68, 74, 92, 84],
  30: Array.from({ length: 30 }, (_, i) => Math.round(40 + Math.sin(i / 3) * 20 + Math.random() * 30 + i * 1.2)),
  90: Array.from({ length: 90 }, (_, i) => Math.round(30 + Math.sin(i / 6) * 25 + i * 0.8)),
  365: Array.from({ length: 12 }, (_, i) => Math.round(500 + Math.sin(i / 2) * 100 + i * 60)),
};

let currentSalesChart = null;
let currentSalesType = 'line';

/* ---------- نمودار فروش ---------- */
const buildSalesChart = (type = 'line', range = '30') => {
  const ctx = $('#salesChart');
  if (!ctx) return;

  if (currentSalesChart) currentSalesChart.destroy();

  const data = SALES_DATA[range] || SALES_DATA[30];
  const labels = range === '7' ? LABELS_7
    : range === '30' ? LABELS_30
    : range === '365' ? ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
    : data.map((_, i) => faNum(i + 1));

  const isBar = type === 'bar';

  const config = {
    type: isBar ? 'bar' : 'line',
    data: {
      labels,
      datasets: [{
        label: 'فروش (میلیون تومان)',
        data,
        borderColor: '#17211f',
        backgroundColor: type === 'area'
          ? (context) => {
              const { ctx: c, chartArea } = context.chart;
              if (!chartArea) return 'rgba(215, 243, 107, .2)';
              const g = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
              g.addColorStop(0, 'rgba(215, 243, 107, .55)');
              g.addColorStop(1, 'rgba(215, 243, 107, 0)');
              return g;
            }
          : isBar ? '#d7f36b' : 'rgba(215, 243, 107, .15)',
        borderWidth: isBar ? 0 : 2.5,
        fill: type === 'area' || type === 'line',
        tension: 0.4,
        pointBackgroundColor: '#d7f36b',
        pointBorderColor: '#17211f',
        pointBorderWidth: 2,
        pointRadius: type === 'line' || type === 'area' ? 0 : 0,
        pointHoverRadius: 6,
        borderRadius: isBar ? 8 : 0,
        barThickness: isBar ? 14 : undefined,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => `فروش: ${faNum(item.parsed.y)} میلیون تومان`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false, drawBorder: false },
          ticks: { maxRotation: 0, autoSkip: true, maxTicksLimit: 12 },
        },
        y: {
          grid: { color: '#e7e9e4', drawBorder: false, borderDash: [4, 4] },
          ticks: {
            callback: v => faNum(v),
            maxTicksLimit: 6,
          },
        },
      },
    },
  };

  currentSalesChart = new Chart(ctx, config);
};

/* ---------- تغییر نوع نمودار ---------- */
$$('.chart-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    currentSalesType = btn.dataset.chart;
    $$('.chart-tab').forEach(b => b.classList.toggle('is-active', b === btn));
    const range = $('#dateRange')?.value || '30';
    buildSalesChart(currentSalesType === 'area' ? 'area' : currentSalesType, range);
  });
});

/* ---------- تغییر بازه تاریخ ---------- */
$('#dateRange')?.addEventListener('change', e => {
  buildSalesChart(currentSalesType === 'area' ? 'area' : currentSalesType, e.target.value);
});

/* ---------- نمودار دسته‌بندی (Donut) ---------- */
const CATEGORIES = [
  { label: 'رمان و داستان', value: 38, color: '#17211f' },
  { label: 'روان‌شناسی', value: 24, color: '#d7f36b' },
  { label: 'کسب‌وکار', value: 16, color: '#c0a17a' },
  { label: 'کودک و نوجوان', value: 12, color: '#7ea39a' },
  { label: 'سایر', value: 10, color: '#e7e9e4' },
];

const buildCategoryChart = () => {
  const ctx = $('#categoryChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: CATEGORIES.map(c => c.label),
      datasets: [{
        data: CATEGORIES.map(c => c.value),
        backgroundColor: CATEGORIES.map(c => c.color),
        borderWidth: 0,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => `${item.label}: ${faNum(item.parsed)}٪`,
          },
        },
      },
    },
  });

  // Legend سفارشی
  const legend = $('#categoryLegend');
  if (legend) {
    legend.innerHTML = CATEGORIES.map(c => `
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="h-[10px] w-[10px] rounded-full" style="background:${c.color}"></span>
          <span class="text-[11px] font-bold">${c.label}</span>
        </div>
        <b class="text-[11px]">${faNum(c.value)}٪</b>
      </div>
    `).join('');
  }
};

/* ---------- نمودار مقایسه (Bar Grouped) ---------- */
const buildCompareChart = () => {
  const ctx = $('#compareChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: LABELS_7,
      datasets: [
        {
          label: 'فروشگاه',
          data: [42, 58, 51, 68, 74, 92, 84],
          backgroundColor: '#17211f',
          borderRadius: 6,
          barThickness: 12,
        },
        {
          label: 'مجله',
          data: [22, 34, 28, 41, 52, 66, 58],
          backgroundColor: '#d7f36b',
          borderRadius: 6,
          barThickness: 12,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            padding: 12,
            font: { size: 10 },
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          callbacks: {
            label: (item) => `${item.dataset.label}: ${faNum(item.parsed.y)}`,
          },
        },
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          grid: { color: '#e7e9e4', borderDash: [4, 4] },
          ticks: { callback: v => faNum(v), maxTicksLimit: 5 },
        },
      },
    },
  });
};

/* ---------- نمودار ترافیک (Pie) ---------- */
const buildTrafficChart = () => {
  const ctx = $('#trafficChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['جست‌وجو گوگل', 'شبکه‌های اجتماعی', 'ورود مستقیم', 'ایمیل', 'سایر'],
      datasets: [{
        data: [42, 28, 18, 8, 4],
        backgroundColor: ['#17211f', '#d7f36b', '#c0a17a', '#7ea39a', '#e7e9e4'],
        borderWidth: 0,
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            padding: 10,
            font: { size: 10 },
            usePointStyle: true,
            pointStyle: 'circle',
          },
        },
        tooltip: {
          callbacks: {
            label: (item) => `${item.label}: ${faNum(item.parsed)}٪`,
          },
        },
      },
    },
  });
};

/* ---------- نمودار هدف (Radial) ---------- */
const buildGoalChart = () => {
  const ctx = $('#goalChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['تحقق هدف', 'باقیمانده'],
      datasets: [{
        data: [99.6, 0.4],
        backgroundColor: ['#d7f36b', '#e7e9e4'],
        borderWidth: 0,
        circumference: 220,
        rotation: 250,
        cutout: '78%',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (item) => `${item.label}: ${faNum(item.parsed)}٪`,
          },
        },
      },
    },
  });
};

/* ---------- Init ---------- */
const initCharts = () => {
  buildSalesChart('line', '30');
  buildCategoryChart();
  buildCompareChart();
  buildTrafficChart();
  buildGoalChart();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCharts);
} else {
  initCharts();
}