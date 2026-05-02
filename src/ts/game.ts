import type { CardData, GameSettings, BoardSize } from "./types";
import { THEMES } from "./themes";

export function createCards(settings: GameSettings): CardData[] {
  const theme = THEMES[settings.theme];
  const pairCount = settings.boardSize / 2;
  const symbols = theme.symbols.slice(0, pairCount);

  const cards: CardData[] = [];
  symbols.forEach((symbol, pairId) => {
    cards.push(
      { id: pairId * 2, pairId, symbol, isFlipped: false, isMatched: false },
      {
        id: pairId * 2 + 1,
        pairId,
        symbol,
        isFlipped: false,
        isMatched: false,
      },
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

export function getBoardCols(size: BoardSize): number {
  if (size === 16) return 4;
  return 6;
}
