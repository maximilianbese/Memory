import type { GameState, Player } from "./types";
import { DRAW_IMGS, CONFETTI_COLORS } from "./constants";

/**
 * Renders the game-over transition screen showing the final score for both players.
 *
 * @param state - Game state at the moment the last pair was matched.
 * @returns     HTML string for the game-over screen element.
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
 * Renders the draw screen displayed when both players have equal scores.
 *
 * @param state - Game state (used to pick the theme-specific draw illustration).
 * @returns     HTML string for the draw screen element.
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
 * Generates an HTML string of 30 randomly positioned confetti pieces.
 *
 * Each piece has a randomised horizontal position, colour, animation duration,
 * delay, rotation angle, and dimensions.
 *
 * @returns HTML string containing all confetti `<div>` elements.
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
 * Renders the winner screen with a confetti animation celebrating the winning player.
 *
 * @param winner - The player (`"blue"` or `"orange"`) who won the game.
 * @param _state - Game state (reserved for future theme-aware extensions).
 * @returns      HTML string for the winner screen element.
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
 * Updates the inner HTML and CSS class of a single score chip element.
 *
 * @param el            - The score chip DOM element to update.
 * @param player        - The player this chip represents.
 * @param score         - Current score for that player.
 * @param currentPlayer - The player whose turn it is (used to apply the active class).
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

/**
 * Updates the scoreboard and the active-player indicator directly in the DOM
 * without triggering a full screen re-render.
 *
 * @param state - Current game state providing updated scores and `currentPlayer`.
 */
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
