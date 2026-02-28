# Ad Budget Analyzer

A modern, visual, GitHub Pages-ready web app to estimate job advertisement budget across multiple platforms.

![Ad Budget Analyzer](https://img.shields.io/badge/Version-2.0-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Campaign Planning
- **Quick Duration Presets** - One-click buttons for 1 week, 2 weeks, 1/2/3 months
- **Auto-populated Dates** - Start date defaults to today with a 2-week campaign
- **Calendar Selection** - Click to open native date picker
- **Select All/Clear All** - Quick platform selection toggles

### 🆕 Role-Based Platform Selection
- **Smart Auto-Selection** - Choose a job role and relevant platforms are auto-selected
- **Industry Categories** - Healthcare, Hospitality, Tech, Finance, Education, Trades, Retail, Logistics, Creative
- **Employment Types** - Part-time, Full-time, Temporary, Graduate role presets
- **Role Guidance** - Helpful tips showing where each role type typically recruits
- **Market-Aware** - Matches role requirements to available platforms in your market

**Supported Roles:**
| Category | Roles |
|----------|-------|
| Healthcare | Nurse/Care Worker, Doctor/Medical, Support Staff |
| Hospitality | Catering/Chef, Hotel/Restaurant, Events Staff |
| Technology | Developer, Designer, Data Analyst, IT Support |
| Business | Accountant, Manager, Sales, HR |
| Education | Teacher/Lecturer, Tutor/TA |
| Trades | Construction, Electrician/Plumber, Mechanic |
| Retail | Store Assistant, Customer Service |
| Logistics | Driver/Delivery, Warehouse |
| Creative | Marketing, Graphic Design, Content Writer |
| Employment Type | Part-Time, Full-Time, Temporary, Graduate |

### Market Support
- **6 Global Markets** - UK, US, India, Australia, Singapore, UAE
- **Currency Auto-Matching** - Country selection updates currency automatically
- **Market-Specific Rate Cards** - Pre-loaded platforms for each region
- **Cross-Currency Conversion** - Automatic rate conversion when switching currencies

### Visual Analytics
- **Gradient Bar Charts** - Animated cost breakdown by platform
- **Interactive Donut Chart** - Percentage share visualization
- **Detailed Tables** - Complete cost breakdown with pricing models
- **Summary Cards** - At-a-glance totals with hover effects

### Export & Share
- **CSV Export** - Download spreadsheet-ready data
- **PDF Report** - Printable report with professional styling
- **Copy Report** - Plain text for documents
- **Copy Table** - Tab-separated for Excel/Sheets
- **Copy Chart Image** - PNG for PowerPoint/Docs

### Configuration
- **Edit Platform Rates** - Update pricing for any platform
- **Add New Platforms** - Extend with custom job boards
- **Pricing Models** - Per Day, Per Week, Per Post options
- **Minimum Charges** - Set platform minimums
- **Reset to Defaults** - Restore original rate cards

### User Experience
- **Toast Notifications** - Non-intrusive feedback messages
- **Smooth Animations** - Fade, slide, and hover effects
- **Dark Theme** - Modern, eye-friendly dark interface
- **Responsive Design** - Works on desktop, tablet, mobile
- **Local Storage** - Settings persist between sessions

## Quick Start

1. Open `index.html` in your browser
2. Select your target market (UK default)
3. Set campaign dates or use quick duration buttons
4. Check the platforms you want to advertise on
5. Click "Analyze Budget" to see results

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**
4. Select your main branch and root folder (`/`)
5. Save - your site will be live at `https://username.github.io/repo-name/`

## Supported Platforms by Market

| Market | Platforms |
|--------|-----------|
| United Kingdom | Indeed UK, Reed, CV-Library, Totaljobs, LinkedIn, Guardian Jobs, NHS Jobs, TES, Caterer.com, Gumtree, Glassdoor |
| United States | Indeed, LinkedIn, ZipRecruiter, Glassdoor, Monster, CareerBuilder, Dice, HealthcareJobs, Craigslist, Snagajob |
| India | Naukri, Indeed India, Foundit, TimesJobs, LinkedIn, Shine |
| Australia | Seek, Indeed Australia, LinkedIn, Jora, CareerOne |
| Singapore | JobStreet, MyCareersFuture, LinkedIn, Indeed, FastJobs |
| UAE | Bayt, Naukrigulf, GulfTalent, LinkedIn, Indeed |

## Technology

- **Pure HTML5/CSS3/JavaScript** - No frameworks, no build step
- **Zero Dependencies** - Works offline after first load
- **Modern CSS** - CSS Variables, Grid, Flexbox, Animations
- **Local Storage API** - Client-side data persistence

## Notes

- Platform rates are estimates based on 2024/2025 pricing
- Actual costs may vary based on job type, location targeting, and promotions
- Update rates in Configuration tab to match current platform pricing

## License

MIT License - Free to use, modify, and distribute.
