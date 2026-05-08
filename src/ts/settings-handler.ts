import type { GameSettings, Player } from "./types";
import { THEME_LABELS, THEME_FONTS } from "./constants";
import { THEMES } from "./themes";

function fadePreviewImage(
  img: HTMLImageElement,
  src: string,
  alt: string,
): void {
  img.style.transition = "opacity 0.15s ease";
  img.style.opacity = "0";
  setTimeout(() => {
    img.src = src;
    img.alt = alt;
    img.style.opacity = "1";
  }, 150);
}

export function updateThemePreview(themeKey: string): void {
  const preview = document.getElementById("theme-preview");
  if (!preview) return;

  const theme = THEMES[themeKey as keyof typeof THEMES];
  if (!theme) return;

  const specialImg =
    preview.querySelector<HTMLImageElement>(".theme-special-img");
  const specialLabel = preview.querySelector<HTMLElement>(
    ".theme-special-label",
  );

  if (specialImg && theme.previewImage) {
    fadePreviewImage(specialImg, theme.previewImage, `${theme.name} Preview`);
  }
  if (specialLabel) specialLabel.textContent = theme.name;

  preview.querySelectorAll<HTMLElement>(".preview-card").forEach((c) => {
    c.style.background = theme.color;
  });
}

function getRadioValue(name: string): string | null {
  return (
    document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)
      ?.value ?? null
  );
}

export function updateBarInfo(): void {
  const theme = getRadioValue("theme");
  const player = getRadioValue("player");
  const size = getRadioValue("boardSize");

  const barTheme = document.getElementById("bar-theme");
  const barPlayer = document.getElementById("bar-player");
  const barSize = document.getElementById("bar-size");

  if (barTheme)
    barTheme.textContent = theme
      ? (THEME_LABELS[theme] ?? theme)
      : "Select a theme";
  if (barPlayer)
    barPlayer.textContent = player
      ? player.charAt(0).toUpperCase() + player.slice(1)
      : "Select player";
  if (barSize) barSize.textContent = size ? `${size} cards` : "Select size";
}

function validateSettings(): void {
  const theme = getRadioValue("theme");
  const player = getRadioValue("player");
  const size = getRadioValue("boardSize");
  const startBtn = document.getElementById(
    "btn-start",
  ) as HTMLButtonElement | null;

  if (startBtn) {
    const isValid = !!(theme && player && size);
    startBtn.disabled = !isValid;

    if (isValid) {
      startBtn.title = "Start game";
    } else {
      // Hilfreicherer Text, was noch fehlt
      const missing = [];
      if (!player) missing.push("player");
      if (!size) missing.push("board size");
      startBtn.title = `Please select: ${missing.join(" & ")}`;
    }
  }
}

export function readSettingsFromDOM(): GameSettings {
  return {
    theme: (getRadioValue("theme") || "code") as GameSettings["theme"],
    player: (getRadioValue("player") || "blue") as Player,
    boardSize: Number(
      getRadioValue("boardSize") || "16",
    ) as GameSettings["boardSize"],
  };
}

function attachRadioListeners(): void {
  document.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      const target = e.target as HTMLInputElement;
      if (target.name === "theme") {
        updateThemePreview(target.value);
      }
      updateBarInfo();
      validateSettings();
    });
  });

  document
    .querySelectorAll<HTMLElement>("[data-theme-hover]")
    .forEach((label) => {
      label.addEventListener("mouseenter", () => {
        const themeKey = label.getAttribute("data-theme-hover");
        if (themeKey) updateThemePreview(themeKey);
      });
      label.addEventListener("mouseleave", () => {
        const checkedValue = getRadioValue("theme");
        if (checkedValue) updateThemePreview(checkedValue);
      });
    });
}

export function attachSettingsListeners(
  onStart: (s: GameSettings) => void,
): void {
  attachRadioListeners();

  // Initialer Check beim Laden der Seite
  validateSettings();
  updateBarInfo();

  document.getElementById("btn-start")?.addEventListener("click", () => {
    onStart(readSettingsFromDOM());
  });
}

export function applyThemeFont(theme: string): void {
  document.body.style.fontFamily = THEME_FONTS[theme] ?? "'Nunito', sans-serif";
  document.body.classList.remove(
    "theme-code",
    "theme-gaming",
    "theme-da",
    "theme-food",
  );
  document.body.classList.add(`theme-${theme}`);
}
