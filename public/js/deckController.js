import {
  getDecks,
  addDeck,
  checkDeck,
  addCard,
  removeDeckLocal,
  getDeckByTitle,
  deleteCardAll,
} from "./storage.js";
import {renderNewCard , renderDeck } from "./dom.js";
import { els } from "./els.js";


export function onAddDeck() {
  const title = (els.inputDeck.innerText || "").trim();
  if (!title) {
    els.errorDeck.classList.add("visible");
    return;
  }
  els.errorDeck.classList.remove("visible");

  if (!checkDeck(title)) {
    alert("Колода с таким именем уже создана");
    return;
  }
  if (!checkCard()) {
    return;
  }
  addDeck(title);
  addCardAll(title);
  els.inputDeck.innerText = "";
  defoltCard();
  alert("Колода создана");
}


function addCardAll(title) {
  document.querySelectorAll(".create_cards").forEach((card) => {
    const word = card.querySelector(".cardName");
    const translated = card.querySelector(".cardTranslate");
    const wordText = word.innerText;
    const translatedText = translated.innerText;

    addCard(title, { f: wordText, b: translatedText });
  });
}
function defoltCard() {
  document.querySelectorAll(".create_cards").forEach((card, index) => {
    const word = card.querySelector(".cardName");
    const translated = card.querySelector(".cardTranslate");
    if (index < 1) {
      word.innerText = "";
      translated.innerText = "";
    } else {
      card.remove();
    }
  });
}

export function onChangeDeck() {
  const title = (els.inputDeck.innerText || "").trim();
  if (!checkCard()) {
    return;
  }
  deleteCardAll(title);
  addCardAll(title);
  alert("Колода изменена");
}

function checkCard(title) {
  let isValid = true;
  document.querySelectorAll(".create_cards").forEach((card) => {
    const word = card.querySelector(".cardName");
    const translated = card.querySelector(".cardTranslate");
    const errorWord = card.querySelector(".errorWord");
    const errorTranslate = card.querySelector(".errorTranslate");
    if (word.innerText.trim() === "" && translated.innerText.trim() === "") {
      errorWord.classList.add("visible");
      errorTranslate.classList.add("visible");
      isValid = false;
      return;
    }

    if (word.innerText.trim() === "") {
      errorWord.classList.add("visible");
      isValid = false;
      return;
    }

    if (translated.innerText.trim() === "") {
      errorTranslate.classList.add("visible");
      isValid = false;
      return;
    }
    errorWord.classList.remove("visible");
    errorTranslate.classList.remove("visible");
  });
  return isValid;
}

export function removeDeck(e) {
  if (e.target.classList.contains("delete-deck")) {
    e.preventDefault();
    e.stopPropagation();
    const deck = e.target.closest(".create-decks");
    const title = deck.querySelector(".deck-name").innerText;
    removeDeckLocal(title);
    renderDeck(els.deckSelect, getDecks());
  }
}

export function loadDeckForEdit(title) {
  const deck = getDeckByTitle(title);
  const editable = document.querySelector("#deckName");
  editable.innerText = deck.title || "";
  editable.setAttribute("contenteditable", "false");
  editable.classList.add("color");
  // создаём карточки
  if (deck.cards.length === 0) {
    renderNewCard(els.cards);
  } else if (deck.cards.length === 1) {
    deck.cards.forEach((card) => {
      renderNewCard(els.cards, card.f, card.b);
    });
  } else {
    deck.cards.forEach((card) => {
      renderNewCard(els.cards, card.f, card.b);
    });
  }
}
