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

/** Root element that hosts all screen content. */
const app = document.getElementById("app")!;

/**
 * Central game state. Reset at the beginning of every new game via
 * {@link startGame}.
 */
let state: GameState = {
  settings: { theme: "code", player: "blue", boardSize: 16 },
  cards: [],
  scores: { blue: 0, orange: 0 },
  currentPlayer: "blue",
  flippedCards: [],
  isLocked: false,
};

/**
 * Displays the start screen and registers the play button listener.
 */
function showStart(): void {
  document.body.style.fontFamily = "'Nunito', sans-serif";
  app.innerHTML = renderStartScreen();
  document.getElementById("btn-play")?.addEventListener("click", showSettings);
}

/**
 * Displays the settings screen and attaches all form listeners.
 */
function showSettings(): void {
  app.innerHTML = renderSettingsScreen();
  attachSettingsListeners(startGame);
}

/**
 * Initialises a new game state from the given settings and switches to the
 * game screen.
 *
 * @param settings - Settings collected from the settings form.
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

/**
 * Renders the game screen into `#app` and attaches all in-game listeners.
 */
function renderGame(): void {
  app.innerHTML = renderGameScreen(state);
  attachCardListeners();
  attachExitListener();
}

/**
 * Registers the back-to-game, backdrop-click, and confirm-exit listeners
 * for the quit overlay.
 *
 * @param overlay - The quit overlay element, or `null` when absent from the DOM.
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

/**
 * Registers the exit button listener and delegates overlay interaction to
 * {@link attachQuitOverlayListeners}.
 */
function attachExitListener(): void {
  const overlay = document.getElementById("quit-overlay");
  document.getElementById("btn-exit")?.addEventListener("click", () => {
    if (overlay) overlay.style.display = "flex";
  });
  attachQuitOverlayListeners(overlay);
}

/**
 * Registers a `click` listener on every `.memory-card` element that forwards
 * the event to {@link handleCardClick}.
 */
function attachCardListeners(): void {
  document.querySelectorAll<HTMLElement>(".memory-card").forEach((el) => {
    el.addEventListener("click", () => {
      handleCardClick(state, Number(el.dataset.id), showGameOver);
    });
  });
}

/**
 * Displays the game-over screen and automatically transitions to the winner
 * or draw screen after 2.2 seconds.
 */
function showGameOver(): void {
  app.innerHTML = renderGameOverScreen(state);
  setTimeout(() => showWinner(), 2200);
}

/**
 * Determines the outcome (winner or draw) and renders the appropriate
 * end screen. Registers the "Back to start" button listener.
 */
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

showStart();
