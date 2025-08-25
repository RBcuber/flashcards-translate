

export function maxElement(e) {
  const max = 20;
  if (
    e.target.classList.contains("cardName") ||
    e.target.classList.contains("deckName")
  ) {
    if (
      e.target.innerText.length >= max &&
      e.inputType !== "deleteContentBackward"
    ) {
      e.preventDefault(); // отменяем ввод нового текста
    }
  }
}
export function updateCharCount(e) {
  if (e.target.classList.contains("deckName")) {
    const max = 20;
    const deck = e.target.closest(".create_deck");
    const counter = deck.querySelector(".deck__max_length");
    updateCount(e.target, counter, max);
  }
  if (e.target.classList.contains("cardName")) {
    const max = 20;
    const deck = e.target.closest(".inputCards");
    const counter = deck.querySelector(".card__max_length");
    updateCount(e.target, counter, max);
  }
}

function updateCount(el, counter, max) {
  if (el.innerText.trim() === "") {
    el.innerText = "";
  }
  const text = el.innerText.trim();
  counter.innerText = `${text.length}/${max}`;
}
