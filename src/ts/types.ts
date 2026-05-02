export type GameTheme = "code" | "gaming" | "da" | "food";
export type Player = "blue" | "orange";
export type BoardSize = 16 | 24 | 36;
export type GameScreen = "start" | "settings" | "game" | "gameover" | "winner";

export interface GameSettings {
  theme: GameTheme;
  player: Player;
  boardSize: BoardSize;
}

export interface CardData {
  id: number;
  pairId: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  settings: GameSettings;
  cards: CardData[];
  scores: Record<Player, number>;
  currentPlayer: Player;
  flippedCards: number[];
  isLocked: boolean;
}

export interface ThemeConfig {
  color: string;
  backIcon: string;
  symbols: string[];
  name: string;
}
