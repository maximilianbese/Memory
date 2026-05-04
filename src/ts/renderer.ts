import type { GameState, Player } from "./types";
import { THEMES } from "./themes";

export function renderStartScreen(): string {
  return `
    <div class="start-screen screen active">
      <span class="start-bg-icon bi bi-controller"></span>
      <div class="start-content">
        <p class="start-subtitle">It's play time.</p>
        <h1>Ready to play?</h1>
        <button class="play-btn" id="btn-play">
          <i class="bi bi-controller"></i>
          <span>Play</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `;
}

export function renderSettingsScreen(): string {
  return `
    <div class="settings-screen screen active">
      <div class="settings-container">
        <div class="settings-left">
          <h2 class="settings-title">Settings</h2>

          <div class="settings-section">
            <div class="section-label">
              <img class="bi bi-palette2"><img src="./src/assets/settings/palette.svg"></img></i> Game themes
            </div>
            <div class="radio-group" id="theme-group">
              ${[
                ["code", "Code vibes theme"],
                ["gaming", "Gaming theme"],
                ["da", "DA Projects theme"],
                ["food", "Foods theme"],
              ]
                .map(
                  ([val, label], i) => `
                <label class="radio-option">
                  <input type="radio" name="theme" value="${val}" ${i === 0 ? "checked" : ""}>
                  ${label}
                </label>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="settings-section">
            <div class="section-label"><img src="./src/assets/settings/chess_pawn.svg"></img>
              <img class="bi bi-person"></i> Choose player
            </div>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="player" value="blue" checked> Blue
              </label>
              <label class="radio-option">
                <input type="radio" name="player" value="orange"> Orange
              </label>
            </div>
          </div>

          <div class="settings-section">
            <div class="section-label"><img src="./src/assets/settings/board-size.svg"></img>
              <i class="bi bi-grid-3x3"></i> Board size
            </div>
            <div class="radio-group">
              <label class="radio-option">
                <input type="radio" name="boardSize" value="16" checked> 16 cards
              </label>
              <label class="radio-option">
                <input type="radio" name="boardSize" value="24"> 24 cards
              </label>
              <label class="radio-option">
                <input type="radio" name="boardSize" value="36"> 36 cards
              </label>
            </div>
          </div>
        </div>

        <div class="settings-right">
          <div class="theme-preview" id="theme-preview">
            ${renderThemePreview("code")}
          </div>

          <div class="start-bar">
            <span class="bar-info" id="bar-theme">Code vibes theme</span>
            <span class="bar-info" id="bar-player">Blue</span>
            <span class="bar-info" id="bar-size">16 cards</span>
            <button class="start-game-btn" id="btn-start">
              <i class="bi bi-play-fill"></i> Start
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderThemePreview(themeKey: string): string {
  const theme = THEMES[themeKey as keyof typeof THEMES];
  const cardCount = 8;

  // Wir nutzen das neue spezielle Vorschaubild
  const specialPreviewImg = theme.previewImage;

  return `
    
    <div class="theme-special-preview-container">
       ${
         specialPreviewImg
           ? `<img src="${specialPreviewImg}" class="theme-special-img" alt="${theme.name} Preview">`
           : `<div class="theme-special-placeholder" style="background-color: ${theme.color}">
              <i class="bi ${theme.backIcon}"></i>
            </div>`
       }
       <div class="theme-special-label">${theme.name}</div>
    </div>

    <div class="preview-cards">
      ${Array(cardCount)
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
        .join("")}
    </div>
  `;
}

export function updateThemePreview(themeKey: string): void {
  const preview = document.getElementById("theme-preview");
  if (preview) preview.innerHTML = renderThemePreview(themeKey);
}

/** Rendert die Kartenrückseite: Logo-Bild wenn vorhanden, sonst Icon */
function renderCardBack(sizeClass: string, themeKey: string): string {
  const theme = THEMES[themeKey as keyof typeof THEMES];
  if (theme.backLogo) {
    return `
      <div class="card-back ${sizeClass}" style="background:${theme.color}">
        <img
          src="${theme.backLogo}"
          class="card-back-logo"
          alt="logo"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <i class="bi ${theme.backIcon}" style="display:none"></i>
      </div>
    `;
  }
  return `
    <div class="card-back ${sizeClass}" style="background:${theme.color}">
      <i class="bi ${theme.backIcon}"></i>
    </div>
  `;
}

/** Rendert die Kartenvorderseite: Bild wenn vorhanden, sonst Emoji */
function renderCardFront(
  sizeClass: string,
  themeKey: string,
  symbol: string,
  image?: string,
): string {
  const theme = THEMES[themeKey as keyof typeof THEMES];
  if (image) {
    return `
      <div class="card-front ${sizeClass}" style="background:${theme.color}">
        <img
          src="${image}"
          class="card-front-img"
          alt="${symbol}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='block'"
        />
        <span class="card-symbol" style="display:none">${symbol}</span>
      </div>
    `;
  }
  return `
    <div class="card-front ${sizeClass}" style="background:${theme.color}">
      <span class="card-symbol">${symbol}</span>
    </div>
  `;
}

export function renderGameScreen(state: GameState): string {
  const sizeClass = `size-${state.settings.boardSize}`;

  return `
    <div class="game-screen screen active">
      <header class="game-header">
        <div class="scores">
          <div class="score-chip ${state.currentPlayer === "blue" ? "active-blue" : ""}">
            <span class="dot blue"></span>
            Blue ${state.scores.blue}
          </div>
          <div class="score-chip ${state.currentPlayer === "orange" ? "active-orange" : ""}">
            <span class="dot orange"></span>
            Orange ${state.scores.orange}
          </div>
        </div>
        <div class="current-player">
          Current player:
          <span class="player-dot ${state.currentPlayer}"></span>
        </div>
        <button class="exit-btn" id="btn-exit">
          <i class="bi bi-box-arrow-right"></i> Exit game
        </button>
      </header>

      <!-- Quit Confirmation Popup -->
      <div class="quit-overlay" id="quit-overlay" style="display:none;">
        <div class="quit-popup" id="quit-popup">
          <p class="quit-question">Are you sure you want to quit the game?</p>
          <div class="quit-buttons">
            <button class="quit-btn quit-btn--back" id="btn-quit-back">Back to game</button>
            <button class="quit-btn quit-btn--exit" id="btn-quit-exit">Exit game</button>
          </div>
        </div>
      </div>
      </header>

      <div class="board-wrapper">
        <div class="board ${sizeClass}" id="board">
          ${state.cards
            .map(
              (card) => `
            <div class="memory-card ${sizeClass} ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}"
                 data-id="${card.id}">
              <div class="card-inner">
                ${renderCardBack(sizeClass, state.settings.theme)}
                ${renderCardFront(sizeClass, state.settings.theme, card.symbol, card.image)}
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

export function renderGameOverScreen(state: GameState): string {
  return `
    <div class="gameover-screen screen active">
      <h1 class="gameover-title">Game over</h1>
      <p class="final-score-label">Final score</p>
      <div class="final-scores">
        <div class="score-chip">
          <span class="dot blue"></span>
          <span class="label-blue">Blue ${state.scores.blue}</span>
        </div>
        <div class="score-chip">
          <span class="dot orange"></span>
          <span class="label-orange">Orange ${state.scores.orange}</span>
        </div>
      </div>
    </div>
  `;
}

export function renderWinnerScreen(
  winner: Player | "tie",
  _state: GameState,
): string {
  const colors = [
    "#e74c3c",
    "#f1c40f",
    "#2ecc71",
    "#3498db",
    "#9b59b6",
    "#e67e22",
  ];
  const confetti = Array(30)
    .fill(0)
    .map((_, i) => {
      const left = Math.random() * 100;
      const color = colors[i % colors.length];
      const dur = 1.5 + Math.random();
      const delay = Math.random() * 0.8;
      const rot = Math.random() * 360;
      return `<div class="confetti-piece"
      style="left:${left}%;background:${color};--dur:${dur}s;--delay:${delay}s;--rot:${rot}deg;width:${6 + Math.random() * 8}px;height:${8 + Math.random() * 12}px"></div>`;
    })
    .join("");

  const winnerName =
    winner === "tie" ? "IT'S A TIE!" : `${winner.toUpperCase()} PLAYER`;
  const colorClass = winner === "tie" ? "blue" : winner;

  return `
    <div class="winner-screen screen active">
      <div class="confetti-area">${confetti}</div>
      <p class="winner-label">The winner is</p>
      <h1 class="winner-name ${colorClass}">${winnerName}</h1>
      <div class="winner-icon ${colorClass}">
        <i class="bi bi-person-fill"></i>
      </div>
      <button class="back-btn" id="btn-back">Back to start</button>
    </div>
  `;
}

export function updateScoreboard(state: GameState): void {
  const scores = document.querySelector(".scores");
  if (scores) {
    const blue = scores.children[0];
    const orange = scores.children[1];
    if (blue) {
      blue.innerHTML = `<span class="dot blue"></span> Blue ${state.scores.blue}`;
      blue.className = `score-chip ${state.currentPlayer === "blue" ? "active-blue" : ""}`;
    }
    if (orange) {
      orange.innerHTML = `<span class="dot orange"></span> Orange ${state.scores.orange}`;
      orange.className = `score-chip ${state.currentPlayer === "orange" ? "active-orange" : ""}`;
    }
  }
  const playerDot = document.querySelector(".current-player .player-dot");
  if (playerDot) {
    playerDot.className = `player-dot ${state.currentPlayer}`;
  }
}
