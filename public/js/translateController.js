import { translateRuToEn } from "./translator.js";

export async function translateCart(e) {
  if (e.target.classList.contains("card__word")) {
    const card = e.target.closest(".card");
    const translatedDiv = card.querySelector(".card__translation");
    const word = (e.target.innerText || "").trim();
    if (!word) {
      translatedDiv.innerText = "";
      return;
    }
    const translation = await translateRuToEn(word);
    translatedDiv.innerText = translation;
  }
}
