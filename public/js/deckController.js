import {
  getDecks,
  addDeck,
  checkDeck,
  addCard,
  removeDeckLocal,
  getDeckByTitle,
  deleteCardAll,
} from "./storage.js";
import { renderNewCard, renderDeck } from "./dom.js";
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
  window.location.href = "index.html";
}

function addCardAll(title) {
  document.querySelectorAll(".card").forEach((card) => {
    const word = card.querySelector(".card__word");
    const translated = card.querySelector(".card__translation");
    const wordText = word.innerText;
    const translatedText = translated.innerText;

    addCard(title, { f: wordText, b: translatedText });
  });
}
function defoltCard() {
  document.querySelectorAll(".card").forEach((card, index) => {
    const word = card.querySelector(".card__word");
    const translated = card.querySelector(".card__translation");
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
  document.querySelectorAll(".card").forEach((card) => {
    const word = card.querySelector(".card__word");
    const translated = card.querySelector(".card__translation");
    const card__error = card.querySelector(".card__error");
    const errorTranslate = card.querySelector(".card__error--translation");
    if (word.innerText.trim() === "" && translated.innerText.trim() === "") {
      card__error.classList.add("visible");
      errorTranslate.classList.add("visible");
      isValid = false;
      return;
    }

    if (word.innerText.trim() === "") {
      card__error.classList.add("visible");
      isValid = false;
      return;
    }

    if (translated.innerText.trim() === "") {
      errorTranslate.classList.add("visible");
      isValid = false;
      return;
    }
    card__error.classList.remove("visible");
    errorTranslate.classList.remove("visible");
  });
  return isValid;
}

export function removeDeck(e) {
  if (e.target.classList.contains("decks__delete-icon")) {
    e.preventDefault();
    e.stopPropagation();
    const result = confirm("Вы точно хотите удалить колоду?");
    if(!result) return;
    const deck = e.target.closest(".decks__item");
    const title = deck.querySelector(".decks__title").innerText;
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
