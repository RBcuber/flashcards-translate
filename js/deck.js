import { getDecks } from "./storage.js";

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get("title");

  const decks = getDecks();
  const deck = decks.find((d) => d.title === title);

  const slides = document.querySelector(".slides");
  const slider = document.querySelector(".slider");

  if (!deck) {
    slides.innerHTML = "<p>Колода не найдена</p>";
    return;
  }
  if (deck.cards.length === 0) {
    slider.innerHTML = "<p>Слов в колоде ещё нет</p>";
    slider.classList.add("noCard");
  }

  deck.cards.forEach((card) => {
    slides.innerHTML += `
      <div class="card">
        <p class="card-in">${card.f}</p>
        <p class="card-out">${card.b}</p>
      </div>
    `;
  });

  // теперь выбираем карточки после рендера
  if (document.querySelector(".prev")) {
    const cards = document.querySelectorAll(".card");
    const prev = document.querySelector(".prev");
    const next = document.querySelector(".next");

    let index = 0;

    function showSlide(i) {
      const slideWidth = cards[0].clientWidth; // ширина карточки
      if (i < 0) index = cards.length - 1;
      else if (i >= cards.length) index = 0;
      else index = i;
      slides.style.transform = `translateX(${-index * slideWidth}px)`;

      document.querySelectorAll(".card.flipped").forEach((card) => {
        card.classList.remove("flipped");
      });
    }

    prev.addEventListener("click", () => showSlide(index - 1));
    next.addEventListener("click", () => showSlide(index + 1));
  }
});
