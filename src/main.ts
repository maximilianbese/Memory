import "./styles/main.scss";
import type { GameState, GameSettings, Player } from "./ts/types";
import { createCards } from "./ts/game";
import {
  renderStartScreen,
  renderSettingsScreen,
  renderGameScreen,
} from "./ts/renderer";
import {
  renderGameOverScreen,
  renderDrawScreen,
  renderWinnerScreen,
} from "./ts/end-screen-renderer";
import { attachSettingsListeners, applyThemeFont } from "./ts/settings-handler";
import { handleCardClick } from "./ts/game-logic";

const app = document.getElementById("app")!;

/** Central game state – reset at the start of every new game. */
let state: GameState = {
  settings: { theme: "code", player: "blue", boardSize: 16 },
  cards: [],
  scores: { blue: 0, orange: 0 },
  currentPlayer: "blue",
  flippedCards: [],
  isLocked: false,
};

/** Displays the start screen and registers the play button. */
function showStart(): void {
  document.body.style.fontFamily = "'Nunito', sans-serif";
  app.innerHTML = renderStartScreen();
  document.getElementById("btn-play")?.addEventListener("click", showSettings);
}

/** Displays the settings screen and registers all form listeners. */
function showSettings(): void {
  app.innerHTML = renderSettingsScreen();
  attachSettingsListeners(startGame);
}

/**
 * Initialises a new game state and switches to the game screen.
 *
 * @param settings - Settings chosen by the player
 */
function startGame(settings: GameSettings): void {
  state = {
    settings,
    cards: createCards(settings),
    scores: { blue: 0, orange: 0 },
    currentPlayer: settings.player,
    flippedCards: [],
    isLocked: false,
  };
  applyThemeFont(settings.theme);
  renderGame();
}

/** Renders the game screen and attaches all necessary listeners. */
function renderGame(): void {
  app.innerHTML = renderGameScreen(state);
  attachCardListeners();
  attachExitListener();
}

/**
 * Registers listeners for the quit overlay (back, confirm, and backdrop click).
 *
 * @param overlay - The overlay element
 */
function attachQuitOverlayListeners(overlay: HTMLElement | null): void {
  document.getElementById("btn-quit-back")?.addEventListener("click", () => {
    if (overlay) overlay.style.display = "none";
  });
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.style.display = "none";
  });
  document
    .getElementById("btn-quit-exit")
    ?.addEventListener("click", showStart);
}

/** Registers the exit button and quit overlay listeners. */
function attachExitListener(): void {
  const overlay = document.getElementById("quit-overlay");
  document.getElementById("btn-exit")?.addEventListener("click", () => {
    if (overlay) overlay.style.display = "flex";
  });
  attachQuitOverlayListeners(overlay);
}

/** Registers click listeners on all game cards. */
function attachCardListeners(): void {
  document.querySelectorAll<HTMLElement>(".memory-card").forEach((el) => {
    el.addEventListener("click", () => {
      handleCardClick(state, Number(el.dataset.id), showGameOver);
    });
  });
}

/** Displays the game over screen and redirects to the winner screen after 2.2 s. */
function showGameOver(): void {
  app.innerHTML = renderGameOverScreen(state);
  setTimeout(() => showWinner(), 2200);
}

/** Displays the draw or winner screen depending on the score. */
function showWinner(): void {
  if (state.scores.blue === state.scores.orange) {
    app.innerHTML = renderDrawScreen(state);
  } else {
    const winner: Player =
      state.scores.blue > state.scores.orange ? "blue" : "orange";
    app.innerHTML = renderWinnerScreen(winner, state);
  }
  document.getElementById("btn-back")?.addEventListener("click", showStart);
}

// ===== App entry point =====
showStart();
