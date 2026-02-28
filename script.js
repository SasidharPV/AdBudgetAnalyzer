const LEGACY_STORAGE_KEY = "adBudgetPlatforms";
const MARKET_STORAGE_KEY = "adBudgetPlatformsByMarket";
const MARKET_PREF_KEY = "adBudgetSelectedMarket";

const MARKET_CURRENCY_MAP = {
  "United Kingdom": "GBP",
  "United States": "USD",
  India: "INR",
  Australia: "AUD",
  Singapore: "SGD",
  "United Arab Emirates": "AED",
};

const FX_TO_GBP = {
  GBP: 1,
  USD: 0.79,
  INR: 0.0095,
  AUD: 0.52,
  SGD: 0.59,
  AED: 0.215,
};

const DEFAULT_SELECTED_MARKET = {
  country: "United Kingdom",
  currency: "GBP",
};

const DEFAULT_MARKET_RATE_CARDS = {
  "United Kingdom|GBP": [
    {
      id: crypto.randomUUID(),
      name: "Indeed UK",
      pricingModel: "perDay",
      rate: 15,
      minCharge: 0,
      notes: "Sponsored job daily budget",
    },
    {
      id: crypto.randomUUID(),
      name: "Reed",
      pricingModel: "perPost",
      rate: 89,
      minCharge: 0,
      notes: "Standard UK listing",
    },
    {
      id: crypto.randomUUID(),
      name: "CV-Library",
      pricingModel: "perPost",
      rate: 79,
      minCharge: 0,
      notes: "Single post package",
    },
    {
      id: crypto.randomUUID(),
      name: "Totaljobs",
      pricingModel: "perPost",
      rate: 109,
      minCharge: 0,
      notes: "Premium UK job board",
    },
    {
      id: crypto.randomUUID(),
      name: "LinkedIn Jobs",
      pricingModel: "perDay",
      rate: 35,
      minCharge: 0,
      notes: "UK sponsored daily budget estimate",
    },
    {
      id: crypto.randomUUID(),
      name: "Guardian Jobs",
      pricingModel: "perPost",
      rate: 295,
      minCharge: 0,
      notes: "4-week listing - media, education, charity",
    },
    {
      id: crypto.randomUUID(),
      name: "NHS Jobs",
      pricingModel: "perPost",
      rate: 0,
      minCharge: 0,
      notes: "Free NHS recruitment portal - healthcare only",
    },
    {
      id: crypto.randomUUID(),
      name: "TES (Teaching)",
      pricingModel: "perPost",
      rate: 150,
      minCharge: 0,
      notes: "Education sector - teachers & support staff",
    },
    {
      id: crypto.randomUUID(),
      name: "Caterer.com",
      pricingModel: "perPost",
      rate: 120,
      minCharge: 0,
      notes: "Hospitality & catering specialist",
    },
    {
      id: crypto.randomUUID(),
      name: "Gumtree Jobs",
      pricingModel: "perPost",
      rate: 25,
      minCharge: 0,
      notes: "Local jobs - part-time, trades, casual",
    },
    {
      id: crypto.randomUUID(),
      name: "Glassdoor UK",
      pricingModel: "perPost",
      rate: 199,
      minCharge: 0,
      notes: "30-day listing with company profile",
    },
  ],
  "United States|USD": [
    {
      id: crypto.randomUUID(),
      name: "Indeed Sponsored",
      pricingModel: "perDay",
      rate: 32,
      minCharge: 0,
      notes: "Average sponsored daily spend",
    },
    {
      id: crypto.randomUUID(),
      name: "LinkedIn Jobs",
      pricingModel: "perDay",
      rate: 45,
      minCharge: 0,
      notes: "Typical sponsored daily budget",
    },
    {
      id: crypto.randomUUID(),
      name: "ZipRecruiter",
      pricingModel: "perPost",
      rate: 99,
      minCharge: 0,
      notes: "Standard single post",
    },
    {
      id: crypto.randomUUID(),
      name: "Glassdoor",
      pricingModel: "perPost",
      rate: 199,
      minCharge: 0,
      notes: "Job listing + employer branding",
    },
    {
      id: crypto.randomUUID(),
      name: "Monster",
      pricingModel: "perPost",
      rate: 375,
      minCharge: 0,
      notes: "60-day job posting",
    },
    {
      id: crypto.randomUUID(),
      name: "CareerBuilder",
      pricingModel: "perPost",
      rate: 219,
      minCharge: 0,
      notes: "30-day posting",
    },
    {
      id: crypto.randomUUID(),
      name: "Dice (Tech)",
      pricingModel: "perPost",
      rate: 395,
      minCharge: 0,
      notes: "Tech & IT specialist job board",
    },
    {
      id: crypto.randomUUID(),
      name: "HealthcareJobs",
      pricingModel: "perPost",
      rate: 299,
      minCharge: 0,
      notes: "Healthcare & medical professionals",
    },
    {
      id: crypto.randomUUID(),
      name: "Craigslist Jobs",
      pricingModel: "perPost",
      rate: 25,
      minCharge: 0,
      notes: "Local classifieds - part-time, trades",
    },
    {
      id: crypto.randomUUID(),
      name: "Snagajob",
      pricingModel: "perPost",
      rate: 89,
      minCharge: 0,
      notes: "Hourly & part-time specialist",
    },
  ],
  "India|INR": [
    {
      id: crypto.randomUUID(),
      name: "Naukri",
      pricingModel: "perWeek",
      rate: 4500,
      minCharge: 0,
      notes: "Weekly visibility package",
    },
    {
      id: crypto.randomUUID(),
      name: "Indeed India",
      pricingModel: "perDay",
      rate: 300,
      minCharge: 0,
      notes: "Sponsored daily budget",
    },
    {
      id: crypto.randomUUID(),
      name: "Foundit (Monster)",
      pricingModel: "perWeek",
      rate: 3800,
      minCharge: 0,
      notes: "Hiring bundle estimate",
    },
    {
      id: crypto.randomUUID(),
      name: "TimesJobs",
      pricingModel: "perPost",
      rate: 2500,
      minCharge: 0,
      notes: "Single listing package",
    },
    {
      id: crypto.randomUUID(),
      name: "LinkedIn India",
      pricingModel: "perDay",
      rate: 800,
      minCharge: 0,
      notes: "Sponsored job daily",
    },
    {
      id: crypto.randomUUID(),
      name: "Shine",
      pricingModel: "perPost",
      rate: 1999,
      minCharge: 0,
      notes: "Standard job posting",
    },
  ],
  "Australia|AUD": [
    {
      id: crypto.randomUUID(),
      name: "Seek",
      pricingModel: "perPost",
      rate: 250,
      minCharge: 0,
      notes: "Standard listing",
    },
    {
      id: crypto.randomUUID(),
      name: "Indeed Australia",
      pricingModel: "perDay",
      rate: 25,
      minCharge: 0,
      notes: "Sponsored daily budget",
    },
    {
      id: crypto.randomUUID(),
      name: "LinkedIn Jobs",
      pricingModel: "perDay",
      rate: 58,
      minCharge: 0,
      notes: "Sponsored daily budget estimate",
    },
    {
      id: crypto.randomUUID(),
      name: "Jora",
      pricingModel: "perPost",
      rate: 0,
      minCharge: 0,
      notes: "Free job posting aggregator",
    },
    {
      id: crypto.randomUUID(),
      name: "CareerOne",
      pricingModel: "perPost",
      rate: 195,
      minCharge: 0,
      notes: "30-day posting",
    },
  ],
  "Singapore|SGD": [
    {
      id: crypto.randomUUID(),
      name: "JobStreet",
      pricingModel: "perPost",
      rate: 180,
      minCharge: 0,
      notes: "Single post package",
    },
    {
      id: crypto.randomUUID(),
      name: "MyCareersFuture",
      pricingModel: "perPost",
      rate: 0,
      minCharge: 0,
      notes: "Government portal (free for locals)",
    },
    {
      id: crypto.randomUUID(),
      name: "LinkedIn Singapore",
      pricingModel: "perDay",
      rate: 40,
      minCharge: 0,
      notes: "Sponsored daily budget",
    },
    {
      id: crypto.randomUUID(),
      name: "Indeed Singapore",
      pricingModel: "perDay",
      rate: 20,
      minCharge: 0,
      notes: "Sponsored daily budget",
    },
    {
      id: crypto.randomUUID(),
      name: "FastJobs",
      pricingModel: "perPost",
      rate: 99,
      minCharge: 0,
      notes: "Hourly/part-time focus",
    },
  ],
  "United Arab Emirates|AED": [
    {
      id: crypto.randomUUID(),
      name: "Bayt",
      pricingModel: "perWeek",
      rate: 650,
      minCharge: 0,
      notes: "Weekly promoted listing",
    },
    {
      id: crypto.randomUUID(),
      name: "Naukrigulf",
      pricingModel: "perPost",
      rate: 300,
      minCharge: 0,
      notes: "Standard job post",
    },
    {
      id: crypto.randomUUID(),
      name: "GulfTalent",
      pricingModel: "perPost",
      rate: 500,
      minCharge: 0,
      notes: "Premium Gulf job board",
    },
    {
      id: crypto.randomUUID(),
      name: "LinkedIn UAE",
      pricingModel: "perDay",
      rate: 75,
      minCharge: 0,
      notes: "Sponsored daily budget",
    },
    {
      id: crypto.randomUUID(),
      name: "Indeed UAE",
      pricingModel: "perDay",
      rate: 50,
      minCharge: 0,
      notes: "Sponsored daily budget",
    },
  ],
};

// Role-to-Platform mapping for intelligent auto-selection
// Keys are role IDs from the select, values are arrays of recommended platform name patterns
const ROLE_PLATFORM_MAP = {
  // Healthcare roles - nurses, carers, medical staff
  "healthcare-nurse": {
    description: "Healthcare roles typically advertise on NHS Jobs, Indeed, and specialist nursing boards",
    platforms: ["NHS", "Indeed", "Reed", "Care", "Totaljobs", "LinkedIn", "Guardian"],
    priorities: ["NHS", "Indeed", "Reed"],
  },
  "healthcare-doctor": {
    description: "Medical professionals often use BMJ Jobs, NHS Jobs, and LinkedIn",
    platforms: ["NHS", "BMJ", "Indeed", "LinkedIn", "Reed", "Guardian"],
    priorities: ["NHS", "LinkedIn", "Indeed"],
  },
  "healthcare-support": {
    description: "Healthcare support staff often found through Indeed, Reed, and local health boards",
    platforms: ["NHS", "Indeed", "Reed", "Totaljobs", "CV-Library", "Care"],
    priorities: ["Indeed", "Reed", "NHS"],
  },

  // Hospitality & Catering
  "hospitality-catering": {
    description: "Catering roles use Caterer.com, Indeed, and general job boards with high volume hiring",
    platforms: ["Caterer", "Indeed", "Reed", "Gumtree", "FastJobs", "JobStreet", "Totaljobs"],
    priorities: ["Indeed", "Caterer", "Reed"],
  },
  "hospitality-hotel": {
    description: "Hotel and restaurant staff recruit via Caterer.com, Indeed, and hospitality-focused boards",
    platforms: ["Caterer", "Indeed", "Reed", "Totaljobs", "JobStreet", "Bayt", "Gumtree"],
    priorities: ["Indeed", "Caterer", "Reed"],
  },
  "hospitality-events": {
    description: "Events staff often hired through Indeed, Reed, and temp agency partnerships",
    platforms: ["Indeed", "Reed", "Totaljobs", "Gumtree", "FastJobs", "CV-Library"],
    priorities: ["Indeed", "Reed", "Gumtree"],
  },

  // Technology & IT
  "tech-developer": {
    description: "Software developers actively use LinkedIn, Stack Overflow, GitHub Jobs, and Indeed",
    platforms: ["LinkedIn", "Indeed", "Dice", "AngelList", "Stack", "GitHub", "Seek", "CV-Library"],
    priorities: ["LinkedIn", "Indeed"],
  },
  "tech-designer": {
    description: "Web and UX designers often found on Dribbble, LinkedIn, Indeed, and creative job boards",
    platforms: ["LinkedIn", "Indeed", "Dribbble", "Reed", "Totaljobs", "AngelList", "Seek"],
    priorities: ["LinkedIn", "Indeed"],
  },
  "tech-data": {
    description: "Data professionals use LinkedIn, Indeed, and specialist tech boards",
    platforms: ["LinkedIn", "Indeed", "Dice", "Glassdoor", "Reed", "Seek", "Totaljobs"],
    priorities: ["LinkedIn", "Indeed"],
  },
  "tech-it-support": {
    description: "IT support roles advertised on Indeed, Reed, and generalist boards",
    platforms: ["Indeed", "Reed", "Totaljobs", "CV-Library", "LinkedIn", "Dice", "Seek"],
    priorities: ["Indeed", "Reed", "LinkedIn"],
  },

  // Business & Finance
  "finance-accountant": {
    description: "Finance professionals use LinkedIn, Reed, Robert Half, and specialist accounting boards",
    platforms: ["Reed", "LinkedIn", "Indeed", "Totaljobs", "CV-Library", "Glassdoor", "Seek"],
    priorities: ["Reed", "LinkedIn", "Indeed"],
  },
  "business-manager": {
    description: "Management roles advertised on LinkedIn, Indeed, and executive search boards",
    platforms: ["LinkedIn", "Indeed", "Reed", "Totaljobs", "Guardian", "Glassdoor", "Seek"],
    priorities: ["LinkedIn", "Indeed", "Reed"],
  },
  "business-sales": {
    description: "Sales professionals found through LinkedIn, Indeed, and Reed",
    platforms: ["LinkedIn", "Indeed", "Reed", "Totaljobs", "Glassdoor", "SalesJobs", "CV-Library"],
    priorities: ["LinkedIn", "Indeed", "Reed"],
  },
  "business-hr": {
    description: "HR professionals recruited via LinkedIn, Reed, and CIPD job boards",
    platforms: ["LinkedIn", "Reed", "Indeed", "Totaljobs", "Guardian", "Glassdoor", "CIPD"],
    priorities: ["LinkedIn", "Reed", "Indeed"],
  },

  // Education
  "education-teacher": {
    description: "Teachers use TES, Guardian Jobs, and council job portals",
    platforms: ["TES", "Guardian", "Indeed", "Reed", "Totaljobs", "Tes", "Council"],
    priorities: ["TES", "Guardian", "Indeed"],
  },
  "education-tutor": {
    description: "Tutors and teaching assistants found through Indeed, TES, and local boards",
    platforms: ["Indeed", "TES", "Reed", "Guardian", "Totaljobs", "Gumtree", "Council"],
    priorities: ["Indeed", "TES", "Reed"],
  },

  // Skilled Trades
  "trades-construction": {
    description: "Construction workers recruited via Indeed, Gumtree, and trade-specific boards",
    platforms: ["Indeed", "Gumtree", "Reed", "Totaljobs", "CV-Library", "TradeJobs", "Seek"],
    priorities: ["Indeed", "Gumtree", "Reed"],
  },
  "trades-electrician": {
    description: "Electricians and plumbers found through Indeed, TradeJobs, and local boards",
    platforms: ["Indeed", "Gumtree", "Reed", "Totaljobs", "TradeJobs", "CV-Library", "Seek"],
    priorities: ["Indeed", "Gumtree", "Reed"],
  },
  "trades-mechanic": {
    description: "Mechanics and technicians recruited via Indeed, Reed, and automotive boards",
    platforms: ["Indeed", "Reed", "Gumtree", "Totaljobs", "CV-Library", "Auto", "Seek"],
    priorities: ["Indeed", "Reed", "Gumtree"],
  },

  // Retail & Customer Service
  "retail-store": {
    description: "Retail positions use Indeed, Reed, and high-volume generalist boards",
    platforms: ["Indeed", "Reed", "Totaljobs", "CV-Library", "Gumtree", "FastJobs", "Retail"],
    priorities: ["Indeed", "Reed", "Totaljobs"],
  },
  "retail-customer": {
    description: "Customer service roles found through Indeed, Reed, and call centre boards",
    platforms: ["Indeed", "Reed", "Totaljobs", "CV-Library", "LinkedIn", "CallCentre", "CustomerService"],
    priorities: ["Indeed", "Reed", "Totaljobs"],
  },

  // Logistics & Warehouse
  "logistics-driver": {
    description: "Drivers recruited via Indeed, Reed, and specialist logistics boards",
    platforms: ["Indeed", "Reed", "Totaljobs", "CV-Library", "Gumtree", "DriverJobs", "Logistics"],
    priorities: ["Indeed", "Reed", "Gumtree"],
  },
  "logistics-warehouse": {
    description: "Warehouse staff found through Indeed, Reed, and temp agencies",
    platforms: ["Indeed", "Reed", "Totaljobs", "CV-Library", "Gumtree", "FastJobs", "Warehouse"],
    priorities: ["Indeed", "Reed", "Gumtree"],
  },

  // Creative & Marketing
  "creative-marketing": {
    description: "Marketing professionals use LinkedIn, Indeed, and industry-specific boards",
    platforms: ["LinkedIn", "Indeed", "Reed", "Totaljobs", "Guardian", "Marketing", "Glassdoor"],
    priorities: ["LinkedIn", "Indeed", "Reed"],
  },
  "creative-design": {
    description: "Graphic designers found through LinkedIn, Dribbble, and creative job boards",
    platforms: ["LinkedIn", "Indeed", "Dribbble", "Reed", "Behance", "Creative", "Totaljobs"],
    priorities: ["LinkedIn", "Indeed"],
  },
  "creative-content": {
    description: "Content writers use LinkedIn, Indeed, and freelance platforms",
    platforms: ["LinkedIn", "Indeed", "Reed", "Guardian", "ProBlogger", "Contently", "Media"],
    priorities: ["LinkedIn", "Indeed", "Reed"],
  },

  // Employment Type based
  "type-parttime": {
    description: "Part-time roles often advertised on Indeed, Gumtree, and flexible work boards",
    platforms: ["Indeed", "Gumtree", "Reed", "CV-Library", "FastJobs", "FlexJobs", "PartTime"],
    priorities: ["Indeed", "Gumtree", "Reed"],
  },
  "type-fulltime": {
    description: "Full-time professional roles use LinkedIn, Indeed, and major job boards",
    platforms: ["LinkedIn", "Indeed", "Reed", "Totaljobs", "Glassdoor", "CV-Library", "Seek"],
    priorities: ["LinkedIn", "Indeed", "Reed"],
  },
  "type-temporary": {
    description: "Temporary and contract roles found through agencies, Indeed, and Reed",
    platforms: ["Indeed", "Reed", "Totaljobs", "CV-Library", "Gumtree", "Contract", "Temp"],
    priorities: ["Indeed", "Reed", "Totaljobs"],
  },
  "type-graduate": {
    description: "Graduate roles advertised on LinkedIn, Milkround, and university job boards",
    platforms: ["LinkedIn", "Indeed", "Milkround", "Graduate", "Reed", "Totaljobs", "Glassdoor"],
    priorities: ["LinkedIn", "Indeed", "Reed"],
  },
};

const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#a855f7", "#06b6d4", "#84cc16"];

const state = {
  selectedMarket: { ...DEFAULT_SELECTED_MARKET },
  platformsByMarket: {},
  platforms: [],
  lastAnalysis: null,
};

const ui = {
  tabs: document.querySelectorAll(".tab-button"),
  panels: document.querySelectorAll(".tab-panel"),
  marketCountry: document.getElementById("marketCountry"),
  marketCurrency: document.getElementById("marketCurrency"),
  analysisForm: document.getElementById("analysisForm"),
  campaignName: document.getElementById("campaignName"),
  startDate: document.getElementById("startDate"),
  endDate: document.getElementById("endDate"),
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
  donutCenter: document.getElementById("donutCenter"),
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
  exportCsvBtn: document.getElementById("exportCsvBtn"),
  exportPdfBtn: document.getElementById("exportPdfBtn"),
  copyReportBtn: document.getElementById("copyReportBtn"),
  copyTableBtn: document.getElementById("copyTableBtn"),
  copyChartBtn: document.getElementById("copyChartBtn"),
  copyPieChartBtn: document.getElementById("copyPieChartBtn"),
  toastContainer: document.getElementById("toastContainer"),
  selectAllBtn: document.getElementById("selectAllBtn"),
  selectNoneBtn: document.getElementById("selectNoneBtn"),
  jobRoleSelect: document.getElementById("jobRoleSelect"),
  roleDescription: document.getElementById("roleDescription"),
  platformSuggestion: document.getElementById("platformSuggestion"),
  durationPresets: document.querySelectorAll(".preset-btn[data-days]"),
  durationMeta: document.getElementById("durationMeta"),
};

function marketKey(country, currency) {
  return `${country}|${currency}`;
}

function convertAmount(value, fromCurrency, toCurrency) {
  const fromToGbp = FX_TO_GBP[fromCurrency];
  const toToGbp = FX_TO_GBP[toCurrency];
  if (!fromToGbp || !toToGbp) return Number(value);

  const inGbp = Number(value) * fromToGbp;
  return inGbp / toToGbp;
}

function sanitizePlatform(platform) {
  return {
    id: platform.id || crypto.randomUUID(),
    name: platform.name || "Unnamed Platform",
    pricingModel: platform.pricingModel || "perPost",
    rate: Number(platform.rate ?? 0),
    minCharge: Number(platform.minCharge ?? 0),
    notes: platform.notes || "",
  };
}

function formatCurrency(value, currency = "GBP") {
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${Number(value).toFixed(2)} ${currency}`;
  }
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
  return new Intl.DateTimeFormat("en-GB", {
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

function cloneDefaultMarketCards() {
  const cloned = {};
  Object.entries(DEFAULT_MARKET_RATE_CARDS).forEach(([key, platforms]) => {
    cloned[key] = platforms.map((item) => ({ ...item, id: crypto.randomUUID() }));
  });
  return cloned;
}

function migrateLegacyIfNeeded() {
  const existingMarketData = localStorage.getItem(MARKET_STORAGE_KEY);
  if (existingMarketData) return;

  const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!legacyRaw) {
    localStorage.setItem(MARKET_STORAGE_KEY, JSON.stringify(cloneDefaultMarketCards()));
    return;
  }

  try {
    const parsed = JSON.parse(legacyRaw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(MARKET_STORAGE_KEY, JSON.stringify(cloneDefaultMarketCards()));
      return;
    }

    const marketCards = cloneDefaultMarketCards();
    parsed.forEach((item) => {
      const country = item.country || "United States";
      const currency = item.currency || MARKET_CURRENCY_MAP[country] || "USD";
      const key = marketKey(country, currency);
      if (!marketCards[key]) {
        marketCards[key] = [];
      }
      marketCards[key].push(
        sanitizePlatform({
          ...item,
          id: crypto.randomUUID(),
        })
      );
    });

    localStorage.setItem(MARKET_STORAGE_KEY, JSON.stringify(marketCards));
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    localStorage.setItem(MARKET_STORAGE_KEY, JSON.stringify(cloneDefaultMarketCards()));
  }
}

function readSelectedMarket() {
  const raw = localStorage.getItem(MARKET_PREF_KEY);
  if (!raw) return { ...DEFAULT_SELECTED_MARKET };

  try {
    const parsed = JSON.parse(raw);
    const country = parsed.country || DEFAULT_SELECTED_MARKET.country;
    const currency = parsed.currency || MARKET_CURRENCY_MAP[country] || DEFAULT_SELECTED_MARKET.currency;
    return { country, currency };
  } catch {
    return { ...DEFAULT_SELECTED_MARKET };
  }
}

function persistSelectedMarket() {
  localStorage.setItem(MARKET_PREF_KEY, JSON.stringify(state.selectedMarket));
}

function readPlatformsByMarket() {
  const raw = localStorage.getItem(MARKET_STORAGE_KEY);
  if (!raw) {
    return cloneDefaultMarketCards();
  }

  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      const normalized = {};
      Object.entries(parsed).forEach(([key, list]) => {
        normalized[key] = Array.isArray(list) ? list.map(sanitizePlatform) : [];
      });
      return { ...cloneDefaultMarketCards(), ...normalized };
    }
  } catch {
    return cloneDefaultMarketCards();
  }

  return cloneDefaultMarketCards();
}

function persistPlatformsByMarket() {
  localStorage.setItem(MARKET_STORAGE_KEY, JSON.stringify(state.platformsByMarket));
}

function loadCurrentMarketPlatforms() {
  const key = marketKey(state.selectedMarket.country, state.selectedMarket.currency);
  if (!state.platformsByMarket[key]) {
    state.platformsByMarket[key] = [];
  }
  state.platforms = state.platformsByMarket[key].map((item) => ({ ...item }));
}

function saveCurrentMarketPlatforms() {
  const key = marketKey(state.selectedMarket.country, state.selectedMarket.currency);
  state.platformsByMarket[key] = state.platforms.map((item) => ({ ...item }));
  persistPlatformsByMarket();
}

function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  ui.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function setCopyStatus(message, isError = false) {
  showToast(message, isError ? "error" : "success");
}

function refreshMarketUI() {
  ui.marketCountry.value = state.selectedMarket.country;
  ui.marketCurrency.value = state.selectedMarket.currency;
}

function renderPlatformCheckboxes() {
  ui.checkboxList.innerHTML = "";

  if (state.platforms.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No platforms configured for this market. Add platforms in Configuration.";
    ui.checkboxList.appendChild(message);
    return;
  }

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
  const currency = state.selectedMarket.currency;

  state.platforms.forEach((platform) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${platform.name}</td>
      <td>${pricingModelLabel(platform.pricingModel)}</td>
      <td>${formatCurrency(Number(platform.rate), currency)}</td>
      <td>${formatCurrency(Number(platform.minCharge || 0), currency)}</td>
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

function renderAllPlatformViews() {
  renderPlatformCheckboxes();
  renderPlatformTable();
}

function resetPlatformForm() {
  ui.editingId.value = "";
  ui.platformForm.reset();
  ui.minCharge.value = 0;
}

function buildReportText() {
  if (!state.lastAnalysis) return "";

  const { campaignName, startDate, endDate, days, total, breakdown, currency, country } = state.lastAnalysis;
  const lines = [
    "Ad Budget Report",
    `Market: ${country} (${currency})`,
    `Campaign: ${campaignName}`,
    `Duration: ${formatDate(startDate)} to ${formatDate(endDate)} (${days} days)`,
    `Total: ${formatCurrency(total, currency)}`,
    "",
    "Breakdown:",
  ];

  breakdown.forEach((item) => {
    lines.push(`- ${item.name} (${pricingModelLabel(item.pricingModel)}): ${formatCurrency(item.cost, currency)}`);
  });

  return lines.join("\n");
}

function buildTableText() {
  if (!state.lastAnalysis) return "";

  const currency = state.lastAnalysis.currency;
  const header = ["Platform", "Model", "Rate", "Units", "Estimated Cost"];
  const rows = state.lastAnalysis.breakdown.map((item) => [
    item.name,
    pricingModelLabel(item.pricingModel),
    formatCurrency(Number(item.rate), currency),
    String(item.units),
    formatCurrency(item.cost, currency),
  ]);

  return [header, ...rows].map((row) => row.join("\t")).join("\n");
}

async function copyReportText() {
  if (!state.lastAnalysis) {
    showToast("Run an analysis before copying.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(buildReportText());
    setCopyStatus("Report copied. Paste into Docs or slides.");
  } catch {
    setCopyStatus("Could not copy report. Browser blocked clipboard access.", true);
  }
}

async function copyTableText() {
  if (!state.lastAnalysis) {
    showToast("Run an analysis before copying.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(buildTableText());
    setCopyStatus("Table copied. Paste into Docs/Excel/PowerPoint.");
  } catch {
    setCopyStatus("Could not copy table. Browser blocked clipboard access.", true);
  }
}

function renderChartCanvas(analysis) {
  const width = 1200;
  const height = 680;
  const padding = 60;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "700 32px Inter, Arial, sans-serif";
  ctx.fillText("Ad Budget Breakdown", padding, 52);

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "500 18px Inter, Arial, sans-serif";
  const meta = `${analysis.campaignName} • ${analysis.country} (${analysis.currency})`;
  ctx.fillText(meta, padding, 84);

  const sorted = [...analysis.breakdown].sort((a, b) => b.cost - a.cost);
  const maxCost = Math.max(...sorted.map((item) => item.cost), 1);
  const chartTop = 140;
  const rowHeight = 52;
  const barAreaWidth = width - padding * 2 - 280;

  sorted.forEach((item, index) => {
    const y = chartTop + index * rowHeight;
    const color = colors[index % colors.length];
    const barWidth = (item.cost / maxCost) * barAreaWidth;

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "600 16px Inter, Arial, sans-serif";
    ctx.fillText(item.name, padding, y + 20);

    ctx.fillStyle = "#334155";
    ctx.fillRect(padding + 220, y + 6, barAreaWidth, 20);

    const gradient = ctx.createLinearGradient(padding + 220, y + 6, padding + 220 + barWidth, y + 26);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "#38bdf8");
    ctx.fillStyle = gradient;
    ctx.fillRect(padding + 220, y + 6, barWidth, 20);

    ctx.fillStyle = "#cbd5e1";
    ctx.font = "500 14px Inter, Arial, sans-serif";
    ctx.fillText(
      `${formatCurrency(item.cost, analysis.currency)} (${((item.cost / analysis.total) * 100).toFixed(1)}%)`,
      padding + 220,
      y + 42
    );
  });

  ctx.fillStyle = "#94a3b8";
  ctx.font = "500 16px Inter, Arial, sans-serif";
  ctx.fillText(`Total Budget: ${formatCurrency(analysis.total, analysis.currency)}`, padding, height - 32);

  return canvas;
}

async function copyChartImage() {
  if (!state.lastAnalysis) {
    showToast("Run an analysis before copying.", "error");
    return;
  }

  const canvas = renderChartCanvas(state.lastAnalysis);
  if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
    setCopyStatus("Image clipboard not supported here. Use Export PDF as fallback.", true);
    return;
  }

  try {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      setCopyStatus("Could not generate chart image.", true);
      return;
    }

    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    setCopyStatus("Chart image copied. Paste directly into PPT/Docs.");
  } catch {
    setCopyStatus("Could not copy chart image. Browser permissions may block it.", true);
  }
}

function renderPieChartCanvas(analysis) {
  const size = 400;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size + 100;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = 140;
  const innerRadius = 80;

  // Draw pie segments
  let currentAngle = -Math.PI / 2;
  analysis.breakdown.forEach((item, index) => {
    const percent = analysis.total === 0 ? 0 : item.cost / analysis.total;
    const sliceAngle = percent * 2 * Math.PI;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();

    currentAngle += sliceAngle;
  });

  // Draw inner circle (donut hole)
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
  ctx.fillStyle = "#0f172a";
  ctx.fill();

  // Center text
  ctx.fillStyle = "#fff";
  ctx.font = "bold 28px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(analysis.breakdown.length.toString(), centerX, centerY - 5);
  ctx.font = "14px Inter, sans-serif";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("platforms", centerX, centerY + 18);

  // Legend
  const legendY = size + 20;
  const legendItemWidth = size / Math.min(analysis.breakdown.length, 3);
  ctx.font = "12px Inter, sans-serif";

  analysis.breakdown.forEach((item, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const x = 20 + col * (size / 3);
    const y = legendY + row * 25;

    // Color dot
    ctx.fillStyle = colors[index % colors.length];
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Label
    ctx.fillStyle = "#f1f5f9";
    ctx.textAlign = "left";
    const percent = analysis.total === 0 ? 0 : (item.cost / analysis.total) * 100;
    ctx.fillText(`${item.name} (${percent.toFixed(1)}%)`, x + 12, y + 4);
  });

  return canvas;
}

async function copyPieChartImage() {
  if (!state.lastAnalysis) {
    showToast("Run an analysis before copying.", "error");
    return;
  }

  const canvas = renderPieChartCanvas(state.lastAnalysis);
  if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
    setCopyStatus("Image clipboard not supported here. Use Export PDF as fallback.", true);
    return;
  }

  try {
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
    if (!blob) {
      setCopyStatus("Could not generate pie chart image.", true);
      return;
    }

    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    setCopyStatus("Pie chart copied. Paste directly into PPT/Docs.");
  } catch {
    setCopyStatus("Could not copy pie chart image. Browser permissions may block it.", true);
  }
}

function renderBarChart(breakdown, total) {
  ui.barChart.innerHTML = "";
  const sortedBreakdown = [...breakdown].sort((a, b) => b.cost - a.cost);

  sortedBreakdown.forEach((item, index) => {
    const percentage = total === 0 ? 0 : (item.cost / total) * 100;
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-label">
        <span>${item.name}</span>
        <span>${formatCurrency(item.cost, state.selectedMarket.currency)} (${percentage.toFixed(1)}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${percentage}%; background: linear-gradient(90deg, ${colors[index % colors.length]}, ${colors[(
      index + 2
    ) % colors.length]});"></div>
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
  ui.donutCenter.innerHTML = `<strong>${breakdown.length}</strong><span>platforms</span>`;
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

function renderResults({ days, breakdown, total }) {
  ui.emptyState.classList.add("hidden");
  ui.results.classList.remove("hidden");

  const currency = state.selectedMarket.currency;
  ui.totalBudget.textContent = formatCurrency(total, currency);
  ui.totalBudgetMeta.textContent = `${state.selectedMarket.country} • ${currency}`;
  ui.durationDays.textContent = `${days} day${days > 1 ? "s" : ""}`;
  ui.platformCount.textContent = String(breakdown.length);

  // Show date range in duration meta
  if (state.lastAnalysis) {
    ui.durationMeta.textContent = `${formatDate(state.lastAnalysis.startDate)} → ${formatDate(state.lastAnalysis.endDate)}`;
  }

  ui.exportCsvBtn.disabled = false;
  ui.exportPdfBtn.disabled = false;
  ui.copyReportBtn.disabled = false;
  ui.copyTableBtn.disabled = false;
  ui.copyChartBtn.disabled = false;
  ui.copyPieChartBtn.disabled = false;

  ui.breakdownBody.innerHTML = "";
  breakdown.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${pricingModelLabel(item.pricingModel)}</td>
      <td>${formatCurrency(Number(item.rate), currency)}</td>
      <td>${item.units}</td>
      <td>${formatCurrency(item.cost, currency)}</td>
    `;
    ui.breakdownBody.appendChild(row);
  });

  renderBarChart(breakdown, total);
  renderDonut(breakdown, total);
}

function analyzeBudget(event) {
  event.preventDefault();

  const start = new Date(ui.startDate.value);
  const end = new Date(ui.endDate.value);

  if (!ui.startDate.value || !ui.endDate.value || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    showToast("Please select valid start and end dates.", "error");
    return;
  }

  if (end < start) {
    showToast("End date must be after start date.", "error");
    return;
  }

  const selectedIds = [...ui.checkboxList.querySelectorAll("input:checked")].map((item) => item.value);
  if (selectedIds.length === 0) {
    showToast("Select at least one platform.", "error");
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
  const campaignName = ui.campaignName.value.trim() || "Untitled Campaign";

  state.lastAnalysis = {
    campaignName,
    startDate: ui.startDate.value,
    endDate: ui.endDate.value,
    days,
    breakdown,
    total,
    country: state.selectedMarket.country,
    currency: state.selectedMarket.currency,
  };

  renderResults({ days, breakdown, total });
  showToast(`Budget analysis complete: ${formatCurrency(total, state.selectedMarket.currency)}`, "success");
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
    showToast("Run an analysis before exporting.", "error");
    return;
  }

  const { campaignName, startDate, endDate, days, total, breakdown, country, currency } = state.lastAnalysis;

  const headerRows = [
    ["Campaign", campaignName],
    ["Market", `${country} (${currency})`],
    ["Start Date", formatDate(startDate)],
    ["End Date", formatDate(endDate)],
    ["Duration (Days)", days],
    ["Total Budget", formatCurrency(total, currency)],
    [],
    ["Platform", "Pricing Model", "Rate", "Units", "Estimated Cost", "Notes"],
  ];

  const rows = breakdown.map((item) => [
    item.name,
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
  
  showToast("CSV exported successfully!", "success");
}

function exportPdf() {
  if (!state.lastAnalysis) {
    showToast("Run an analysis before exporting.", "error");
    return;
  }

  const { campaignName, startDate, endDate, days, total, breakdown, country, currency } = state.lastAnalysis;
  const tableRows = breakdown
    .map(
      (item) => `
      <tr>
        <td>${item.name}</td>
        <td>${pricingModelLabel(item.pricingModel)}</td>
        <td>${formatCurrency(Number(item.rate), currency)}</td>
        <td>${item.units}</td>
        <td>${formatCurrency(item.cost, currency)}</td>
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
          h1 { margin-bottom: 6px; color: #1e3a8a; }
          .meta { margin-bottom: 16px; color: #374151; }
          .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px; }
          .card { border: 1px solid #d1d5db; border-radius: 8px; padding: 10px; background: #f9fafb; }
          .card p { margin: 0; color: #6b7280; font-size: 12px; }
          .card h3 { margin: 4px 0 0; font-size: 18px; color: #1e3a8a; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #d1d5db; text-align: left; padding: 8px; font-size: 13px; }
          th { background: #1e3a8a; color: white; }
          tr:nth-child(even) { background: #f9fafb; }
        </style>
      </head>
      <body>
        <h1>Ad Budget Report</h1>
        <div class="meta">
          <div><strong>Campaign:</strong> ${campaignName}</div>
          <div><strong>Market:</strong> ${country} (${currency})</div>
          <div><strong>Duration:</strong> ${formatDate(startDate)} to ${formatDate(endDate)} (${days} days)</div>
          <div><strong>Total:</strong> ${formatCurrency(total, currency)}</div>
          <div><strong>Generated:</strong> ${formatDate(new Date().toISOString())}</div>
        </div>

        <div class="summary">
          <div class="card"><p>Total Budget</p><h3>${formatCurrency(total, currency)}</h3></div>
          <div class="card"><p>Platforms</p><h3>${breakdown.length}</h3></div>
          <div class="card"><p>Duration</p><h3>${days} day${days > 1 ? "s" : ""}</h3></div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Platform</th>
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
    showToast("Popup blocked. Please allow popups to export PDF.", "error");
    return;
  }

  reportWindow.document.open();
  reportWindow.document.write(reportHtml);
  reportWindow.document.close();
  reportWindow.focus();
  reportWindow.print();
  
  showToast("PDF report opened for printing.", "success");
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
    showToast("Please provide valid platform values.", "error");
    return;
  }

  const existingIndex = state.platforms.findIndex((platform) => platform.id === payload.id);
  if (existingIndex >= 0) {
    state.platforms[existingIndex] = payload;
    showToast(`Platform "${payload.name}" updated.`, "success");
  } else {
    state.platforms.push(payload);
    showToast(`Platform "${payload.name}" added.`, "success");
  }

  saveCurrentMarketPlatforms();
  renderAllPlatformViews();
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
    saveCurrentMarketPlatforms();
    renderAllPlatformViews();
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
    const confirmed = confirm("Reset configured platforms for current market to default values?");
    if (!confirmed) return;

    const key = marketKey(state.selectedMarket.country, state.selectedMarket.currency);
    state.platforms = (DEFAULT_MARKET_RATE_CARDS[key] || []).map((item) => ({ ...item, id: crypto.randomUUID() }));
    saveCurrentMarketPlatforms();
    renderAllPlatformViews();
    resetPlatformForm();
  });
}

function onMarketCountryChange() {
  const country = ui.marketCountry.value;
  const currency = MARKET_CURRENCY_MAP[country] || ui.marketCurrency.value || "GBP";

  state.selectedMarket = { country, currency };
  persistSelectedMarket();

  if (ui.marketCurrency.value !== currency) {
    ui.marketCurrency.value = currency;
  }

  loadCurrentMarketPlatforms();
  renderAllPlatformViews();
  state.lastAnalysis = null;
  ui.results.classList.add("hidden");
  ui.emptyState.classList.remove("hidden");
  
  // Reset role selector when market changes
  ui.jobRoleSelect.value = "";
  ui.roleDescription.classList.remove("visible");
  ui.roleDescription.textContent = "";
  ui.platformSuggestion.textContent = "";
}

function onMarketCurrencyChange() {
  const country = ui.marketCountry.value;
  const currency = ui.marketCurrency.value;

  const previousCountry = state.selectedMarket.country;
  const previousCurrency = state.selectedMarket.currency;
  const previousKey = marketKey(previousCountry, previousCurrency);
  const nextKey = marketKey(country, currency);

  const existingNext = state.platformsByMarket[nextKey];
  if ((!existingNext || existingNext.length === 0) && previousKey !== nextKey && state.platformsByMarket[previousKey]) {
    state.platformsByMarket[nextKey] = state.platformsByMarket[previousKey].map((item) => ({
      ...item,
      id: crypto.randomUUID(),
      rate: Number(convertAmount(item.rate, previousCurrency, currency).toFixed(2)),
      minCharge: Number(convertAmount(item.minCharge || 0, previousCurrency, currency).toFixed(2)),
      notes: `${item.notes ? `${item.notes} • ` : ""}Converted from ${previousCurrency} to ${currency}`,
    }));
  }

  state.selectedMarket = { country, currency };
  persistSelectedMarket();
  persistPlatformsByMarket();
  loadCurrentMarketPlatforms();
  renderAllPlatformViews();
  state.lastAnalysis = null;
  ui.results.classList.add("hidden");
  ui.emptyState.classList.remove("hidden");
}

function setupMarketSelection() {
  ui.marketCountry.addEventListener("change", onMarketCountryChange);
  ui.marketCurrency.addEventListener("change", onMarketCurrencyChange);
}

function openDatePicker(targetId) {
  const input = document.getElementById(targetId);
  if (!input) return;
  if (typeof input.showPicker === "function") {
    input.showPicker();
    return;
  }
  input.focus();
  input.click();
}

function setupDatePickerBehavior() {
  [ui.startDate, ui.endDate].forEach((input) => {
    input.addEventListener("click", () => {
      if (typeof input.showPicker === "function") {
        input.showPicker();
      }
    });
  });

  ui.dateButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-date-target");
      openDatePicker(targetId);
    });
  });
}

function setupDurationPresets() {
  ui.durationPresets.forEach((button) => {
    button.addEventListener("click", () => {
      const days = parseInt(button.getAttribute("data-days"), 10);
      const today = new Date();
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + days - 1);

      ui.startDate.value = formatDateIso(today.toISOString());
      ui.endDate.value = formatDateIso(endDate.toISOString());

      showToast(`Duration set to ${days} days`, "info");
    });
  });
}

function setupPlatformSelection() {
  ui.selectAllBtn.addEventListener("click", () => {
    const checkboxes = ui.checkboxList.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((cb) => (cb.checked = true));
    showToast(`Selected ${checkboxes.length} platforms`, "info");
  });

  ui.selectNoneBtn.addEventListener("click", () => {
    const checkboxes = ui.checkboxList.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((cb) => (cb.checked = false));
    ui.platformSuggestion.textContent = "";
    showToast("All platforms cleared", "info");
  });
}

function setupRoleSelection() {
  ui.jobRoleSelect.addEventListener("change", () => {
    const roleId = ui.jobRoleSelect.value;
    
    // Clear previous state
    ui.roleDescription.classList.remove("visible");
    ui.platformSuggestion.textContent = "";
    
    if (!roleId) {
      ui.roleDescription.textContent = "";
      return;
    }

    const roleConfig = ROLE_PLATFORM_MAP[roleId];
    if (!roleConfig) {
      return;
    }

    // Show role description
    ui.roleDescription.innerHTML = `<strong>Tip:</strong> ${roleConfig.description}`;
    ui.roleDescription.classList.add("visible");

    // Find matching platforms for this role in current market
    const checkboxes = ui.checkboxList.querySelectorAll("input[type='checkbox']");
    let matchedCount = 0;
    let priorityMatched = [];

    checkboxes.forEach((cb) => {
      const platformId = cb.value;
      const platform = state.platforms.find((p) => p.id === platformId);
      if (!platform) return;

      const platformName = platform.name.toLowerCase();
      
      // Check if this platform matches any of the role's recommended patterns
      const isMatch = roleConfig.platforms.some((pattern) => 
        platformName.includes(pattern.toLowerCase())
      );
      
      const isPriority = roleConfig.priorities && roleConfig.priorities.some((pattern) =>
        platformName.includes(pattern.toLowerCase())
      );

      if (isMatch) {
        cb.checked = true;
        matchedCount++;
        if (isPriority) {
          priorityMatched.push(platform.name);
        }
      } else {
        cb.checked = false;
      }
    });

    // Show feedback
    if (matchedCount > 0) {
      const roleName = ui.jobRoleSelect.options[ui.jobRoleSelect.selectedIndex].text;
      ui.platformSuggestion.textContent = `${matchedCount} platforms selected for ${roleName.replace(/^[^\s]+\s/, "")}`;
      showToast(`Auto-selected ${matchedCount} recommended platforms`, "success");
    } else {
      // No matches in current market - suggest using all
      ui.platformSuggestion.textContent = "No specific match - consider selecting manually";
      showToast("No exact platform matches for this role in current market. Select platforms manually.", "info");
    }
  });
}

function setDefaultDates() {
  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 13);

  if (!ui.startDate.value) {
    ui.startDate.value = formatDateIso(today.toISOString());
  }
  if (!ui.endDate.value) {
    ui.endDate.value = formatDateIso(twoWeeksLater.toISOString());
  }
}

function initialize() {
  migrateLegacyIfNeeded();
  state.selectedMarket = readSelectedMarket();
  state.platformsByMarket = readPlatformsByMarket();

  if (!MARKET_CURRENCY_MAP[state.selectedMarket.country]) {
    state.selectedMarket = { ...DEFAULT_SELECTED_MARKET };
  }

  refreshMarketUI();
  loadCurrentMarketPlatforms();
  renderAllPlatformViews();
  setDefaultDates();

  setupTabs();
  setupDatePickerBehavior();
  setupDurationPresets();
  setupPlatformSelection();
  setupRoleSelection();
  setupMarketSelection();
  setupResetDefaults();

  ui.analysisForm.addEventListener("submit", analyzeBudget);
  ui.platformForm.addEventListener("submit", onPlatformFormSubmit);
  ui.platformTableBody.addEventListener("click", onTableAction);
  ui.clearFormBtn.addEventListener("click", resetPlatformForm);
  ui.exportCsvBtn.addEventListener("click", exportCsv);
  ui.exportPdfBtn.addEventListener("click", exportPdf);
  ui.copyReportBtn.addEventListener("click", copyReportText);
  ui.copyTableBtn.addEventListener("click", copyTableText);
  ui.copyChartBtn.addEventListener("click", copyChartImage);
  ui.copyPieChartBtn.addEventListener("click", copyPieChartImage);
}

initialize();
