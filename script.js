const STORAGE_KEY = "adBudgetPlatforms";

const DEFAULT_PLATFORMS = [
  {
    id: crypto.randomUUID(),
    name: "LinkedIn Jobs",
    pricingModel: "perDay",
    rate: 45,
    minCharge: 0,
    notes: "Typical sponsored job daily run",
  },
  {
    id: crypto.randomUUID(),
    name: "Indeed Sponsored",
    pricingModel: "perDay",
    rate: 32,
    minCharge: 0,
    notes: "Average CPC-driven equivalent daily budget",
  },
  {
    id: crypto.randomUUID(),
    name: "Naukri",
    pricingModel: "perWeek",
    rate: 140,
    minCharge: 0,
    notes: "Weekly visibility package",
  },
  {
    id: crypto.randomUUID(),
    name: "Glassdoor",
    pricingModel: "perPost",
    rate: 299,
    minCharge: 0,
    notes: "Single posting package",
  },
  {
    id: crypto.randomUUID(),
    name: "Monster",
    pricingModel: "perWeek",
    rate: 120,
    minCharge: 0,
    notes: "Weekly boosted listing",
  },
];

const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4", "#84cc16"];

const state = {
  platforms: [],
};

const ui = {
  tabs: document.querySelectorAll(".tab-button"),
  panels: document.querySelectorAll(".tab-panel"),
  analysisForm: document.getElementById("analysisForm"),
  startDate: document.getElementById("startDate"),
  endDate: document.getElementById("endDate"),
  checkboxList: document.getElementById("platformCheckboxList"),
  results: document.getElementById("results"),
  emptyState: document.getElementById("emptyState"),
  totalBudget: document.getElementById("totalBudget"),
  durationDays: document.getElementById("durationDays"),
  platformCount: document.getElementById("platformCount"),
  barChart: document.getElementById("barChart"),
  donut: document.getElementById("donut"),
  donutLegend: document.getElementById("donutLegend"),
  breakdownBody: document.getElementById("breakdownBody"),
  platformForm: document.getElementById("platformForm"),
  editingId: document.getElementById("editingId"),
  platformName: document.getElementById("platformName"),
  pricingModel: document.getElementById("pricingModel"),
  rate: document.getElementById("rate"),
  minCharge: document.getElementById("minCharge"),
  notes: document.getElementById("notes"),
  platformTableBody: document.getElementById("platformTableBody"),
  clearFormBtn: document.getElementById("clearFormBtn"),
  resetDefaultsBtn: document.getElementById("resetDefaultsBtn"),
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

function readPlatforms() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLATFORMS));
    return [...DEFAULT_PLATFORMS];
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    return [...DEFAULT_PLATFORMS];
  }

  return [...DEFAULT_PLATFORMS];
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

function renderPlatformCheckboxes() {
  ui.checkboxList.innerHTML = "";

  state.platforms.forEach((platform) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = platform.id;

    const text = document.createElement("span");
    text.textContent = `${platform.name} (${pricingModelLabel(platform.pricingModel)})`;

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
      <td>${pricingModelLabel(platform.pricingModel)}</td>
      <td>${formatCurrency(Number(platform.rate))}</td>
      <td>${formatCurrency(Number(platform.minCharge || 0))}</td>
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
  ui.minCharge.value = 0;
}

function updateAllPlatformViews() {
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
  renderResults({ days, breakdown, total });
}

function renderResults({ days, breakdown, total }) {
  ui.emptyState.classList.add("hidden");
  ui.results.classList.remove("hidden");

  ui.totalBudget.textContent = formatCurrency(total);
  ui.durationDays.textContent = `${days} day${days > 1 ? "s" : ""}`;
  ui.platformCount.textContent = String(breakdown.length);

  ui.breakdownBody.innerHTML = "";
  breakdown.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${pricingModelLabel(item.pricingModel)}</td>
      <td>${formatCurrency(Number(item.rate))}</td>
      <td>${item.units}</td>
      <td>${formatCurrency(item.cost)}</td>
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
        <span>${formatCurrency(item.cost)} (${percentage.toFixed(1)}%)</span>
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

function onPlatformFormSubmit(event) {
  event.preventDefault();

  const payload = {
    id: ui.editingId.value || crypto.randomUUID(),
    name: ui.platformName.value.trim(),
    pricingModel: ui.pricingModel.value,
    rate: Number(ui.rate.value),
    minCharge: Number(ui.minCharge.value || 0),
    notes: ui.notes.value.trim(),
  };

  if (!payload.name || payload.rate < 0 || payload.minCharge < 0) {
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

    state.platforms = [...DEFAULT_PLATFORMS];
    persistPlatforms();
    updateAllPlatformViews();
    resetPlatformForm();
  });
}

function initialize() {
  state.platforms = readPlatforms();
  updateAllPlatformViews();
  setupTabs();

  ui.analysisForm.addEventListener("submit", analyzeBudget);
  ui.platformForm.addEventListener("submit", onPlatformFormSubmit);
  ui.platformTableBody.addEventListener("click", onTableAction);
  ui.clearFormBtn.addEventListener("click", resetPlatformForm);
  setupResetDefaults();
}

initialize();
