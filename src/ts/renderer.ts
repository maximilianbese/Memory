import type { GameState, ThemeConfig } from "./types";
import { THEMES } from "./themes";
import { THEME_OPTIONS } from "./constants";

/** Renders the play button for the start screen. */
function renderPlayButton(): string {
  return `<button class="play-btn" id="btn-play">
          <img src="/little-controller.svg" alt="Play">
          <span>Play</span><span>→</span>
        </button>`;
}

export function renderStartScreen(): string {
  return `
    <div class="start-screen screen active">
      <span class="start-bg-icon"><img src="/big-controller.svg" alt="Play"></span>
      <div class="start-content">
        <p class="start-subtitle">It's play time.</p>
        <h1>Ready to play?</h1>
        ${renderPlayButton()}
      </div>
    </div>
  `;
}

/** Updated: Theme "Code" (oder das erste in der Liste) ist nun standardmäßig checked */
function renderThemeRadios(): string {
  return THEME_OPTIONS.map(
    ([val, label], i) => `
    <label class="radio-option" data-theme-hover="${val}">
      <input type="radio" name="theme" value="${val}" ${i === 0 ? "checked" : ""}>
      ${label}
    </label>
  `,
  ).join("");
}

function renderThemeSection(): string {
  return `<div class="settings-section">
      <div class="section-label"><img src="/palette.svg"> Game themes</div>
      <div class="radio-group" id="theme-group">${renderThemeRadios()}</div>
    </div>`;
}

function renderPlayerSection(): string {
  return `<div class="settings-section">
      <div class="section-label"><img src="/chess_pawn.svg"> Choose player</div>
      <div class="radio-group">
        <label class="radio-option"><input type="radio" name="player" value="blue"> Blue</label>
        <label class="radio-option"><input type="radio" name="player" value="orange"> Orange</label>
      </div>
    </div>`;
}

function renderBoardSizeSection(): string {
  return `<div class="settings-section">
      <div class="section-label"><img src="/board-size.svg"> Board size</div>
      <div class="radio-group">
        <label class="radio-option"><input type="radio" name="boardSize" value="16"> 16 cards</label>
        <label class="radio-option"><input type="radio" name="boardSize" value="24"> 24 cards</label>
        <label class="radio-option"><input type="radio" name="boardSize" value="36"> 36 cards</label>
      </div>
    </div>`;
}

function renderSettingsSections(): string {
  return `
    ${renderThemeSection()}
    ${renderPlayerSection()}
    ${renderBoardSizeSection()}
  `;
}

function renderSettingsLeft(): string {
  return `
    <div class="settings-left">
      <h2 class="settings-title">Settings</h2>
      ${renderSettingsSections()}
    </div>
  `;
}

function renderStartBar(): string {
  return `
    <div class="start-bar">
      <span class="bar-info" id="bar-theme">Code vibes theme</span>
      <span class="bar-info" id="bar-player">Select player</span>
      <span class="bar-info" id="bar-size">Select size</span>
      <button class="start-game-btn" id="btn-start" disabled title="Please select player and board size">
        <i class="bi bi-play-fill"></i> Start
      </button>
    </div>
  `;
}

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

function renderThemePreview(themeKey: string): string {
  const theme = THEMES[themeKey as keyof typeof THEMES];
  if (!theme) return "";

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

// ... Rest der Datei (renderCard, renderGameScreen, etc.) bleibt identisch ...

function renderCardBack(sizeClass: string, themeKey: string): string {
  const theme = THEMES[themeKey as keyof typeof THEMES];
  const fallback = `<i class="bi ${theme.backIcon}" style="display:none"></i>`;
  const content = theme.backLogo
    ? `<img src="${theme.backLogo}" class="card-back-logo" alt="logo" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"> ${fallback}`
    : `<i class="bi ${theme.backIcon}"></i>`;
  return `<div class="card-back ${sizeClass}" style="background:${theme.color}">${content}</div>`;
}

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
