import {
  getDecks,
  addDeck,
  getCards,
  addCard,
  clearAll,
  removeWord,
} from "./storage.js";
import { translateRuToEn } from "./translator.js";
import {
  $,
  $$,
  renderDeckSelect,
  renderPreview,
  renderCardList,
  bindFlipHandlers,
} from "./dom.js";

const els = {
  inputWord: $("#input"),
  btnAddWord: $("#btn"),
  inputDeck: $("#input1"),
  btnAddDeck: $(".btn1"),
  deckSelect: $("#deckSelect"),
  preview: $("#container"),
  front: $("#in"),
  back: $("#out"),
  btnClear: $("#clear"),
  btnShow: $("#show"),
  list: $("#list"),
  btnRemoveWord: $$(".btnRemoveWord"),
};

init();

function init() {
  // рендерим селект колод
  renderDeckSelect(els.deckSelect, getDecks());

  // события
  els.btnAddDeck?.addEventListener("click", onAddDeck);
  els.btnAddWord?.addEventListener("click", onAddWord);
  els.btnShow?.addEventListener("click", onShowAll);
  els.btnClear?.addEventListener("click", onClearAll);

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnRemoveWord")) {
      onRemoveAll(e);
    }
  });

  // флип обработчики
  bindFlipHandlers({
    previewContainer: els.preview,
    listContainer: els.list,
  });
}

async function onAddWord() {
  const word = (els.inputWord.value || "").trim();
  if (!word) return;

  const chosenDeck = els.deckSelect.value;
  if (!chosenDeck) {
    alert("Выбери колоду в выпадающем списке");
    return;
  }

  const cards = getCards(chosenDeck);
  if (cards.some((c) => c.f === word)) {
    alert("Такое слово уже добавлено");
    return;
  }

  els.inputWord.value = "";
  const translated = await translateRuToEn(word);

  renderPreview(els.preview, els.front, els.back, { f: word, b: translated });
  addCard(chosenDeck, { f: word, b: translated });
}

function onAddDeck() {
  const title = (els.inputDeck.value || "").trim();
  if (!title) return;

  if (!addDeck(title)) {
    alert("Колода с таким именем уже создана");
    return;
  }
  els.inputDeck.value = "";
  renderDeckSelect(els.deckSelect, getDecks(), title);
}

function onShowAll() {
  const chosenDeck = els.deckSelect.value;
  if (!chosenDeck) {
    alert("Сначала выбери колоду");
    return;
  }
  renderCardList(els.list, getCards(chosenDeck));
}

function onClearAll() {
  if (!confirm("Точно очистить все колоды и карточки?")) return;
  clearAll();
  renderDeckSelect(els.deckSelect, []);
  els.list.innerHTML = "";
  els.preview.classList.remove("visible", "is-flipped");
  els.front.textContent = "";
  els.back.textContent = "";
}
function onRemoveAll(e) {
  if (!confirm("Точно хотите удалить слово?")) return;
  const card = e.target.closest(".list");
  const wordDiv = card.querySelector(".in");
  const word = wordDiv.textContent;

  const chosenDeck = els.deckSelect.value;

  removeWord(chosenDeck, word);
  renderCardList(els.list, getCards(chosenDeck));
}
