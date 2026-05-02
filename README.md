# Memory# Memory App – Bilder einbinden

## Ordnerstruktur für Bilder

Alle Bilder liegen im `public/`-Ordner und werden von Vite automatisch ins Build kopiert.

```
public/
├── logos/
│   ├── code-logo.png       ← Logo auf der Kartenrückseite (Code Vibes Theme)
│   ├── gaming-logo.png     ← Logo auf der Kartenrückseite (Gaming Theme)
│   ├── da-logo.png         ← Logo auf der Kartenrückseite (DA Projects Theme)
│   └── food-logo.png       ← Logo auf der Kartenrückseite (Foods Theme)
│
└── images/
    ├── code/
    │   ├── react.png
    │   ├── python.png
    │   ├── rust.png
    │   ├── docker.png
    │   ├── git.png
    │   ├── nodejs.png
    │   ├── typescript.png
    │   ├── linux.png
    │   ├── vscode.png
    │   ├── github.png
    │   ├── webpack.png
    │   ├── graphql.png
    │   ├── aws.png
    │   ├── vue.png
    │   ├── angular.png
    │   ├── mongodb.png
    │   ├── redis.png
    │   └── tailwind.png
    │
    ├── gaming/
    │   ├── mario.png
    │   ├── zelda.png
    │   └── ... (18 Bilder gesamt)
    │
    ├── da/
    │   ├── chart-bar.png
    │   └── ... (18 Bilder gesamt)
    │
    └── food/
        ├── pizza.png
        └── ... (18 Bilder gesamt)
```

## Bildgrößen (empfohlen)

| Verwendung       | Empfohlene Größe | Format                          |
| ---------------- | ---------------- | ------------------------------- |
| Kartenbilder     | 200×200 px       | PNG (transparenter Hintergrund) |
| Logo (Rückseite) | 200×200 px       | PNG (transparenter Hintergrund) |

## Fallback

Wenn ein Bild **nicht gefunden** wird (404), zeigt die App automatisch:

- **Rückseite:** das Bootstrap-Icon des Themes
- **Vorderseite:** das Emoji des jeweiligen Paares

Du kannst also das Spiel auch ohne Bilder starten – die Emojis funktionieren als vollständiger Fallback.

## Eigene Bilder/Themes anpassen

In `src/ts/themes.ts` kannst du für jedes Theme:

- `backLogo` → Pfad zum Rückseiten-Logo ändern
- `images[]` → Pfade zu den 18 Kartenbildern anpassen
- `symbols[]` → Emoji-Fallbacks anpassen
- `color` → Hintergrundfarbe der Karten ändern

## Projekt starten

```bash
npm install
npm run dev    # Entwicklungsserver
npm run build  # Produktions-Build → dist/
```
