const DECK_LIST_KEY = "deck";
const deckKey = (title) => `deck:${title}`;

export function getDecks() {
  return JSON.parse(localStorage.getItem(DECK_LIST_KEY)) || [];
}

export function addDeck(title) {
  const decks = getDecks();
  if (decks.some((d) => d.deckTitle === title)) return false;
  decks.push({ deckTitle: title });
  localStorage.setItem(DECK_LIST_KEY, JSON.stringify(decks));
  return true;
}

export function getCards(title) {
  return JSON.parse(localStorage.getItem(deckKey(title))) || [];
}

export function addCard(title, card) {
  const cards = getCards(title);
  cards.push(card);
  localStorage.setItem(deckKey(title), JSON.stringify(cards));
}

export function clearAll() {
  localStorage.clear();
}
export function removeWord(title, word) {
  let cards = getCards(title);
  cards = cards.filter((c) => c.f !== word);
  localStorage.setItem(deckKey(title), JSON.stringify(cards));

}
