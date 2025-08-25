import {renderNewCard, renumberCards} from "./dom.js";
import { els } from "./els.js";



export function onAddCart() {
  renderNewCard(els.cards);
}
export function removeCard(e) {
  if (e.target.classList.contains("delete-card")) {
    e.target.closest(".create_cards").remove();
    renumberCards();
  }
}
export function flippedCard(e) {
  const card = e.target.closest(".card"); // ищем карточку
  if (card) {
    card.classList.toggle("flipped");
  }
}

export function onСhangeCard() {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");
  window.location.href = `create.html?title=${encodeURIComponent(title)}`;
}
