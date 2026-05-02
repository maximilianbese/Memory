import "./styles/main.scss";
import type { GameState, GameSettings, Player } from "./ts/types";
import { createCards } from "./ts/game";
import {
  renderStartScreen,
  renderSettingsScreen,
  renderGameScreen,
  renderGameOverScreen,
  renderWinnerScreen,
  updateThemePreview,
  updateScoreboard,
} from "./ts/renderer";

const app = document.getElementById("app")!;

let state: GameState = {
  settings: { theme: "code", player: "blue", boardSize: 16 },
  cards: [],
  scores: { blue: 0, orange: 0 },
  currentPlayer: "blue",
  flippedCards: [],
  isLocked: false,
};

// ===== Screen navigation =====
function showStart(): void {
  app.innerHTML = renderStartScreen();
  document.getElementById("btn-play")?.addEventListener("click", showSettings);
}

function showSettings(): void {
  app.innerHTML = renderSettingsScreen();

  // Theme radio -> update preview
  document.querySelectorAll('input[name="theme"]').forEach((input) => {
    input.addEventListener("change", (e) => {
      const val = (e.target as HTMLInputElement).value;
      updateThemePreview(val);
    });
  });

  document.getElementById("btn-start")?.addEventListener("click", () => {
    const themeEl = document.querySelector<HTMLInputElement>(
      'input[name="theme"]:checked',
    );
    const playerEl = document.querySelector<HTMLInputElement>(
      'input[name="player"]:checked',
    );
    const sizeEl = document.querySelector<HTMLInputElement>(
      'input[name="boardSize"]:checked',
    );

    const settings: GameSettings = {
      theme: (themeEl?.value ?? "code") as GameSettings["theme"],
      player: (playerEl?.value ?? "blue") as Player,
      boardSize: Number(sizeEl?.value ?? 16) as GameSettings["boardSize"],
    };

    startGame(settings);
  });
}

function startGame(settings: GameSettings): void {
  state = {
    settings,
    cards: createCards(settings),
    scores: { blue: 0, orange: 0 },
    currentPlayer: settings.player,
    flippedCards: [],
    isLocked: false,
  };
  renderGame();
}

function renderGame(): void {
  app.innerHTML = renderGameScreen(state);
  attachCardListeners();
  document.getElementById("btn-exit")?.addEventListener("click", showStart);
}

function attachCardListeners(): void {
  document.querySelectorAll<HTMLElement>(".memory-card").forEach((el) => {
    el.addEventListener("click", () => {
      const id = Number(el.dataset.id);
      handleCardClick(id);
    });
  });
}

function handleCardClick(id: number): void {
  if (state.isLocked) return;

  const card = state.cards.find((c) => c.id === id);
  if (!card || card.isFlipped || card.isMatched) return;
  if (state.flippedCards.includes(id)) return;

  // Flip card in DOM
  const el = document.querySelector<HTMLElement>(
    `.memory-card[data-id="${id}"]`,
  );
  el?.classList.add("flipped");
  card.isFlipped = true;
  state.flippedCards.push(id);

  if (state.flippedCards.length === 2) {
    state.isLocked = true;
    checkMatch();
  }
}

function checkMatch(): void {
  const [id1, id2] = state.flippedCards;
  const card1 = state.cards.find((c) => c.id === id1)!;
  const card2 = state.cards.find((c) => c.id === id2)!;

  if (card1.pairId === card2.pairId) {
    // Match!
    setTimeout(() => {
      card1.isMatched = true;
      card2.isMatched = true;
      document
        .querySelector(`.memory-card[data-id="${id1}"]`)
        ?.classList.add("matched");
      document
        .querySelector(`.memory-card[data-id="${id2}"]`)
        ?.classList.add("matched");

      state.scores[state.currentPlayer]++;
      state.flippedCards = [];
      state.isLocked = false;

      updateScoreboard(state);

      if (state.cards.every((c) => c.isMatched)) {
        setTimeout(() => showGameOver(), 600);
      }
    }, 500);
  } else {
    // No match - flip back
    setTimeout(() => {
      card1.isFlipped = false;
      card2.isFlipped = false;
      document
        .querySelector(`.memory-card[data-id="${id1}"]`)
        ?.classList.remove("flipped");
      document
        .querySelector(`.memory-card[data-id="${id2}"]`)
        ?.classList.remove("flipped");

      state.flippedCards = [];
      state.isLocked = false;
      switchPlayer();
    }, 900);
  }
}

function switchPlayer(): void {
  state.currentPlayer = state.currentPlayer === "blue" ? "orange" : "blue";
  updateScoreboard(state);
}

function showGameOver(): void {
  app.innerHTML = renderGameOverScreen(state);
  setTimeout(() => showWinner(), 2200);
}

function showWinner(): void {
  let winner: Player | "tie";
  if (state.scores.blue > state.scores.orange) winner = "blue";
  else if (state.scores.orange > state.scores.blue) winner = "orange";
  else winner = "tie";

  app.innerHTML = renderWinnerScreen(winner, state);
  document.getElementById("btn-back")?.addEventListener("click", showStart);
}

// ===== Init =====
showStart();
