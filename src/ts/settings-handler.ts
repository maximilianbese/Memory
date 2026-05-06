import type { GameSettings, Player } from "./types";
import { THEME_LABELS, THEME_FONTS } from "./constants";
import { updateThemePreview } from "./renderer";

/**
 * Reads the value of a radio input from the DOM.
 *
 * @param name     - `name` attribute of the radio group
 * @param fallback - Fallback value if no element is selected
 */
function getRadioValue(name: string, fallback: string): string {
  return (
    document.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)
      ?.value ?? fallback
  );
}

/**
 * Updates the info bar in the settings view
 * with the currently selected values (theme, player, board size).
 */
export function updateBarInfo(): void {
  const theme = getRadioValue("theme", "code");
  const player = getRadioValue("player", "blue");
  const size = getRadioValue("boardSize", "16");

  const barTheme = document.getElementById("bar-theme");
  const barPlayer = document.getElementById("bar-player");
  const barSize = document.getElementById("bar-size");

  if (barTheme) barTheme.textContent = THEME_LABELS[theme] ?? theme;
  if (barPlayer)
    barPlayer.textContent = player.charAt(0).toUpperCase() + player.slice(1);
  if (barSize) barSize.textContent = `${size} cards`;
}

/**
 * Reads the currently selected settings from the DOM form.
 *
 * @returns Ready-to-use `GameSettings` object for starting the game
 */
export function readSettingsFromDOM(): GameSettings {
  return {
    theme: getRadioValue("theme", "code") as GameSettings["theme"],
    player: getRadioValue("player", "blue") as Player,
    boardSize: Number(
      getRadioValue("boardSize", "16"),
    ) as GameSettings["boardSize"],
  };
}

/**
 * Registers all event listeners in the settings screen:
 * theme preview, info bar updates, and the start button.
 *
 * @param onStart - Callback invoked with the collected settings
 */
function attachRadioListeners(): void {
  document.querySelectorAll('input[name="theme"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      updateThemePreview((e.target as HTMLInputElement).value);
      updateBarInfo();
    });
  });
  document
    .querySelectorAll('input[name="player"], input[name="boardSize"]')
    .forEach((input) => {
      input.addEventListener("change", () => updateBarInfo());
    });
}

export function attachSettingsListeners(
  onStart: (s: GameSettings) => void,
): void {
  attachRadioListeners();
  document
    .getElementById("btn-start")
    ?.addEventListener("click", () => onStart(readSettingsFromDOM()));
}

/**
 * Applies the theme font to `document.body`
 * and swaps the theme CSS class.
 *
 * @param theme - Key of the active theme
 */
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
