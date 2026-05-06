/** Available game themes */
export type GameTheme = "code" | "gaming" | "da" | "food";

/** Player colors */
export type Player = "blue" | "orange";

/** Possible board sizes (card count) */
export type BoardSize = 16 | 24 | 36;

/** All possible game screens */
export type GameScreen = "start" | "settings" | "game" | "gameover" | "winner";

/** Settings chosen by the player before the game starts */
export interface GameSettings {
  theme: GameTheme;
  player: Player;
  boardSize: BoardSize;
}

/** Data state of a single game card */
export interface CardData {
  id: number;
  pairId: number;
  /** Path to the card image (front side) */
  image?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/** Complete game state at runtime */
export interface GameState {
  settings: GameSettings;
  cards: CardData[];
  scores: Record<Player, number>;
  currentPlayer: Player;
  /** IDs of the currently flipped (not yet evaluated) cards */
  flippedCards: number[];
  /** Locks clicks during an ongoing animation */
  isLocked: boolean;
}

/** Configuration of a single theme */
export interface ThemeConfig {
  name: string;
  color: string;
  /** Bootstrap icon class used as fallback on the card back */
  backIcon: string;
  /** Path to the logo on the card back */
  backLogo?: string;
  /** Paths to the card images (front side) */
  images?: string[];
  /** Preview image shown in the settings view */
  previewImage?: string;
}
