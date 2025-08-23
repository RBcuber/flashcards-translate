export async function translateRuToEn(text) {
  const q = encodeURIComponent(text);
  const url = `https://api.mymemory.translated.net/get?q=${q}&langpair=ru%7Cen`;
  const res = await fetch(url);
  const data = await res.json();
  return data.responseData.translatedText ?? "";
}