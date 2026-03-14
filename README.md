# Ayo Olopon

A simple, local two-player implementation of Ayo Olopon (Yoruba strategy game) built with vanilla HTML, CSS, and JavaScript.

## Features
- 12-pit board with counterclockwise sowing
- Chain captures when the last seed makes exactly 4 on the opponent side
- Local two-player play or solo vs AI
- Score tracking, reset, and rules panel

## Rules Implemented (Simplified)
1. Each player owns the six pits on their side.
2. On your turn, pick a pit on your side and sow seeds counterclockwise.
3. If your last seed lands in an opponent pit making exactly 4, capture those 4.
4. Continue capturing backward on the opponent side while pits are exactly 4.
5. The game ends when one side is empty; remaining seeds are collected.

Note: This build does not enforce starvation/feeding rules.

## Run
Open `index.html` in any modern browser.

## Solo vs AI
Use the "Play vs AI" button to switch into solo mode. You play as Player 1 (bottom row).

## Project Structure
- `index.html` - UI layout
- `styles.css` - visual design
- `script.js` - game logic

## Roadmap Ideas
- Add AI opponent for solo play
- Implement full tournament rules (starvation/feeding)
- Add move history and undo
