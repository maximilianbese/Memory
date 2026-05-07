/** Human-readable label names for each theme (used in the settings info bar) */
export const THEME_LABELS: Record<string, string> = {
  code: "Code vibes theme",
  gaming: "Gaming theme",
  da: "DA Projects theme",
  food: "Foods theme",
};

/** CSS font stack per theme, applied to `document.body` */
export const THEME_FONTS: Record<string, string> = {
  code: "'Red Rose', sans-serif",
  gaming: "'Orbitron', sans-serif",
  da: "'Figtree', sans-serif",
  food: "'Klee One', cursive",
};

/** Paths to the draw illustration per theme */
export const DRAW_IMGS: Record<string, string> = {
  code: "/cvt-draw.svg",
  gaming: "/gaming-draw.svg",
  da: "/da-projects-draw.svg",
  food: "/food-draw.svg",
};

/** Colors used for the confetti animation on the winner screen */
export const CONFETTI_COLORS = [
  "#e74c3c",
  "#f1c40f",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#e67e22",
];

/** All theme options as [value, label] pairs for the settings form */
export const THEME_OPTIONS: [string, string][] = [
  ["code", "Code vibes theme"],
  ["gaming", "Gaming theme"],
  ["da", "DA Projects theme"],
  ["food", "Foods theme"],
];
