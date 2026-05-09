import type { CardData, GameSettings } from "./types";
import { THEMES } from "./themes";

/**
 * Creates a pair of {@link CardData} objects that share the same `pairId`.
 *
 * @param pairId - Shared identifier for both cards.
 * @param image  - Optional path to the front-side image.
 * @returns      Array of two cards forming a matching pair.
 */
function buildPair(pairId: number, image?: string): CardData[] {
  return [
    { id: pairId * 2, pairId, image, isFlipped: false, isMatched: false },
    { id: pairId * 2 + 1, pairId, image, isFlipped: false, isMatched: false },
  ];
}

/**
 * Creates a complete, shuffled card deck for the given game settings.
 *
 * The number of pairs equals `settings.boardSize / 2`. Each pair is assigned
 * one front-side image from the active theme's image list.
 *
 * @param settings - Current game settings (theme + board size).
 * @returns        Shuffled array of {@link CardData} objects.
 */
export function createCards(settings: GameSettings): CardData[] {
  const theme = THEMES[settings.theme];
  const pairCount = settings.boardSize / 2;
  const images = theme.images?.slice(0, pairCount);
  const cards: CardData[] = [];
  Array.from({ length: pairCount }).forEach((_, pairId) => {
    cards.push(...buildPair(pairId, images?.[pairId]));
  });
  return shuffle(cards);
}

/**
 * Returns a new array with the same elements in a random order.
 *
 * Uses the Fisher-Yates algorithm. The original array is not mutated.
 *
 * @param arr - Source array.
 * @returns   Shuffled copy of `arr`.
 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
