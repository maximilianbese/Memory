import type { GameState } from "./types";
import { updateScoreboard } from "./end-screen-renderer";

/**
 * Returns the card with the given `id` from the state, or `undefined`.
 *
 * @param state - Current game state.
 * @param id    - Card identifier.
 */
function findCard(state: GameState, id: number) {
  return state.cards.find((c) => c.id === id);
}

/**
 * Adds or removes the `flipped` CSS class on a card element in the DOM.
 *
 * @param id      - Value of the card's `data-id` attribute.
 * @param flipped - `true` to flip the card face-up, `false` to flip it back.
 */
function setCardFlipInDOM(id: number, flipped: boolean): void {
  const el = document.querySelector<HTMLElement>(
    `.memory-card[data-id="${id}"]`,
  );
  if (flipped) el?.classList.add("flipped");
  else el?.classList.remove("flipped");
}

/**
 * Adds the `matched` CSS class to a card element in the DOM.
 *
 * @param id - Value of the card's `data-id` attribute.
 */
function setCardMatchedInDOM(id: number): void {
  document
    .querySelector(`.memory-card[data-id="${id}"]`)
    ?.classList.add("matched");
}

/**
 * Applies the result of a successful pair match to the game state and the DOM.
 *
 * Both cards are marked as matched, the current player's score is incremented,
 * the scoreboard is updated, and `onGameOver` is called when every card is matched.
 *
 * @param state      - Current game state (mutated in place).
 * @param id1        - ID of the first matched card.
 * @param id2        - ID of the second matched card.
 * @param onGameOver - Callback invoked when all pairs have been found.
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

/**
 * Schedules {@link applyMatch} with a short delay to allow the flip animation
 * to complete before locking the cards in the matched state.
 *
 * @param state      - Current game state.
 * @param id1        - ID of the first matched card.
 * @param id2        - ID of the second matched card.
 * @param onGameOver - Callback invoked when all pairs have been found.
 */
function handleMatch(
  state: GameState,
  id1: number,
  id2: number,
  onGameOver: () => void,
): void {
  setTimeout(() => applyMatch(state, id1, id2, onGameOver), 500);
}

/**
 * Handles a failed comparison: flips both cards back after a delay and
 * switches the active player.
 *
 * @param state - Current game state (mutated in place).
 * @param id1   - ID of the first non-matching card.
 * @param id2   - ID of the second non-matching card.
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
 * Evaluates the two currently face-up cards and delegates to
 * {@link handleMatch} or {@link handleMismatch}.
 *
 * @param state      - Current game state.
 * @param onGameOver - Callback invoked when all pairs have been found.
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
 * Returns `true` when the card can be flipped by the player.
 *
 * A card is not clickable when the board is locked, the card is already
 * face-up, already matched, or already in the `flippedCards` queue.
 *
 * @param state - Current game state.
 * @param id    - ID of the card to test.
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

/**
 * Processes a card-click event.
 *
 * Ignores the click when the card is not clickable; otherwise flips the card
 * and triggers {@link checkMatch} once two cards are face-up.
 *
 * @param state      - Current game state (mutated in place).
 * @param id         - ID of the clicked card.
 * @param onGameOver - Callback invoked when all pairs have been found.
 */
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
