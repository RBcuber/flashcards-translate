import {
  getDecks,
  addDeck,
  getCards,
  addCard,
  checkDeck,
  clearAll,
  removeWord,
  removeDeckLocal,
  changeCard,
  deleteCardAll,
} from "./storage.js";
import { translateRuToEn } from "./translator.js";
import {
  $,
  $$,
  renderNewCard,
  renumberCards,
  renderDeck,
  // renderPreview,
  // renderCardList,
  // bindFlipHandlers,
} from "./dom.js";

const els = {
  inputWord: $("#cardName"),
  btnAddWord: $("#btn"),
  inputDeck: $("#deckName"),
  btnAddDeck: $(".button"),
  deckSelect: $(".decks"),
  preview: $("#container-cards"),
  front: $("#in"),
  back: $("#out"),
  btnClear: $("#clear"),
  btnShow: $("#show"),
  list: $("#list"),
  btnRemoveWord: $$(".btnRemoveWord"),
  cardNameAll: $$(".create_cards"),
  buttonCard: $(".button-card"),
  cards: $(".cards"),
  cardTranslate: $(".cardTranslate"),
  errorDeck: $(".errorDeck"),
  btnСhangeCard: $(".btnСhangeCard"),
};

init();

function init() {
  // рендерим селект колод
  if (els.deckSelect) {
    renderDeck(els.deckSelect, getDecks());
  }
  const path = window.location.pathname;
  const page = path.split("/").pop(); // имя файла, например "create.html"
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title"); // если есть
  if (page === "" || page === "index.html") {
    if (!title) {
      renderNewCard(els.cards);
      els.btnAddDeck?.addEventListener("click", onAddDeck);
    } else {
      loadDeckForEdit(title);
      els.btnAddDeck.innerText = "Сохранить изменения"
      els.btnAddDeck?.addEventListener("click", onChangeDeck);
    }
  }

  // события
  els.btnAddWord?.addEventListener("click", onAddWord);
  els.btnShow?.addEventListener("click", onShowAll);
  els.btnClear?.addEventListener("click", onClearAll);
  els.buttonCard?.addEventListener("click", onAddCart);
  els.btnСhangeCard?.addEventListener("click", onСhangeCard);

  document.addEventListener("click", removeCard);
  document.addEventListener("click", removeDeck);
  document.addEventListener("click", flippedCard);

  document.addEventListener("input", translateCart);
  document.addEventListener("beforeinput", maxElement);


  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnRemoveWord")) {
      onRemoveAll(e);
    }
  });

  // флип обработчики
  // bindFlipHandlers({
  //   previewContainer: els.preview,
  //   listContainer: els.list,
  // });
}

// async function onAddWord() {
//   const word = (els.inputWord.value || "").trim();
//   if (!word) return;

//   const chosenDeck = els.deckSelect.value;
//   if (!chosenDeck) {
//     alert("Выбери колоду в выпадающем списке");
//     return;
//   }

//   const cards = getCards(chosenDeck);
//   if (cards.some((c) => c.f === word)) {
//     alert("Такое слово уже добавлено");
//     return;
//   }

//   els.inputWord.value = "";
//   const translated = await translateRuToEn(word);

//   // renderPreview(els.preview, els.front, els.back, { f: word, b: translated })
//   addCard(chosenDeck, { f: word, b: translated });
// }

function onAddDeck() {
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
  // renderDeckSelect(els.deckSelect, getDecks(), title);
}
function onChangeDeck() {
  const title = (els.inputDeck.innerText || "").trim();
  if (!checkCard()) {
    return;
  }
  deleteCardAll(title);
  addCardAll(title);
  alert("Колода изменена");
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
// function onShowAll() {
//   const chosenDeck = els.deckSelect.value;
//   if (!chosenDeck) {
//     alert("Сначала выбери колоду");
//     return;
//   }
//   // renderCardList(els.list, getCards(chosenDeck));
// }

// function onClearAll() {
//   if (!confirm("Точно очистить все колоды и карточки?")) return;
//   clearAll();
//   // renderDeckSelect(els.deckSelect, []);
//   els.list.innerHTML = "";
//   els.preview.classList.remove("visible", "is-flipped");
//   els.front.textContent = "";
//   els.back.textContent = "";
// }
// function onRemoveAll(e) {
//   if (!confirm("Точно хотите удалить слово?")) return;
//   const card = e.target.closest(".list");
//   const wordDiv = card.querySelector(".in");
//   const word = wordDiv.textContent;

//   const chosenDeck = els.deckSelect.value;

//   removeWord(chosenDeck, word);
//   // renderCardList(els.list, getCards(chosenDeck));
// }

function onAddCart() {
  renderNewCard(els.cards);
}

async function translateCart(e) {
  if (e.target.classList.contains("cardName")) {
    const card = e.target.closest(".create_cards");
    const translatedDiv = card.querySelector(".cardTranslate");
    const word = (e.target.innerText || "").trim();
    if (!word) {
      translatedDiv.innerText = "";
      return;
    }
    const translation = await translateRuToEn(word);
    translatedDiv.innerText = translation;
  }
}

function removeCard(e) {
  if (e.target.classList.contains("delete-card")) {
    e.target.closest(".create_cards").remove();
    renumberCards();
  }
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

function removeDeck(e) {
  if (e.target.classList.contains("delete-deck")) {
    e.preventDefault();
    e.stopPropagation();
    const deck = e.target.closest(".create-decks");
    const title = deck.querySelector(".deck-name").innerText;
    removeDeckLocal(title);
    renderDeck(els.deckSelect, getDecks());
  }
}

function flippedCard(e) {
  const card = e.target.closest(".card"); // ищем карточку
  if (card) {
    card.classList.toggle("flipped");
  }
}

function onСhangeCard() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  window.location.href = `index.html?title=${encodeURIComponent(title)}`;
}
// localStorage.clear();

function loadDeckForEdit(title) {
  const deck = changeCard(title);
  const editable = document.querySelector("#deckName");
  editable.innerText = deck.title || "";
  editable.setAttribute("contenteditable", "false");
  editable.classList.add("color")
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
function maxElement(e) {
  const max = 20;
  if (e.target.classList.contains("cardName") || e.target.classList.contains("deckName")) {
    if (e.target.innerText.length >= max && e.inputType !== "deleteContentBackward") { 
      e.preventDefault(); // отменяем ввод нового текста
    }
  }
}