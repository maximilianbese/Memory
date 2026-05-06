import type { GameState, ThemeConfig } from "./types";
import { THEMES } from "./themes";
import { THEME_OPTIONS } from "./constants";

/** Renders the start screen as an HTML string. */
function renderPlayButton(): string {
  return `<button class="play-btn" id="btn-play">
          <img src="./src/assets/little-controller.svg" alt="Play">
          <span>Play</span><span>→</span>
        </button>`;
}

/** Renders the start screen as an HTML string. */
export function renderStartScreen(): string {
  return `
    <div class="start-screen screen active">
      <span class="start-bg-icon"><img src="./src/assets/big-controller.svg" alt="Play"></span>
      <div class="start-content">
        <p class="start-subtitle">It's play time.</p>
        <h1>Ready to play?</h1>
        ${renderPlayButton()}
      </div>
    </div>
  `;
}

/** Creates the radio buttons for theme selection. */
function renderThemeRadios(): string {
  return THEME_OPTIONS.map(
    ([val, label], i) => `
    <label class="radio-option">
      <input type="radio" name="theme" value="${val}" ${i === 0 ? "checked" : ""}>
      ${label}
    </label>
  `,
  ).join("");
}

/** Renders the theme selection section. */
function renderThemeSection(): string {
  return `<div class="settings-section">
      <div class="section-label"><img src="./src/assets/settings/palette.svg"> Game themes</div>
      <div class="radio-group" id="theme-group">${renderThemeRadios()}</div>
    </div>`;
}

/** Renders the player selection section. */
function renderPlayerSection(): string {
  return `<div class="settings-section">
      <div class="section-label"><img src="./src/assets/settings/chess_pawn.svg"> Choose player</div>
      <div class="radio-group">
        <label class="radio-option"><input type="radio" name="player" value="blue" checked> Blue</label>
        <label class="radio-option"><input type="radio" name="player" value="orange"> Orange</label>
      </div>
    </div>`;
}

/** Renders the board size section. */
function renderBoardSizeSection(): string {
  return `<div class="settings-section">
      <div class="section-label"><img src="./src/assets/settings/board-size.svg"> Board size</div>
      <div class="radio-group">
        <label class="radio-option"><input type="radio" name="boardSize" value="16" checked> 16 cards</label>
        <label class="radio-option"><input type="radio" name="boardSize" value="24"> 24 cards</label>
        <label class="radio-option"><input type="radio" name="boardSize" value="36"> 36 cards</label>
      </div>
    </div>`;
}

/** Renders all three settings sections. */
function renderSettingsSections(): string {
  return (
    renderThemeSection() + renderPlayerSection() + renderBoardSizeSection()
  );
}

/** Renders the left column of the settings screen (heading + form fields). */
function renderSettingsLeft(): string {
  return `
    <div class="settings-left">
      <h2 class="settings-title">Settings</h2>
      ${renderSettingsSections()}
    </div>
  `;
}

/** Renders the info bar with the start button. */
function renderStartBar(): string {
  return `
    <div class="start-bar">
      <span class="bar-info" id="bar-theme">Code vibes theme</span>
      <span class="bar-info" id="bar-player">Blue</span>
      <span class="bar-info" id="bar-size">16 cards</span>
      <button class="start-game-btn" id="btn-start">
        <i class="bi bi-play-fill"></i> Start
      </button>
    </div>
  `;
}

/**
 * Renders the mini preview cards for a theme.
 *
 * @param theme - Theme configuration object
 */
function renderPreviewCards(theme: ThemeConfig): string {
  return Array(8)
    .fill(0)
    .map(
      () => `
    <div class="preview-card" style="background:${theme.color}">
      ${
        theme.backLogo
          ? `<img src="${theme.backLogo}" class="preview-logo" alt="logo">`
          : `<i class="bi ${theme.backIcon}" style="color:rgba(255,255,255,0.35);font-size:0.7rem;"></i>`
      }
    </div>
  `,
    )
    .join("");
}

/**
 * Renders the complete theme preview area
 * (special image + mini cards).
 *
 * @param themeKey - Key of the theme to display
 */
function renderThemePreview(themeKey: string): string {
  const theme = THEMES[themeKey as keyof typeof THEMES];
  const specialImg = theme.previewImage
    ? `<img src="${theme.previewImage}" class="theme-special-img" alt="${theme.name} Preview">`
    : `<div class="theme-special-placeholder" style="background-color:${theme.color}"><i class="bi ${theme.backIcon}"></i></div>`;

  return `
    <div class="theme-special-preview-container">
      ${specialImg}
      <div class="theme-special-label">${theme.name}</div>
    </div>
    <div class="preview-cards">${renderPreviewCards(theme)}</div>
  `;
}

/** Renders the right column of the settings screen (preview + start bar). */
function renderSettingsRight(): string {
  return `
    <div class="settings-right">
      <div class="theme-preview" id="theme-preview">
        ${renderThemePreview("code")}
      </div>
      ${renderStartBar()}
    </div>
  `;
}

/** Renders the complete settings screen as an HTML string. */
export function renderSettingsScreen(): string {
  return `
    <div class="settings-screen screen active">
      <div class="settings-container">
        ${renderSettingsLeft()}
        ${renderSettingsRight()}
      </div>
    </div>
  `;
}

/**
 * Fades out the preview image, swaps the source, and fades it back in.
 *
 * @param img  - The image element
 * @param src  - New image source
 * @param alt  - New alt text
 */
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

/**
 * Updates the theme preview in the DOM without a full re-render
 * (fade animation + color update of mini cards).
 *
 * @param themeKey - Key of the newly selected theme
 */
export function updateThemePreview(themeKey: string): void {
  const preview = document.getElementById("theme-preview");
  if (!preview) return;
  const theme = THEMES[themeKey as keyof typeof THEMES];
  const specialImg =
    preview.querySelector<HTMLImageElement>(".theme-special-img");
  const specialLabel = preview.querySelector<HTMLElement>(
    ".theme-special-label",
  );

  if (specialImg && theme.previewImage)
    fadePreviewImage(specialImg, theme.previewImage, `${theme.name} Preview`);
  if (specialLabel) specialLabel.textContent = theme.name;
  preview.querySelectorAll<HTMLElement>(".preview-card").forEach((c) => {
    c.style.background = theme.color;
  });
}

/**
 * Renders the back side of a card (logo or icon fallback).
 *
 * @param sizeClass - CSS class for the card size (e.g. `size-16`)
 * @param themeKey  - Key of the active theme
 */
function renderCardBack(sizeClass: string, themeKey: string): string {
  const theme = THEMES[themeKey as keyof typeof THEMES];
  const fallback = `<i class="bi ${theme.backIcon}" style="display:none"></i>`;
  const content = theme.backLogo
    ? `<img src="${theme.backLogo}" class="card-back-logo" alt="logo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"> ${fallback}`
    : `<i class="bi ${theme.backIcon}"></i>`;
  return `<div class="card-back ${sizeClass}" style="background:${theme.color}">${content}</div>`;
}

/**
 * Renders the front side of a card (image or empty area).
 *
 * @param sizeClass - CSS class for the card size
 * @param themeKey  - Key of the active theme
 * @param image     - Optional image path
 */
function renderCardFront(
  sizeClass: string,
  themeKey: string,
  image?: string,
): string {
  const theme = THEMES[themeKey as keyof typeof THEMES];
  const content = image
    ? `<img src="${image}" class="card-front-img" alt="card" onerror="this.style.display='none'">`
    : "";
  return `<div class="card-front ${sizeClass}" style="background:${theme.color}">${content}</div>`;
}

/**
 * Renders a single score chip for a player.
 *
 * @param player        - `"blue"` or `"orange"`
 * @param score         - Current score
 * @param currentPlayer - Currently active player (for the active CSS class)
 */
function renderScoreChip(
  player: "blue" | "orange",
  score: number,
  currentPlayer: string,
): string {
  const activeClass = currentPlayer === player ? `active-${player}` : "";
  const label = player.charAt(0).toUpperCase() + player.slice(1);
  return `
    <div class="score-chip ${activeClass}">
      <span class="dot ${player}"></span> ${label} ${score}
    </div>
  `;
}

/**
 * Renders the game header with score, active player indicator, and exit button.
 *
 * @param state - Current game state
 */
function renderGameHeader(state: GameState): string {
  return `
    <header class="game-header">
      <div class="scores">
        ${renderScoreChip("blue", state.scores.blue, state.currentPlayer)}
        ${renderScoreChip("orange", state.scores.orange, state.currentPlayer)}
      </div>
      <div class="current-player">
        Current player: <span class="player-dot ${state.currentPlayer}"></span>
      </div>
      <button class="exit-btn" id="btn-exit"><i class="bi bi-box-arrow-right"></i> Exit game</button>
    </header>
  `;
}

/**
 * Renders the quit confirmation popup (initially hidden).
 *
 * @param theme - Key of the active theme (for theme-specific styling)
 */
function renderQuitPopup(theme: string): string {
  return `
    <div class="quit-overlay" id="quit-overlay" style="display:none;">
      <div class="quit-popup theme-${theme}" id="quit-popup">
        <p class="quit-question">Are you sure you want to quit the game?</p>
        <div class="quit-buttons">
          <button class="quit-btn quit-btn--back" id="btn-quit-back">Back to game</button>
          <button class="quit-btn quit-btn--exit" id="btn-quit-exit">Exit game</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders a single game card with front and back sides.
 *
 * @param card      - Card data
 * @param sizeClass - CSS class for the card size
 * @param theme     - Key of the active theme
 */
function renderCard(
  card: GameState["cards"][0],
  sizeClass: string,
  theme: string,
): string {
  const flipped = card.isFlipped ? "flipped" : "";
  const matched = card.isMatched ? "matched" : "";
  return `
    <div class="memory-card ${sizeClass} ${flipped} ${matched}" data-id="${card.id}">
      <div class="card-inner">
        ${renderCardBack(sizeClass, theme)}
        ${renderCardFront(sizeClass, theme, card.image)}
      </div>
    </div>
  `;
}

/**
 * Renders the complete game screen including header, popup, and board.
 *
 * @param state - Current game state
 */
export function renderGameScreen(state: GameState): string {
  const sizeClass = `size-${state.settings.boardSize}`;
  const cards = state.cards
    .map((card) => renderCard(card, sizeClass, state.settings.theme))
    .join("");
  return `
    <div class="game-screen screen active">
      ${renderGameHeader(state)}
      ${renderQuitPopup(state.settings.theme)}
      <div class="board-wrapper">
        <div class="board ${sizeClass}" id="board">${cards}</div>
      </div>
    </div>
  `;
}
