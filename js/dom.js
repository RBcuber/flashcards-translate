// маленькие помощники
export const $ = (sel) => document.querySelector(sel);
export const $$ = (sel) => document.querySelectorAll(sel);

// селект с колодами
export function renderDeckSelect(selectEl, decks, keepValue = "") {
  const opts = ['<option value="" disabled selected>-- выбери --</option>']
    .concat(decks.map(d => `<option value="${d.deckTitle}">${d.deckTitle}</option>`));
  selectEl.innerHTML = opts.join("");
  if (keepValue) selectEl.value = keepValue;
}

// превью карточки (одиночная)
export function renderPreview(containerEl, frontEl, backEl, { f, b }) {
  frontEl.textContent = f;
  backEl.textContent  = b;
  containerEl.classList.add("visible");
  containerEl.classList.remove("is-flipped"); // показываем out по умолчанию
}

// список карточек (все)
export function renderCardList(listEl, cards) {
  listEl.innerHTML = cards.map(c => `
    <div class="wrapper visible">
      <div class="in">${c.f}</div>
      <div class="out">${c.b}</div>
    </div>
    <button class="btnRemoveWord">Удалить слово</button>
  `).join("");
}

// навешиваем флип на контейнер превью и на список
export function bindFlipHandlers({ previewContainer, listContainer }) {
  // одиночная карточка
  previewContainer.addEventListener("click", () => {
    if (!previewContainer.classList.contains("visible")) return;
    previewContainer.classList.toggle("is-flipped");
  });

  // все карточки (делегирование)
  listContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".wrapper");
    if (!card || !listContainer.contains(card)) return;
    card.classList.toggle("is-flipped");
  });
}