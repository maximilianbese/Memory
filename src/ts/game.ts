import type { CardData, GameSettings } from "./types";
import { THEMES } from "./themes";

export function createCards(settings: GameSettings): CardData[] {
  const theme = THEMES[settings.theme];
  const pairCount = settings.boardSize / 2;
  const images = theme.images?.slice(0, pairCount);

  const cards: CardData[] = [];
  Array.from({ length: pairCount }).forEach((_, pairId) => {
    const image = images?.[pairId];
    cards.push(
      { id: pairId * 2, pairId, image, isFlipped: false, isMatched: false },
      { id: pairId * 2 + 1, pairId, image, isFlipped: false, isMatched: false },
    );
  });

  return shuffle(cards);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
