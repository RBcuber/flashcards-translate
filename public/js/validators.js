export function maxElement(e) {
  const max = +e.target.dataset.max;

  if (
    e.target.classList.contains("card__word") ||
    e.target.classList.contains("deck__name") ||
    e.target.classList.contains("card__translation")
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
  const max = +e.target.dataset.max;
  if (e.target.innerText.length > max) {
    e.target.innerText = e.target.innerText.slice(0, max);
  }
  if (e.target.classList.contains("deck__name")) {
    const deck = e.target.closest(".deck");
    const counter = deck.querySelector(".deck__max_length");
    updateCount(e.target, counter, max);
  }
  if (
    e.target.classList.contains("card__word") ||
    e.target.classList.contains("card__translation")
  ) {
    const deck = e.target.closest(".card__field");
    const counter = deck.querySelector(".card__counter");
    updateCount(e.target, counter, max);
  }
}

function updateCount(el, counter, max) {
  if (el.innerText.trim() === "") {
    el.innerText = "";
  }
  const text = el.innerText.trim();
  counter.innerText = `${el.innerText.length}/${max}`;
}
