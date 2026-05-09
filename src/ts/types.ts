/** Available game themes. */
export type GameTheme = "code" | "gaming" | "da" | "food";

/** Player colour identifier. */
export type Player = "blue" | "orange";

/** Total number of cards on the board. */
export type BoardSize = 16 | 24 | 36;

/** All screens the application can display. */
export type GameScreen = "start" | "settings" | "game" | "gameover" | "winner";

/**
 * Settings chosen by the player before a game starts.
 *
 * @property theme      - Visual theme of the game.
 * @property player     - Colour of the starting player.
 * @property boardSize  - Total number of cards on the board.
 */
export interface GameSettings {
  theme: GameTheme;
  player: Player;
  boardSize: BoardSize;
}

/**
 * Data state of a single memory card.
 *
 * @property id        - Unique card identifier.
 * @property pairId    - Shared identifier for the two cards that form a pair.
 * @property image     - Path to the card's front-side image (optional).
 * @property isFlipped - Whether the card is currently face-up.
 * @property isMatched - Whether the card has been permanently matched.
 */
export interface CardData {
  id: number;
  pairId: number;
  image?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

/**
 * Complete runtime state of an active game.
 *
 * @property settings      - Settings chosen at game start.
 * @property cards         - All cards on the board.
 * @property scores        - Current score for each player.
 * @property currentPlayer - The player whose turn it is.
 * @property flippedCards  - IDs of cards that are face-up but not yet evaluated.
 * @property isLocked      - When `true`, card clicks are ignored (animation in progress).
 */
export interface GameState {
  settings: GameSettings;
  cards: CardData[];
  scores: Record<Player, number>;
  currentPlayer: Player;
  flippedCards: number[];
  isLocked: boolean;
}

/**
 * Configuration for a single visual theme.
 *
 * @property name         - Human-readable theme name.
 * @property color        - Primary brand colour (CSS value).
 * @property backIcon     - Bootstrap icon class shown on the card back as a fallback.
 * @property backLogo     - Path to the logo rendered on the card back.
 * @property images       - Paths to all possible card front images for this theme.
 * @property previewImage - Path to the large preview image shown in the settings screen.
 */
export interface ThemeConfig {
  name: string;
  color: string;
  backIcon: string;
  backLogo?: string;
  images?: string[];
  previewImage?: string;
}
