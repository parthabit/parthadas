// ==============================================================
// GITHUB REPOSITORIES CONFIG
//
// The GitHub section fetches live data (description, language,
// stars, forks) from the public GitHub API at runtime — no token
// needed, and no token should ever be added here or anywhere in
// the frontend.
//
// This file only controls WHICH repos are eligible to show and
// which ones are pinned to the top with `featured: true`.
// If the live API call fails (rate limit, offline, etc.) the
// section falls back to name-only cards built from this list.
// ==============================================================

export const repoAllowlist = [
  { name: "Financial-Decision-Bot", featured: true },
  { name: "ai-weather-dashboard", featured: true },
  { name: "scamshield-ai", featured: true },
  { name: "clean-bengal", featured: false },
  { name: "interviewai", featured: true },
  { name: "staff-loan-calculator", featured: false },
  { name: "SafeHer", featured: false },
  { name: "ai-study-helper", featured: false },
  { name: "apex-fitness", featured: false },
  { name: "job-tracker", featured: false },
  { name: "restaurant-pro", featured: false },
  { name: "Waypoint", featured: false },
  { name: "finly-expense-tracker", featured: false },
  { name: "weather-dashboard", featured: false },
  { name: "Leetcode-DSA", featured: false },
];

export default repoAllowlist;
