import type { CardData, GameSettings } from "./types";
import { THEMES } from "./themes";

/**
 * Creates a complete, shuffled card set for the given settings.
 * Each image appears exactly twice (as a pair).
 *
 * @param settings - Current game settings (theme + board size)
 * @returns Shuffled array of `CardData` objects
 */
function buildPair(pairId: number, image?: string): CardData[] {
  return [
    { id: pairId * 2, pairId, image, isFlipped: false, isMatched: false },
    { id: pairId * 2 + 1, pairId, image, isFlipped: false, isMatched: false },
  ];
}

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
 * Shuffles an array using the Fisher-Yates algorithm.
 *
 * @param arr - The array to shuffle (not mutated)
 * @returns New shuffled array
 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
