import { $, $$ } from "./dom.js";

export const els = {
  inputWord: $(".card__word"),
  btnAddWord: $("#slider__btn"),
  inputDeck: $("#deckName"),
  btnAddDeck: $(".deck__create-button"),
  deckSelect: $(".decks"),
  preview: $("#container-cards"),
  btnClear: $("#clear"),
  btnShow: $("#show"),
  list: $("#list"),
  btnRemoveWord: $$(".btnRemoveWord"),
  cardNameAll: $$(".card"),
  buttonCard: $(".deck__add-card-button"),
  cards: $(".cards"),
  cardTranslate: $(".card__translation"),
  errorDeck: $(".deck__error"),
  btnСhangeCard: $(".deck-page__edit-btn"),
};
