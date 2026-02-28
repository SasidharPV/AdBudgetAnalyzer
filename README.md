# Ad Budget Analyzer

A simple, visual, GitHub Pages-ready web app to estimate job advertisement budget across multiple platforms.

## Features

- Analyze budget by **date range** and selected platforms
- Built-in default rate cards for common job-ad websites
- Configuration tab to:
  - Edit existing rates
  - Add new websites/channels
  - Delete platforms
  - Reset to default list
- Cost breakdown visualizations:
  - Bar-based platform split
  - Donut share chart
  - Detailed calculation table
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

- Currency is currently set to `USD`.
- Platform rates are editable in the **Configuration** tab.
- Rates are estimates and should be updated based on latest platform pricing.
