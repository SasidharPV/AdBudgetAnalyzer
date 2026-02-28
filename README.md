# Ad Budget Analyzer

A simple, visual, GitHub Pages-ready web app to estimate job advertisement budget across multiple platforms.

## Features

- Analyze budget by **date range** and selected platforms
- Calendar-based date selection for campaign start/end
- Built-in default rate cards for global + local job-ad websites
- Configuration tab to:
  - Edit existing rates
  - Add new websites/channels
  - Set country and currency per rate card
  - Delete platforms
  - Reset to default list
- Analysis filters for country and currency
- Cost breakdown visualizations:
  - Bar-based platform split
  - Donut share chart
  - Detailed calculation table
- Export options:
  - CSV download for spreadsheet usage
  - PDF-ready report export via browser print dialog
- Copy options for documentation workflows:
  - Copy full report text (for docs/notes)
  - Copy table as tab-separated text (for docs/sheets)
  - Copy chart image directly to clipboard (for PPT/docs)
- Data persistence using browser `localStorage`

## Run locally

Open `index.html` in your browser.

## Host on GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub repository settings, open **Pages**.
3. Set source to **Deploy from a branch**.
4. Select your main branch and root folder (`/`).
5. Save and open the published GitHub Pages URL.

## Notes

- Supports multi-currency rate cards by platform.
- Platform rates are editable in the **Configuration** tab.
- Rates are estimates and should be updated based on latest platform pricing.
