# Memory

Browserbasiertes Zwei-Spieler-Memorygame mit mehreren Themes und konfigurierbarer Brettgröße. Gebaut mit **TypeScript**, **SCSS** und **Vite**.

## Features

- 4 Themes: Code Vibes, Gaming, DA Projects, Foods
- 3 Brettgrößen: 16, 24 oder 36 Karten
- Zwei-Spieler-Modus mit animiertem Kartenumdrehen und Konfetti-Siegesanimation

## Voraussetzungen

- [Node.js](https://nodejs.org/) 18 oder neuer

## Installation

```bash
# Repository klonen (oder ZIP entpacken und in den Ordner wechseln)
git clone https://github.com/maximilianbese/Memory.git
cd Memory

# Abhängigkeiten installieren
npm install
```

## Verwendung

| Befehl | Beschreibung |
|--------|-------------|
| `npm run dev` | Entwicklungsserver starten (`http://localhost:5173`) |
| `npm run build` | Produktions-Build nach `dist/` erstellen |
| `npm run preview` | Fertigen Build lokal vorschauen |

## Projektstruktur

```
src/
├── main.ts              # Einstiegspunkt
├── styles/              # SCSS-Module
└── ts/
    ├── types.ts         # Typdefinitionen
    ├── themes.ts        # Theme-Konfigurationen
    ├── game-logic.ts    # Spielmechanik
    └── renderer.ts      # DOM-Rendering
```
