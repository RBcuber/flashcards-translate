export const $ = (sel) => document.querySelector(sel);
export const $$ = (sel) => document.querySelectorAll(sel);

// функция склонения слова
function pluralizeCards(n) {
  if (n % 10 === 1 && n % 100 !== 11) {
    return `${n} карточка`;
  } else if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) {
    return `${n} карточки`;
  } else if (n === 0) {
    return "ещё нет карточек";
  } else {
    return `${n} карточек`;
  }
}
// селект с колодами
export function renderDeck(selectEl, decks) {
  selectEl.innerHTML = decks
    .map(
      (d) =>
        `
        <a href="deck.html?title=${encodeURIComponent(
          d.title
        )}" class="decks__link">
          <div class="decks__item">
				    <div class="decks__title">
				      ${d.title}
				    </div>
				    <div class="decks__count">
				  	  ${pluralizeCards(d.cards.length)}
				    </div>
				    <div class="decks__delete"><img class="decks__delete-icon" src="./img/cross.png" alt="удалить"></div>
			    </div>
        </a>
  `
    )
    .join("");
}

// функция для пересчёта номеров
export function renumberCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    const num = card.querySelector(".card__header p");
    num.innerText = index + 1;
  });
}

// Добавление новой карточки
export function renderNewCard(cards, f = "", b = "") {
  cards.innerHTML += `
    <div class="card">
      <div class="card__header">
       <p class="card__number"></p>
       <div class="card__delete"><img class="card__delete-icon" src="./img/cross.png" alt="удалить"></div>
      </div>
      <div class= "card__field card__field--word relative"> 
        <div class="card__word" data-max="30" contenteditable="true" data-placeholder="Введите слово">${f}</div>
        <div class="card__error">Пожалуйста, введите слово</div>
        <p class="card__counter counter"></p>
      </div>
      <div class= "card__field card__field--translation relative"> 
        <div class= "card__translation" data-max="30" contenteditable="true"data-placeholder="Перевод слова">${b}</div>
        <div class="card__error--translation">Пожалуйста, введите перевод слова</div>
        <p class="card__counter counter"></p>
      </div>


    </div>
  `;
  renumberCards();
}
