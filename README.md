# Finance Dashboard UI

A responsive frontend-only finance dashboard built for the assignment brief. It uses static/mock data, simulates viewer/admin roles on the client, and focuses on clean UI, component separation, and practical state handling without depending on a backend.

## What’s Included

- Summary cards for total balance, income, expenses, and savings rate
- A time-based balance trend chart built with inline SVG
- A category-based spending breakdown chart with click-to-filter behavior
- Search, filtering, and sorting for transactions
- Simulated role switching:
  - `Viewer` can explore the dashboard only
  - `Admin` can add, edit, and delete transactions
- Insight cards for highest spending category, monthly comparison, and a useful financial observation
- Responsive layout for desktop and smaller screens
- Empty-state handling when filters remove all visible results
- Local persistence with `localStorage`
- Optional quality touches:
  - Light/dark theme toggle
  - JSON export
  - Reset to seeded demo data

## Tech Choice

This project is intentionally dependency-free:

- HTML for the page structure
- CSS for layout, design system, responsiveness, and theming
- Vanilla JavaScript for state, rendering, filtering, charts, and role-based interactions

That keeps setup extremely simple and makes the assignment easy to review quickly.

## Project Structure

- `index.html`: page structure and UI sections
- `styles.css`: design system, layout, responsive styles, and theme variables
- `app.js`: mock data, state management, rendering logic, charts, filters, and modal behavior

## How to Run

Because there are no package dependencies, you can use either approach:

1. Open `index.html` directly in a browser.
2. Or serve the folder locally with any static server.

Example using Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## State Management Approach

State is stored in a single client-side object and persisted in `localStorage`:

- transactions
- selected role
- current filters
- theme preference

The UI re-renders from state after every interaction, which keeps behavior predictable without introducing extra libraries.

## Design Notes

- The interface separates dashboard overview from transaction exploration so the top charts always communicate the full account story.
- The spending breakdown is interactive: selecting a category updates the transaction table and insights section.
- A warm editorial palette and glass-style panels were used to keep the dashboard polished without feeling generic.

## Assumptions

- Currency is shown in USD for the mock data.
- Role-based behavior is simulated purely on the frontend as requested.
- Data is intentionally mocked and stored locally in the browser only.

## Assignment Fit

This submission addresses the brief by covering:

- dashboard overview
- transactions section with filtering/search/sorting
- simulated role-based UI
- insights
- state management
- responsive and readable UI
- documentation
