// маленькие помощники
export const $ = (sel) => document.querySelector(sel);
export const $$ = (sel) => document.querySelectorAll(sel);
export let counter = 3;

// функция склонения слова "карточка"
function pluralizeCards(n) {
  if (n % 10 === 1 && n % 100 !== 11) {
    return `${n} карточка`;
  } else if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) {
    return `${n} карточки`;
  } else if (n===0){
    return "ещё нет карточек";
  } else {
    return `${n} карточек`
  }
}
// селект с колодами
export function renderDeck(selectEl, decks) {
  selectEl.innerHTML = decks.map(
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
  ).join("");


}

// // превью карточки (одиночная)
// export function renderPreview(containerEl, frontEl, backEl, { f, b }) {
//   frontEl.textContent = f;
//   backEl.textContent  = b;
//   containerEl.classList.add("visible");
//   containerEl.classList.remove("is-flipped"); // показываем out по умолчанию
// }

// // список карточек (все)
// export function renderCardList(listEl, cards) {
//   listEl.innerHTML = cards.map(c => `
//     <div class="wrapper visible">
//       <div class="in">${c.f}</div>
//       <div class="out">${c.b}</div>
//     </div>
//     <button class="btnRemoveWord">Удалить слово</button>
//   `).join("");
// }

// навешиваем флип на контейнер превью и на список
// export function bindFlipHandlers({ previewContainer, listContainer }) {
//   // одиночная карточка
//   previewContainer.addEventListener("click", () => {
//     if (!previewContainer.classList.contains("visible")) return;
//     previewContainer.classList.toggle("is-flipped");
//   });

  // // все карточки (делегирование)
  // listContainer.addEventListener("click", (e) => {
  //   const card = e.target.closest(".wrapper");
  //   if (!card || !listContainer.contains(card)) return;
  //   card.classList.toggle("is-flipped");
  // });
// }

// функция для пересчёта номеров
export function renumberCards() {
  const cards = document.querySelectorAll(".create_cards");
  cards.forEach((card, index) => {
    const num = card.querySelector(".create_cards__header p");
    num.innerText = index + 1; // потому что index с 0
  });
}

// Добавление новой карточки
export function renderNewCard(cards , f="", b="") {
  cards.innerHTML += `
    <div class="create_cards">
      <div class="create_cards__header">
       <p></p>
       <div class="delete-card delete-card-container"><img class="delete-card" src="./img/cross.png" alt="удалить"></div>
      </div>
      <div class="cardName" id="cardName" contenteditable="true" data-placeholder="Введите слово">${f}</div>
      <div id="errorWord" class="errorWord">Пожалуйста, введите слово</div>
      <div class="cardTranslate" id="cardTranslate" contenteditable="true"data-placeholder="Перевод слова">${b}</div>
      <div id="errorTranslate" class="errorTranslate">Пожалуйста, введите перевод слова</div>
    </div>
  `;
  renumberCards();
}