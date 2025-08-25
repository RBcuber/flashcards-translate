import { translateRuToEn } from "./translator.js";


export async function translateCart(e) {
  if (e.target.classList.contains("cardName")) {
    const card = e.target.closest(".create_cards");
    const translatedDiv = card.querySelector(".cardTranslate");
    const word = (e.target.innerText || "").trim();
    if (!word) {
      translatedDiv.innerText = "";
      return;
    }
    const translation = await translateRuToEn(word);
    translatedDiv.innerText = translation;
  }
}
