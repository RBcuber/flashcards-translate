const DECKS_KEY = "decks";

export function getDecks() {
  return JSON.parse(localStorage.getItem(DECKS_KEY)) || [];
}

function saveDecks(decks) {
  localStorage.setItem(DECKS_KEY, JSON.stringify(decks));
}

export function addDeck(title) {
  const decks = getDecks();
  decks.push({ title, cards: [] });
  saveDecks(decks);
}

export function checkDeck(title) {
  const decks = getDecks();
  if (decks.some((d) => d.title === title)) return false;
  return true;
}

export function getCards(title) {
  const decks = getDecks();
  return decks.find((d) => d.title === title)?.cards || [];
}

export function addCard(title, card) {
  const decks = getDecks();
  const deck = decks.find((d) => d.title === title);
  if (!deck) return;
  deck.cards.push(card);
  saveDecks(decks);
}

export function clearAll() {
  localStorage.removeItem(DECKS_KEY);
}
export function removeWord(title, word) {
  const decks = getDecks();
  if (!decks[title]) return;

  decks[title].cards = decks[title].cards.filter((c) => c.f !== word);
  saveDecks(decks);
}

export function removeDeckLocal(title) {
  const decks = getDecks();
  const updatedDecks = decks.filter((c) => c.title !== title);
  saveDecks(updatedDecks);
}

export function changeCard(title) {
  const decks = getDecks();
  return decks.find((d) => d.title === title);
}
export function deleteCardAll(title) {
  const decks = getDecks();
  const deck = decks.find(d => d.title === title);
  deck.cards = [];
  saveDecks(decks);
}
