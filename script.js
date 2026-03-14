const ORDER = [0, 1, 2, 3, 4, 5, 11, 10, 9, 8, 7, 6];
const ORDER_POS = new Map(ORDER.map((pit, idx) => [pit, idx]));

const state = {
  pits: [],
  current: 0,
  score: [0, 0],
  gameOver: false,
};

const rowTop = document.getElementById("rowTop");
const rowBottom = document.getElementById("rowBottom");
const turnLabel = document.getElementById("turnLabel");
const scoreP1 = document.getElementById("scoreP1");
const scoreP2 = document.getElementById("scoreP2");
const resetBtn = document.getElementById("resetBtn");
const hintBtn = document.getElementById("hintBtn");
const rulesPanel = document.getElementById("rules");

function init() {
  state.pits = Array(12).fill(4);
  state.current = 0;
  state.score = [0, 0];
  state.gameOver = false;
  render();
}

function ownerOf(pit) {
  return pit <= 5 ? 1 : 0;
}

function nextPit(pit) {
  const pos = ORDER_POS.get(pit);
  return ORDER[(pos + 1) % ORDER.length];
}

function prevPit(pit) {
  const pos = ORDER_POS.get(pit);
  return ORDER[(pos - 1 + ORDER.length) % ORDER.length];
}

function pitsForPlayer(player) {
  return player === 0 ? [6, 7, 8, 9, 10, 11] : [0, 1, 2, 3, 4, 5];
}

function hasMoves(player) {
  return pitsForPlayer(player).some((pit) => state.pits[pit] > 0);
}

function sideEmpty(player) {
  return pitsForPlayer(player).every((pit) => state.pits[pit] === 0);
}

function captureFrom(startPit) {
  let pit = startPit;
  while (ownerOf(pit) !== state.current && state.pits[pit] === 4) {
    state.score[state.current] += 4;
    state.pits[pit] = 0;
    pit = prevPit(pit);
  }
}

function finishIfOver() {
  if (sideEmpty(0) || sideEmpty(1)) {
    const remainingP0 = pitsForPlayer(0).reduce((sum, pit) => sum + state.pits[pit], 0);
    const remainingP1 = pitsForPlayer(1).reduce((sum, pit) => sum + state.pits[pit], 0);
    state.score[0] += remainingP0;
    state.score[1] += remainingP1;
    state.pits = Array(12).fill(0);
    state.gameOver = true;
  }
}

function makeMove(pit) {
  if (state.gameOver) return;
  if (ownerOf(pit) !== state.current) return;
  if (state.pits[pit] === 0) return;

  let seeds = state.pits[pit];
  state.pits[pit] = 0;
  let cursor = pit;

  while (seeds > 0) {
    cursor = nextPit(cursor);
    state.pits[cursor] += 1;
    seeds -= 1;
  }

  if (ownerOf(cursor) !== state.current && state.pits[cursor] === 4) {
    captureFrom(cursor);
  }

  state.current = state.current === 0 ? 1 : 0;
  finishIfOver();
  if (!state.gameOver && !hasMoves(state.current)) {
    state.gameOver = true;
  }
  render();
}

function renderPit(pit) {
  const container = document.createElement("button");
  container.type = "button";
  container.className = "pit";
  container.setAttribute("aria-label", `Pit ${pit + 1}`);

  if (ownerOf(pit) !== state.current || state.pits[pit] === 0 || state.gameOver) {
    container.classList.add("disabled");
  }

  const count = document.createElement("span");
  count.className = "pit__count";
  count.textContent = state.pits[pit];

  const seeds = document.createElement("div");
  seeds.className = "pit__seeds";

  const seedCount = Math.min(state.pits[pit], 12);
  for (let i = 0; i < seedCount; i += 1) {
    const seed = document.createElement("span");
    seed.className = "seed";
    seeds.appendChild(seed);
  }

  container.appendChild(count);
  container.appendChild(seeds);

  container.addEventListener("click", () => makeMove(pit));
  return container;
}

function render() {
  rowTop.innerHTML = "";
  rowBottom.innerHTML = "";

  [5, 4, 3, 2, 1, 0].forEach((pit) => rowTop.appendChild(renderPit(pit)));
  [6, 7, 8, 9, 10, 11].forEach((pit) => rowBottom.appendChild(renderPit(pit)));

  turnLabel.textContent = state.gameOver
    ? "Game Over"
    : state.current === 0
    ? "Player 1"
    : "Player 2";

  scoreP1.textContent = state.score[0];
  scoreP2.textContent = state.score[1];
}

resetBtn.addEventListener("click", init);

hintBtn.addEventListener("click", () => {
  rulesPanel.classList.toggle("open");
  hintBtn.textContent = rulesPanel.classList.contains("open") ? "Hide Rules" : "Show Rules";
});

init();
