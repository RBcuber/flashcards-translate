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
    <a href="deck.html?title=${encodeURIComponent(d.title)}" class="a">
      <div class="create-decks">
				<div class="deck-name">
					${d.title}
				</div>
				<div class="amount-cards">
					${pluralizeCards(d.cards.length)}
				</div>
				<div class="delete-deck delete-deck-container"><img class="delete-deck" src="./img/cross.png" alt="удалить"></div>
			</div>
    </a>
  `
    )
    .join("");
}


// функция для пересчёта номеров
export function renumberCards() {
  const cards = document.querySelectorAll(".create_cards");
  cards.forEach((card, index) => {
    const num = card.querySelector(".create_cards__header p");
    num.innerText = index + 1;
  });
}

// Добавление новой карточки
export function renderNewCard(cards, f = "", b = "") {
  cards.innerHTML += `
    <div class="create_cards">
      <div class="create_cards__header">
       <p></p>
       <div class="delete-card delete-card-container"><img class="delete-card" src="./img/cross.png" alt="удалить"></div>
      </div>
      <div class= "inputCards relative"> 
        <div class="cardName" contenteditable="true" data-placeholder="Введите слово">${f}</div>
        <div id="errorWord" class="errorWord">Пожалуйста, введите слово</div>
        <p class="card__max_length max_length"></p>
      </div>
      <div class= "inputCardsTranslate relative"> 
        <div class= "cardTranslate" contenteditable="true"data-placeholder="Перевод слова">${b}</div>
        <div id="errorTranslate" class="errorTranslate">Пожалуйста, введите перевод слова</div>
      </div>


    </div>
  `;
  renumberCards();
}
