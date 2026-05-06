import type { GameState } from "./types";
import { updateScoreboard } from "./end-screen-renderer";

/**
 * Finds a card in the state by its ID.
 */
function findCard(state: GameState, id: number) {
  return state.cards.find((c) => c.id === id);
}

/**
 * Sets the `flipped` CSS class of a card in the DOM.
 *
 * @param id - Card ID from `data-id`
 * @param flipped - `true` = flip up, `false` = flip back
 */
function setCardFlipInDOM(id: number, flipped: boolean): void {
  const el = document.querySelector<HTMLElement>(
    `.memory-card[data-id="${id}"]`,
  );
  if (flipped) el?.classList.add("flipped");
  else el?.classList.remove("flipped");
}

/**
 * Marks a card in the DOM as matched.
 *
 * @param id - Card ID from `data-id`
 */
function setCardMatchedInDOM(id: number): void {
  document
    .querySelector(`.memory-card[data-id="${id}"]`)
    ?.classList.add("matched");
}

/**
 * Handles a successful match of two cards:
 * marks both as matched, increments the score,
 * and checks whether the game is over.
 *
 * @param state     - Current game state (mutated in place)
 * @param id1       - ID of the first flipped card
 * @param id2       - ID of the second flipped card
 * @param onGameOver - Callback invoked when all pairs have been found
 */
function applyMatch(
  state: GameState,
  id1: number,
  id2: number,
  onGameOver: () => void,
): void {
  const card1 = findCard(state, id1)!;
  const card2 = findCard(state, id2)!;
  card1.isMatched = true;
  card2.isMatched = true;
  setCardMatchedInDOM(id1);
  setCardMatchedInDOM(id2);
  state.scores[state.currentPlayer]++;
  state.flippedCards = [];
  state.isLocked = false;
  updateScoreboard(state);
  if (state.cards.every((c) => c.isMatched)) setTimeout(onGameOver, 600);
}

function handleMatch(
  state: GameState,
  id1: number,
  id2: number,
  onGameOver: () => void,
): void {
  setTimeout(() => applyMatch(state, id1, id2, onGameOver), 500);
}

/**
 * Handles a failed comparison of two cards:
 * flips both back and switches the active player.
 *
 * @param state - Current game state (mutated in place)
 * @param id1   - ID of the first flipped card
 * @param id2   - ID of the second flipped card
 */
function handleMismatch(state: GameState, id1: number, id2: number): void {
  setTimeout(() => {
    const card1 = findCard(state, id1)!;
    const card2 = findCard(state, id2)!;
    card1.isFlipped = false;
    card2.isFlipped = false;
    setCardFlipInDOM(id1, false);
    setCardFlipInDOM(id2, false);
    state.flippedCards = [];
    state.isLocked = false;
    state.currentPlayer = state.currentPlayer === "blue" ? "orange" : "blue";
    updateScoreboard(state);
  }, 900);
}

/**
 * Evaluates the two currently flipped cards
 * and delegates to `handleMatch` or `handleMismatch`.
 *
 * @param state      - Current game state
 * @param onGameOver - Callback for game over
 */
export function checkMatch(state: GameState, onGameOver: () => void): void {
  const [id1, id2] = state.flippedCards;
  const card1 = findCard(state, id1)!;
  const card2 = findCard(state, id2)!;
  if (card1.pairId === card2.pairId) {
    handleMatch(state, id1, id2, onGameOver);
  } else {
    handleMismatch(state, id1, id2);
  }
}

/**
 * Handles a click on a card:
 * ignores invalid clicks, flips the card,
 * and triggers the match check when two cards are flipped.
 *
 * @param state      - Current game state (mutated in place)
 * @param id         - ID of the clicked card
 * @param onGameOver - Callback for game over
 */
function isCardClickable(state: GameState, id: number): boolean {
  const card = findCard(state, id);
  return (
    !state.isLocked &&
    !!card &&
    !card.isFlipped &&
    !card.isMatched &&
    !state.flippedCards.includes(id)
  );
}

export function handleCardClick(
  state: GameState,
  id: number,
  onGameOver: () => void,
): void {
  if (!isCardClickable(state, id)) return;
  const card = findCard(state, id)!;
  setCardFlipInDOM(id, true);
  card.isFlipped = true;
  state.flippedCards.push(id);
  if (state.flippedCards.length === 2) {
    state.isLocked = true;
    checkMatch(state, onGameOver);
  }
}
