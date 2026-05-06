import type { GameState, Player } from "./types";
import { DRAW_IMGS, CONFETTI_COLORS } from "./constants";

/**
 * Renders the game over screen with the final score.
 *
 * @param state - Game state at the time the game ended
 */
export function renderGameOverScreen(state: GameState): string {
  return `
    <div class="gameover-screen screen active">
      <h1 class="gameover-title">Game over</h1>
      <p class="final-score-label">Final score</p>
      <div class="final-scores">
        <div class="score-chip"><span class="dot blue"></span><span class="label-blue">Blue ${state.scores.blue}</span></div>
        <div class="score-chip"><span class="dot orange"></span><span class="label-orange">Orange ${state.scores.orange}</span></div>
      </div>
    </div>
  `;
}

/**
 * Renders the draw screen (tie game).
 *
 * @param state - Game state (used for the theme-specific image)
 */
export function renderDrawScreen(state: GameState): string {
  return `
    <div class="draw-screen screen active">
      <p class="draw-label">It's a</p>
      <h1 class="draw-title">DRAW</h1>
      <div class="draw-icon">
        <img src="${DRAW_IMGS[state.settings.theme]}" alt="Draw" class="draw-img">
      </div>
      <button class="back-btn" id="btn-back">Back to start</button>
    </div>
  `;
}

/**
 * Generates 30 randomly positioned confetti elements as an HTML string.
 */
function renderConfetti(): string {
  return Array(30)
    .fill(0)
    .map((_, i) => {
      const left = Math.random() * 100;
      const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const dur = 1.5 + Math.random();
      const delay = Math.random() * 0.8;
      const rot = Math.random() * 360;
      return `<div class="confetti-piece" style="left:${left}%;background:${color};--dur:${dur}s;--delay:${delay}s;--rot:${rot}deg;width:${6 + Math.random() * 8}px;height:${8 + Math.random() * 12}px"></div>`;
    })
    .join("");
}

/**
 * Renders the winner screen with confetti animation.
 *
 * @param winner - Gewinnender Spieler (`"blue"` or `"orange"`)
 * @param _state - Game state (reserved for future extensions)
 */
export function renderWinnerScreen(winner: Player, _state: GameState): string {
  return `
    <div class="winner-screen screen active">
      <div class="confetti-area">${renderConfetti()}</div>
      <p class="winner-label">The winner is</p>
      <h1 class="winner-name ${winner}">${winner.toUpperCase()} PLAYER</h1>
      <div class="winner-icon"><i class="bi bi-person-fill ${winner}"></i></div>
      <button class="back-btn" id="btn-back">Back to start</button>
    </div>
  `;
}

/**
 * Updates the score and active player indicator
 * directly in the DOM (without a full screen re-render).
 *
 * @param state - Current game state
 */
function updatePlayerChip(
  el: Element,
  player: "blue" | "orange",
  score: number,
  currentPlayer: string,
): void {
  el.innerHTML = `<span class="dot ${player}"></span> ${player.charAt(0).toUpperCase() + player.slice(1)} ${score}`;
  el.className = `score-chip ${currentPlayer === player ? `active-${player}` : ""}`;
}

/** Updates the score and active player indicator directly in the DOM. */
export function updateScoreboard(state: GameState): void {
  const scores = document.querySelector(".scores");
  if (!scores) return;
  const [blue, orange] = [scores.children[0], scores.children[1]];
  if (blue)
    updatePlayerChip(blue, "blue", state.scores.blue, state.currentPlayer);
  if (orange)
    updatePlayerChip(
      orange,
      "orange",
      state.scores.orange,
      state.currentPlayer,
    );
  const dot = document.querySelector(".current-player .player-dot");
  if (dot) dot.className = `player-dot ${state.currentPlayer}`;
}
