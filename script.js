const STORAGE_KEY = "adBudgetPlatforms";

const DEFAULT_PLATFORMS = [
  {
    id: crypto.randomUUID(),
    name: "LinkedIn Jobs",
    country: "United States",
    currency: "USD",
    pricingModel: "perDay",
    rate: 45,
    minCharge: 0,
    notes: "Typical sponsored job daily run",
  },
  {
    id: crypto.randomUUID(),
    name: "Indeed Sponsored",
    country: "United States",
    currency: "USD",
    pricingModel: "perDay",
    rate: 32,
    minCharge: 0,
    notes: "Average CPC-driven equivalent daily budget",
  },
  {
    id: crypto.randomUUID(),
    name: "Naukri",
    country: "India",
    currency: "INR",
    pricingModel: "perWeek",
    rate: 4500,
    minCharge: 0,
    notes: "Weekly visibility package",
  },
  {
    id: crypto.randomUUID(),
    name: "Foundit",
    country: "India",
    currency: "INR",
    pricingModel: "perWeek",
    rate: 3800,
    minCharge: 0,
    notes: "Job posting + database access bundle",
  },
  {
    id: crypto.randomUUID(),
    name: "TimesJobs",
    country: "India",
    currency: "INR",
    pricingModel: "perPost",
    rate: 2500,
    minCharge: 0,
    notes: "Single listing package",
  },
  {
    id: crypto.randomUUID(),
    name: "Seek",
    country: "Australia",
    currency: "AUD",
    pricingModel: "perPost",
    rate: 250,
    minCharge: 0,
    notes: "Standard listing",
  },
  {
    id: crypto.randomUUID(),
    name: "Reed",
    country: "United Kingdom",
    currency: "GBP",
    pricingModel: "perPost",
    rate: 89,
    minCharge: 0,
    notes: "Single ad slot",
  },
  {
    id: crypto.randomUUID(),
    name: "JobStreet",
    country: "Singapore",
    currency: "SGD",
    pricingModel: "perPost",
    rate: 180,
    minCharge: 0,
    notes: "Single post package",
  },
  {
    id: crypto.randomUUID(),
    name: "Bayt",
    country: "United Arab Emirates",
    currency: "AED",
    pricingModel: "perWeek",
    rate: 650,
    minCharge: 0,
    notes: "Weekly promoted listing",
  },
];

const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4", "#84cc16"];

const state = {
  platforms: [],
  lastAnalysis: null,
};

const ui = {
  tabs: document.querySelectorAll(".tab-button"),
  panels: document.querySelectorAll(".tab-panel"),
  analysisForm: document.getElementById("analysisForm"),
  campaignName: document.getElementById("campaignName"),
  startDate: document.getElementById("startDate"),
  endDate: document.getElementById("endDate"),
  analysisCountry: document.getElementById("analysisCountry"),
  analysisCurrency: document.getElementById("analysisCurrency"),
  dateButtons: document.querySelectorAll(".date-btn"),
  checkboxList: document.getElementById("platformCheckboxList"),
  results: document.getElementById("results"),
  emptyState: document.getElementById("emptyState"),
  totalBudget: document.getElementById("totalBudget"),
  totalBudgetMeta: document.getElementById("totalBudgetMeta"),
  durationDays: document.getElementById("durationDays"),
  platformCount: document.getElementById("platformCount"),
  barChart: document.getElementById("barChart"),
  donut: document.getElementById("donut"),
  donutLegend: document.getElementById("donutLegend"),
  breakdownBody: document.getElementById("breakdownBody"),
  platformForm: document.getElementById("platformForm"),
  editingId: document.getElementById("editingId"),
  platformName: document.getElementById("platformName"),
  country: document.getElementById("country"),
  currency: document.getElementById("currency"),
  pricingModel: document.getElementById("pricingModel"),
  rate: document.getElementById("rate"),
  minCharge: document.getElementById("minCharge"),
  notes: document.getElementById("notes"),
  platformTableBody: document.getElementById("platformTableBody"),
  clearFormBtn: document.getElementById("clearFormBtn"),
  resetDefaultsBtn: document.getElementById("resetDefaultsBtn"),
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  exportPdfBtn: document.getElementById("exportPdfBtn"),
};

function formatCurrency(value, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${Number(value).toFixed(2)} ${currency}`;
  }
}

function sanitizePlatform(platform) {
  return {
    id: platform.id || crypto.randomUUID(),
    name: platform.name || "Unnamed Platform",
    country: platform.country || "Global",
    currency: platform.currency || "USD",
    pricingModel: platform.pricingModel || "perPost",
    rate: Number(platform.rate ?? 0),
    minCharge: Number(platform.minCharge ?? 0),
    notes: platform.notes || "",
  };
}

function readPlatforms() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLATFORMS));
    return DEFAULT_PLATFORMS.map((item) => ({ ...item }));
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(sanitizePlatform);
    }
  } catch {
    return DEFAULT_PLATFORMS.map((item) => ({ ...item }));
  }

  return DEFAULT_PLATFORMS.map((item) => ({ ...item }));
}

function persistPlatforms() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.platforms));
}

function pricingModelLabel(model) {
  if (model === "perDay") return "Per Day";
  if (model === "perWeek") return "Per Week";
  return "Per Post";
}

function unitsForDuration(platform, days) {
  if (platform.pricingModel === "perDay") return days;
  if (platform.pricingModel === "perWeek") return Math.ceil(days / 7);
  return 1;
}

function calculateCost(platform, days) {
  const units = unitsForDuration(platform, days);
  const cost = Math.max(units * Number(platform.rate), Number(platform.minCharge || 0));
  return { units, cost };
}

function formatDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function formatDateIso(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function renderAnalysisFilters() {
  const countryOptions = uniqueValues(state.platforms.map((item) => item.country));
  const currencyOptions = uniqueValues(state.platforms.map((item) => item.currency));

  const prevCountry = ui.analysisCountry.value || "all";
  const prevCurrency = ui.analysisCurrency.value || "all";

  ui.analysisCountry.innerHTML = `<option value="all">All Countries</option>${countryOptions
    .map((country) => `<option value="${country}">${country}</option>`)
    .join("")}`;

  ui.analysisCurrency.innerHTML = `<option value="all">All Currencies</option>${currencyOptions
    .map((currency) => `<option value="${currency}">${currency}</option>`)
    .join("")}`;

  ui.analysisCountry.value = countryOptions.includes(prevCountry) ? prevCountry : "all";
  ui.analysisCurrency.value = currencyOptions.includes(prevCurrency) ? prevCurrency : "all";
}

function getFilteredPlatforms() {
  const countryFilter = ui.analysisCountry.value;
  const currencyFilter = ui.analysisCurrency.value;

  return state.platforms.filter((platform) => {
    const countryMatch = countryFilter === "all" || platform.country === countryFilter;
    const currencyMatch = currencyFilter === "all" || platform.currency === currencyFilter;
    return countryMatch && currencyMatch;
  });
}

function renderPlatformCheckboxes() {
  ui.checkboxList.innerHTML = "";
  const filtered = getFilteredPlatforms();

  if (filtered.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No platforms match current country/currency filters.";
    ui.checkboxList.appendChild(message);
    return;
  }

  filtered.forEach((platform) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = platform.id;

    const text = document.createElement("span");
    text.textContent = `${platform.name} • ${platform.country} • ${platform.currency} (${pricingModelLabel(platform.pricingModel)})`;

    label.appendChild(input);
    label.appendChild(text);
    ui.checkboxList.appendChild(label);
  });
}

function renderPlatformTable() {
  ui.platformTableBody.innerHTML = "";

  state.platforms.forEach((platform) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${platform.name}</td>
      <td>${platform.country}</td>
      <td>${platform.currency}</td>
      <td>${pricingModelLabel(platform.pricingModel)}</td>
      <td>${formatCurrency(Number(platform.rate), platform.currency)}</td>
      <td>${formatCurrency(Number(platform.minCharge || 0), platform.currency)}</td>
      <td>${platform.notes || "-"}</td>
      <td>
        <div class="table-action">
          <button class="small-btn" data-action="edit" data-id="${platform.id}">Edit</button>
          <button class="small-btn" data-action="delete" data-id="${platform.id}">Delete</button>
        </div>
      </td>
    `;
    ui.platformTableBody.appendChild(row);
  });
}

function resetPlatformForm() {
  ui.editingId.value = "";
  ui.platformForm.reset();
  ui.currency.value = "USD";
  ui.minCharge.value = 0;
}

function updateAllPlatformViews() {
  renderAnalysisFilters();
  renderPlatformCheckboxes();
  renderPlatformTable();
}

function analyzeBudget(event) {
  event.preventDefault();

  const start = new Date(ui.startDate.value);
  const end = new Date(ui.endDate.value);

  if (!ui.startDate.value || !ui.endDate.value || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    alert("Please select valid start and end dates.");
    return;
  }

  if (end < start) {
    alert("End date must be after start date.");
    return;
  }

  const selectedIds = [...ui.checkboxList.querySelectorAll("input:checked")].map((item) => item.value);
  if (selectedIds.length === 0) {
    alert("Select at least one platform.");
    return;
  }

  const oneDay = 24 * 60 * 60 * 1000;
  const days = Math.floor((end - start) / oneDay) + 1;

  const selectedPlatforms = state.platforms.filter((item) => selectedIds.includes(item.id));
  const breakdown = selectedPlatforms.map((platform) => {
    const calc = calculateCost(platform, days);
    return {
      ...platform,
      units: calc.units,
      cost: calc.cost,
    };
  });

  const total = breakdown.reduce((sum, current) => sum + current.cost, 0);
  const currencies = uniqueValues(breakdown.map((item) => item.currency));
  const campaignName = ui.campaignName.value.trim() || "Untitled Campaign";

  state.lastAnalysis = {
    campaignName,
    startDate: ui.startDate.value,
    endDate: ui.endDate.value,
    days,
    breakdown,
    total,
    currencies,
  };

  renderResults({ days, breakdown, total, currencies });
}

function renderResults({ days, breakdown, total, currencies }) {
  ui.emptyState.classList.add("hidden");
  ui.results.classList.remove("hidden");

  if (currencies.length === 1) {
    ui.totalBudget.textContent = formatCurrency(total, currencies[0]);
    ui.totalBudgetMeta.textContent = currencies[0];
  } else {
    ui.totalBudget.textContent = `${total.toFixed(2)} (mixed)`;
    ui.totalBudgetMeta.textContent = `Mixed currencies: ${currencies.join(", ")}`;
  }

  ui.durationDays.textContent = `${days} day${days > 1 ? "s" : ""}`;
  ui.platformCount.textContent = String(breakdown.length);
  ui.exportCsvBtn.disabled = false;
  ui.exportPdfBtn.disabled = false;

  ui.breakdownBody.innerHTML = "";
  breakdown.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.country}</td>
      <td>${item.currency}</td>
      <td>${pricingModelLabel(item.pricingModel)}</td>
      <td>${formatCurrency(Number(item.rate), item.currency)}</td>
      <td>${item.units}</td>
      <td>${formatCurrency(item.cost, item.currency)}</td>
    `;
    ui.breakdownBody.appendChild(row);
  });

  renderBarChart(breakdown, total);
  renderDonut(breakdown, total);
}

function renderBarChart(breakdown, total) {
  ui.barChart.innerHTML = "";
  breakdown.forEach((item, index) => {
    const percentage = total === 0 ? 0 : (item.cost / total) * 100;
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-label">
        <span>${item.name}</span>
        <span>${formatCurrency(item.cost, item.currency)} (${percentage.toFixed(1)}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${percentage}%; background: ${colors[index % colors.length]};"></div>
      </div>
    `;
    ui.barChart.appendChild(row);
  });
}

function renderDonut(breakdown, total) {
  const segments = [];
  let current = 0;

  breakdown.forEach((item, index) => {
    const percent = total === 0 ? 0 : (item.cost / total) * 100;
    const next = current + percent;
    segments.push(`${colors[index % colors.length]} ${current}% ${next}%`);
    current = next;
  });

  ui.donut.style.background = `conic-gradient(${segments.join(",")})`;
  ui.donutLegend.innerHTML = "";

  breakdown.forEach((item, index) => {
    const li = document.createElement("li");
    const percent = total === 0 ? 0 : (item.cost / total) * 100;
    li.innerHTML = `
      <span><i class="legend-dot" style="background:${colors[index % colors.length]}"></i>${item.name}</span>
      <span>${percent.toFixed(1)}%</span>
    `;
    ui.donutLegend.appendChild(li);
  });
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes("\n") || text.includes('"')) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
}

function exportCsv() {
  if (!state.lastAnalysis) {
    alert("Run an analysis before exporting.");
    return;
  }

  const { campaignName, startDate, endDate, days, total, breakdown, currencies } = state.lastAnalysis;
  const totalText =
    currencies.length === 1
      ? formatCurrency(total, currencies[0])
      : `${total.toFixed(2)} (mixed: ${currencies.join("/")})`;

  const headerRows = [
    ["Campaign", campaignName],
    ["Start Date", formatDate(startDate)],
    ["End Date", formatDate(endDate)],
    ["Duration (Days)", days],
    ["Total Budget", totalText],
    [],
    ["Platform", "Country", "Currency", "Pricing Model", "Rate", "Units", "Estimated Cost", "Notes"],
  ];

  const rows = breakdown.map((item) => [
    item.name,
    item.country,
    item.currency,
    pricingModelLabel(item.pricingModel),
    Number(item.rate).toFixed(2),
    item.units,
    Number(item.cost).toFixed(2),
    item.notes || "",
  ]);

  const csv = [...headerRows, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ad-budget-${formatDateIso(startDate) || "report"}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function exportPdf() {
  if (!state.lastAnalysis) {
    alert("Run an analysis before exporting.");
    return;
  }

  const { campaignName, startDate, endDate, days, total, breakdown, currencies } = state.lastAnalysis;
  const totalText =
    currencies.length === 1
      ? formatCurrency(total, currencies[0])
      : `${total.toFixed(2)} (mixed: ${currencies.join("/")})`;

  const tableRows = breakdown
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${item.country}</td>
        <td>${item.currency}</td>
        <td>${pricingModelLabel(item.pricingModel)}</td>
        <td>${formatCurrency(Number(item.rate), item.currency)}</td>
        <td>${item.units}</td>
        <td>${formatCurrency(item.cost, item.currency)}</td>
      </tr>
    `
    )
    .join("");

  const reportHtml = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Ad Budget Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #111827; }
          h1 { margin-bottom: 6px; }
          .meta { margin-bottom: 16px; color: #374151; }
          .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
          .card { border: 1px solid #d1d5db; border-radius: 8px; padding: 10px; }
          .card p { margin: 0; color: #6b7280; font-size: 12px; }
          .card h3 { margin: 4px 0 0; font-size: 18px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #d1d5db; text-align: left; padding: 8px; font-size: 13px; }
          th { background: #f3f4f6; }
        </style>
      </head>
      <body>
        <h1>Ad Budget Report</h1>
        <div class="meta">
          <div><strong>Campaign:</strong> ${campaignName}</div>
          <div><strong>Duration:</strong> ${formatDate(startDate)} to ${formatDate(endDate)} (${days} days)</div>
          <div><strong>Total:</strong> ${totalText}</div>
          <div><strong>Generated:</strong> ${formatDate(new Date().toISOString())}</div>
        </div>

        <div class="summary">
          <div class="card"><p>Total Budget</p><h3>${totalText}</h3></div>
          <div class="card"><p>Platforms</p><h3>${breakdown.length}</h3></div>
          <div class="card"><p>Duration</p><h3>${days} day${days > 1 ? "s" : ""}</h3></div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Platform</th>
              <th>Country</th>
              <th>Currency</th>
              <th>Pricing Model</th>
              <th>Rate</th>
              <th>Units</th>
              <th>Estimated Cost</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const reportWindow = window.open("", "_blank", "width=980,height=700");
  if (!reportWindow) {
    alert("Popup blocked. Please allow popups to export PDF.");
    return;
  }

  reportWindow.document.open();
  reportWindow.document.write(reportHtml);
  reportWindow.document.close();
  reportWindow.focus();
  reportWindow.print();
}

function onPlatformFormSubmit(event) {
  event.preventDefault();

  const payload = {
    id: ui.editingId.value || crypto.randomUUID(),
    name: ui.platformName.value.trim(),
    country: ui.country.value.trim(),
    currency: ui.currency.value,
    pricingModel: ui.pricingModel.value,
    rate: Number(ui.rate.value),
    minCharge: Number(ui.minCharge.value || 0),
    notes: ui.notes.value.trim(),
  };

  if (!payload.name || !payload.country || !payload.currency || payload.rate < 0 || payload.minCharge < 0) {
    alert("Please provide valid platform values.");
    return;
  }

  const existingIndex = state.platforms.findIndex((platform) => platform.id === payload.id);
  if (existingIndex >= 0) {
    state.platforms[existingIndex] = payload;
  } else {
    state.platforms.push(payload);
  }

  persistPlatforms();
  updateAllPlatformViews();
  resetPlatformForm();
}

function onTableAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const action = button.getAttribute("data-action");
  const id = button.getAttribute("data-id");
  const platform = state.platforms.find((item) => item.id === id);
  if (!platform) return;

  if (action === "delete") {
    state.platforms = state.platforms.filter((item) => item.id !== id);
    persistPlatforms();
    updateAllPlatformViews();
    return;
  }

  if (action === "edit") {
    ui.editingId.value = platform.id;
    ui.platformName.value = platform.name;
    ui.country.value = platform.country;
    ui.currency.value = platform.currency;
    ui.pricingModel.value = platform.pricingModel;
    ui.rate.value = platform.rate;
    ui.minCharge.value = platform.minCharge;
    ui.notes.value = platform.notes || "";
  }
}

function setupTabs() {
  ui.tabs.forEach((button) => {
    button.addEventListener("click", () => {
      ui.tabs.forEach((item) => item.classList.remove("active"));
      ui.panels.forEach((item) => item.classList.remove("active"));

      button.classList.add("active");
      const panel = document.getElementById(button.dataset.tab);
      panel?.classList.add("active");
    });
  });
}

function setupResetDefaults() {
  ui.resetDefaultsBtn.addEventListener("click", () => {
    const confirmed = confirm("Reset all configured platforms to default values?");
    if (!confirmed) return;

    state.platforms = DEFAULT_PLATFORMS.map((item) => ({ ...item }));
    persistPlatforms();
    updateAllPlatformViews();
    resetPlatformForm();
  });
}

function setupAnalysisFilters() {
  ui.analysisCountry.addEventListener("change", renderPlatformCheckboxes);
  ui.analysisCurrency.addEventListener("change", renderPlatformCheckboxes);
}

function openDatePicker(targetId) {
  const input = document.getElementById(targetId);
  if (!input) return;

  if (typeof input.showPicker === "function") {
    input.showPicker();
    return;
  }

  input.focus();
}

function setupDatePickerBehavior() {
  [ui.startDate, ui.endDate].forEach((input) => {
    input.addEventListener("keydown", (event) => {
      event.preventDefault();
    });

    input.addEventListener("click", () => {
      openDatePicker(input.id);
    });
  });

  ui.dateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-date-target");
      openDatePicker(targetId);
    });
  });
}

function initialize() {
  state.platforms = readPlatforms();
  updateAllPlatformViews();
  setupTabs();
  setupAnalysisFilters();
  setupDatePickerBehavior();

  ui.analysisForm.addEventListener("submit", analyzeBudget);
  ui.platformForm.addEventListener("submit", onPlatformFormSubmit);
  ui.platformTableBody.addEventListener("click", onTableAction);
  ui.clearFormBtn.addEventListener("click", resetPlatformForm);
  ui.exportCsvBtn.addEventListener("click", exportCsv);
  ui.exportPdfBtn.addEventListener("click", exportPdf);
  setupResetDefaults();
}

initialize();
