import { getDecks } from "./storage.js";

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");

  const decks = getDecks();
  const deck = decks.find((d) => d.title === title);

  const slides = document.querySelector(".slider__slides");
  const slider = document.querySelector(".slider");

  if (renderCards(deck, slides, slider)) {
    initSlider(slides);
  }
});

function renderCards(deck, slides, slider) {
  if (!deck) {
    slides.innerHTML = "<p>Колода не найдена</p>";
    return false;
  }
  if (deck.cards.length === 0) {
    slider.innerHTML = "<p>Слов в колоде ещё нет</p>";
    slider.classList.add("noCard");
    return false;
  }

  deck.cards.forEach((card) => {
    slides.innerHTML += `
      <div class="flashcard">
        <div class="flashcard__inner">
          <div class="flashcard__side flashcard__side--front">${card.f}</div>
          <div class="flashcard__side flashcard__side--back">${card.b}</div>
        </div>
      </div>
    `;
  });

  return true;
}
function initSlider(slides) {
  const cards = document.querySelectorAll(".flashcard");
  const prev = document.querySelector(".slider__btn--prev");
  const next = document.querySelector(".slider__btn--next");

  if (!cards.length || !prev || !next) return;

  let index = 0;

  function showSlide(i) {
    const slideWidth = cards[0].clientWidth;
    if (i < 0) index = cards.length - 1;
    else if (i >= cards.length) index = 0;
    else index = i;

    slides.style.transform = `translateX(${-index * slideWidth}px)`;

    // сброс переворотов
    document.querySelectorAll(".flashcard.flipped").forEach((card) => {
      card.classList.remove("flipped");
    });
  }

  prev.addEventListener("click", () => showSlide(index - 1));
  next.addEventListener("click", () => showSlide(index + 1));
}
