export async function translateRuToEn(text) {
  const url = `https://flashcards-translate.vercel.app/api/translate?text=${encodeURIComponent(text)}&source=ru&target=en`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data?.translations?.[0]?.translatedText ?? "";
}