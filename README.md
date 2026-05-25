# Food World 🍽️

A simple food catalog web app built with vanilla HTML, CSS, and JavaScript. You can browse a list of meals, add new ones, edit existing entries, and delete ones you don't want — everything saves to localStorage so it persists between sessions.

## Features

- Browse food cards with image, name, category, area, and a YouTube recipe link
- Add new food items via prompts
- Edit any existing entry
- Delete entries by name
- Staggered fade-in animation when cards load
- Data stored in localStorage (no backend needed)

## Tech

- HTML / CSS / Vanilla JavaScript
- localStorage for persistence
- No frameworks, no dependencies

## How to run

Just open `index.html` in a browser. No setup needed.

To populate with sample data, uncomment the seed block at the top of `script.js`, open the page once, then comment it back out.

## Structure

```
foodworld/
├── index.html
├── app.css
├── script.js
└── img2.jpg
```

## Notes

This was one of my earlier JavaScript projects. The main things I improved over the original version:
- Replaced hardcoded switch statements with `findIndex()` — the original had a separate case for every array index which was messy
- Rewrote the grid to use a single reusable `createCard()` function instead of duplicated DOM manipulation
- Cleaned up the layout to use flexbox grid instead of fixed-height rows
- Added error handling for broken image URLs
