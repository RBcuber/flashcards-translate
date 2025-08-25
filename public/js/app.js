import { getDecks } from "./storage.js";
import { renderNewCard, renderDeck } from "./dom.js";
import {
  onAddDeck,
  onChangeDeck,
  removeDeck,
  loadDeckForEdit,
} from "./deckController.js";
import {
  onAddCart,
  removeCard,
  flippedCard,
  onСhangeCard,
} from "./cardController.js";
import { translateCart } from "./translateController.js";
import { maxElement, updateCharCount } from "./validators.js";
import { els } from "./els.js";

function init() {
  if (els.deckSelect) {
    renderDeck(els.deckSelect, getDecks());
  }
  const path = window.location.pathname;
  const page = path.split("/").pop();
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  if (page === "create.html") {
    if (!title) {
      renderNewCard(els.cards);
      els.btnAddDeck?.addEventListener("click", onAddDeck);
    } else {
      loadDeckForEdit(title);
      els.btnAddDeck.innerText = "Сохранить изменения";
      els.btnAddDeck?.addEventListener("click", onChangeDeck);
    }
  }

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
  document.addEventListener("input", updateCharCount);

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btnRemoveWord")) {
      onRemoveAll(e);
    }
  });
}

init();
